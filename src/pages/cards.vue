<template>
  <div class="w-full relative">
    <div class="absolute left-[-10rem] w-1/2 h-full" @click="LikePerson" />
    <div class="absolute right-[-10rem] w-1/2 z-0 h-full" @click="LikePerson" />
    <div v-for="(item, index) in cards" :key="index">
      <UiCardsBaseCard v-if="index === selectedCard" :age="item.age" :name="item.name" :images="item.images" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const cards = ref([
  {
    name: 'Margo',
    age: 66,
    images: ['/assets/dummy/margo.jpeg', '/assets/dummy/ryan.jpg', '/assets/dummy/margo2.jpg']
  },
  {
    name: 'Ryan',
    age: 23,
    images: ['/assets/dummy/ryan.jpg', '/assets/dummy/margo.jpeg']
  }
])

const selectedCard = ref(0)

const LikePerson = () => {
  selectedCard.value = selectedCard.value >= cards.value.length - 1 ? 0 : selectedCard.value + 1
}

</script>