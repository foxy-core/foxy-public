import { SafeParseError, ZodObject, ZodSchema } from 'zod'
import { ValidationStatus, Validator } from '~/_app/domain/validation'

type Form<Obj> = {
  [key in keyof Obj]: {
    // schema: ZodSchema
    initialValue?: Obj[key]
    schema?: ZodSchema
    validator?: Validator<Obj[key], Obj>
  }
}

type FormOptions<Obj> = {
  onSubmitted?: CallableFunction
  fields: Form<Obj>
}

export const useForm = <T>({ onSubmitted, fields }: FormOptions<T>) => {
  const state = reactive<Partial<T>>({})
  const validationState = reactive<Partial<T>>({})

  const isAllValid = computed(() =>
    Object.keys(fields).every(key => validationState[key]),
  )

  const isLoading = ref(false)
  const isFormSubmitted = ref(false)

  const submitForm = async () => {
    isFormSubmitted.value = true

    if (isAllValid.value) {
      isLoading.value = true
      // TODO: catch error here
      const result = await onSubmitted?.()
      isLoading.value = false

      return result
    }
  }

  return {
    submitForm,
    isLoading,
    inputs: Object.fromEntries(
      Object.entries<Form<T>[keyof T]>(fields).map(
        ([key, { initialValue, validator }]) => {
          if (initialValue) {
            state[key] = initialValue
          }

          const modelValue = computed(() => state[key])

          const onUpdate = (value: string) => {
            // сравнение - чтобы при пустой строке показало ошибку required вместо invalid email
            state[key] = value === '' ? undefined : value
          }

          const doValidate = computed(
            () =>
              isFormSubmitted.value ||
              (modelValue.value !== undefined &&
                modelValue.value !== null &&
                !isFormSubmitted.value),
          )

          const comp = computed(() => {
            const validated = validator(state[key], state as T)
            validationState[key] =
              validated.requirementSatisfied &&
              validated.validationStatus === ValidationStatus.Valid

            return {
              errorString: doValidate.value
                ? validated.errorMessage
                : undefined,
              modelValue: modelValue.value,
              validationStatus: doValidate.value
                ? validated.validationStatus
                : ValidationStatus.NotValidated,
              requirementNotSatisfied: doValidate.value
                ? !validated.requirementSatisfied
                : false,
              'onUpdate:modelValue': onUpdate,
            }
          })

          return [key, comp]
        },
      ),
    ),
  }
}
