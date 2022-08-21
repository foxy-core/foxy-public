import { PokeFactory } from '~/_app/common/poke'
import { HttpMethod } from '~/_app/common/http-utils'
import {
  SignInInputDto,
  SignInOutputDto,
  SignUpInputDto,
  SignUpOutputDto,
} from '~/_app/infrastructure/dto/auth'

export const createAuthMethods = (factory: PokeFactory) => {
  const authContext = factory.defineContext('authentication')

  return {
    signIn: authContext.defineMethod<SignInInputDto, SignInOutputDto>({
      httpMethod: HttpMethod.Post,
      methodPath: 'auth',
    }),
    signUp: authContext.defineMethod<SignUpInputDto, SignUpOutputDto>({
      httpMethod: HttpMethod.Post,
      methodPath: 'register',
    }),
  }
}
