import { Dialog, Portal, Button, CloseButton } from "@chakra-ui/react"
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

  const handleContentClick = () => {
    if (isTyping || hasMore) {
      handleClick()
    } else {
      onClose()
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
            alignItems="center"
            justifyContent="center"
            onClick={handleContentClick}
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

            {/* Centered dialogue box */}
            <DialogueBox
              content={currentText}
              speaker={currentMessage.speaker}
              speakerImage={currentMessage.image}
              imagePosition={currentMessage.imagePosition}
              hasMore={hasMore}
            />

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
