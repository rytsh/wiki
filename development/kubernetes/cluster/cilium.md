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

## Module tproxy

`tproxy` module is used for transparent proxying.  
In `WSL2` not exist yet this module but use a patched kernel to use it.

```
https://github.com/Locietta/xanmod-kernel-WSL2
```

Edit `/mnt/c/Users/<username>/.wslconfig`

```
[wsl2]
kernel = C:\\tools\\kernel\\bzImage-x64v3
kernelCommandLine = cgroup_no_v1=all
```

`wsl.exe --shutdown` and restart WSL2.  
`uname -a` to show kernel version.

## Issues

> Still not found a solution

```
503
upstream connect error or disconnect/reset before headers. reset reason: connection timeout
```

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
      external: "yes"
EOF
```

```yaml
apiVersion: "cilium.io/v2alpha1"
kind: CiliumL2AnnouncementPolicy
metadata:
  name: empire
spec:
  externalIPs: false
  loadBalancerIPs: 172.18.42.0/29  
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
kubectl label svc deathstar external=yes
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
