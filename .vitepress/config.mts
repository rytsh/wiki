import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "wiki",
  description: "rytsh's wiki",
  base: '/wiki/',
  markdown: {
    theme: 'material-theme',
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.png', type: 'image/png' }],
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-FGF7BPK5Z1' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-FGF7BPK5Z1');`
    ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: `rytsh's wiki`, link: '/' },
    ],

    sidebar: [
      {
        text: 'Tools',
        items: [
          { text: 'Server',
            items: [
              { text: 'dhcpd', link: '/tools/server/dhcpd' },
              { text: 'tftp', link: '/tools/server/tftp' },
              { text: 'dns', link: '/tools/server/dns' },
              { text: 'load_balancer', link: '/tools/server/load_balancer' },
            ],
            collapsed: true
          },
        ],
        collapsed: true
      },
      {
        text: 'Development',
        items: [
          {
            text: 'Kubernetes',
            items: [
              {
                text: 'Guide',
                items: [
                  { text: 'Kubeadm', link: '/development/kubernetes/guide/kubeadm' },
                  { text: 'Intro', link: '/development/kubernetes/guide/intro' },
                  { text: 'Core', link: '/development/kubernetes/guide/core' },
                ],
                collapsed: true
              },
              { text: 'Qemu', link: '/development/kubernetes/qemu' },
              { text: 'VM', link: '/development/kubernetes/vm' },
              { text: 'Management', link: '/development/kubernetes/management' },
              { text: 'Machine', link: '/development/kubernetes/machine' },
              { text: 'Install', link: '/development/kubernetes/install' },
              { text: 'Network', link: '/development/kubernetes/network' },
            ],
            collapsed: true
          },
          { text: 'Go',
            items: [
              { text: 'Generic Limit', link: '/development/go/generic_limit' },
            ],
            collapsed: true
          },
          {
            text: 'Rust',
            items: [
              { text: 'Intro', link: '/development/rust/intro' },
            ],
          }
        ],
        collapsed: true
      },
      {
        text: 'Posts',
        items: [
          { text: 'Fake Time', link: '/posts/fake_time' },
          { text: 'Bucket Go', link: '/posts/bucket_go' },
          { text: 'Git Changes', link: '/posts/git_changes' },
          { text: 'Rebase Container', link: '/posts/rebase_container' },
          { text: 'Nerd Fonts', link: '/posts/nerd_fonts' },
          { text: 'SSH Tunnel', link: '/posts/ssh_tunnel' },
          { text: 'Github Actions', link: '/posts/github_actions' },
          { text: 'Certificate', link: '/posts/certificate' },
          { text: 'Port', link: '/posts/port' },
          { text: 'Clipboard', link: '/posts/clipboard' },
          { text: 'Git', link: '/posts/git' },
          { text: 'Postgres Backup', link: '/posts/postgres_backup' },
          { text: 'Terminal View', link: '/posts/terminal_view' },
          { text: 'Wsl', link: '/posts/wsl' },
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
          timeStyle: 'short'
      }
    },
  }
});
