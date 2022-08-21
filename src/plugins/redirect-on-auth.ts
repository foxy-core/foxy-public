import { RedirectDecision, useRedirectOnAuth } from '~/_app/use-cases/auth'
import { AuthorizationCookies, PageAuthRequirements } from '~/_app/domain/auth'
import { getIsomorphicCookie } from '~/_app/common/http-utils'
import { exists } from '~/_app/common/guards'

// for some reason, middlewares from '/middlewares' are run after the component mounted
// so use a custom router hook here

export default defineNuxtPlugin(nuxtApp => {
  const router = useRouter()

  router.beforeEach((to, from, next) => {
    const accessToken = getIsomorphicCookie(AuthorizationCookies.AccessToken)(
      nuxtApp,
    )

    const isAuthorized = exists(accessToken)

    const redirectOnAuth = useRedirectOnAuth()

    const requirement = (to.meta.auth ?? undefined) as
      | PageAuthRequirements
      | undefined

    const decision = redirectOnAuth(isAuthorized, requirement)

    switch (decision) {
      case RedirectDecision.ToAuth: {
        return next({
          name: 'auth-sign-in',
        })
      }

      case RedirectDecision.ToIndex: {
        return next({
          name: 'index',
        })
      }
    }

    return next()
  })
})
