import { gzipSync } from "node:zlib"
import { build } from "vite"

const routes = [
  { name: "Home", module: "/src/pages/HomePage.tsx", gzipBudget: 200_000, inclusive: true },
  { name: "Projects", module: "/src/pages/ProjectsPage.tsx", gzipBudget: 214_305 },
  { name: "About", module: "/src/pages/AboutPage.tsx", gzipBudget: 214_305 },
  { name: "Contact", module: "/src/pages/ContactPage.tsx", gzipBudget: 214_305 },
]
const entryRawBudget = 680_000
const routeRawBudget = 720_471

function hasModule(chunk, modulePath) {
  return Object.keys(chunk.modules).some((id) => {
    const normalizedId = id.replaceAll("\\", "/").split("?", 1)[0]
    return normalizedId.endsWith(modulePath)
  })
}

function measureChunks(chunks) {
  return chunks.reduce(
    (measurement, chunk) => ({
      raw: measurement.raw + Buffer.byteLength(chunk.code),
      gzip: measurement.gzip + gzipSync(chunk.code).byteLength,
    }),
    { raw: 0, gzip: 0 },
  )
}

function collectStaticClosure(chunkByFileName, roots, errors) {
  const closure = new Set()
  const pending = [...roots]

  while (pending.length > 0) {
    const fileName = pending.pop()
    if (closure.has(fileName)) continue

    const chunk = chunkByFileName.get(fileName)
    if (!chunk) {
      errors.push(`static import ${fileName} is not a JavaScript chunk`)
      continue
    }

    closure.add(fileName)
    pending.push(...chunk.imports)
  }

  return [...closure].map((fileName) => chunkByFileName.get(fileName))
}

function collectRouteOwnedReachableGraph(
  chunkByFileName,
  roots,
  errors,
  entryFileName,
  routeEntryFileNames,
) {
  const reachable = new Set()
  const pending = [...roots]

  while (pending.length > 0) {
    const fileName = pending.pop()
    if (reachable.has(fileName)) continue

    const chunk = chunkByFileName.get(fileName)
    if (!chunk) {
      errors.push(`route-owned import ${fileName} is not a JavaScript chunk`)
      continue
    }

    reachable.add(fileName)
    pending.push(...chunk.imports)
    pending.push(...chunk.dynamicImports.filter(
      (targetFileName) => fileName !== entryFileName || !routeEntryFileNames.has(targetFileName),
    ))
  }

  return [...reachable].map((fileName) => chunkByFileName.get(fileName))
}

function mergeChunks(...graphs) {
  return [...new Map(
    graphs.flat().map((chunk) => [chunk.fileName, chunk]),
  ).values()]
}

function verifyRouteOwnedTraversal() {
  const syntheticChunks = [
    { fileName: "route.js", imports: [], dynamicImports: [], modules: {} },
    {
      fileName: "entry.js",
      imports: [],
      dynamicImports: ["sibling-route.js", "dynamic-a.js"],
      modules: {},
    },
    {
      fileName: "sibling-route.js",
      imports: [],
      dynamicImports: [],
      modules: { "/src/pages/ProjectsPage.tsx": {} },
    },
    { fileName: "dynamic-a.js", imports: [], dynamicImports: ["dynamic-b.js"], modules: {} },
    { fileName: "dynamic-b.js", imports: ["about.js"], dynamicImports: [], modules: {} },
    {
      fileName: "about.js",
      imports: [],
      dynamicImports: [],
      modules: { "/src/pages/AboutPage.tsx": {} },
    },
  ]
  const errors = []
  const reachable = collectRouteOwnedReachableGraph(
    new Map(syntheticChunks.map((chunk) => [chunk.fileName, chunk])),
    ["entry.js", "route.js"],
    errors,
    "entry.js",
    new Set(["route.js", "sibling-route.js"]),
  )

  if (errors.length > 0) {
    throw new Error(
      `route-owned traversal self-check reported graph errors: ${errors.join("; ")}`,
    )
  }

  if (reachable.some((chunk) => chunk.fileName === "sibling-route.js")) {
    throw new Error(
      "route-owned traversal self-check crossed an actual-entry-to-recognized-route-entry dynamic boundary",
    )
  }

  if (!reachable.some((chunk) => hasModule(chunk, "/src/pages/AboutPage.tsx"))) {
    throw new Error(
      "route-owned traversal self-check did not follow a non-route entry dynamic edge through the two-dynamic-plus-final-static path to a page module",
    )
  }
}

function withinBudget(route, gzipBytes) {
  return route.inclusive
    ? gzipBytes <= route.gzipBudget
    : gzipBytes < route.gzipBudget
}

async function verifyBundle() {
  verifyRouteOwnedTraversal()

  const result = await build({
    logLevel: "silent",
    build: { write: false },
  })
  const outputs = Array.isArray(result) ? result : [result]
  const chunks = outputs.flatMap(({ output }) => output).filter((item) => item.type === "chunk")
  const chunkByFileName = new Map(chunks.map((chunk) => [chunk.fileName, chunk]))
  const entryChunks = chunks.filter((chunk) => chunk.isEntry)
  const errors = []

  if (entryChunks.length !== 1) {
    errors.push(`expected exactly one entry chunk, found ${entryChunks.length}`)
  }

  const entry = entryChunks[0]
  if (!entry) return errors

  const entryClosure = collectStaticClosure(chunkByFileName, [entry.fileName], errors)
  const entryPages = routes.filter((route) =>
    entryClosure.some((chunk) => hasModule(chunk, route.module)),
  )
  if (entryPages.length > 0) {
    errors.push(
      `static entry closure contains route modules: ${entryPages.map((route) => route.name).join(", ")}`,
    )
  }

  const routeChunks = new Map()
  for (const route of routes) {
    const matches = chunks.filter((chunk) => chunk.isDynamicEntry && hasModule(chunk, route.module))
    if (matches.length !== 1) {
      errors.push(`expected one dynamic entry for ${route.name}, found ${matches.length}`)
      continue
    }
    routeChunks.set(route.name, matches[0])
  }

  const distinctRouteChunks = new Set([...routeChunks.values()].map((chunk) => chunk.fileName))
  if (routeChunks.size === routes.length && distinctRouteChunks.size !== routes.length) {
    errors.push(`expected four distinct route entries, found ${distinctRouteChunks.size}`)
  }

  const entryMeasurement = measureChunks(entryClosure)
  console.log(`Entry: ${entryMeasurement.raw} raw / ${entryMeasurement.gzip} gzip bytes`)
  if (entryMeasurement.raw > entryRawBudget) {
    errors.push(
      `static entry closure is ${entryMeasurement.raw} raw bytes; expected at most ${entryRawBudget}`,
    )
  }

  for (const route of routes) {
    const routeChunk = routeChunks.get(route.name)
    if (!routeChunk) continue

    const routeOwnedGraph = collectRouteOwnedReachableGraph(
      chunkByFileName,
      [...entryClosure.map((chunk) => chunk.fileName), routeChunk.fileName],
      errors,
      entry.fileName,
      distinctRouteChunks,
    )
    const combinedGraph = mergeChunks(entryClosure, routeOwnedGraph)
    const measurement = measureChunks(combinedGraph)
    console.log(`${route.name}: ${measurement.raw} raw / ${measurement.gzip} gzip bytes`)

    const otherPages = routes.filter(
      (candidate) => candidate.name !== route.name
        && routeOwnedGraph.some((chunk) => hasModule(chunk, candidate.module)),
    )
    if (otherPages.length > 0) {
      errors.push(
        `${route.name} route-owned reachable graph contains other route modules: ${otherPages.map((candidate) => candidate.name).join(", ")}`,
      )
    }

    if (measurement.raw >= routeRawBudget) {
      errors.push(
        `${route.name} combined reachable graph is ${measurement.raw} raw bytes; expected less than ${routeRawBudget}`,
      )
    }

    if (!withinBudget(route, measurement.gzip)) {
      const comparison = route.inclusive ? "at most" : "less than"
      errors.push(
        `${route.name} combined reachable graph is ${measurement.gzip} gzip bytes; expected ${comparison} ${route.gzipBudget}`,
      )
    }
  }

  return errors
}

try {
  const errors = await verifyBundle()
  if (errors.length > 0) {
    for (const error of errors) console.error(`Bundle contract error: ${error}`)
    process.exitCode = 1
  } else {
    console.log("route-local production chunks verified")
  }
} catch (error) {
  console.error(`Bundle verification failed: ${error instanceof Error ? error.message : error}`)
  process.exitCode = 1
}
