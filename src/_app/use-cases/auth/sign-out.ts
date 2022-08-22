import { useCredentialsStore } from '~/_app/stores/credentials.store'

export const useSignOut = () => {
  const credentials = useCredentialsStore()

  return async (navigate?: boolean) => {
    credentials.accessToken = null
    credentials.refreshToken = null
    credentials.tokenValidity = null

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
