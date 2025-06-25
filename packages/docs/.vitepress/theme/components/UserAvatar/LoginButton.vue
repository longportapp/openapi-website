<template>
  <div class="VPFlyout">
    <a
      target="_self"
      :href="redirectPath"
      class="login-button px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200">
      {{ t('login_now') }}
    </a>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { localePath } from '../../utils/i18n'
import { useI18n } from 'vue-i18n'
import { withQuery } from 'ufo'

const { t } = useI18n()

const redirectPath = computed(() => {
  // 记住当前访问的页面路径，登录成功后跳转到对应的路径上
  const ssoRedirectTo = `redirect_to=${window.location.pathname}`

  // 跳转到 /sso 页面用于承接登录成功后带过来的 token
  const redirect_to = `${localePath(`${window.location.origin}/sso`)}?${ssoRedirectTo}`

  return withQuery(localePath(`/login`), {
    redirect_to,
    logout: '1',
  })
})
</script>

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
  color: var(--vp-c-brand-2);
  transition: color 0.25s;
}

.login-button {
  background-color: var(--vp-c-brand-2);
  color: var(--vp-c-white);
  border: 1px solid transparent;
  text-decoration: none;
}

.login-button:hover {
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}
</style>
