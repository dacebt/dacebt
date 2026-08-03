import { professionalAboutTopics } from "./about-professional"
import { personalAboutTopics } from "./about-personal"
import { technologyAboutTopics } from "./about-technology"
import { type AboutTopic } from "./about-types"

export type { AboutTopic }

export const aboutTopics: AboutTopic[] = [
  ...professionalAboutTopics,
  ...personalAboutTopics,
  ...technologyAboutTopics,
  // {
  //   id: "curiosity",
  //   label: "Curiosity",
  //   messages: [],
  // },
]
