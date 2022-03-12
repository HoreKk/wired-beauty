export default {
  ssr: true,
  head: {
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap',
      },
    ],
    title: 'front',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
  },

  css: [
    '@/node_modules/@braid/vue-formulate/themes/snow/snow.scss',
  ],

  plugins: [
    '~/plugins/components',
  ],
  components: true,
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
    '@nuxtjs/style-resources',
    '@braid/vue-formulate/nuxt',
  ],
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/auth-next',  
    [
      'storyblok-nuxt',
      {
        accessToken: process.env.SB_API_KEY,
        cacheProvider: 'memory'
      },
    ],
  ],
  
  auth: {
    // options for auth-next
    redirect: {
      login: '/dashboard/login',
      logout: '/dashboard/login',
      home: '/dashboard/',
    },
    strategies: {
      local: {
        tokenType: false,
        token: {
          property: 'token',
          type: false,
          global: true,
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: false,
          user: false,
        }
      },
    }
  },

  fontawesome: {
    icons: {
      solid: true,
      brands: true,
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://localhost:4000',
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
}
