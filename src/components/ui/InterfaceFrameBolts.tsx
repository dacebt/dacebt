import { Box } from "@chakra-ui/react"

const boltStyle = {
  w: "12px",
  h: "12px",
  borderRadius: "50%",
  bg: "linear-gradient(135deg, var(--chakra-colors-white-alpha-30) 0%, var(--chakra-colors-accent-teal) 30%, var(--chakra-colors-border-inner) 70%, var(--chakra-colors-black-alpha-30) 100%)",
  boxShadow: "bolt.frame",
  _before: {
    content: '""',
    position: "absolute",
    top: "2px",
    left: "2px",
    w: "8px",
    h: "8px",
    borderRadius: "50%",
    bg: "linear-gradient(135deg, var(--chakra-colors-white-alpha-20) 0%, transparent 50%)",
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
