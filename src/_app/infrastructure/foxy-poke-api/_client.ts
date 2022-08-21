import { createPokeFactory } from '~/_app/common/poke'

import { createAuthMethods } from './auth'
import { createProfileMethods } from './profile'

export const createFoxyPokeClient = () => {
  const factory = createPokeFactory({
    baseUrl:
      (import.meta.env.NUXT_PUBLIC_POKE_BASE_URL as string) ??
      'https://foxy.s.talkiiing.ru/api',
  })

  const auth = createAuthMethods(factory)
  const profile = createProfileMethods(factory)

  return {
    _factory: factory,
    auth,
    profile,
  }
}
