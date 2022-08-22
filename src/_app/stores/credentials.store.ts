import { defineStore } from 'pinia'

import { AuthorizationCookies } from '~/_app/domain/auth'
import { INFINITE_MAX_AGE } from '~/_app/common/http-utils'

export const useCredentialsStore = defineStore('credentials', () => {
  const accessToken = useCookie(AuthorizationCookies.AccessToken, {
    maxAge: INFINITE_MAX_AGE,
  })

  const clientId = useCookie(AuthorizationCookies.ClientId, {
    maxAge: INFINITE_MAX_AGE,
  })

  const refreshToken = useCookie(AuthorizationCookies.RefreshToken, {
    maxAge: INFINITE_MAX_AGE,
  })

  const tokenValidity = useCookie<boolean>(AuthorizationCookies.TokenValidity, {
    maxAge: 3_600,
  })

  return {
    accessToken,
    clientId,
    refreshToken,
    tokenValidity,
  }
})
