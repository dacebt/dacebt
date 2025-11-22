import { Box, Portal } from "@chakra-ui/react"

interface ModalBaseProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl"
}

export default function ModalBase({
  isOpen,
  onClose,
  children,
  size = "md",
}: ModalBaseProps) {
  if (!isOpen) return null

  const sizeConfig = {
    sm: { maxW: "400px", maxH: "80vh" },
    md: { maxW: "600px", maxH: "80vh" },
    lg: { maxW: "800px", maxH: "80vh" },
    xl: { maxW: "1000px", maxH: "80vh" },
  }

  const config = sizeConfig[size]

  return (
    <Portal>
      {/* Overlay */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="black.alpha.80"
        zIndex={1000}
        onClick={onClose}
        animation="fadeIn 0.2s ease-out"
      />

      {/* Modal content */}
      <Box
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        bg="bg.steel"
        border="1px solid"
        borderColor="border.inner"
        borderRadius="lg"
        boxShadow={`
          0 20px 60px black.alpha.60,
          0 8px 25px black.alpha.40,
          inset 0 0 0 1px border.inner.glow
        `}
        maxW={config.maxW}
        maxH={config.maxH}
        w="90%"
        overflow="hidden"
        zIndex={1001}
        animation="slideIn 0.3s ease-out"
      >
        {children}
      </Box>
    </Portal>
  )
}
