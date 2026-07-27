import { createServer } from "vite"

function collectDeclarations(value, declarations = {}) {
  if (!value || typeof value !== "object") return declarations

  for (const [key, child] of Object.entries(value)) {
    if (key.startsWith("--chakra-") && typeof child === "string") {
      declarations[key] = child
      continue
    }
    collectDeclarations(child, declarations)
  }

  return declarations
}

function collectStrings(value, strings = []) {
  if (typeof value === "string") {
    strings.push(value)
    return strings
  }
  if (!value || typeof value !== "object") return strings

  for (const child of Object.values(value)) collectStrings(child, strings)
  return strings
}

function findObject(value, key) {
  if (!value || typeof value !== "object") return undefined
  if (Object.hasOwn(value, key)) return value[key]

  for (const child of Object.values(value)) {
    const found = findObject(child, key)
    if (found) return found
  }

  return undefined
}

function requireDeclaration(errors, declarations, name) {
  if (!Object.hasOwn(declarations, name)) {
    errors.push(`missing generated declaration ${name}`)
  }
}

function requireNestedReference(errors, declarations, name, reference) {
  const value = declarations[name] || ""
  if (!value.includes(`var(${reference})`)) {
    errors.push(`${name} does not contain nested Chakra variable ${reference}`)
  }
}

function rejectFragments(errors, label, values) {
  for (const value of values) {
    if (
      value.includes("{") ||
      value.includes("}") ||
      value.includes("colors.") ||
      value.includes("colors\\.") ||
      /\b(?:bg|border|accent|text|gradient|modal)\.[\w.-]+/.test(value)
    ) {
      errors.push(`${label} contains an unresolved token fragment: ${value}`)
    }
  }
}

const loader = await createServer({
  appType: "custom",
  logLevel: "silent",
  server: { middlewareMode: true },
})

try {
  const [
    themeModule,
    glassPanelModule,
    compactActionModule,
    modalShellModule,
  ] = await Promise.all([
    loader.ssrLoadModule("/src/theme/index.ts"),
    loader.ssrLoadModule("/src/components/ui/glass-panel-styles.ts"),
    loader.ssrLoadModule("/src/components/ui/compact-action-styles.ts"),
    loader.ssrLoadModule("/src/components/ui/modal-shell-styles.ts"),
  ])
  const system = themeModule.default || themeModule
  const errors = []

  const declarations = collectDeclarations(system.getTokenCss())
  const inspectDeclarationNames = [
    "--chakra-colors-bg-dark",
    "--chakra-colors-bg-dark-alpha-30",
    "--chakra-colors-bg-dark-alpha-80",
    "--chakra-colors-bg-steel-alpha-60",
    "--chakra-colors-bg-steel-alpha-80",
    "--chakra-colors-bg-steel-alpha-90",
    "--chakra-colors-bg-overlay-dark",
    "--chakra-colors-bg-modal-control",
    "--chakra-colors-border-inner",
    "--chakra-colors-accent-teal",
    "--chakra-colors-accent-teal-alpha-15",
    "--chakra-colors-text-primary",
    "--chakra-colors-text-muted",
    "--chakra-colors-gradient-panel-subtle",
    "--chakra-colors-gradient-panel-medium",
    "--chakra-colors-gradient-panel-strong",
    "--chakra-colors-modal-depth-strong",
    "--chakra-colors-modal-depth-medium",
    "--chakra-colors-modal-edge",
    "--chakra-shadows-panel-subtle",
    "--chakra-shadows-panel-medium",
    "--chakra-shadows-panel-strong",
    "--chakra-shadows-modal-content",
  ]

  for (const name of inspectDeclarationNames) {
    requireDeclaration(errors, declarations, name)
  }

  requireNestedReference(
    errors,
    declarations,
    "--chakra-colors-bg-overlay-dark",
    "--chakra-colors-bg-dark-alpha-80",
  )
  requireNestedReference(
    errors,
    declarations,
    "--chakra-colors-bg-modal-control",
    "--chakra-colors-bg-dark-alpha-30",
  )

  const inspectDeclarations = inspectDeclarationNames
    .map((name) => declarations[name])
    .filter((value) => typeof value === "string")
  rejectFragments(errors, "generated Inspect declarations", inspectDeclarations)

  const modalReferences = [
    "--chakra-colors-modal-depth-strong",
    "--chakra-colors-modal-depth-medium",
    "--chakra-colors-accent-teal-alpha-15",
    "--chakra-colors-modal-edge",
  ]

  for (const name of modalReferences) {
    requireNestedReference(
      errors,
      declarations,
      "--chakra-shadows-modal-content",
      name,
    )
  }

  const liveInspectStyles = [
    glassPanelModule.glassPanelStyles.base,
    ...Object.values(glassPanelModule.glassPanelStyles.elevation),
    glassPanelModule.glassPanelStyles.before,
    glassPanelModule.glassPanelStyles.corner,
    compactActionModule.compactActionStyles,
    ...Object.values(modalShellModule.modalShellStyles),
  ]
  const inspectCss = liveInspectStyles.map((style) => system.css(style))
  const inspectCssValues = inspectCss.flatMap((value) => collectStrings(value))
  rejectFragments(errors, "system.css Inspect output", inspectCssValues)

  for (const name of [
    "--chakra-colors-gradient-panel-subtle",
    "--chakra-colors-gradient-panel-medium",
    "--chakra-colors-gradient-panel-strong",
    "--chakra-colors-bg-overlay-dark",
    "--chakra-colors-bg-modal-control",
    "--chakra-shadows-modal-content",
  ]) {
    if (!inspectCssValues.includes(`var(${name})`)) {
      errors.push(`system.css did not resolve Inspect role to var(${name})`)
    }
  }

  const globalBody = findObject(system.getGlobalCss(), "&html, &body")
  if (globalBody?.background !== "var(--chakra-colors-bg-dark)") {
    errors.push(
      `global html/body background did not resolve through bg.dark: ${String(globalBody?.background)}`,
    )
  }
  rejectFragments(errors, "global Inspect output", collectStrings(globalBody))

  if (errors.length > 0) {
    console.error("Inspect token verification failed:")
    for (const error of errors) console.error(`- ${error}`)
    process.exitCode = 1
  } else {
    console.log(
      `Inspect token verification passed (${inspectDeclarationNames.length} declarations, ${inspectCssValues.length} generated CSS values)`,
    )
  }
} finally {
  await loader.close()
}
