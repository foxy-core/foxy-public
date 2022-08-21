import { AuthorizationCookies } from '~/_app/domain/auth'
import { INFINITE_MAX_AGE } from '~/_app/common/http-utils'

export const useAccessToken = () =>
  useCookie(AuthorizationCookies.AccessToken, {
    maxAge: INFINITE_MAX_AGE,
  })

export const useClientId = () =>
  useCookie(AuthorizationCookies.ClientId, {
    maxAge: INFINITE_MAX_AGE,
  })

export const useRefreshToken = () =>
  useCookie(AuthorizationCookies.RefreshToken, {
    maxAge: INFINITE_MAX_AGE,
  })

export const useTokenValidity = () =>
  useCookie<boolean>(AuthorizationCookies.TokenValidity, {
    maxAge: 3_600,
  })
