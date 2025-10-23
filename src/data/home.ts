import { type DialogueMessage } from "../hooks/useSimpleDialogue"

// TODO: Replace with actual speaker images when available
// Current speakers: narrator, you
export const welcomeMessages: DialogueMessage[] = [
  {
    message: "Welcome to my portfolio!",
    speaker: "David",
    image: "/images/avatar.png", // TODO: Replace with narrator.png
    imagePosition: "left",
  },
  {
    message: "I'm a software engineer with a passion for building great products.",
    speaker: "David",
    image: "/images/avatar.png", // TODO: Replace with you.png
    imagePosition: "right",
  },
  {
    message:
      "Please navigate to the projects page to see my work, or check out the contact page to get in touch!",
    speaker: "David",
    image: "/images/avatar.png", // TODO: Replace with narrator.png
    imagePosition: "left",
  },
]
