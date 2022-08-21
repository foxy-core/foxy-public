<template>
  <div>
    <UiBaseTypography class="text-center">
      <h1>Ваш профиль</h1>

      <p v-if="data?.status === PokeResponseStatus.Rejected">
        У вас нет профиля :(
      </p>

      <p v-else-if="data">
        {{ data?.result.name }}
      </p>
    </UiBaseTypography>

    <UiBaseButton class="mt-6 mx-auto" @click="signOut(true)"
      >Выйти :(</UiBaseButton
    >
  </div>
</template>

<script setup lang="ts">
  import { useSignOut } from '~/_app/use-cases/auth'
  import { useMyProfile } from '~/_app/use-cases/profile'
  import { PokeResponseStatus } from '~/_app/common/poke'

  const signOut = useSignOut()

  const { data } = useMyProfile()
</script>
