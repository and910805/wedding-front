import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function FallingPetals() {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    const container = document.createElement('div')
    container.className = 'fixed inset-0 overflow-hidden pointer-events-none z-[1]'
    document.body.appendChild(container)

    const mobileQuery = window.matchMedia('(max-width: 640px)')
    const spawnInterval = mobileQuery.matches ? 900 : 450

    let intervalId
    const scheduleId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        const petal = document.createElement('div')
        petal.className = 'absolute w-4 h-4 rounded-full bg-rose-200/80 blur-sm animate-fall'
        petal.style.left = `${Math.random() * 100}vw`
        petal.style.animationDuration = `${6 + Math.random() * 5}s`
        petal.style.willChange = 'transform, opacity'
        container.appendChild(petal)
        window.setTimeout(() => petal.remove(), 10000)
      }, spawnInterval)
    }, 300)

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId)
      }
      window.clearTimeout(scheduleId)
      container.remove()
    }
  }, [prefersReducedMotion])

  return null
}
