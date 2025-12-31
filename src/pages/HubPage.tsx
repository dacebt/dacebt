import { useEffect } from "react"
import { Box } from "@chakra-ui/react"
import HomeSection from "../sections/HomeSection"
import ProjectsSection from "../sections/ProjectsSection"
import AboutSection from "../sections/AboutSection"
import ContactSection from "../sections/ContactSection"
import SectionDock from "../components/SectionDock"
import { useNavMode } from "../hooks/useNavMode"
import type { SectionId } from "../contexts/navModeContext"

const SECTION_IDS: SectionId[] = ["section-home", "section-projects", "section-about", "section-contact"]

export default function HubPage() {
  const { setMode, setActiveId, registerScrollHandler } = useNavMode()

  useEffect(() => {
    setMode("section")

    return () => {
      setMode("route")
      setActiveId(undefined)
    }
  }, [setMode, setActiveId])

  useEffect(() => {
    const scrollToSection = (id: SectionId) => {
      const element = document.getElementById(id)
      if (element) {
        const dockHeight = 60 // Approximate height of sticky dock
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - dockHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }

    return registerScrollHandler(scrollToSection)
  }, [registerScrollHandler])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTION_IDS.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              setActiveId(sectionId)
            }
          })
        },
        {
          threshold: [0.5],
          rootMargin: "-20% 0px -20% 0px",
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [setActiveId])

  return (
    <Box px={{ base: 0, md: 4 }} py={0}>
      <SectionDock />
      <Box>
        <HomeSection />
        <Box
          borderTop="1px solid"
          borderColor="border.inner"
          bgGradient="linear-gradient(to bottom, transparent 0%, var(--chakra-colors-border-inner-alpha-20) 50%, transparent 100%)"
          h="1px"
          my={8}
        />
        <ProjectsSection includeTitle={true} />
        <Box
          borderTop="1px solid"
          borderColor="border.inner"
          bgGradient="linear-gradient(to bottom, transparent 0%, var(--chakra-colors-border-inner-alpha-20) 50%, transparent 100%)"
          h="1px"
          my={8}
        />
        <AboutSection includeTitle={true} />
        <Box
          borderTop="1px solid"
          borderColor="border.inner"
          bgGradient="linear-gradient(to bottom, transparent 0%, var(--chakra-colors-border-inner-alpha-20) 50%, transparent 100%)"
          h="1px"
          my={8}
        />
        <ContactSection includeTitle={true} />
      </Box>
    </Box>
  )
}

