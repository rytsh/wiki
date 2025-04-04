---
head:
  - - meta
    - name: description
      content: Kubernetes API to reach with socks5 proxy.
  - - meta
    - name: keywords
      content: socks5 proxy
---

# Proxy Socks5

To reach with socks5 proxy.

```sh
#!/usr/bin/env bash

export KIND_EXPERIMENTAL_PROVIDER=${KIND_EXPERIMENTAL_PROVIDER:-docker}

sudo ip route add 10.0.10.0/24 via $(${KIND_EXPERIMENTAL_PROVIDER} inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' kind-control-plane)

cat <<EOF | sudo tee /opt/kube-proxy.yaml
server:
  entrypoints:
    socks5:
      address: ":1080"
  tcp:
    middlewares:
      socks5:
        socks5:
          no_auth_authenticator: true
          ip_map:
            "*.finops.com": "10.0.10.1"
    routers:
      socks5:
        entrypoints:
          - socks5
        middlewares:
          - socks5
EOF

if ${KIND_EXPERIMENTAL_PROVIDER} ps | grep -q kube-proxy; then
  ${KIND_EXPERIMENTAL_PROVIDER} restart kube-proxy
else
  ${KIND_EXPERIMENTAL_PROVIDER} run -d --restart=always \
  --name kube-proxy \
  --network kind \
  -p 1080:1080 \
  -v /opt/kube-proxy.yaml:/turna.yaml \
  ghcr.io/worldline-go/turna:v0.8.0
fi
```

To access socks5 proxy, there is a good extension called `FoxyProxy` and add there with `localhost:1080`
