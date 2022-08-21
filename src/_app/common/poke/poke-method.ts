import { HttpMethod } from '../http-utils'
import { PokeRequest } from './poke-request'
import { PokeResponse, PokeResponseStatus } from './poke-response'

export type PokeMethodOptions = {
  baseUrl: string
  methodPath: string
  httpMethod: HttpMethod
  onError: CallableFunction
  before: CallableFunction
}

export const definePokeMethod =
  <InputDTO, OutputDTO>(options: PokeMethodOptions) =>
  async (input: PokeRequest<InputDTO>): Promise<PokeResponse<OutputDTO>> => {
    try {
      await options.before()
    } catch (e) {
      return null
    }

    const result = await $fetch<PokeResponse<OutputDTO>>(
      `/${options.methodPath}`,
      {
        baseURL: options.baseUrl,
        method: options.httpMethod,
        body: input.input,
        headers: {
          Authorization: input.meta?.accessToken
            ? `Bearer ${input.meta.accessToken}`
            : undefined,
        },
      },
    )

    if (result.status === PokeResponseStatus.Rejected) {
      await options.onError(result)
    }

    return result
  }
