<template>
  <div class="rounded-xl max-w-xl max-h-[75vh] relative mx-auto custom-scroll shadow-2xl">
    <div v-for="item in cards">
      <UiCardsCardExample :name="item.name" :age="item.age" :images="item.images" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const cards = ref([
  {
    name: 'Margo',
    age: 66,
    images: ['/assets/dummy/margo.jpeg', '/assets/dummy/ryan.jpg']
  },
  {
    name: 'Ryan',
    age: 23,
    images: ['/assets/dummy/ryan.jpg', '/assets/dummy/margo.jpeg']
  }
])

</script>

<style scoped>
.custom-scroll {
  scrollbar-width: none;
  overflow-y: scroll;
}
</style>