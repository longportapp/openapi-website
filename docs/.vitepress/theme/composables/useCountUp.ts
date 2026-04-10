import { onMounted, onUnmounted, type Ref } from 'vue'

export function useCountUp(containerRef: Ref<HTMLElement | null>) {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!containerRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const target = parseInt(el.dataset.countTarget || '0', 10)
          if (!target) return

          let current = 0
          const duration = 1000
          const step = target / (duration / 16)
          const interval = setInterval(() => {
            current += step
            if (current >= target) {
              current = target
              clearInterval(interval)
            }
            el.textContent = String(Math.floor(current))
          }, 16)

          observer?.unobserve(el)
        })
      },
      { threshold: 0.5 },
    )

    containerRef.value.querySelectorAll<HTMLElement>('[data-count-target]').forEach((el) => {
      observer?.observe(el)
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
