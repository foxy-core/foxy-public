export const useMyProfile = () => {
  const pokeApi = usePokeApi()

  const { data, refresh } = useAsyncData('profile/my', async () => {
    return pokeApi.profile.getMyProfile({})
  })

  return {
    data,
    refresh,
  }
}
