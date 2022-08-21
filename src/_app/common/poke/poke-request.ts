export type PokeRequest<InputDTO> = {
  input?: InputDTO
  meta?: PokeRequestMeta
}

export type PokeRequestMeta = {
  accessToken?: string
}
