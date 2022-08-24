<template>
  <div class="w-full">
    <UiBaseTypography class="text-center mb-6">
      <h1>Что тебе нравится?</h1>
    </UiBaseTypography>

    <UiBaseMultipicker v-model="pickedOptions" :options="interestsOptions" />
  </div>
</template>

<script setup lang="ts">
  import { PageAuthRequirements } from '~/_app/domain/auth'
  import { PickerOption } from '~/components/ui/base-multipicker.vue'
  import { PokeResponse, PokeResponseStatus } from '~~/src/_app/common/poke'

  definePageMeta({
    auth: PageAuthRequirements.Whatever,
  })

  const ROWS_COUNT = 12

  const pokeApi = usePokeApi()

  const { data } = useAsyncData('test/enums', async () => {
    return pokeApi.schema.getEnums({})
  })

  const interestsOptions = computed(() => {
    if (data.value.status === PokeResponseStatus.Rejected) {
      return []
    }

    // TODO: fix when https://github.com/nuxt/framework/issues/6910 is resolved
    return Object.entries(data.value.result.enums.Interests)
      .map(([key, displayValue]) => ({
        key,
        displayValue: displayValue as string,
      }))
      .reduce(
        (acc, val, i) => {
          acc[i % ROWS_COUNT].push(val)
          return acc
        },
        Array.from({ length: ROWS_COUNT }, () => [] as PickerOption[]),
      )
  })

  const pickedOptions = ref<string[]>([])
</script>
