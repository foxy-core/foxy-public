<template>
  <div class="rounded-xl bg-white z-10 max-w-xl max-h-[75vh] relative mx-auto custom-scroll shadow-2xl">
    <UiCardsCardExample :name="card.name" :age="card.age" :images="card.images" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  name: string,
  age: number,
  images: string[]
}>()

const card = ref({
  ...props
})

</script>

<style scoped>
.custom-scroll {
  scrollbar-width: none;
  overflow-y: scroll;
}
</style>