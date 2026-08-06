import { lstat, mkdtemp, readdir, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { build } from "vite"

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const removedAssets = [
  "images/github-breakout.gif",
  "images/home_screenshot.png",
  "images/logo_unsized.png",
]

async function pathExists(path) {
  try {
    await lstat(path)
    return true
  } catch (error) {
    if (error && typeof error === "object" && error.code === "ENOENT") return false
    throw error
  }
}

async function measureDirectory(path) {
  let totalBytes = 0

  for (const entry of await readdir(path, { withFileTypes: true })) {
    const entryPath = join(path, entry.name)

    if (entry.isDirectory()) {
      totalBytes += await measureDirectory(entryPath)
      continue
    }

    if (!entry.isFile()) {
      throw new Error(`production output contains unsupported entry ${entryPath}`)
    }

    totalBytes += (await lstat(entryPath)).size
  }

  return totalBytes
}

async function verifyDeploymentAssets(outputDirectory) {
  const presentSourceAssets = []
  for (const relativePath of removedAssets) {
    if (await pathExists(join(projectRoot, "public", relativePath))) {
      presentSourceAssets.push(`public/${relativePath}`)
    }
  }

  if (presentSourceAssets.length > 0) {
    throw new Error(`removed source assets are present: ${presentSourceAssets.join(", ")}`)
  }

  await build({
    root: projectRoot,
    logLevel: "silent",
    build: {
      outDir: outputDirectory,
      emptyOutDir: true,
    },
  })

  const presentOutputAssets = []
  for (const relativePath of removedAssets) {
    if (await pathExists(join(outputDirectory, relativePath))) {
      presentOutputAssets.push(relativePath)
    }
  }

  if (presentOutputAssets.length > 0) {
    throw new Error(`removed production assets are present: ${presentOutputAssets.join(", ")}`)
  }

  return measureDirectory(outputDirectory)
}

let outputDirectory
let outputBytes
let failure

try {
  outputDirectory = await mkdtemp(join(tmpdir(), "portfolio-deployment-assets-"))
  outputBytes = await verifyDeploymentAssets(outputDirectory)
} catch (error) {
  failure = error
} finally {
  if (outputDirectory) {
    try {
      await rm(outputDirectory, { recursive: true, force: true })
    } catch (error) {
      failure = failure
        ? new AggregateError([failure, error], "verification and temporary-output cleanup failed")
        : error
    }
  }
}

if (failure) {
  console.error(
    `Deployment asset verification failed: ${failure instanceof Error ? failure.message : failure}`,
  )
  process.exitCode = 1
} else {
  console.log(`Production output: ${outputBytes} bytes`)
  console.log("deployment asset hygiene verified")
}
