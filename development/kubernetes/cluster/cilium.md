# Cilium

Cilum is general networking solution makes load balancer, firewall, etc.

> Before to install cilium check [pre-requests](./pre-requests.md) for kernel.

CLI installation

```sh
curl -fSLO https://github.com/cilium/cilium-cli/releases/download/v0.16.22/cilium-linux-amd64.tar.gz
tar xzf cilium-linux-amd64.tar.gz
sudo mv cilium /usr/local/bin/cilium
```

Bash completion

```sh
echo 'source <(cilium completion bash)' >> ~/.bashrc
```

Show status of kubernetes cluster, if you have cilium installed.

```sh
cilium status --wait
```

Install cilium script

```sh
echo "> Installing CRDs"
kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.2.1/experimental-install.yaml

echo "> Add helm Cilium repo"
# add helm repo if not already added
helm repo add cilium https://helm.cilium.io/ || true
helm repo update

echo "> Install Cilium"
helm install cilium cilium/cilium --version 1.16.6 \
  --namespace kube-system \
  --set ipam.mode=kubernetes \
  --set socketLB.enabled=true \
  --set bpf.tproxy=true \
  --set bpf.masquerade=true \
  --set image.pullPolicy=IfNotPresent \
  --set gatewayAPI.enabled=true \
  --set k8sServiceHost=kind-control-plane \
  --set k8sServicePort=6443 \
  --set l7Proxy=true \
  --set kubeProxyReplacement=true \
  --set hubble.relay.enabled=true \
  --set hubble.ui.enabled=true \
  --set operator.replicas=1

echo "> Wait cilium is ready"
cilium status --wait

echo "> Set load balancer IPs"
cat <<EOF | kubectl apply -f -
apiVersion: "cilium.io/v2alpha1"
kind: CiliumLoadBalancerIPPool
metadata:
  name: "pool"
spec:
  blocks:
  - start: "10.0.10.1"
    stop: "10.0.10.100"
EOF
```

Check status details

```sh
kubectl -n kube-system logs -l k8s-app=cilium
kubectl -n kube-system exec ds/cilium -- cilium-dbg status --verbose
```

Make connectivity test

```sh
cilium connectivity test
```

Install experimental CRDs

```sh
# https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.2.1/experimental-install.yaml
# https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.2.1/standard-install.yaml

kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.2.1/experimental-install.yaml
```

## Issues

> Try to restart wsl or change kernel

```
503
upstream connect error or disconnect/reset before headers. reset reason: connection timeout
```

> Not need to have l2 announcement policy

```sh
cat <<EOF | kubectl apply -f -
apiVersion: "cilium.io/v2alpha1"
kind: CiliumL2AnnouncementPolicy
metadata:
  name: policy
spec:
  externalIPs: true
  loadBalancerIPs: true
  serviceSelector:
    matchLabels:
      announce: arp
  interfaces:
    - ^eth[0-9]+
EOF
```

Another example

```yaml
apiVersion: "cilium.io/v2alpha1"
kind: CiliumL2AnnouncementPolicy
metadata:
  name: empire
spec:
  externalIPs: false
  loadBalancerIPs: true
  interfaces:
  - eth0
  serviceSelector:
    matchLabels:
      announce: arp
  nodeSelector:
    matchExpressions:
      - key: node-role.kubernetes.io/control-plane
        operator: DoesNotExist
```

Label the service

```sh
kubectl label svc deathstar announce=arp
```

## TCP Dump

Inside of the cilium pod installed this one `tcpdump` and `termshark`

```sh
apt-get update && DEBIAN_FRONTEND=noninteractive apt-get -y install tcpdump termshark
```

Start dumping

```sh
tcpdump -i any arp -w arp.pcap
```

Make request and after that open it with termshark

```sh
mkdir -p /root/.config/termshark/
echo -e "[main]\ndark-mode = true" > /root/.config/termshark/termshark.toml

TERM=xterm-256color termshark -r arp.pcap
```
