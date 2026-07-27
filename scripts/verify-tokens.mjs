import { createServer } from "vite"
import {
  createTypographyFixtures,
  surfaceExpectations,
} from "./verify-token-fixtures.mjs"

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
      /\b(?:bg|border|accent|text|gradient|modal|surface)\.[\w.-]+/.test(value)
    ) {
      errors.push(`${label} contains an unresolved token fragment: ${value}`)
    }
  }
}

function hasProperty(value, key) {
  if (!value || typeof value !== "object") return false
  if (Object.hasOwn(value, key)) return true

  return Object.values(value).some((child) => hasProperty(child, key))
}

function verifyStyle(errors, system, label, style, expectedValues = []) {
  const css = system.css(style)
  const values = collectStrings(css)
  rejectFragments(errors, label, values)

  for (const expected of expectedValues) {
    if (!values.includes(expected)) {
      errors.push(`${label} did not resolve expected CSS value ${expected}`)
    }
  }

  return { css, values }
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
    selectablePanelModule,
    pageLayoutModule,
  ] = await Promise.all([
    loader.ssrLoadModule("/src/theme/index.ts"),
    loader.ssrLoadModule("/src/components/ui/glass-panel-styles.ts"),
    loader.ssrLoadModule("/src/components/ui/compact-action-styles.ts"),
    loader.ssrLoadModule("/src/components/ui/modal-shell-styles.ts"),
    loader.ssrLoadModule("/src/components/ui/selectable-panel-styles.ts"),
    loader.ssrLoadModule("/src/components/page-layout-styles.ts"),
  ])
  const system = themeModule.default || themeModule
  const errors = []

  const declarations = collectDeclarations(system.getTokenCss())
  const roleDeclarationNames = [
    "--chakra-colors-bg-dark",
    "--chakra-colors-bg-dark-alpha-30",
    "--chakra-colors-bg-dark-alpha-80",
    "--chakra-colors-bg-steel-alpha-60",
    "--chakra-colors-bg-steel-alpha-80",
    "--chakra-colors-bg-steel-alpha-90",
    "--chakra-colors-bg-overlay-dark",
    "--chakra-colors-bg-modal-control",
    "--chakra-colors-surface-shell",
    "--chakra-colors-surface-content",
    "--chakra-colors-surface-supporting",
    "--chakra-colors-surface-selectable",
    "--chakra-colors-surface-dialogue",
    "--chakra-colors-surface-modal",
    "--chakra-colors-border-inner",
    "--chakra-colors-accent-teal",
    "--chakra-colors-accent-teal-alpha-15",
    "--chakra-colors-accent-teal-alpha-40",
    "--chakra-colors-text-primary",
    "--chakra-colors-text-muted",
    "--chakra-colors-gradient-panel-subtle",
    "--chakra-colors-gradient-panel-medium",
    "--chakra-colors-gradient-panel-strong",
    "--chakra-colors-gradient-page-title",
    "--chakra-colors-modal-depth-strong",
    "--chakra-colors-modal-depth-medium",
    "--chakra-colors-modal-edge",
    "--chakra-shadows-panel-subtle",
    "--chakra-shadows-panel-medium",
    "--chakra-shadows-panel-strong",
    "--chakra-shadows-dialogue-text",
    "--chakra-shadows-avatar-frame",
    "--chakra-shadows-modal-content",
  ]

  for (const name of roleDeclarationNames) {
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

  const roleDeclarations = roleDeclarationNames
    .map((name) => declarations[name])
    .filter((value) => typeof value === "string")
  rejectFragments(errors, "generated portfolio role declarations", roleDeclarations)

  const surfaceReferences = {
    "--chakra-colors-surface-shell": "--chakra-colors-bg-steel-alpha-80",
    "--chakra-colors-surface-content": "--chakra-colors-bg-steel-alpha-90",
    "--chakra-colors-surface-supporting": "--chakra-colors-bg-steel-alpha-60",
    "--chakra-colors-surface-selectable": "--chakra-colors-bg-steel-alpha-80",
    "--chakra-colors-surface-dialogue": "--chakra-colors-bg-steel-alpha-80",
    "--chakra-colors-surface-modal": "--chakra-colors-bg-steel-alpha-90",
  }

  for (const [surface, reference] of Object.entries(surfaceReferences)) {
    requireNestedReference(errors, declarations, surface, reference)
  }

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

  for (const reference of [
    "--chakra-colors-bg-dark-alpha-80",
    "--chakra-colors-accent-green-alpha-30",
  ]) {
    requireNestedReference(
      errors,
      declarations,
      "--chakra-shadows-dialogue-text",
      reference,
    )
  }

  let verifiedCssValueCount = 0

  for (const [surface, expectedValues] of Object.entries(surfaceExpectations)) {
    const result = verifyStyle(
      errors,
      system,
      `GlassPanel ${surface} surface`,
      glassPanelModule.glassPanelStyles.surface[surface],
      expectedValues,
    )
    verifiedCssValueCount += result.values.length
  }

  const liveStyleFixtures = [
    ["GlassPanel base", glassPanelModule.glassPanelStyles.base],
    ["GlassPanel overlay", glassPanelModule.glassPanelStyles.before],
    ["GlassPanel corner", glassPanelModule.glassPanelStyles.corner],
    ["compact action", compactActionModule.compactActionStyles],
    ...Object.entries(modalShellModule.modalShellStyles).map(
      ([name, style]) => [`modal ${name}`, style],
    ),
    ...Object.entries(selectablePanelModule.selectablePanelStyles)
      .filter(([name]) => name !== "label")
      .map(([name, style]) => [`selectable ${name}`, style]),
    ...Object.entries(pageLayoutModule.pageLayoutStyles)
      .filter(([name]) => name !== "title" && name !== "subtitle")
      .map(([name, style]) => [`page layout ${name}`, style]),
  ]

  for (const [label, style] of liveStyleFixtures) {
    const result = verifyStyle(errors, system, label, style)
    verifiedCssValueCount += result.values.length
  }

  const typographyFixtures = createTypographyFixtures({
    compactActionStyles: compactActionModule.compactActionStyles,
    modalShellStyles: modalShellModule.modalShellStyles,
    pageLayoutStyles: pageLayoutModule.pageLayoutStyles,
    selectablePanelStyles: selectablePanelModule.selectablePanelStyles,
  })

  for (const [name, style, expectedProperties, expectedValues = []] of typographyFixtures) {
    const result = verifyStyle(
      errors,
      system,
      `typography ${name}`,
      style,
      expectedValues,
    )
    verifiedCssValueCount += result.values.length

    if (hasProperty(result.css, "textStyle")) {
      errors.push(`typography ${name} retained an unresolved textStyle property`)
    }
    for (const property of expectedProperties) {
      if (!hasProperty(result.css, property)) {
        errors.push(`typography ${name} did not resolve ${property}`)
      }
    }
  }

  const globalBody = findObject(system.getGlobalCss(), "&html, &body")
  if (globalBody?.background !== "var(--chakra-colors-bg-dark)") {
    errors.push(
      `global html/body background did not resolve through bg.dark: ${String(globalBody?.background)}`,
    )
  }
  rejectFragments(errors, "global portfolio output", collectStrings(globalBody))

  if (errors.length > 0) {
    console.error("Portfolio role token verification failed:")
    for (const error of errors) console.error(`- ${error}`)
    process.exitCode = 1
  } else {
    console.log(
      `Portfolio role token verification passed (${roleDeclarationNames.length} declarations, ${Object.keys(surfaceExpectations).length} surfaces, ${typographyFixtures.length} typography roles, ${verifiedCssValueCount} generated CSS values)`,
    )
  }
} finally {
  await loader.close()
}
