import {
  useAccessToken,
  useRefreshToken,
  useTokenValidity,
} from '~/composables/auth/auth-cookies'

export const useSignOut = () => {
  const accessToken = useAccessToken()
  const refreshToken = useRefreshToken()
  const tokenValidity = useTokenValidity()

  return async (navigate?: boolean) => {
    accessToken.value = null
    refreshToken.value = null
    tokenValidity.value = null

    if (navigate) {
      if (typeof window !== 'undefined') {
        // to cleanup stores and asyncData
        window.location.href = '/auth/sign-in'
      } else {
        await navigateTo('/auth/sign-in')
      }
    }
  }
}
