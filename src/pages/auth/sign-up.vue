<template>
  <ApplicationFormsSignUp />
</template>

<script setup lang="ts">
  import { PageAuthRequirements } from '~/_app/domain/auth'

  useHead({
    title: 'Регистрация',
  })

  definePageMeta({
    auth: PageAuthRequirements.NotAuthorized,
  })
</script>
