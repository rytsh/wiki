import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "wiki",
  titleTemplate: false,
  description: "rytsh's wiki",
  cleanUrls: true,
  sitemap: {
    hostname: 'https://wiki.rytsh.io'
  },
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
      // { text: `rytsh`, link: 'https://rytsh.io' },
    ],

    sidebar: [
      {
        text: 'Development',
        items: [
          {
            text: 'Kubernetes',
            items: [
              {
                text: 'Cluster',
                collapsed: true,
                items: [
                    {text: 'kind', link: '/development/kubernetes/cluster/kind'},
                    {text: 'cilium', link: '/development/kubernetes/cluster/cilium'},
                    {text: 'registry', link: '/development/kubernetes/cluster/registry'},
                    {text: 'pre-requests', link: '/development/kubernetes/cluster/pre-requests'},
                    {text: 'metrics-server', link: '/development/kubernetes/cluster/metrics-server'},
                    {text: 'prometheus', link: '/development/kubernetes/cluster/prometheus'},
                    {text: 'kubectl', link: '/development/kubernetes/cluster/kubectl'},
                    {text: 'lens', link: '/development/kubernetes/cluster/lens'},
                    {text: 'jet', link: '/development/kubernetes/cluster/jet'},
                    {text: 'kustomize', link: '/development/kubernetes/cluster/kustomize'},
                    {text: 'helm', link: '/development/kubernetes/cluster/helm'},
                    {text: 'packages', link: '/development/kubernetes/cluster/packages'},
                    {text: 'certs', link: '/development/kubernetes/cluster/certs'},
                    {text: 'dns', link: '/development/kubernetes/cluster/dns'},
                    {text: 'proxy', link: '/development/kubernetes/cluster/proxy'},
                    {text: 'headlamp', link: '/development/kubernetes/cluster/headlamp'},
                    {text: 'nerdctl', link: '/development/kubernetes/cluster/nerdctl'},
                ]
              },
              {
                text: 'Guide',
                items: [
                  { text: 'Kubeadm', link: '/development/kubernetes/guide/kubeadm' },
                  { text: 'Intro', link: '/development/kubernetes/guide/intro' },
                  { text: 'Core', link: '/development/kubernetes/guide/core' },
                ],
                collapsed: true
              },
              { text: 'Tools',
                items: [
                  { text: 'dhcpd', link: '/development/kubernetes/tools/dhcpd' },
                  { text: 'tftp', link: '/development/kubernetes/tools/tftp' },
                  { text: 'dns', link: '/development/kubernetes/tools/dns' },
                  { text: 'load_balancer', link: '/development/kubernetes/tools/load_balancer' },
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
              { text: 'Mock', link: '/development/go/mock' },
              { text: 'Generic Limit', link: '/development/go/generic_limit' },
              { text: 'gRPC', link: '/development/go/grpc' },
              { text: 'Database', link: '/development/go/database' },
              { text: 'Telemetry', link: '/development/go/telemetry' },
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
          { text: 'USB Device to WSL', link: '/posts/usb_win' },
          { text: 'SSH over HTTPS', link: '/posts/ssh_https' },
          { text: 'Gitlab Pipeline', link: '/posts/gitlab_pipeline' },
          { text: 'Error 502', link: '/posts/error_502' },
          { text: 'Traefik 503', link: '/posts/traefik_503' },
          { text: 'DHCP Windows', link: '/posts/dhcp_windows' },
          { text: 'Option Pattern', link: '/posts/option_pattern' },
          { text: 'Makefile', link: '/posts/makefile' },
          { text: 'DinD', link: '/posts/dind' },
          { text: 'Test Containers', link: '/posts/test_containers' },
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
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/rytsh/' },
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
