import { PageAuthRequirements } from '~/_app/domain/auth'

export enum RedirectDecision {
  ToIndex,
  ToAuth,
  None,
}

export const useRedirectOnAuth = () => {
  return (
    isAuthorized: boolean,
    // content is mostly for authorized users
    // so if not provided use `PageAuthRequirements.Authorized`
    requirements: PageAuthRequirements = PageAuthRequirements.Authorized,
    next?: CallableFunction,
  ) => {
    switch (requirements) {
      case PageAuthRequirements.Authorized: {
        if (!isAuthorized) {
          return RedirectDecision.ToAuth
        }
        break
      }

      case PageAuthRequirements.NotAuthorized: {
        if (isAuthorized) {
          return RedirectDecision.ToIndex
        }
        break
      }
    }

    next?.()

    return RedirectDecision.None
  }
}
