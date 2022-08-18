import { ValidationStatus } from './validation-status'

export type Validator<T, S> = (
  value: T,
  state: S,
) => {
  validationStatus: ValidationStatus
  errorMessage?: string
  requirementSatisfied: boolean
}
