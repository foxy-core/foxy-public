<template>
  <div class="relative">
    <input
      class="peer w-full appearance-none rounded-lg ring-1 bg-zinc-50 px-5 transition-colors duration-100 placeholder:invisible placeholder:opacity-0 hover:bg-zinc-100 focus:bg-zinc-100 focus:outline-none"
      :id="id"
      :placeholder="label || 'Input'"
      :value="modelValue"
      @input="onInput"
      :type="type"
      :class="[
        {
          'ring-zinc-100':
            !validationStatus ||
            validationStatus === ValidationStatus.NotValidated,
          'ring-rose-100': validationStatus === ValidationStatus.Invalid,
          'ring-green-100': validationStatus === ValidationStatus.Valid,
        },
        !!label ? 'pt-[1.125rem] pb-1.5' : 'py-3',
      ]"
    />
    <label
      v-if="label"
      class="pointer-events-none absolute top-1.5 left-5 select-none w-full text-xs text-zinc-400 transition-all duration-100 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs"
      :for="id"
    >
      <UiBaseTransition>
        <span
          v-if="errorString"
          class="absolute top-0 left-0 text-rose-400 font-light"
          >{{ errorString }}</span
        >
        <span v-else class="absolute top-0 left-0">
          {{ label }}
        </span>
      </UiBaseTransition>
    </label>

    <UiBaseTransition>
      <ExclamationIcon
        v-if="requirementNotSatisfied"
        class="absolute w-6 h-6 text-rose-400 right-5 top-3"
        title="This field is required"
      />
    </UiBaseTransition>
  </div>
</template>

<script setup lang="ts">
  import ExclamationIcon from '~icons/heroicons-outline/exclamation'

  import { ValidationStatus } from '~/_app/domain/validation/validation-status'

  defineProps<{
    label?: string
    modelValue?: string
    id?: string
    type?: string
    errorString?: string
    validationStatus?: ValidationStatus
    requirementNotSatisfied?: boolean
  }>()

  const emit = defineEmits<{
    (name: 'update:modelValue', newValue: string): void
  }>()

  const onInput = (event: Event) =>
    emit('update:modelValue', (event.target as HTMLInputElement)?.value)
</script>
