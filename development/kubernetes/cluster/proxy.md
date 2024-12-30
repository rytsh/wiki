# Proxy Socks5

To reach with socks5 proxy.

```sh
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
            "*.kube.com": "10.0.10.1"
    routers:
      socks5:
        entrypoints:
          - socks5
        middlewares:
          - socks5
EOF
```

```sh
docker run -d --restart=always \
--name kube-proxy \
--network kind \
-p 1080:1080 \
-v /opt/kube-proxy.yaml:/turna.yaml \
ghcr.io/rakunlabs/turna:v0.7.12
```

To Access socks5 proxy, in firefox there is a good extension called `FoxyProxy` and add there with `localhost:1080`
