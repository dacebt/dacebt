import { Dialog, Portal, Button, CloseButton, Text, Box } from "@chakra-ui/react"
import { useSimpleDialogue, type DialogueMessage } from "../hooks/useSimpleDialogue"
import { useEffect } from "react"

interface ConversationModalProps {
  isOpen: boolean
  onClose: () => void
  messages: DialogueMessage[]
  title?: string
}

export default function ConversationModal({ isOpen, onClose, messages }: ConversationModalProps) {
  const { 
    currentMessage, 
    currentIndex, 
    totalMessages, 
    hasMore, 
    isComplete, 
    handleClick, 
    skipToEnd 
  } = useSimpleDialogue({
    messages,
  })

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      } else if (event.key === " " || event.key === "Enter") {
        event.preventDefault()
        if (isComplete) {
          onClose()
        } else {
          handleClick()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, handleClick, isComplete])

  const handleContentClick = () => {
    if (isComplete) {
      onClose()
    } else {
      handleClick()
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Portal>
        <Dialog.Backdrop
          bg="blackAlpha.600"
          backdropFilter="blur(10px)"
          transition="all 0.2s ease"
        />
        <Dialog.Positioner>
          <Dialog.Content
            maxW="1200px"
            h="calc(100vh - 4rem)"
            m="2rem"
            p={6}
            bg="transparent"
            border="none"
            boxShadow="none"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            {/* Close button */}
            <Dialog.CloseTrigger asChild>
              <CloseButton
                color="text.muted"
                position="absolute"
                top={6}
                right={6}
                size="lg"
                bg="rgba(0, 0, 0, 0.5)"
                borderRadius="full"
                _hover={{
                  color: "text.primary",
                  bg: "rgba(91, 192, 190, 0.2)",
                }}
                border="1px solid"
                borderColor="border.inner"
              />
            </Dialog.CloseTrigger>

            {/* Progress indicator */}
            <Box
              position="absolute"
              top={6}
              left={6}
              color="text.muted"
              fontSize="sm"
              fontWeight="medium"
            >
              Message {currentIndex + 1} of {totalMessages}
            </Box>

            {/* Skip to End button */}
            {hasMore && (
              <Button
                position="absolute"
                top={6}
                left="50%"
                transform="translateX(-50%)"
                onClick={skipToEnd}
                size="sm"
                bg="rgba(91, 192, 190, 0.1)"
                color="text.primary"
                border="1px solid"
                borderColor="accent.teal"
                borderRadius="md"
                _hover={{
                  bg: "rgba(91, 192, 190, 0.2)",
                }}
              >
                Skip to End
              </Button>
            )}

            {/* Main dialogue content */}
            <Box
              bg="bg.dark"
              borderRadius="8px"
              p={8}
              minH="200px"
              w="100%"
              maxW="800px"
              display="flex"
              alignItems="center"
              gap={6}
              cursor="pointer"
              onClick={handleContentClick}
              transition="all 0.2s ease"
              _hover={{
                boxShadow: `
                  inset 0 0 0 2px rgba(255, 255, 255, 0.12),
                  inset 0 0 0 4px var(--chakra-colors-accent-green),
                  inset 0 0 0 6px var(--chakra-colors-border-outer),
                  0 0 0 2px var(--chakra-colors-accent-green),
                  0 4px 24px rgba(16, 185, 129, 0.3),
                  0 8px 40px rgba(0, 0, 0, 0.4)
                `,
              }}
              boxShadow={`
                inset 0 0 0 2px rgba(255, 255, 255, 0.08),
                inset 0 0 0 4px var(--chakra-colors-accent-green),
                inset 0 0 0 6px var(--chakra-colors-border-outer),
                0 0 0 2px var(--chakra-colors-accent-green),
                0 4px 20px rgba(16, 185, 129, 0.2),
                0 8px 40px rgba(0, 0, 0, 0.4)
              `}
              _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "8px",
                background: `linear-gradient(135deg, 
                  rgba(16, 185, 129, 0.05) 0%, 
                  transparent 30%, 
                  rgba(0, 0, 0, 0.3) 100%)`,
                pointerEvents: "none",
              }}
              position="relative"
            >
              {/* Speaker Label */}
              {currentMessage.speaker && (
                <Box
                  position="absolute"
                  top="-12px"
                  left="16px"
                  bg="bg.dark"
                  color="accent.green"
                  px={3}
                  py={1}
                  borderRadius="md"
                  fontSize="sm"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="0.5px"
                  border="1px solid"
                  borderColor="accent.green"
                  boxShadow="0 0 8px rgba(16, 185, 129, 0.3)"
                  zIndex={2}
                >
                  {currentMessage.speaker}
                </Box>
              )}

              {/* Speaker Avatar */}
              {currentMessage.image && (
                <Box
                  w="64px"
                  h="64px"
                  borderRadius="full"
                  bg="bg.steel"
                  border="2px solid"
                  borderColor="accent.green"
                  boxShadow="0 0 8px rgba(16, 185, 129, 0.3)"
                  flexShrink={0}
                  overflow="hidden"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <img
                    src={currentMessage.image}
                    alt={currentMessage.speaker || "Speaker"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </Box>
              )}

              {/* Message Content */}
              <Text
                color="text.primary"
                fontSize="2xl"
                fontWeight="medium"
                lineHeight="1.6"
                textShadow="0 0 12px rgba(16, 185, 129, 0.3)"
                position="relative"
                zIndex={1}
                flex={1}
              >
                {currentMessage.message}
              </Text>

              {/* Continue indicator */}
              {hasMore && (
                <Box
                  w="0"
                  h="0"
                  borderLeft="8px solid transparent"
                  borderRight="8px solid transparent"
                  borderTop="10px solid"
                  borderTopColor="accent.green"
                  opacity={0.8}
                  flexShrink={0}
                  animation="bounce 1.5s ease-in-out infinite"
                  transition="all 0.3s ease"
                />
              )}
            </Box>

            {/* Close button at bottom */}
            {isComplete && (
              <Button
                position="absolute"
                bottom={6}
                left="50%"
                transform="translateX(-50%)"
                onClick={onClose}
                bg="linear-gradient(135deg, rgba(91, 192, 190, 0.1) 0%, rgba(29, 33, 38, 0.8) 100%)"
                color="text.primary"
                border="1px solid"
                borderColor="accent.teal"
                borderRadius="lg"
                px={8}
                py={3}
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="0.5px"
                transition="all 0.3s ease"
                _hover={{
                  bg: "linear-gradient(135deg, rgba(91, 192, 190, 0.2) 0%, rgba(29, 33, 38, 0.9) 100%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(91, 192, 190, 0.3)",
                }}
                _active={{
                  transform: "translateY(0)",
                }}
              >
                Close
              </Button>
            )}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
