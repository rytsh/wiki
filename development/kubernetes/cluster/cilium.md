# Cilium

Cilum is general networking solution makes load balancer, firewall, etc.

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

## Modules

`tproxy` module is used for transparent proxying.  
In `WSL2` not exist yet this module but use a patched kernel to use it.

Get existing kernel from https://github.com/Locietta/xanmod-kernel-WSL2

<details><summary>Kernel Build</summary>

Clone microsoft kernel and compile it.

```sh
git clone https://github.com/microsoft/WSL2-Linux-Kernel.git --depth=1 -b linux-msft-wsl-6.6.y
sudo apt update && sudo apt install build-essential flex bison libssl-dev libelf-dev bc python3 pahole cpio bc libncurses-dev pkg-config

cd WSL2-Linux-Kernel
make -j$(nproc) KCONFIG_CONFIG=Microsoft/config-wsl
sudo make modules_install headers_install
cp arch/x86_64/boot/bzImage /mnt/c/tools/kernel/bzImage
```

</details>

Edit `/mnt/c/Users/<username>/.wslconfig`

```
[wsl2]
kernel = C:\\tools\\kernel\\bzImage-x64v3
kernelCommandLine = cgroup_no_v1=all
```

`wsl.exe --shutdown` and restart WSL2.  
`uname -a` to show kernel version.

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

## Forward 10.0.10.0/24 to cilium

> TODO Still checking

First we need to forward all traffic to cilium gateway.

Do it in node:

```sh
# ip route add 10.0.10.0/24 via $(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="InternalIP")].address}')
sysctl -w net.ipv4.ip_forward=1
```

Second we need to tell in our local machine to forward all traffic to that machine.

```sh
ip route add 10.0.10.0/24 via $(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' kind-control-plane)
```
