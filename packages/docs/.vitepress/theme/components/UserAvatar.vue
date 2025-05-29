<script lang="ts" setup>
import { computed, ref } from 'vue'
import UserAvatarIcon from './UserAvatarIcon.vue'
import Dropdown from './UserAvatarDropdown.vue'

const open = ref(false)
const el = ref<HTMLElement>()

const list = computed<{ title: string; href: string; icon: string }[]>(() => [
  {
    title: '反馈',
    href: 'https://open.longportapp.com/feedback',
    icon: 'i-lucide-message-square-text',
  },
  {
    title: '个人中心',
    href: 'https://open.longportapp.com/account',
    icon: 'i-lucide-user-round-pen',
  },
])
</script>

<template>
  <ClientOnly>
    <div ref="el" class="VPFlyout" @mouseenter="open = true" @focusin="open = true" @focusout="open = false">
      <button
        type="button"
        class="button flex items-center py-3 w-8 h-8 focus:outline-none focus:ring-2 focus:ring-offset-0"
        aria-haspopup="true"
        :aria-expanded="open"
        @click="open = !open">
        <UserAvatarIcon size="sm" />
      </button>

      <div
        class="menu absolute top-[calc(var(--vp-nav-height)/2)] right-0 opacity-0 invisible transition-opacity duration-200">
        <Dropdown :list="list" v-model:open="open" />
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>
.VPFlyout {
  display: flex;
  align-items: center;
  position: relative;
  margin-right: -8px;
}

@media (min-width: 768px) {
  .VPFlyout::before {
    margin: 0 16px;
    width: 1px;
    height: 24px;
    background-color: var(--vp-c-divider);
    content: '';
  }
}

.VPFlyout:hover {
  color: var(--vp-c-brand-1);
  transition: color 0.25s;
}

.VPFlyout:hover .text {
  color: var(--vp-c-text-2);
}

.VPFlyout:hover .icon {
  fill: var(--vp-c-text-2);
}

.VPFlyout.active .text {
  color: var(--vp-c-brand-1);
}

.VPFlyout.active:hover .text {
  color: var(--vp-c-brand-2);
}

.button[aria-expanded='false'] + .menu {
  opacity: 0;
  visibility: hidden;
  transform: translateY(0);
}

.VPFlyout:hover .menu,
.button[aria-expanded='true'] + .menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
</style>
