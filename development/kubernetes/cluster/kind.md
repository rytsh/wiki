---
head:
  - - meta
    - name: description
      content: Kind is a tool for running local Kubernetes clusters using Docker container "nodes".
  - - meta
    - name: keywords
      content: kubernetes kind
---

# Kind

> https://kind.sigs.k8s.io/

Easiest way to create a kubernetes cluster is open cluster in a docker container.
Containers will be as our nodes.

Kind use `KIND_EXPERIMENTAL_PROVIDER` environment variable to set provider.
Usable providers are `docker`, `podman`, `nerdctl`.

```sh
export KIND_EXPERIMENTAL_PROVIDER=${KIND_EXPERIMENTAL_PROVIDER:-docker}
```

```sh
curl -fSLO https://github.com/kubernetes-sigs/kind/releases/download/v0.26.0/kind-linux-amd64 && \
chmod +x kind-linux-amd64 && \
sudo mv kind-linux-amd64 /usr/local/bin/kind
```

Verify installation:

```sh
kind --version
```

Add `bash` completion:

```sh
echo 'source <(kind completion bash)' >> ~/.bashrc
```

Before start create cluster with cilium, change kernel and add ip forwarding (this is for socks5 proxy we use in after that).

> [pre-requests](./pre-requests.md)

Create a cluster with `cilium`

> https://docs.cilium.io/en/latest/installation/kind/

Cilium can solve of networking between pods and nodes.

```sh
sudo mkdir -p /data/provision

cat <<EOF > kind-config.yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  extraMounts:
  - hostPath: /data/provision
    containerPath: /var/local-path-provisioner
  - hostPath: /data
    containerPath: /data
networking:
  disableDefaultCNI: true
  kubeProxyMode: "none"
EOF
```

```sh
kind create cluster --config=kind-config.yaml
```

> `crictl images` command in the kind container to check images.

Your cluster is ready to use in your kubeconfig file `~/.kube/config`.

> Give that config to `Lens` or use with kubectl.

Remove cluster with `kind delete cluster` command.

## Storage PVC

Kind uses `local-path-provisioner` for storage and claims automatically will create persistence volume for you.
Creating persistent volume claim with our `/data/` folder.

> Only support PVC with `ReadWriteOnce` mode.

To use that with PVC

```yaml
# persistent-volume-claim.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: local-pvc
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi

---
# example-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: example-pod
spec:
  containers:
  - name: test-container
    image: nginx
    volumeMounts:
    - mountPath: /usr/share/nginx/html
      name: local-volume
  volumes:
  - name: local-volume
    persistentVolumeClaim:
      claimName: local-pvc
```

## Kind Container is a NODE

Get in the kind container to reach the nodes.

```sh
# docker ps
docker exec -it kind-control-plane bash
```
