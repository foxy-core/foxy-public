<template>
  <form
    class="max-w-xl flex flex-col space-y-3 w-full"
    @submit.prevent="submitForm"
  >
    <UiBaseTypography class="text-center">
      <h1>Регистрация</h1>
    </UiBaseTypography>

    <UiBaseInput
      label="E-mail"
      type="email"
      autocomplete="e-mail"
      v-bind="inputs.email.value"
    />
    <UiBaseInput
      label="Пароль"
      type="password"
      autocomplete="new-password"
      v-bind="inputs.password.value"
    />
    <UiBaseInput
      label="Подтвердите пароль"
      type="password"
      v-bind="inputs.confirmPassword.value"
    />

    <UiBaseButton variant="warning" :is-loading="isLoading">
      <template #icon><LoginIcon class="w-5 h-5" /></template>
      Зарегистрироваться
    </UiBaseButton>

    <RouterLink
      custom
      :to="{ name: 'auth-sign-in' }"
      v-slot="{ href, navigate }"
    >
      <UiBaseButton
        tag="a"
        outline
        variant="warning"
        :href="href"
        @click="navigate"
      >
        Я уже зарегистрирован
      </UiBaseButton>
    </RouterLink>
  </form>
</template>

<script setup lang="ts">
  import LoginIcon from '~icons/heroicons-outline/login'
  import {
    confirmPasswordValidator,
    emailValidator,
    passwordValidator,
  } from '~/_app/domain/accounts'
  import { useSignUp } from '~/_app/use-cases/auth'

  const signUp = useSignUp()

  const { inputs, submitForm, isLoading, state } = useForm<{
    email: string
    password: string
    confirmPassword: string
  }>({
    fields: {
      email: {
        validator: emailValidator,
      },
      password: {
        validator: passwordValidator,
      },
      confirmPassword: {
        validator: confirmPasswordValidator,
      },
    },
    onSubmitted: async () => {
      await signUp({
        email: state.value.email,
        password: state.value.password,
      })
    },
  })
</script>
