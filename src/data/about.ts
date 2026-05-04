import { type DialogueMessage } from "../hooks/useRPGDialogue"

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
        image: "/images/wife.png",
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
        image: "/images/wife.png",
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
        image: "/images/wife.png",
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
        image: "/images/wife.png",
      },
      {
        message: "By all means...",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message: "We are Married!",
        speaker: "Wife",
        image: "/images/wife.png",
      },
      {
        message: "We sure are! Locked down since 2019!",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message: "We have been together a lot longer than that!",
        speaker: "Wife",
        image: "/images/wife.png",
      },
      {
        message: "You are right 2012 was when we met! and here we are still going strong!",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message: "Arf! Woof!",
        speaker: "Odin",
        image: "/images/narrator.png",
      },
      {
        message: "Odin is right!",
        speaker: "Wife",
        image: "/images/wife.png",
      },
    ],
  },
  {
    id: "ai",
    label: "AI",
    messages: [
      {
        message:
          "AI—everyone's got an opinion these days. Where did yours start?",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message:
          "Right around when GPT-3.5 dropped. I was up late into the night asking it questions, trying to figure out how it could help with my actual work. It slowly replaced every Google search I would've made.",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message:
          "Late nights with a chatbot? Sounds more like obsession than curiosity.",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message:
          "Honestly, both. I'd been programming long enough to recognize when a tool was about to change the shape of the work. I just had to figure out *how*. So I kept poking at it until I understood what it was actually good at—and where it would lie to my face.",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message:
          "And once you figured that out? Straight into pasting AI code into real projects?",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message:
          "Plenty of hesitation at first—I'd read every line before it touched my code. But then AI showed up *in* the IDE with Windsurf and Cursor. That sold me. Honestly, I haven't written a line of code by hand since.",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message:
          "That's a bold claim. Doesn't it worry you—handing the keyboard over like that?",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message:
          "It would, if I were doing it the way social media tells you to. There's a whole crowd out there who don't know their own codebase anymore—just vibes and prompts. That's not me.",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message:
          "So how do you stay on the right side of that line?",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message:
          "By treating the workflow like a craft of its own. I started building custom skills and agents, walked through spec-driven development, and landed on a system I actually trust. Each step taught me what to demand from the next.",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message:
          "And the programming itself? Does any of the joy survive when the typing stops?",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message:
          "All of it. I still know my codebase line by line. I still take pride in what gets shipped. I just direct the work instead of typing it. It's still programming—it just looks different now.",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message:
          "All-in, but not asleep at the wheel. That's the part most people miss when they talk about this stuff.",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
    ],
  },
  {
    id: "crypto",
    label: "Crypto",
    messages: [
      {
        message:
          "Crypto. The word alone splits a room these days. How did you end up on the inside of it?",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message:
          "I fell into it. When I interviewed at Decent Labs they handed me a take-home—a small web3 application. I'd never touched the stuff before. Didn't even fully know what 'web3' meant.",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message:
          "And you said yes to that? Cold?",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message:
          "I figured it out. Threw something together that impressed the CTO enough to bring me onto the team. That's how it started—pure ignorance, just engineering my way through an unfamiliar problem.",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message:
          "And once you were inside? Did the technology grab you, or was it the money everyone was talking about?",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message:
          "The technology, completely. This was before the ERC-20 and NFT mania really took off. We were focused on the cool stuff—DAOs, moving businesses onchain, ZK proofs, account abstraction. Real engineering problems, not speculation. The speculation arrived anyway, and a lot of the actual interesting work got drowned out by people chasing the financial side.",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message:
          "So where do you stand on crypto today?",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message:
          "Mixed. There's still a ton of really cool technology behind the protocols, and motivated people doing the work that matters. But the money rarely lands where it should, and the space has become a mess of scammers and illegitimate actors. Hard to feel great about the whole picture.",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message:
          "Did any of that hit you personally, or just from a distance?",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message:
          "Personally. Decent went all-in as a DAO and I was getting paid in stablecoins. The complexity of operating that way wore me down more than I expected—every transaction a small project of its own. I needed a break.",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message:
          "And the break led you... where?",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
      {
        message:
          "To agentic systems, for now. I want to see what's actually there before circling back. I'm a full-stack engineer—I don't have to live in any one ecosystem. The good problems are the good problems wherever they are.",
        speaker: "David",
        image: "/images/avatar.png",
      },
      {
        message:
          "Sounds less like leaving and more like stepping back to see the shape of things. Probably the right move when a space gets that loud.",
        speaker: "Narrator",
        image: "/images/narrator.png",
      },
    ],
  },
  // {
  //   id: "curiosity",
  //   label: "Curiosity",
  //   messages: [],
  // },
]
