import { Box } from "@chakra-ui/react"

const boltStyle = {
  w: "12px",
  h: "12px",
  borderRadius: "50%",
  bg: "linear-gradient(135deg, white.alpha.30 0%, accent.teal 30%, border.inner 70%, black.alpha.30 100%)",
  boxShadow: "inset 0 1px 2px white.alpha.40, inset 0 -1px 2px black.alpha.60, 0 2px 4px black.alpha.30, 0 0 0 1px black.alpha.20",
  _before: {
    content: '""',
    position: "absolute",
    top: "2px",
    left: "2px",
    w: "8px",
    h: "8px",
    borderRadius: "50%",
    bg: "linear-gradient(135deg, white.alpha.20 0%, transparent 50%)",
  },
}

const cornerPositions = [
  { top: "12px", left: "12px" },
  { top: "12px", right: "12px" },
  { bottom: "12px", left: "12px" },
  { bottom: "12px", right: "12px" },
]

export default function InterfaceFrameBolts() {
  return (
    <>
      {cornerPositions.map((position, i) => (
        <Box key={i} position="absolute" {...position} {...boltStyle} />
      ))}
    </>
  )
}
