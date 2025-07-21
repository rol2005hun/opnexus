// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  experimental: {
    payloadExtraction: false
  },

  app: {
    head: {
      title: 'Operation: Nexus - Digital Investigation Agency',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Step into the world of digital forensics with Operation: Nexus. Investigate cyber crimes, analyze evidence, uncover conspiracies, and solve complex FBI-style cases in this immersive investigation simulation game.'
        },
        {
          name: 'keywords',
          content: 'investigation game, digital forensics, cyber crime, FBI simulation, detective game, mystery game, evidence analysis, computer investigation, hacking simulation, crime solving, interactive fiction, web investigation, email forensics, chat analysis, file exploration, nexus agency, operation nexus, digital detective, cyber security game, investigation simulation'
        },
        { name: 'author', content: 'NEXUS Digital Investigation Agency' },
        { name: 'robots', content: 'index, follow' },
        { name: 'language', content: 'en' },
        { name: 'theme-color', content: '#007acc' },

        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Operation: Nexus - Digital Investigation Agency' },
        {
          property: 'og:description',
          content: 'Immersive digital forensics investigation game. Solve cyber crimes, analyze evidence, and uncover conspiracies in realistic FBI-style cases.'
        },
        { property: 'og:image', content: '/og-image.png' },
        { property: 'og:url', content: 'https://operation-nexus.com' },
        { property: 'og:site_name', content: 'Operation: Nexus' },
        { property: 'og:locale', content: 'en_US' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Operation: Nexus - Digital Investigation Agency' },
        {
          name: 'twitter:description',
          content: 'Solve cyber crimes and uncover digital conspiracies in this immersive FBI-style investigation game.'
        },
        { name: 'twitter:image', content: '/twitter-card.png' },
        { name: 'twitter:creator', content: '@OperationNexus' },

        // Additional SEO
        { name: 'application-name', content: 'Operation: Nexus' },
        { name: 'apple-mobile-web-app-title', content: 'Operation: Nexus' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'msapplication-TileColor', content: '#007acc' },
        { name: 'msapplication-config', content: '/browserconfig.xml' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'canonical', href: 'https://operation-nexus.com' }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'VideoGame',
            'name': 'Operation: Nexus',
            'alternateName': 'Digital Investigation Agency',
            'description': 'An immersive digital forensics investigation game where players take on the role of FBI agents solving cyber crimes through email analysis, file exploration, and evidence gathering.',
            'genre': ['Investigation', 'Mystery', 'Simulation', 'Educational'],
            'gameLocation': 'Online',
            'operatingSystem': ['Windows', 'macOS', 'Linux', 'iOS', 'Android'],
            'applicationCategory': 'Game',
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD'
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'NEXUS Digital Investigation Agency'
            }
          })
        }
      ]
    }
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/google-fonts'
  ],

  css: [
    '@/assets/scss/main.scss'
  ],

  googleFonts: {
    families: {
      'Inter': [400, 500, 600, 700],
      'JetBrains Mono': [400, 500, 600]
    }
  },

  vite: {
    define: {
      global: 'globalThis'
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/variables.scss" as *;'
        }
      }
    },
    build: {
      rollupOptions: {
        external: [],
        output: {
          manualChunks: undefined
        }
      }
    }
  }
});