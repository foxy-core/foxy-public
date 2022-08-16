<template>
  <div
    data-test="default-layout"
    class="px-6 container mx-auto h-full w-full flex flex-col"
  >
    <application-base-header class="sticky top-0 left-0 p-2" />

    <main class="h-full w-full"><slot /></main>

    <application-base-footer class="mt-24 pb-8" />
  </div>
</template>
