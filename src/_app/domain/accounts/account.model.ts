import { z } from 'zod'
import { ValidationStatus, zodValidator } from '../validation'

const Email = z.string().email()

const Password = z
  .string()
  .min(8, '8 characters at minimum')
  .max(64, '64 characters at maximum')
  // TODO: разбить на логичные регулярки с сообщениями
  .regex(/^[\wа-яё \-+=*%#$^@()![\]\\/]*$/i)

type Password = z.infer<typeof Password>

export const emailValidator = zodValidator(Email)

export const passwordValidator = zodValidator(Password)

export const confirmPasswordValidator = (
  confirmation: string,
  state: {
    password: Password
  },
) => {
  if (!confirmation) {
    return {
      validationStatus: ValidationStatus.Invalid,
      requirementSatisfied: false,
    }
  }

  if (confirmation === state.password) {
    return {
      validationStatus: ValidationStatus.Valid,
      requirementSatisfied: true,
    }
  }

  return {
    validationStatus: ValidationStatus.Invalid,
    requirementSatisfied: true,
    errorMessage: 'Password do not match',
  }
}
