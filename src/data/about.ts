import { type DialogueMessage } from "../hooks/useSimpleDialogue"

export interface AboutTopic {
  id: string
  label: string
  messages: DialogueMessage[]
}

export const aboutTopics: AboutTopic[] = [
  {
    id: "career",
    label: "Career",
    messages: [
      {
        message:
          "Career, huh? Everyone's got one, but yours sounds like it's been a few different ones. Where did it actually start?",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message:
          "In what feels like a former life, I spent over ten years living the chef's life—but I'll save those details for another time. After discovering coding lessons on freeCodeCamp, I decided to change direction. From that point on, every decision needed to move me closer to becoming a programmer.",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message:
          "From kitchens to code... quite the leap. What was the moment you knew it wasn't just a hobby anymore?",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message:
          "Passing my first major test on freeCodeCamp.org. I picked things up quickly, but then hit a roadblock—what now? How do I share? Who do I talk to? With no connections in the industry, I knew I had to break in. I enrolled in a full-stack bootcamp with one clear goal: make a friend.",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message:
          "Smart move. Sometimes one real connection beats a dozen certificates. Did that plan work out the way you hoped?",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message:
          "More than I could've imagined. The financial Hail-Mary paid off—I excelled in the course, made several connections, and built a great relationship with the instructor who became my first mentor in tech.",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message:
          "Sounds like the right gamble. Every good story needs that first mentor moment. So what came after graduation—straight into the industry?",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message:
          "Things moved fast. I stayed on to assist at the program after graduation to reinforce my fundamentals and stay connected. Not long after, I met Parker from Decent Labs. A short client contract with them turned into a full-time role—and that's where my career really launched.",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message:
          "From chef to developer—quite the arc. Seems like every bold step paid off. Guess this is where the adventure really begins.",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
    ],
  },
  {
    id: "full-stack",
    label: "Full Stack",
    messages: [
      {
        message: "Full stack... what do you mean?",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message:
          "I mean I'm a full-stack developer—comfortable using any technology to get the job done. JavaScript, TypeScript, Python, Go, Solidity, backend or frontend—you name it, I'll figure it out.",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message: "Impressive confidence. But surely you favor one side over the other?",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message:
          "Hard to say. Most of my work has leaned frontend, but in the web3 space the frontend often *is* the backend. You end up working across the whole stack whether you mean to or not.",
        speaker: "David",
        image: "/images/avatar.png", 
      },
      {
        message:
          "Great! Being able to tackle problems without being limited by technology is essential. Just don't forget—the foundations of programming always matter.",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message: "Agreed.",
        speaker: "David",
        image: "/images/avatar.png",
      },
    ],
  },
  {
    id: "chef-life",
    label: "Chef Life",
    messages: [
      {
        message:
          "So, before the code—there were knives, heat, and a kitchen full of chaos. What kept you in that world for a decade?",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message:
          "The challenge. I started as a dishwasher in a pizza place but didn't stay there long before I was tossing dough like the best of them. From there I worked at bars, family restaurants, and mom-and-pops before moving up to AMC Fork & Screen—probably my favorite job. Restaurant plus movie theater? Hard to beat.",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message:
          "That sounds like trial by fire—and grease. What pushed you to keep climbing instead of burning out like most do in that industry?",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message:
          "Curiosity. I was never satisfied with 'that's how it's always been.' I loved finding ways to make things more efficient and prevent mistakes through preparation and organization. But that curiosity also revealed a truth—I cared more about the process than the food itself.",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message:
          "That's the mark of an engineer hiding in a chef's coat—caring more about systems than seasoning. So when did you know it was time to hang up the apron?",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message:
          "In a small, hot Pittsburgh kitchen. I wasn't happy. I wanted to code, to be part of a different culture. I found a data-entry job—anything to get me in front of a computer. Best decision I ever made. It gave me time to code on the side, sharpen my typing, and learn office culture. When we moved back to Georgia, I finally had the confidence to apply to the bootcamp.",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message:
          "From sauté pans to spreadsheets—that's quite the pivot. Sounds like that data-entry job was the bridge that turned frustration into momentum.",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
    ],
  },
  {
    id: "odin",
    label: "Odin",
    messages: [
      {
        message: "Oh, you want to talk about Odin? You mean the goodest developer assistant?",
        speaker: "Wife",
        image: "/images/narrator.png",
      },
      {
        message: "100% I will always talk about our 95lb Moose.",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message:
          "Ninety-five pounds of pure drama. You'd think he was coding your site himself with how serious he gets about attention.",
        speaker: "Wife",
        image: "/images/narrator.png",
      },
      {
        message: "Arf! Woof!",
        speaker: "Odin",
        image: "/images/narrator.png",
      },
      {
        message: "Like that.",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message: "Exactly.",
        speaker: "Wife",
        image: "/images/narrator.png",
      },
    ],
  },
  {
    id: "my-family",
    label: "My Family",
    messages: [
      {
        message: "So let's talk family...",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message: "...How about I help out with this one?",
        speaker: "Wife",
        image: "/images/narrator.png",
      },
      {
        message: "By all means...",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message: "We are Married!",
        speaker: "Wife",
        image: "/images/narrator.png",
      },
      {
        message: "We sure are! Locked down since 2019!",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message: "We have been together a lot longer than that!",
        speaker: "Wife",
        image: "/images/narrator.png",
      },
      {
        message: "You are right 2012 was when we met! and here we are still going strong!",
        speaker: "David",
        image: "/images/narrator.png",
      },
      {
        message: "Arf! Woof!",
        speaker: "Odin",
        image: "/images/narrator.png",
      },
      {
        message: "Odin is right!",
        speaker: "Wife",
        image: "/images/narrator.png",
      },
    ],
  },
  // {
  //   id: "ai",
  //   label: "AI",
  //   messages: [],
  // },
  // {
  //   id: "crypto",
  //   label: "Crypto",
  //   messages: [],
  // },
  // {
  //   id: "buidl",
  //   label: "BUIDL",
  //   messages: [],
  // },
  // {
  //   id: "tools",
  //   label: "Tools",
  //   messages: [],
  // },
  // {
  //   id: "curiosity",
  //   label: "Curiosity",
  //   messages: [],
  // },
]
