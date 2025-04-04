---
head:
  - - meta
    - name: description
      content: Kubernetes installation guide.
  - - meta
    - name: keywords
      content: kubeadm install kubernetes
---

# Install Kubernetes

Login to one of master nodes.

Install packages before to start.

```sh
# enable community repo in /etc/apk/repositories
apk update

apk add 'kubelet=~1.28'
apk add 'kubeadm=~1.28'
apk add 'kubeadm-bash-completion=~1.28'
```

Before to install add modules https://kubernetes.io/docs/setup/production-environment/container-runtimes/

```sh
cat <<EOF | tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF

modprobe overlay
modprobe br_netfilter


# sysctl params required by setup, params persist across reboots
cat <<EOF | tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF

sysctl -p /etc/sysctl.d/k8s.conf
```

Verify that settings are applied.

```sh
lsmod | grep br_netfilter
lsmod | grep overlay

sysctl net.bridge.bridge-nf-call-iptables net.bridge.bridge-nf-call-ip6tables net.ipv4.ip_forward
```

Close swap with `swapoff -a` and comment swap parition in `/etc/fstab`

```sh
apk add containerd containerd-openrc
```

```sh
rc-update add ntpd
rc-update add containerd default
rc-update add kubelet default

rc-service ntpd start
rc-service containerd start
rc-service kubelet start
```

> Preparation is completed and we can set this node as template.

---

> Cilium can handle kube-proxy so we don't need to install it.
> `--skip-phases=addon/kube-proxy`

Before to start, need to add load balancer to support HA.

```sh
kubeadm init --control-plane-endpoint "cluster.kube-cluster:6443" --upload-certs --skip-phases=addon/kube-proxy
```

After that you will get this kind of output.

```
Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

You can now join any number of the control-plane node running the following command on each as root:

  kubeadm join cluster.kube-cluster:6443 --token 84r14X.XXXXXXXXXXXXXXXX \
	--discovery-token-ca-cert-hash sha256:9806b525aa16XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
	--control-plane --certificate-key a373ab55fa13697XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

Please note that the certificate-key gives access to cluster sensitive data, keep it secret!
As a safeguard, uploaded-certs will be deleted in two hours; If necessary, you can use
"kubeadm init phase upload-certs --upload-certs" to reload certs afterward.

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join cluster.kube-cluster:6443 --token 84r14X.XXXXXXXXXXXXXXXX \
	--discovery-token-ca-cert-hash sha256:9806b525aa16XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Record this in management machine.

```sh
mkdir -p $HOME/.kube
scp root@master1:/etc/kubernetes/admin.conf $HOME/.kube/config
```

## Network

Download cilium cli in management machine.

```sh
CILIUM_CLI_VERSION=$(curl -s https://raw.githubusercontent.com/cilium/cilium-cli/main/stable.txt)
CLI_ARCH=amd64
if [ "$(uname -m)" = "aarch64" ]; then CLI_ARCH=arm64; fi
curl -L --fail --remote-name-all https://github.com/cilium/cilium-cli/releases/download/${CILIUM_CLI_VERSION}/cilium-linux-${CLI_ARCH}.tar.gz{,.sha256sum}
sha256sum -c cilium-linux-${CLI_ARCH}.tar.gz.sha256sum
tar xzvfC cilium-linux-${CLI_ARCH}.tar.gz /usr/local/bin
rm cilium-linux-${CLI_ARCH}.tar.gz{,.sha256sum}
```

Run install command, it will install on kubectl context.

```sh
cilium install
```

```sh
cilium status
```

Add CNI plugin.

```sh
curl -fkSLO https://github.com/containernetworking/plugins/releases/download/v1.4.0/cni-plugins-linux-amd64-v1.4.0.tgz
mkdir -p /usr/libexec/cni
tar -C /usr/libexec/cni -xzf cni-plugins-linux-amd64-v1.4.0.tgz
```

Or just for cilium:

```sh
mkdir -p /usr/libexec/cni
cp /opt/cni/bin/* /usr/libexec/cni/
```

Before to join the node make shared of folders.

```sh
mount --make-rshared /run
mount --make-rshared /sys
```

Make it persistent.

```sh
cat <<EOF > /etc/local.d/rc.local
#!/bin/sh
/bin/mount --make-rshared /run
EOF

chmod +x /etc/local.d/rc.local
rc-update
rc-update add local boot
```

### Hubble

```sh
cilium hubble enable
```

Check UI

```sh
cilium hubble ui
#or
kubectl port-forward -n kube-system svc/hubble-ui --address 0.0.0.0 12000:80
```
