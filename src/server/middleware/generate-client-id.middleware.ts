import { setCookie, getCookie } from 'h3'
import { AuthorizationCookies, generateClientId } from '~/_app/domain/auth'
import { INFINITE_MAX_AGE } from '~/_app/common/http-utils'

/**
 * Generates UUID for each user **on the server** for further sending to poke api
 */
export default defineEventHandler(event => {
  const cookieValue = getCookie(event, AuthorizationCookies.ClientId)

  if (!cookieValue) {
    const clientId = generateClientId()

    setCookie(event, AuthorizationCookies.ClientId, clientId, {
      secure: import.meta.env.NODE_ENV === 'production',
      maxAge: INFINITE_MAX_AGE,
    })
  }
})
