import { onMounted, onUnmounted, type Ref } from 'vue'

export function useScrollReveal(containerRef: Ref<HTMLElement | null>) {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!containerRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' },
    )

    containerRef.value.querySelectorAll('.reveal').forEach((el) => {
      observer?.observe(el)
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
