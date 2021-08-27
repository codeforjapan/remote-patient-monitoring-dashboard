export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  router: {
    mode: 'hash',
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '遠隔療養者モニタリングシステム',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
      {
        hid: 'robots',
        name: 'robots',
        content: 'noindex',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/global.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {
      src: '@/plugins/vue-apexchart',
      ssr: false,
    },
    {
      src: '@/plugins/axios',
      ssr: false,
    },
    {
      src: '@/plugins/threshold',
      ssr: false,
    },
  ],

  loading: { color: '#FF8000' },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    scss: ['@/assets/variables.scss'],
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['nuxt-svg-loader', '@nuxtjs/axios'],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    babel: {
      presets() {
        return [
          [
            '@nuxt/babel-preset-app',
            {
              corejs: { version: '3.14' },
            },
          ],
        ]
      },
    },
    postcss: {
      preset: {
        autoprefixer: {
          // Built-in since nuxt@2.14.5
          grid: 'autoplace',
        },
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extend(config, { isDev, isClient }) {
      if (isClient) {
        config.module.rules.push({
          test: /worker\.js$/,
          use: [{ loader: 'url-loader' }],
        })
      }
    },
  },

  publicRuntimeConfig: {
    clientUrl: process.env.CLIENT_URL || 'http://localhost:8080/#',
    axios: {
      baseURL:
        process.env.API_URL || 'https://api.rms.stopcovid19.jp/stg/api/nurse/',
    },
  },
}
