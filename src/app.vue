<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
  import { usePokeApi } from '~/composables/use-poke-api'
  import { useRefresh } from '~/_app/use-cases/auth/refresh'
  import {
    useAccessToken,
    useTokenValidity,
  } from './composables/auth/auth-cookies'
  import { useSignOut } from './_app/use-cases/auth/sign-out'

  useHead({
    titleTemplate: chunk => (chunk ? `${chunk} | Foxy` : 'Foxy'),
    meta: [
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
      },
    ],
    link: [
      {
        rel: 'preconnect',
        href: 'https://foxy.s.talkiiing.ru',
      },
    ],
  })

  const pokeApi = usePokeApi()

  const refresh = useRefresh()
  const signOut = useSignOut()

  pokeApi._factory.beforeEach(refresh)

  await refresh()
</script>

<style>
  body,
  html,
  #__nuxt {
    @apply w-full h-full;
  }
</style>
