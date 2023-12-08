# Kubeadm

Afterinitialize kubeadm we can create new join token with kubeadm tool

```sh
kubeadm token create --print-join-command
```

## Join to the existing cluster

First use kubeadm tool to generate token or you can list it.
You can use it in management machine also it uses kubeconfig.

```sh
kubeadm token create
# kubeadm token list
```

After that get `--discovery-token-ca-cert-hash`

```sh
openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt | openssl rsa -pubin -outform der 2>/dev/null | openssl dgst -sha256 -hex | sed 's/^.* //'
```

And use join command

```sh
kubeadm join cluster.kube-cluster:6443 --token 3k2xfX.XXXXXXXXXXXXXXXX \
    --discovery-token-ca-cert-hash sha256:4eb7daf656XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## Join as Master

https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-alpha/

Certificate valid 2 hours

```sh
kubeadm alpha certs certificate-key
```

Before to start upload certificates in a master node

```sh
kubeadm init phase upload-certs --upload-certs
# use this certificate-key
```

```sh
kubeadm join cluster.ecs-cluster:6443 --token wfdwcX.XXXXXXXXXXXXXXXX \
    --discovery-token-ca-cert-hash sha256:4eb7daf656XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
    --control-plane --certificate-key d5ada6891029051XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```
