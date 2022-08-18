<template>
  <div
    data-test="default-layout"
    class="px-6 container mx-auto h-full w-full flex flex-col items-center"
  >
    <ApplicationBaseHeader class="fixed top-0 left-0 z-50" />

    <main class="flex-1 w-full mt-32 lg:mt-64 flex flex-col items-center">
      <slot />
    </main>

    <ApplicationBaseFooter class="mt-24 pb-8" />
  </div>
</template>
