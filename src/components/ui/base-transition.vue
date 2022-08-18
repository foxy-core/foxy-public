<template>
  <Transition v-bind="classes"><slot /></Transition>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      // TODO: support more types
      type?: 'opacity' | 'up'
    }>(),
    {
      type: 'up',
    },
  )

  const classes = computed(() => {
    const { type } = props

    if (type === 'opacity') {
      return {
        enterActiveClass: 'duration-100 ease-out',
        enterFromClass: 'transform opacity-0',
        enterToClass: 'opacity-100',
        leaveActiveClass: 'duration-100 ease-in',
        leaveFromClass: 'opacity-100',
        leaveToClass: 'transform opacity-0',
      }
    }

    if (type === 'up') {
      return {
        enterActiveClass: 'duration-100 ease-out',
        enterFromClass: 'transform opacity-0 translate-y-1/3',
        enterToClass: 'opacity-100',
        leaveActiveClass: 'duration-100 ease-in',
        leaveFromClass: 'opacity-100',
        leaveToClass: 'transform opacity-0 -translate-y-1/3',
      }
    }
  })
</script>
