import { AuthOutputDto } from './general.dto'

export type SignUpInputDto = {
  strategy: 'local'
  email: string
  password: string
  clientId: string
}

export type SignUpOutputDto = AuthOutputDto
