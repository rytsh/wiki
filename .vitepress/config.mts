import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "wiki",
  description: "rytsh's wiki",
  base: '/wiki/',
  markdown: {
    theme: 'monokai',
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.png', type: 'image/png' }],
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=UA-61804270-1' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-61804270-1');`
    ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: `rytsh's wiki`, link: '/' },
    ],

    sidebar: [
      {
        text: 'Kubernetes',
        items: [
          { text: 'Qemu', link: '/kubernetes/qemu' },
        ],
        collapsed: true
      },
      {
        text: 'Posts',
        items: [
          { text: 'Postgres Backup', link: '/posts/postgres_backup' },
        ],
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rytsh' }
    ],

    editLink: {
      pattern: 'https://github.com/rytsh/wiki/edit/main/:path'
    },

    search: {
      provider: 'local'
    },

    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
          dateStyle: 'full',
          timeStyle: 'medium'
      }
    },
  }
});
