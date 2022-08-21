import {
  useAccessToken,
  useClientId,
  useRefreshToken,
} from '~/composables/auth/auth-cookies'
import { PokeResponseStatus } from '~/_app/common/poke'
import { Email, Password } from '~/_app/domain/accounts'
import { NotificationStatus } from '~/_app/domain/notifications'
import { notify } from '~/_app/use-cases/notifications'
import { usePokeApi } from '~/composables/use-poke-api'

type SignUpInput = {
  email: Email
  password: Password
}

export const useSignUp = () => {
  const accessToken = useAccessToken()
  const refreshToken = useRefreshToken()
  const clientId = useClientId()

  const pokeApi = usePokeApi()

  return async (input: SignUpInput) => {
    const result = await pokeApi.auth.signUp({
      input: {
        ...input,
        clientId: clientId.value,
        strategy: 'local',
      },
    })

    if (result.status === PokeResponseStatus.Resolved) {
      navigateTo('/')

      refreshToken.value = result.result.refreshToken
      accessToken.value = result.result.token
      return
    }

    notify({
      status: NotificationStatus.Error,
      text: 'Ошибка при авторизации(',
    })
  }
}
