<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
  useHead({
    titleTemplate: chunk => (chunk ? `${chunk} | Foxy` : 'Foxy'),
    meta: [
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
      },
    ],
  })
</script>

<style>
  body,
  html,
  #__nuxt {
    @apply w-full h-full;
  }
</style>
