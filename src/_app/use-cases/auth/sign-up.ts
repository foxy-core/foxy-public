import { PokeResponseStatus } from '~/_app/common/poke'
import { Email, Password } from '~/_app/domain/accounts'
import { NotificationStatus } from '~/_app/domain/notifications'
import { notify } from '~/_app/use-cases/notifications'
import { usePokeApi } from '~/composables/use-poke-api'
import { useCredentialsStore } from '../../stores/credentials.store'

type SignUpInput = {
  email: Email
  password: Password
}

export const useSignUp = () => {
  const credentials = useCredentialsStore()

  const pokeApi = usePokeApi()

  return async (input: SignUpInput) => {
    const result = await pokeApi.auth.signUp({
      input: {
        ...input,
        clientId: credentials.clientId,
        strategy: 'local',
      },
    })

    if (result.status === PokeResponseStatus.Resolved) {
      navigateTo('/')

      credentials.refreshToken = result.result.refreshToken
      credentials.accessToken = result.result.token
      return
    }

    notify({
      status: NotificationStatus.Error,
      text: 'Ошибка при авторизации(',
    })
  }
}
