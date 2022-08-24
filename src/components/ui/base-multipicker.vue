<template>
  <div
    class="flex flex-col w-full"
    ref="rootRef"
    @mouseover.once="stopTimer"
    @touchstart.once="stopTimer"
  >
    <div
      class="-mx-6 ring-inset scroll-px-6 flex flex-row space-x-3 overflow-x-auto disable-scroll-bar snap-x py-1.5"
      v-for="(row, i) in options"
      :key="i"
      :class="enableSmoothScroll && 'scroll-smooth'"
    >
      <div
        class="flex-shrink-0 snap-center first:pl-6 last:pr-6"
        v-for="{ displayValue, key } in row"
        :key="key"
        @click="onClick(key)"
      >
        <div
          class="px-4 py-1 rounded-full transition-all duration-100 ease-in-out select-none cursor-pointer"
          :class="
            modelValue.includes(key)
              ? 'ring-inset ring-[1.5px]  ring-amber-400 text-gray-800'
              : 'bg-gray-100 text-gray-600'
          "
        >
          {{ displayValue }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { shuffle } from '~/_app/common/array-utils'

  export type PickerOption = {
    displayValue: string
    key: string
  }

  const props = defineProps<{
    options: PickerOption[][]
    modelValue: string[]
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', modelValue: string[]): void
  }>()

  const onClick = (key: string) => {
    if (props.modelValue.includes(key)) {
      emit(
        'update:modelValue',
        props.modelValue.filter(picked => picked !== key),
      )
    } else {
      emit('update:modelValue', [...props.modelValue, key])
    }
  }

  const rootRef = ref<HTMLDivElement>(null)

  const enableSmoothScroll = ref(true)

  const timerId = ref<NodeJS.Timer>(null)

  const stopTimer = () => clearInterval(timerId.value)

  const pattern = computed(() =>
    shuffle(Array.from({ length: props.options.length }, (_, i) => i)),
  )

  const currentPatternStep = ref(0)

  onMounted(() => {
    for (const node of rootRef.value.children) {
      const windowWidth = window.innerWidth
      const nodeWidth = node.scrollWidth

      if (nodeWidth > windowWidth * 2) {
        node.scroll({
          left: Math.random() * 400 + 100,
          behavior: 'smooth',
        })
      }
    }

    enableSmoothScroll.value = true

    timerId.value = setInterval(() => {
      const nodeIndex = pattern.value[currentPatternStep.value]
      const node = rootRef.value.children.item(nodeIndex)

      const windowWidth = window.innerWidth
      const nodeWidth = node.scrollWidth

      node.scrollTo({
        left: Math.random() * (nodeWidth - 2 * windowWidth) + windowWidth / 2,
        behavior: 'smooth',
      })

      currentPatternStep.value =
        (currentPatternStep.value + 1) % pattern.value.length
    }, 3000)
  })

  onBeforeUnmount(() => {
    stopTimer()
  })
</script>

<style scoped>
  .disable-scroll-bar::-webkit-scrollbar {
    display: none;
  }
</style>
