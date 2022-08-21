<template>
  <form
    class="max-w-xl flex flex-col space-y-3 w-full"
    @submit.prevent="submitForm"
  >
    <UiBaseTypography class="text-center">
      <h1>Вход</h1>
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
      autocomplete="current-password"
      v-bind="inputs.password.value"
    />

    <UiBaseButton variant="warning" :is-loading="isLoading">
      <template #icon><LoginIcon class="w-5 h-5" /></template>
      Войти
    </UiBaseButton>

    <RouterLink
      custom
      :to="{ name: 'auth-sign-up' }"
      v-slot="{ href, navigate }"
    >
      <UiBaseButton
        tag="a"
        outline
        variant="warning"
        :href="href"
        @click="navigate"
      >
        У меня нет аккаунта
      </UiBaseButton>
    </RouterLink>
  </form>
</template>

<script setup lang="ts">
  import LoginIcon from '~icons/heroicons-outline/login'
  import { emailValidator, passwordValidator } from '~/_app/domain/accounts'
  import { useSignIn } from '~/_app/use-cases/auth'

  const signIn = useSignIn()

  const { inputs, submitForm, isLoading, state } = useForm<{
    email: string
    password: string
  }>({
    fields: {
      email: {
        validator: emailValidator,
      },
      password: {
        validator: passwordValidator,
      },
    },
    onSubmitted: async () => {
      await signIn({
        email: state.value.email,
        password: state.value.password,
      })
    },
  })
</script>
