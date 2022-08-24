import { PokeFactory } from '~/_app/common/poke'
import { HttpMethod } from '~/_app/common/http-utils'

export const createSchemaMethods = (factory: PokeFactory) => {
  const schemaContext = factory.defineContext('schema')

  return {
    getEnums: schemaContext.defineMethod<any, any>({
      httpMethod: HttpMethod.Get,
      methodPath: 'getEnums',
    }),
  }
}
