<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import StyleToggle from './StyleToggle.vue'
import InteractiveGridPattern from '../inspira/InteractiveGridPattern.vue'
import FlickeringGrid from '../inspira/FlickeringGrid.vue'
import ColourfulText from '../inspira/ColourfulText.vue'
import InteractiveHoverButton from '../inspira/InteractiveHoverButton.vue'

const { t } = useI18n()

const bgStyle = ref<'Grid' | 'Flicker'>('Grid')

// Brand color scheme from lbus design tokens
const brandColors = [
  'var(--brand-100)', 'var(--brand-80)', 'var(--brand-60)',
  'var(--cyan-100)', 'var(--cyan-80)', 'var(--cyan-60)',
]

// Cycle through product names
const products = ['CLI', 'Skill', 'MCP', 'OpenAPI']
const currentProduct = ref(products[0])
let productInterval: ReturnType<typeof setInterval> | undefined
let productIndex = 0

onMounted(() => {
  productInterval = setInterval(() => {
    productIndex = (productIndex + 1) % products.length
    currentProduct.value = products[productIndex]
  }, 3000)
})

onUnmounted(() => clearInterval(productInterval))

// i18n computed
const ctaGetStarted = computed(() => t('hero.cta.getStarted'))
const ctaReadDocs = computed(() => t('hero.cta.readDocs'))
</script>

<template>
  <section class="hero-section">
    <!-- Background -->
    <div class="hero-bg-wrapper">
      <ClientOnly>
        <InteractiveGridPattern
          v-if="bgStyle === 'Grid'"
          class-name="opacity-60 dark:opacity-30"
          squares-class-name="hover:fill-blue-500/20 dark:hover:fill-blue-400/20"
          :width="36"
          :height="36"
          :squares="[42, 24]"
        />
        <FlickeringGrid
          v-else
          class="h-full w-full"
          color="rgb(99, 102, 241)"
          :square-size="5"
          :grid-gap="5"
          :flicker-chance="0.4"
          :max-opacity="0.25"
        />
      </ClientOnly>
      <div class="hero-bg-fade" />
    </div>

    <!-- Toggle: Background Style -->
    <div class="hero-bg-toggle">
      <StyleToggle v-model="bgStyle" :options="['Grid', 'Flicker']" />
    </div>

    <!-- Content -->
    <div class="hero-content">
      <!-- Title -->
      <h1 class="hero-title">
        {{ $t('hero.title.prefix') }} <span class="hero-title-accent">{{ $t('hero.title.accent') }}</span>
      </h1>

      <!-- Powering + dynamic product -->
      <div class="hero-powering">
        <span class="hero-powering-label">{{ $t('hero.powering') }}</span>
        <ClientOnly>
          <span :key="currentProduct" class="hero-product-text">
            <ColourfulText
              :text="currentProduct"
              :duration="0.3"
              :colors="brandColors"
              start-color="var(--vp-c-text-1)"
            />
          </span>
        </ClientOnly>
      </div>

      <!-- Subtitle with brand-colored keywords -->
      <i18n-t keypath="hero.subtitle" tag="p" class="hero-subtitle">
        <template #sdk>
          <span class="hero-keyword">{{ $t('hero.keyword.sdk') }}</span>
        </template>
        <template #cli>
          <span class="hero-keyword">{{ $t('hero.keyword.cli') }}</span>
        </template>
        <template #skill>
          <span class="hero-keyword">{{ $t('hero.keyword.skill') }}</span>
        </template>
        <template #mcp>
          <span class="hero-keyword">{{ $t('hero.keyword.mcp') }}</span>
        </template>
        <template #openapi>
          <span class="hero-keyword">{{ $t('hero.keyword.openapi') }}</span>
        </template>
      </i18n-t>

      <!-- CTA Buttons -->
      <div class="hero-cta">
        <a href="/docs/getting-started" class="hero-link">
          <InteractiveHoverButton
            :text="ctaGetStarted"
            dot-color="#fff"
            hover-text-color="var(--brand-color)"
            class="hero-btn-primary"
          />
        </a>
        <a href="/docs/" class="hero-link">
          <InteractiveHoverButton
            :text="ctaReadDocs"
            dot-color="var(--brand-color)"
            hover-text-color="var(--vp-c-text-1)"
            class="hero-btn-secondary"
          />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  overflow: hidden;
  background: var(--vp-c-bg);
}

/* Background */
.hero-bg-wrapper {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.hero-bg-fade {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, transparent 25%, var(--vp-c-bg) 75%);
}

.hero-bg-toggle {
  position: absolute;
  right: 1.5rem;
  top: 1rem;
  z-index: 20;
}

/* Content */
.hero-content {
  position: relative;
  z-index: 10;
  max-width: 48rem;
  margin: 0 auto;
  padding: 5rem 1.5rem 4rem;
  text-align: center;
}

/* Title */
.hero-title {
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--vp-c-text-1);
}

@media (min-width: 640px) {
  .hero-title { font-size: 3.5rem; }
}

@media (min-width: 1024px) {
  .hero-title { font-size: 4rem; }
}

.hero-title-accent {
  color: var(--vp-c-text-1);
}

/* Powering — left-aligned product name */
.hero-powering {
  margin-top: 1.25rem;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.5rem;
}

.hero-powering-label {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

@media (min-width: 640px) {
  .hero-powering-label { font-size: 1.5rem; }
}

.hero-product-text {
  font-size: 1.25rem;
  font-weight: 700;
  display: inline-block;
  min-width: 100px;
  text-align: left;
}

@media (min-width: 640px) {
  .hero-product-text { font-size: 1.5rem; min-width: 120px; }
}

/* Subtitle */
.hero-subtitle {
  margin-top: 1.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.1rem;
  line-height: 1.9;
  color: var(--vp-c-text-2);
  font-weight: 400;
}

@media (min-width: 640px) {
  .hero-subtitle {
    font-size: 1.15rem;
    line-height: 1.85;
  }
}

@media (min-width: 1024px) {
  .hero-subtitle {
    font-size: 1.2rem;
    line-height: 1.8;
  }
}

/* Keywords */
.hero-keyword {
  color: var(--brand-color);
  font-weight: 500;
}

/* CTA */
.hero-cta {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
}

.hero-link {
  text-decoration: none !important;
}

.hero-btn-primary,
.hero-btn-secondary {
  padding: 0.625rem 2rem;
  font-size: 1rem;
}

.hero-btn-primary {
  border-color: var(--brand-color) !important;
  background: var(--brand-color) !important;
  color: #fff !important;
}

.hero-btn-secondary {
  border: 1.5px solid var(--vp-c-border) !important;
  background: var(--vp-c-bg) !important;
  color: var(--vp-c-text-1) !important;
}

.hero-btn-primary:hover,
.hero-btn-secondary:hover {
  border-color: var(--brand-color) !important;
}

.hero-btn-secondary:hover {
  background: var(--vp-c-bg-soft) !important;
}
</style>
