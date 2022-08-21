<template>
  <ApplicationFormsSignIn />
</template>

<script setup lang="ts">
  import { PageAuthRequirements } from '~/_app/domain/auth'

  useHead({
    title: 'Вход',
  })

  definePageMeta({
    auth: PageAuthRequirements.NotAuthorized,
  })
</script>
