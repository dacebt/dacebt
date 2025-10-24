import React, { useEffect, useRef } from "react"
import { Box } from "@chakra-ui/react"
import DialogueBox from "./DialogueBox"
import { type DialogueMessage } from "../hooks/useSimpleDialogue"

interface StackedDialogueBoxProps {
  messages: DialogueMessage[]
  hasMore?: boolean
  onClick?: () => void
  variant?: "home" | "modal"
}

const StackedDialogueBox = React.forwardRef<HTMLDivElement, StackedDialogueBoxProps>(
  (
    {
      messages,
      hasMore = true,
      onClick,
      variant = "home",
    },
    ref
  ) => {
    const scrollRef = useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom when new messages are added
    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    }, [messages.length])

    return (
      <Box
        ref={ref}
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        height="100%"
        overflow="hidden"
      >
        <Box
          ref={scrollRef}
          overflowY="auto"
          overflowX="hidden"
          pr={2}
          css={{
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(16, 185, 129, 0.3)",
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "rgba(16, 185, 129, 0.5)",
            },
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            gap={6}
            pt={4}
            pb={4}
          >
            {messages.map((message, index) => {
              const isLatest = index === messages.length - 1
              return (
                <DialogueBox
                  key={`${message.speaker}-${index}`}
                  variant={variant}
                  content={message.message}
                  speaker={message.speaker}
                  speakerImage={message.image}
                  hasMore={isLatest ? hasMore : false}
                  onClick={isLatest ? onClick : undefined}
                />
              )
            })}
          </Box>
        </Box>
      </Box>
    )
  }
)

StackedDialogueBox.displayName = "StackedDialogueBox"

export default StackedDialogueBox
