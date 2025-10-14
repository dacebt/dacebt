import { Dialog, Portal, Box, Button, CloseButton } from "@chakra-ui/react"
import DialogueBox from "./DialogueBox"
import { useDialogue, type DialogueMessage } from "../hooks/useDialogue"

interface ModalDialogueProps {
  isOpen: boolean
  onClose: () => void
  messages: DialogueMessage[]
  title?: string
}

export default function ModalDialogue({ isOpen, onClose, messages }: ModalDialogueProps) {
  const { currentText, currentMessage, hasMore, isComplete, isTyping, handleClick } = useDialogue({
    messages,
    speed: 1,
    tickRate: 40,
    useGlobalInteraction: false, // We'll handle clicks manually
  })

  const handleDialogueClick = () => {
    if (isTyping || hasMore) {
      // If typing or more messages, advance the dialogue
      handleClick()
    } else {
      // If dialogue is complete, clicking closes the modal
      onClose()
    }
  }

  const handleModalClick = () => {
    // Clicking anywhere in the modal advances the dialogue
    handleDialogueClick()
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={() => handleClose()}>
      <Portal>
        <Dialog.Backdrop
          bg="blackAlpha.600"
          backdropFilter="blur(10px)"
          transition="all 0.2s ease"
        />
        <Dialog.Positioner>
          <Dialog.Content
            w="100%"
            maxW="1200px"
            h="calc(100vh - 4rem)"
            m="2rem"
            p="0"
            bg="transparent"
            border="none"
            borderRadius="0"
            boxShadow="none"
            position="relative"
            display="flex"
            flexDirection="column"
            overflow="hidden"
            onClick={handleModalClick}
          >
            {/* Close button - always visible */}
            <Dialog.CloseTrigger asChild>
              <CloseButton
                color="text.muted"
                position="absolute"
                top={6}
                right={6}
                zIndex={10}
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

            {/* App-sized dialogue */}
            <Dialog.Body
              p={6}
              position="relative"
              zIndex={1}
              flex="1"
              w="100%"
              h="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <DialogueBox
                content={currentText}
                speaker={currentMessage.speaker}
                speakerImage={currentMessage.image}
                imagePosition={currentMessage.imagePosition}
                hasMore={hasMore}
                onClick={handleDialogueClick}
                cssPosition="relative"
                w="100%"
              />
            </Dialog.Body>

            {/* Close button at bottom - appears when dialogue is complete */}
            {isComplete && (
              <Box
                position="absolute"
                bottom={6}
                left="50%"
                transform="translateX(-50%)"
                zIndex={10}
              >
                <Button
                  onClick={handleClose}
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
              </Box>
            )}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
