import { ref, onMounted } from 'vue'

export const useAvatar = () => {
  const avatar = ref('')

  const getUserInfo = async () => {
    const res = await window.longportInternal.getUserInfo()
    avatar.value = res.data.member.avatar
  }

  onMounted(() => {
    getUserInfo()
  })

  return {
    avatar,
  }
}
