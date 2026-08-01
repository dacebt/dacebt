import {
  requireDeclaration,
  requireNestedReference,
  requireResolvedValue,
} from "./verify-token-helpers.mjs"

export const dialogueRoleDeclarationNames = [
  "--chakra-colors-dialogue-entry-surface-default",
  "--chakra-colors-dialogue-entry-surface-current",
  "--chakra-colors-dialogue-entry-depth-default",
  "--chakra-colors-dialogue-entry-depth-current",
  "--chakra-colors-dialogue-entry-edge",
  "--chakra-shadows-dialogue-entry-default",
  "--chakra-shadows-dialogue-entry-current",
]

export const dialogueStyleFixtures = [
  [
    "dialogue entry default",
    {
      background: "dialogueEntry.surface.default",
      boxShadow: "dialogueEntry.default",
    },
    [
      "var(--chakra-colors-dialogue-entry-surface-default)",
      "var(--chakra-shadows-dialogue-entry-default)",
    ],
  ],
  [
    "dialogue entry current",
    {
      background: "dialogueEntry.surface.current",
      boxShadow: "dialogueEntry.current",
    },
    [
      "var(--chakra-colors-dialogue-entry-surface-current)",
      "var(--chakra-shadows-dialogue-entry-current)",
    ],
  ],
]

export function verifyDialogueTokenContract(errors, declarations) {
  for (const name of dialogueRoleDeclarationNames) {
    requireDeclaration(errors, declarations, name)
  }

  const surfaceReferences = {
    "--chakra-colors-dialogue-entry-surface-default": "--chakra-colors-bg-steel",
    "--chakra-colors-dialogue-entry-surface-current": "--chakra-colors-bg-steel-alpha-80",
  }

  for (const [surface, reference] of Object.entries(surfaceReferences)) {
    requireNestedReference(errors, declarations, surface, reference)
  }

  const resolvedValues = {
    "--chakra-colors-dialogue-entry-depth-default": "rgba(0, 0, 0, 0.2)",
    "--chakra-colors-dialogue-entry-depth-current": "rgba(0, 0, 0, 0.3)",
    "--chakra-colors-dialogue-entry-edge": "rgba(255, 255, 255, 0.05)",
  }

  for (const [name, expected] of Object.entries(resolvedValues)) {
    requireResolvedValue(errors, declarations, name, expected)
  }

  const shadowReferences = {
    "--chakra-shadows-dialogue-entry-default": [
      "--chakra-colors-dialogue-entry-depth-default",
      "--chakra-colors-dialogue-entry-edge",
    ],
    "--chakra-shadows-dialogue-entry-current": [
      "--chakra-colors-dialogue-entry-depth-current",
      "--chakra-colors-accent-teal-alpha-8",
      "--chakra-colors-dialogue-entry-edge",
    ],
  }

  for (const [shadow, references] of Object.entries(shadowReferences)) {
    for (const reference of references) {
      requireNestedReference(errors, declarations, shadow, reference)
    }
  }
}
