<template>
  <form
    class="max-w-xl flex flex-col space-y-3 w-full"
    @submit.prevent="submitForm"
  >
    <UiBaseTypography class="text-center">
      <h1>Sign up</h1>
    </UiBaseTypography>

    <UiBaseInput label="E-mail" type="email" v-bind="inputs.email.value" />
    <UiBaseInput
      label="Password"
      type="password"
      v-bind="inputs.password.value"
    />
    <UiBaseInput
      label="Confirm password"
      type="password"
      v-bind="inputs.confirmPassword.value"
    />

    <UiBaseButton variant="warning" :is-loading="isLoading">
      <template #icon><LoginIcon class="w-5 h-5" /></template>
      Sign up
    </UiBaseButton>
  </form>
</template>

<script setup lang="ts">
  import LoginIcon from '~icons/heroicons-outline/login'
  import {
    confirmPasswordValidator,
    emailValidator,
    passwordValidator,
  } from '~/_app/domain/accounts'

  const authCookie = useCookie('auth')

  const goToMain = () => navigateTo('/')

  const signUp = () => {
    authCookie.value = 'abobus'
    goToMain()
  }

  const { inputs, submitForm, isLoading } = useForm<{
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
      await new Promise(res => setTimeout(res, 2000))
      signUp()
    },
  })
</script>
