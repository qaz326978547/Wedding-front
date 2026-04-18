import type { Ref } from 'vue'

export function useGsap() {
  const { $gsap, $ScrollTrigger } = useNuxtApp()

  function animateFadeUp(
    targets: Ref<HTMLElement | null> | string,
    options: { delay?: number; stagger?: number; duration?: number } = {},
  ) {
    const el = typeof targets === 'string' ? targets : targets.value
    if (!el) return

    $gsap.from(el, {
      opacity: 0,
      y: 50,
      duration: options.duration ?? 1,
      delay: options.delay ?? 0,
      stagger: options.stagger ?? 0,
      ease: 'power3.out',
    })
  }

  function animateScrollReveal(
    trigger: Ref<HTMLElement | null> | string,
    targets: string,
    options: { stagger?: number } = {},
  ) {
    const triggerEl = typeof trigger === 'string' ? trigger : trigger.value
    if (!triggerEl) return

    $gsap.from(targets, {
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 80%',
        once: true,
      },
      opacity: 0,
      y: 60,
      duration: 1.2,
      stagger: options.stagger ?? 0.15,
      ease: 'power3.out',
    })
  }

  function killScrollTriggers() {
    $ScrollTrigger.getAll().forEach((t: any) => t.kill())
  }

  return { $gsap, $ScrollTrigger, animateFadeUp, animateScrollReveal, killScrollTriggers }
}
