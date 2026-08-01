export const surfaceExpectations = {
  shell: [
    "var(--chakra-colors-surface-shell)",
    "var(--chakra-colors-gradient-panel-medium)",
    "var(--chakra-shadows-panel-medium)",
    "blur(10px)",
  ],
  content: [
    "var(--chakra-colors-surface-content)",
    "var(--chakra-colors-gradient-panel-strong)",
    "var(--chakra-shadows-panel-strong)",
    "blur(14px)",
  ],
  supporting: [
    "var(--chakra-colors-surface-supporting)",
    "var(--chakra-colors-gradient-panel-subtle)",
    "var(--chakra-shadows-panel-subtle)",
    "blur(6px)",
  ],
  selectable: [
    "var(--chakra-colors-surface-selectable)",
    "var(--chakra-colors-gradient-panel-medium)",
    "var(--chakra-shadows-panel-medium)",
    "blur(10px)",
  ],
  modal: [
    "var(--chakra-colors-surface-modal)",
    "var(--chakra-colors-gradient-panel-strong)",
    "var(--chakra-shadows-modal-content)",
    "var(--chakra-colors-accent-teal-alpha-40)",
    "2px solid",
    "blur(14px)",
  ],
}

export function createTypographyFixtures({
  compactActionStyles,
  modalShellStyles,
  pageLayoutStyles,
  selectablePanelStyles,
}) {
  return [
    [
      "pageTitle",
      pageLayoutStyles.title,
      ["fontSize", "fontWeight", "lineHeight"],
      ["var(--chakra-colors-gradient-page-title)"],
    ],
    ["pageSubtitle", pageLayoutStyles.subtitle, ["fontSize", "color", "lineHeight"]],
    ["panelTitle", { textStyle: "panelTitle" }, ["fontSize", "fontWeight", "lineHeight"]],
    ["supportingText", { textStyle: "supportingText" }, ["fontSize", "color", "lineHeight"]],
    [
      "projectCardEyebrow",
      { textStyle: "projectCardEyebrow" },
      ["fontSize", "fontWeight", "lineHeight", "letterSpacing", "textTransform"],
    ],
    [
      "projectCardTitle",
      { textStyle: "projectCardTitle" },
      ["fontSize", "fontWeight", "lineHeight", "letterSpacing"],
    ],
    [
      "projectCardSummary",
      { textStyle: "projectCardSummary" },
      ["fontSize", "fontWeight", "lineHeight", "color"],
    ],
    [
      "projectCardChip",
      { textStyle: "projectCardChip" },
      ["fontSize", "fontWeight", "lineHeight"],
    ],
    [
      "projectCardAction",
      { textStyle: "projectCardAction" },
      [
        "fontSize",
        "fontWeight",
        "lineHeight",
        "letterSpacing",
        "textTransform",
        "whiteSpace",
      ],
    ],
    ["selectableLabel", selectablePanelStyles.label, ["fontSize", "fontWeight", "textTransform"]],
    ["modalTitle", modalShellStyles.title, ["fontSize", "fontWeight", "lineHeight"]],
    ["sectionLabel", { textStyle: "sectionLabel" }, ["fontSize", "fontWeight", "textTransform"]],
    ["modalBody", { textStyle: "modalBody" }, ["fontSize", "fontWeight", "lineHeight"]],
    ["dialogue", { textStyle: "dialogue" }, ["fontSize", "fontWeight", "lineHeight"]],
    ["smallText", { textStyle: "smallText" }, ["fontSize", "lineHeight"]],
    ["smallTextMedium", { textStyle: "smallTextMedium" }, ["fontSize", "fontWeight"]],
    ["badgeText", compactActionStyles, ["fontSize", "fontWeight"]],
  ]
}
