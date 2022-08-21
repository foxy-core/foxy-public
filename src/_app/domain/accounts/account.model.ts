import { z } from 'zod'
import { ValidationStatus, zodValidator } from '../validation'

const Email = z.string().email({
  message: 'Неверный e-mail',
})

const Password = z
  .string()
  .min(8, 'Минимум 8 символов')
  .max(64, 'Максимум 64 символа')
  // TODO: разбить на логичные регулярки с сообщениями
  .regex(/^[\wа-яё \-+=*%#$^@()![\]\\/]*$/i)

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
    errorMessage: 'Пароли не совпадают',
  }
}

export type Email = z.infer<typeof Email>

export type Password = z.infer<typeof Password>

export type SafeAccount = {
  email: Email
  id: number
}
