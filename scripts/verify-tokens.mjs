import { createServer } from "vite"
import {
  dialogueRoleDeclarationNames,
  dialogueStyleFixtures,
  verifyDialogueTokenContract,
} from "./verify-dialogue-token-contract.mjs"
import {
  collectDeclarations,
  collectStrings,
  findObject,
  hasProperty,
  rejectFragments,
  requireDeclaration,
  requireNestedReference,
  verifyStyle,
} from "./verify-token-helpers.mjs"
import {
  createTypographyFixtures,
  surfaceExpectations,
} from "./verify-token-fixtures.mjs"

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
  const linkRecipe = system.cva(system.getRecipe("link"))
  const escapedFragmentErrors = []
  rejectFragments(escapedFragmentErrors, "escaped fragment self-fixture", [
    "projectCard\\.control",
  ])
  if (escapedFragmentErrors.length === 0) {
    errors.push("escaped fragment self-fixture was not rejected")
  }

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
    "--chakra-colors-surface-modal",
    "--chakra-colors-border-inner",
    "--chakra-colors-accent-teal",
    "--chakra-colors-accent-teal-alpha-15",
    "--chakra-colors-accent-teal-alpha-40",
    "--chakra-colors-text-primary",
    "--chakra-colors-text-muted",
    "--chakra-colors-project-card-control",
    "--chakra-colors-project-card-chip",
    "--chakra-colors-project-card-divider",
    "--chakra-colors-project-card-chip-border",
    "--chakra-colors-gradient-panel-subtle",
    "--chakra-colors-gradient-panel-medium",
    "--chakra-colors-gradient-panel-strong",
    "--chakra-colors-gradient-project-card-primary",
    "--chakra-colors-gradient-page-title",
    "--chakra-colors-modal-depth-strong",
    "--chakra-colors-modal-depth-medium",
    "--chakra-colors-modal-edge",
    "--chakra-shadows-panel-subtle",
    "--chakra-shadows-panel-medium",
    "--chakra-shadows-panel-strong",
    "--chakra-shadows-avatar-frame",
    "--chakra-shadows-modal-content",
  ]

  for (const name of roleDeclarationNames) {
    requireDeclaration(errors, declarations, name)
  }
  verifyDialogueTokenContract(errors, declarations)
  const allRoleDeclarationNames = [
    ...roleDeclarationNames,
    ...dialogueRoleDeclarationNames,
  ]

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

  const roleDeclarations = allRoleDeclarationNames
    .map((name) => declarations[name])
    .filter((value) => typeof value === "string")
  rejectFragments(errors, "generated portfolio role declarations", roleDeclarations)

  const surfaceReferences = {
    "--chakra-colors-surface-shell": "--chakra-colors-bg-steel-alpha-80",
    "--chakra-colors-surface-content": "--chakra-colors-bg-steel-alpha-90",
    "--chakra-colors-surface-supporting": "--chakra-colors-bg-steel-alpha-60",
    "--chakra-colors-surface-selectable": "--chakra-colors-bg-steel-alpha-80",
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
    [
      "Link projectIcon recipe",
      linkRecipe({ variant: "projectIcon" }),
      ["var(--chakra-colors-project-card-control)"],
    ],
    [
      "Link projectAction recipe",
      linkRecipe({ variant: "projectAction" }),
      ["var(--chakra-colors-project-card-control)"],
    ],
    [
      "project card control",
      { background: "projectCard.control" },
      ["var(--chakra-colors-project-card-control)"],
    ],
    [
      "project card chip",
      { background: "projectCard.chip" },
      ["var(--chakra-colors-project-card-chip)"],
    ],
    [
      "project card divider",
      { borderColor: "projectCard.divider" },
      ["var(--chakra-colors-project-card-divider)"],
    ],
    [
      "project card chip border",
      { borderColor: "projectCard.chipBorder" },
      ["var(--chakra-colors-project-card-chip-border)"],
    ],
    [
      "project card primary gradient",
      { background: "gradient.projectCard.primary" },
      ["var(--chakra-colors-gradient-project-card-primary)"],
    ],
    ...dialogueStyleFixtures,
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

  for (const [label, style, expectedValues = []] of liveStyleFixtures) {
    const result = verifyStyle(errors, system, label, style, expectedValues)
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
      `Portfolio role token verification passed (${allRoleDeclarationNames.length} declarations, ${Object.keys(surfaceExpectations).length} surfaces, ${typographyFixtures.length} typography roles, ${verifiedCssValueCount} generated CSS values)`,
    )
  }
} finally {
  await loader.close()
}
