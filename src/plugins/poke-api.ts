import { createFoxyPokeClient } from '~/_app/infrastructure/foxy-poke-api'
import { useSignOut } from '~/_app/use-cases/auth'
import { POKE_API_INJECTION_KEY } from '~/composables/use-poke-api'
import { AuthError } from '~/_app/domain/auth'

export default defineNuxtPlugin(nuxtApp => {
  const foxyPokeClient = createFoxyPokeClient()
  nuxtApp.vueApp.provide(POKE_API_INJECTION_KEY, foxyPokeClient)

  const signOut = useSignOut()

  const errorListener = async error => {
    if (error.result.reason === AuthError.Unauthorized) {
      await signOut(true)
    }
  }

  foxyPokeClient._factory.onError(errorListener)

  nuxtApp.hook('app:rendered', () =>
    foxyPokeClient._factory.removeOnError(errorListener),
  )
})
