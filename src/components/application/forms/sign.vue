<template>
  <form class="max-w-xl flex flex-col space-y-3 w-full">
    <UiBaseInput label="E-mail" type="email" />
    <UiBaseInput label="Password" type="password" />

    <UiBaseButton variant="warning">
      <template #icon><LoginIcon class="w-5 h-5" /></template>
      Sign in</UiBaseButton
    >
  </form>
</template>

<script setup lang="ts">
  import LoginIcon from '~icons/heroicons-outline/login'
</script>
