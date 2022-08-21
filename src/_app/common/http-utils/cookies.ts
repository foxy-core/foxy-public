import { NuxtApp } from '#app'

export const INFINITE_MAX_AGE = 31536000

const getCookieFrom = (cookieName?: string) => (cookieString: string) =>
  cookieString
    ?.split('; ')
    .find(row => row.startsWith(`${cookieName}=`))
    ?.split('=')[1]

export const getIsomorphicCookie =
  (cookieName: string) => (nuxtApp: NuxtApp) => {
    const getCookie = getCookieFrom(cookieName)

    if (typeof window !== 'undefined') {
      return getCookie(document.cookie)
    }

    return getCookie(nuxtApp.ssrContext?.event.req.headers.cookie)
  }
