import { PokeFactory } from '~/_app/common/poke'
import { HttpMethod } from '~/_app/common/http-utils'

export const createProfileMethods = (factory: PokeFactory) => {
  const profileContext = factory.defineContext('profile')

  return {
    getMyProfile: profileContext.defineMethod<any, any>({
      httpMethod: HttpMethod.Get,
      methodPath: 'my',
    }),
  }
}
