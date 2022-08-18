import { z, ZodType } from 'zod'
import { ValidationStatus } from './validation-status'
import { Validator } from './validator'

// zod не возвращает отдельной ошибки вроде requirement not satisfied
const isRequiredError = (error: z.ZodIssue) =>
  error.code === 'invalid_type' && error.received === 'undefined'

const getZodParseErrors = (schema: z.Schema, value: unknown) => {
  if (!schema) {
    return null
  }

  const parseResult = (schema as z.Schema).safeParse(value)

  if (parseResult.success) {
    return null
  }

  return (parseResult as z.SafeParseError<unknown>).error.errors
}

export const zodValidator =
  <T extends ZodType>(schema: T): Validator<z.infer<T>, unknown> =>
  value => {
    const isRequired = !schema.isOptional()
    // чтобы при пустой строке показало ошибку required вместо invalid
    const normalizedValue = value === '' ? undefined : value
    const requirementSatisfied =
      !isRequired || (normalizedValue !== undefined && normalizedValue !== null)

    const validationErrors = getZodParseErrors(schema, value)?.filter(
      err => !isRequiredError(err),
    )

    const firstError = validationErrors?.at(0)

    const validationStatus =
      requirementSatisfied &&
      (!validationErrors || validationErrors.length === 0)
        ? ValidationStatus.Valid
        : ValidationStatus.Invalid

    return {
      requirementSatisfied,
      validationStatus,
      errorMessage: firstError?.message,
    }
  }
