import { createFoxyPokeClient } from '~/_app/infrastructure/foxy-poke-api'

export const POKE_API_INJECTION_KEY = 'POKE_API'

export const usePokeApi = () => {
  return inject<ReturnType<typeof createFoxyPokeClient>>(POKE_API_INJECTION_KEY)
}
