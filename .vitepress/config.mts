import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "wiki",
  description: "rytsh's wiki",
  base: '/wiki/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Wiki', link: '/' },
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
          { text: 'Postgres Backup', link: '/posts/postgres-backup' },
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
