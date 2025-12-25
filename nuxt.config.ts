// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
  ],

  css: [
    '~/assets/css/index.scss',
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/css/common/mixins.scss" as *;`,
        },
      },
    },
  },

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
      { code: 'zh', language: 'zh-CN', file: 'zh.json', name: '中文' },
    ],
    defaultLocale: 'en',
    lazy: true,
    bundle: {
      optimizeTranslationDirective: false,
    },
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      fallbackLocale: 'en',
    },
  },

  app: {
    head: {
      title: 'Kun Waterfall',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'High-performance video waterfall homepage' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo-72x72.png' },
      ],
    },
  },
})

