import {
  useAccessToken,
  useRefreshToken,
  useTokenValidity,
} from '~/composables/auth/auth-cookies'
import { PokeResponseStatus } from '~/_app/common/poke'
import { exists } from '~/_app/common/guards'
import { createFoxyPokeClient } from '~/_app/infrastructure/foxy-poke-api'
import { useSignOut } from './sign-out'

export const useRefresh = () => {
  const tokenValidity = useTokenValidity()
  const accessToken = useAccessToken()
  const refreshToken = useRefreshToken()

  const signOut = useSignOut()

  // creating separate client because it would call itself recursively
  // TODO: solve this
  const pokeApi = createFoxyPokeClient()

  return async () => {
    if (!exists(accessToken.value) && !exists(refreshToken.value)) {
      return
    }

    if (exists(tokenValidity.value)) {
      return
    }

    if (!exists(accessToken.value) || !exists(refreshToken.value)) {
      return signOut()
    }

    // token is not valid anymore and tokens are present
    // so refresh
    const response = await pokeApi.auth.signIn({
      input: {
        strategy: 'refreshToken',
        oldAccessToken: accessToken.value,
        refreshToken: refreshToken.value,
      },
    })

    if (response.status === PokeResponseStatus.Rejected) {
      return signOut()
    }

    accessToken.value = response.result.token
    refreshToken.value = response.result.refreshToken
    tokenValidity.value = true
  }
}
