import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'

/**
 * Custom hook: triggers anime.js animation when element enters viewport.
 * @param {Object} opts - anime.js animation properties (targets excluded)
 * @param {number} threshold - IntersectionObserver threshold (0-1)
 */
export function useScrollReveal(opts = {}, threshold = 0.15) {
  const ref = useRef(null)
  const revealed = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Set initial hidden state
    el.style.opacity = '0'
    el.style.transform = opts.initialTransform || 'translateY(40px)'

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealed.current) {
          revealed.current = true
          animate(el, {
            opacity: [0, 1],
            translateY: [40, 0],
            ease: 'outCubic',
            duration: 800,
            ...opts,
          })
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

/**
 * Staggered reveal for a container's children.
 */
export function useStaggerReveal(opts = {}, threshold = 0.1) {
  const ref = useRef(null)
  const revealed = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = el.children
    for (let i = 0; i < children.length; i++) {
      children[i].style.opacity = '0'
      children[i].style.transform = 'translateY(30px)'
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealed.current) {
          revealed.current = true
          animate(Array.from(children), {
            opacity: [0, 1],
            translateY: [30, 0],
            ease: 'outCubic',
            duration: 700,
            delay: stagger(120),
            ...opts,
          })
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
