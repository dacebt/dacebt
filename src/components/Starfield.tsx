import { useEffect, useRef } from "react"
import { Box } from "@chakra-ui/react"

interface Star {
  x: number
  y: number
  size: number
  baseOpacity: number
  twinkleSpeed: number
  twinkleOffset: number
  drift: number
  color: [number, number, number]
}

function createStars(width: number, height: number, count: number): Star[] {
  const stars: Star[] = []
  for (let i = 0; i < count; i++) {
    const depth = Math.random()
    const isTeal = Math.random() < 0.15
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 0.5 + depth * 2,
      baseOpacity: 0.15 + depth * 0.55,
      twinkleSpeed: 0.3 + Math.random() * 1.5,
      twinkleOffset: Math.random() * Math.PI * 2,
      drift: (0.05 + depth * 0.15) * (Math.random() > 0.5 ? 1 : -1),
      color: isTeal ? [91, 192, 190] : [200, 215, 230],
    })
  }
  return stars
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const density = Math.floor((canvas.width * canvas.height) / 4000)
      starsRef.current = createStars(canvas.width, canvas.height, Math.min(density, 300))
    }

    resize()
    window.addEventListener("resize", resize)

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const t = time / 1000

      for (const star of starsRef.current) {
        const twinkle = prefersReduced
          ? star.baseOpacity
          : star.baseOpacity * (0.5 + 0.5 * Math.sin(t * star.twinkleSpeed + star.twinkleOffset))

        const x = prefersReduced
          ? star.x
          : ((star.x + t * star.drift) % canvas.width + canvas.width) % canvas.width

        const [r, g, b] = star.color
        ctx.beginPath()
        ctx.arc(x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${twinkle})`
        ctx.fill()

        if (star.size > 1.5 && twinkle > 0.4) {
          ctx.beginPath()
          ctx.arc(x, star.y, star.size * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${twinkle * 0.12})`
          ctx.fill()
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      zIndex={0}
      pointerEvents="none"
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </Box>
  )
}
