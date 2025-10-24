import { Dialog, Portal, Button, CloseButton, Box } from "@chakra-ui/react"
import StackedDialogueBox from "./StackedDialogueBox"
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
    visibleMessages,
    visibleCount,
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
            maxW="800px"
            w="90vw"
            h="calc(100vh - 4rem)"
            m="2rem auto"
            p={6}
            bg="transparent"
            border="none"
            boxShadow="none"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-end"
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
              Message {visibleCount} of {totalMessages}
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
            <Box w="100%" maxW="700px" maxH="calc(100vh - 12rem)" display="flex" flexDirection="column" justifyContent="flex-end">
              <StackedDialogueBox
                variant="modal"
                messages={visibleMessages}
                hasMore={hasMore}
                onClick={handleContentClick}
              />
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
