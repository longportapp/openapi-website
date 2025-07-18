<template>
  <footer class="footer">
    <section v-if="beianText" class="ml-0 mr-auto">
      <a class="beian-link" href="https://beian.miit.gov.cn/" rel="nofollow">
        {{ beianText }}
      </a>
    </section>
    <div class="ml-auto mr-0">
      <section class="block">
        <div class="flex flex-wrap text-xs gap-x-5 gap-y-2">
          <a v-for="link in links" :key="link.href" :href="link.href" class="inline-block footer-link" target="_blank">
            {{ link.label }}
          </a>
        </div>
      </section>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { isServer } from '../../utils/i18n'

const { t, locale } = useI18n()

// 备案文案
const beianText = computed(() => {
  if (isServer()) {
    return ''
  }
  const hostIsCN = window.location.host.endsWith('.cn')
  return hostIsCN && locale.value === 'zh-CN' ? `© ${new Date().getFullYear()} 粤 ICP 备 2025433117 号` : ''
})

const links = computed(() => {
  return [
    {
      href: `https://support.longbridgewhale.com/topics/misc.disable/lp-user-agreement?locale=${locale.value}`,
      label: t('side-footer.section-terms.terms-of-service'),
    },
    {
      href: `https://support.longbridgewhale.com/topics/misc/privacy-policy?locale=${locale.value}`,
      label: t('side-footer.section-terms.privacy-policy'),
    },
  ]
})
</script>

<style scoped>
.footer {
  @apply py-5 mt-10  flex justify-between items-center w-full;
}

.beian-link,
.footer-link,
a {
  font-size: 0.75rem;
  color: var(--text-color-3);
}
</style>
