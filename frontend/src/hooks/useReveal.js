import { useEffect } from 'react'

export default function useReveal() {
  useEffect(() => {
    // IntersectionObserver — adds .visible when element enters viewport
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target) // stop watching once revealed
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    // Observe all currently existing .reveal elements
    const observe = () => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => io.observe(el))
    }

    observe()

    // MutationObserver — watches for NEW elements added to DOM (e.g. after data fetch)
    // This fixes the case where projects/skills/placements load after the hook runs
    const mo = new MutationObserver(() => observe())
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}
