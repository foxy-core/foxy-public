import { nanoid } from 'nanoid'

export type ClientId = string

export const CLIENT_ID_LENGTH = 15

export const generateClientId = (): ClientId =>
  `__foxy_public__${nanoid(CLIENT_ID_LENGTH)}`
