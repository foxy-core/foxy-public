import { PokeResponseStatus } from '~/_app/common/poke'
import { exists } from '~/_app/common/guards'
import { createFoxyPokeClient } from '~/_app/infrastructure/foxy-poke-api'
import { useSignOut } from './sign-out'
import { useCredentialsStore } from '../../stores/credentials.store'

export const useRefresh = () => {
  const credentials = useCredentialsStore()

  const signOut = useSignOut()

  // creating separate client because it would call itself recursively
  // TODO: solve this
  const pokeApi = createFoxyPokeClient()

  return async () => {
    if (!exists(credentials.accessToken) && !exists(credentials.refreshToken)) {
      return
    }

    if (exists(credentials.tokenValidity)) {
      return
    }

    if (!exists(credentials.accessToken) || !exists(credentials.accessToken)) {
      return signOut()
    }

    // token is not valid anymore and tokens are present
    // so refresh
    const response = await pokeApi.auth.signIn({
      input: {
        strategy: 'refreshToken',
        oldAccessToken: credentials.accessToken,
        refreshToken: credentials.refreshToken,
      },
    })

    if (response.status === PokeResponseStatus.Rejected) {
      return signOut()
    }

    credentials.accessToken = response.result.token
    credentials.refreshToken = response.result.refreshToken
    credentials.tokenValidity = true
  }
}
