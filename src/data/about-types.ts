import { type DialogueMessage } from "../hooks/useRPGDialogue"

export interface AboutTopic {
  id: string
  label: string
  messages: DialogueMessage[]
}
