import { resolve } from 'path'
import { defineNuxtConfig } from 'nuxt'
import viteSvgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  srcDir: resolve(__dirname, 'src'),
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    [
      'unplugin-icons/nuxt',
      {
        autoInstall: true,
      },
    ],
    '@nuxtjs/web-vitals',
    '@nuxtjs/critters',
  ],
  vite: {
    plugins: [viteSvgLoader()],
  },
  build: {
    analyze: true,
  },
})
