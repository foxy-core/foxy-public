import { PokeResponseStatus } from '~/_app/common/poke/poke-response'
import { Email, Password } from '~/_app/domain/accounts'
import { NotificationStatus } from '~/_app/domain/notifications'
import { notify } from '~/_app/use-cases/notifications/notify'
import { usePokeApi } from '~/composables/use-poke-api'
import { useCredentialsStore } from '~/_app/stores/credentials.store'

type SignInInput = {
  email: Email
  password: Password
}

export const useSignIn = () => {
  const pokeApi = usePokeApi()

  const credentials = useCredentialsStore()

  return async (input: SignInInput) => {
    const result = await pokeApi.auth.signIn({
      input: {
        ...input,
        clientId: credentials.clientId,
        strategy: 'local',
      },
    })

    if (result.status === PokeResponseStatus.Resolved) {
      const tokenValidity = credentials.tokenValidity

      credentials.tokenValidity = true
      credentials.refreshToken = result.result.refreshToken
      credentials.accessToken = result.result.token

      navigateTo('/')
      return
    }

    notify({
      status: NotificationStatus.Error,
      text: 'Ошибка при авторизации(',
    })
  }
}
