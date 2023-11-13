import { defineConfig } from 'vitepress'

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
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rytsh' }
    ],

    editLink: {
      pattern: 'https://github.com/rytsh/wiki/edit/main/:path'
    }
  }
})
