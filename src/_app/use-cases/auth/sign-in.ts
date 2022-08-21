import {
  useAccessToken,
  useClientId,
  useRefreshToken,
  useTokenValidity,
} from '~/composables/auth/auth-cookies'
import { PokeResponseStatus } from '~/_app/common/poke/poke-response'
import { Email, Password } from '~/_app/domain/accounts'
import { NotificationStatus } from '~/_app/domain/notifications'
import { notify } from '~/_app/use-cases/notifications/notify'
import { usePokeApi } from '~/composables/use-poke-api'

type SignInInput = {
  email: Email
  password: Password
}

export const useSignIn = () => {
  const pokeApi = usePokeApi()

  const clientId = useClientId()
  const accessToken = useAccessToken()
  const refreshToken = useRefreshToken()

  return async (input: SignInInput) => {
    const result = await pokeApi.auth.signIn({
      input: {
        ...input,
        clientId: clientId.value,
        strategy: 'local',
      },
    })

    if (result.status === PokeResponseStatus.Resolved) {
      const tokenValidity = useTokenValidity()

      tokenValidity.value = true
      refreshToken.value = result.result.refreshToken
      accessToken.value = result.result.token

      navigateTo('/')
      return
    }

    notify({
      status: NotificationStatus.Error,
      text: 'Ошибка при авторизации(',
    })
  }
}
