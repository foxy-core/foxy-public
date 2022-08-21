<template>
  <component
    :is="tag"
    class="group relative h-12 select-none overflow-hidden transition-all duration-100 active:translate-y-0.5 active:shadow-none cursor-pointer touch-manipulation"
    @touchstart.passive=""
    :class="[
      {
        'flex items-center justify-center': center,
        'px-7': padding && !circle,
        'shadow-lg media-hover:hover:shadow-sm active:shadow-sm':
          shadow && !outline && !semitransparent,
        border: outline,
        'w-12 rounded-full': circle,
        'rounded-xl': !circle,
      },
      outline
        ? {
            'border-sky-500 text-sky-500 media-hover:hover:border-sky-600 media-hover:hover:text-sky-600':
              variant === 'primary',
            'border-zinc-500 text-zinc-500 media-hover:hover:border-zinc-600 media-hover:hover:text-zinc-600':
              variant === 'secondary',
            'border-red-500 text-red-500 media-hover:hover:border-red-600 media-hover:hover:text-red-600':
              variant === 'error',
            'border-amber-500 text-amber-500 media-hover:hover:border-amber-600 media-hover:hover:text-amber-600':
              variant === 'warning',
            'border-green-500 text-green-500 media-hover:hover:border-green-600 media-hover:hover:text-green-600':
              variant === 'success',
          }
        : {
            'bg-sky-500 text-white media-hover:hover:bg-sky-600':
              variant === 'primary',
            'bg-zinc-200 text-zinc-700 media-hover:hover:bg-zinc-200':
              variant === 'secondary',
            'bg-red-500 text-white media-hover:hover:bg-red-600':
              variant === 'error',
            'bg-amber-500 text-white media-hover:hover:bg-amber-600':
              variant === 'warning',
            'bg-green-500 text-white media-hover:hover:bg-green-600':
              variant === 'success',
            'bg-opacity-80': semitransparent,
          },
    ]"
  >
    <template v-if="!!$slots.icon && !isLoading">
      <div class="h-5 w-5" :class="{ 'mr-3': !circle }">
        <slot name="icon"></slot>
      </div>
      <slot></slot>
    </template>

    <template v-else-if="!isLoading">
      <slot></slot>
    </template>

    <CubeIcon class="w-6 h-6 animate-spin" v-else />
  </component>
</template>

<script setup lang="ts">
  import CubeIcon from '~icons/heroicons-outline/cube-transparent'

  export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'error' | 'warning' | 'success'
    tag?: 'a' | 'div' | 'button'
    shadow?: boolean
    center?: boolean
    padding?: boolean
    outline?: boolean
    semitransparent?: boolean
    circle?: boolean
    isLoading?: boolean
  }

  withDefaults(defineProps<ButtonProps>(), {
    variant: 'primary',
    tag: 'button',
    shadow: true,
    center: true,
    padding: true,
    outline: false,
    semitransparent: false,
    circle: false,
  })
</script>

<style>
  :root {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
</style>
