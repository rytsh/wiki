# Cilium

Cilum is general networking solution makes load balancer, firewall, etc.

CLI installation

```sh
curl -fSLO https://github.com/cilium/cilium-cli/releases/download/v0.16.22/cilium-linux-amd64.tar.gz
tar xzf cilium-linux-amd64.tar.gz
sudo mv cilium /usr/local/bin/cilium
```

Show status of kubernetes cluster, if you have cilium installed.

```sh
cilium status --wait
```

Check status details

```sh
kubectl -n kube-system exec ds/cilium -- cilium-dbg status --verbose
```
