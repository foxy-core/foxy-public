import { useAccessToken } from '~~/src/composables/auth/auth-cookies'

export const useMyProfile = () => {
  const pokeApi = usePokeApi()
  const accessToken = useAccessToken()

  const { data, refresh } = useAsyncData('profile/my', async () => {
    return pokeApi.profile.getMyProfile({
      meta: {
        accessToken: accessToken.value,
      },
    })
  })

  return {
    data,
    refresh,
  }
}
