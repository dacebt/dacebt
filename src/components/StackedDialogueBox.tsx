import React, { useEffect, useRef } from "react"
import { Box, type BoxProps } from "@chakra-ui/react"
import DialogueBox from "./DialogueBox"
import { type DialogueMessage } from "../hooks/useSimpleDialogue"

interface StackedDialogueBoxProps extends Omit<BoxProps, "position"> {
  messages: DialogueMessage[]
  hasMore?: boolean
  onClick?: () => void
  position?: { top?: string; bottom?: string; left?: string; right?: string }
  cssPosition?: "absolute" | "relative" | "static"
  variant?: "home" | "modal"
}

const StackedDialogueBox = React.forwardRef<HTMLDivElement, StackedDialogueBoxProps>(
  (
    {
      messages,
      hasMore = true,
      onClick,
      position,
      cssPosition = "absolute",
      variant = "home",
      ...props
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

    const defaultPosition = {
      bottom: "0px",
      left: "0px",
      right: "0px",
    }

    const finalPosition = cssPosition === "absolute" ? { ...defaultPosition, ...position } : {}

    return (
      <Box
        ref={ref}
        position={cssPosition}
        {...finalPosition}
        {...props}
      >
        <Box
          ref={scrollRef}
          maxH={variant === "modal" ? "60vh" : "40vh"}
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
                  imagePosition={message.imagePosition}
                  hasMore={isLatest ? hasMore : false}
                  onClick={isLatest ? onClick : undefined}
                  cssPosition="relative"
                  w="100%"
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
