import {
  definePokeMethod,
  PokeMethodOptions,
} from '~/_app/common/poke/poke-method'
import { HttpMethod } from '~/_app/common/http-utils'
import { PokeResponse } from './poke-response'

export type PokeFactoryOptions = {
  baseUrl: string
}

export class PokeFactory {
  baseUrl: string

  _beforeEach: Set<CallableFunction> = new Set()
  _onError: Set<CallableFunction> = new Set()

  constructor(options: PokeFactoryOptions) {
    this.baseUrl = options.baseUrl
  }

  defineContext(context: string) {
    return new PokeMethodFactory(context, this)
  }

  beforeEach(fn: CallableFunction) {
    this._beforeEach.add(fn)
  }

  onError(fn: CallableFunction) {
    this._onError.add(fn)
  }

  removeOnError(fn: CallableFunction) {
    this._onError.delete(fn)
  }

  async _runBeforeEach() {
    for await (const fn of this._beforeEach) {
      await fn()
    }
  }

  async _runOnError<T>(response: PokeResponse<T>) {
    for await (const fn of this._onError) {
      await fn(response)
    }
  }
}

class PokeMethodFactory {
  context: string
  factory: PokeFactory

  constructor(context: string, factory: PokeFactory) {
    this.context = context
    this.factory = factory
  }

  defineMethod<InputDTO, OutputDTO>({
    httpMethod = HttpMethod.Post,
    methodPath,
  }: Omit<PokeMethodOptions, 'baseUrl' | 'before' | 'onError'>) {
    const fullMethodPath = `${this.context}/${methodPath}`

    return definePokeMethod<InputDTO, OutputDTO>({
      methodPath: fullMethodPath,
      httpMethod,
      baseUrl: this.factory.baseUrl,
      before: this.factory._runBeforeEach.bind(this.factory),
      onError: this.factory._runOnError.bind(this.factory),
    })
  }
}

export const createPokeFactory = (options: PokeFactoryOptions) =>
  new PokeFactory(options)
