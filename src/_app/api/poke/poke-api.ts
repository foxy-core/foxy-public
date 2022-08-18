export type PokeApiOptions = {
  baseUrl: string
}

export class PokeApi {
  constructor(private options: PokeApiOptions) {}

  createContext() {}
}
