<template>
  <ApplicationFormsSignUp />
</template>

<script setup lang="ts">
  useHead({
    title: 'Sign up',
  })

  const authCookie = useCookie('auth')

  const goToMain = () => navigateTo('/')

  if (authCookie.value) goToMain()
</script>
