import { AuthOutputDto } from './general.dto'

export type LocalSignInInputDto = {
  strategy: 'local'
  email: string
  password: string
  clientId: string
}

export type RefreshSignInInputDto = {
  strategy: 'refreshToken'
  oldAccessToken: string
  refreshToken: string
}

export type SignInInputDto = LocalSignInInputDto | RefreshSignInInputDto

export type SignInOutputDto = AuthOutputDto
