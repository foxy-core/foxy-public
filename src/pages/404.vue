<template>
  <div class="flex flex-col items-center space-y-4 text-center">
    <img src="~/assets/fox-gif-404.gif" :width="460" :height="336" />
    <h1 class="text-lg md:text-2xl text-gray-800">Такой страницы нет</h1>
    <p class="text-sm md:text-base text-gray-600">
      Зато ты можешь найти свою вторую половинку
      <span class="whitespace-nowrap">ヽ(*・ω・)ﾉ</span>
    </p>

    <UiBaseButton tag="a" href="/" variant="warning">
      <template #icon>
        <SearchIcon class="w-5 h-5" />
      </template>
      Найти!
    </UiBaseButton>
  </div>
</template>

<script setup lang="ts">
  import SearchIcon from '~icons/heroicons-outline/search'

  useHead({
    title: 'Не найдено',
  })
</script>
