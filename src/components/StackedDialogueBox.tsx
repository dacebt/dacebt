import React, { useEffect, useRef } from "react"
import { Box } from "@chakra-ui/react"
import DialogueBox from "./DialogueBox"
import GlassPanel from "./ui/GlassPanel"
import { type DialogueMessage } from "../hooks/useSimpleDialogue"

interface StackedDialogueBoxProps {
  messages: DialogueMessage[]
  hasMore?: boolean
  onClick?: () => void
  variant?: "home" | "modal" | "dashboard"
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

    // Variant-based spacing: modal gets larger gaps for better visual separation
    const gap = variant === "modal" ? 10 : variant === "dashboard" ? 4 : 8
    const isDashboard = variant === "dashboard"

    const content = (
      <Box
        ref={scrollRef}
        overflowY="auto"
        overflowX="hidden"
        pr={isDashboard ? 0 : 2}
        css={{
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "white.alpha.5",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "accent.greenAlpha.30",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "accent.greenAlpha.50",
          },
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={gap}
          pt={isDashboard ? 3 : 4}
          pb={isDashboard ? 3 : 6}
          px={isDashboard ? 2 : 0}
        >
          {messages.map((message, index) => {
            const isLatest = index === messages.length - 1
            return (
              <DialogueBox
                key={`${message.speaker}-${index}`}
                content={message.message}
                speaker={message.speaker}
                speakerImage={message.image}
                hasMore={isLatest ? hasMore : false}
                onClick={isLatest ? onClick : undefined}
                enableStreaming={isLatest}
                variant={isDashboard ? "flat" : "default"}
              />
            )
          })}
        </Box>
      </Box>
    )

    if (isDashboard) {
      return (
        <GlassPanel
          ref={ref}
          role="surface"
          elevation="medium"
          p={4}
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          height="100%"
          overflow="hidden"
        >
          {content}
        </GlassPanel>
      )
    }

    return (
      <Box
        ref={ref}
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        height="100%"
        overflow="hidden"
      >
        {content}
      </Box>
    )
  }
)

StackedDialogueBox.displayName = "StackedDialogueBox"

export default StackedDialogueBox
