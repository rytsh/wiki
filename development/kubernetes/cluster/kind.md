# Kind

> https://kind.sigs.k8s.io/

Easiest way to create a kubernetes cluster is open cluster in a docker container.  
Containers will be as our nodes.

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

Create a cluster with `cilium`

> https://docs.cilium.io/en/latest/installation/kind/

Cilium can solve of networking between pods and nodes.

```sh
sudo mkdir -p /data

cat <<EOF > kind-config.yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  extraMounts:
  - hostPath: /data
    containerPath: /var/local-path-provisioner
networking:
  disableDefaultCNI: true
  kubeProxyMode: "none"
  podSubnet: "10.2.0.0/16"
  serviceSubnet: "10.3.0.0/16"
EOF
```

```sh
kind create cluster --config=kind-config.yaml
```

> `crictl images` command in the kind container to check images.

Install gateway CRDs to kubernetes cluster.

```sh
# https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.2.1/experimental-install.yaml
# https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.2.1/standard-install.yaml

kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.2.1/standard-install.yaml
```

Install cilium:

```sh
helm repo add cilium https://helm.cilium.io/
```

Before to install cilium push images first to kind

```sh
cat <<EOF | grep -v '^[[:space:]]*$' | xargs -I {} sh -c 'docker pull {} && kind load docker-image {}'
quay.io/cilium/cilium:v1.16.5
quay.io/cilium/cilium-envoy:v1.30.8-1733837904-eaae5aca0fb988583e5617170a65ac5aa51c0aa8
quay.io/cilium/operator-generic:v1.16.5
quay.io/cilium/hubble-relay:v1.16.5
quay.io/cilium/hubble-ui-backend:v0.13.1
quay.io/cilium/hubble-ui:v0.13.1
EOF
```

Enable cgroup v2 on `/mnt/c/Users/<USER>/.wslconfig` file, add this line:

```
[wsl2]
kernelCommandLine = cgroup_no_v1=all
```

Now restart the WSL2 with `wsl --shutdown` command.

Enable in docker

Add this parameter `--default-cgroupns-mode=private` end of the `ExecStart` in `/etc/systemd/system/multi-user.target.wants/docker.service`

```sh
sudo systemctl daemon-reload
sudo systemctl restart docker
```

```sh
helm install cilium cilium/cilium --version 1.16.5 \
  --namespace kube-system \
  --set ipam.mode=kubernetes \
  --set routingMode=native \
  --set ipv4NativeRoutingCIDR=10.0.0.0/8 \
  --set socketLB.enabled=true \
  --set bpf.tproxy=true \
  --set bpf.masquerade=true \
  --set image.pullPolicy=IfNotPresent \
  --set gatewayAPI.enabled=true \
  --set k8sServiceHost=kind-control-plane \
  --set k8sServicePort=6443 \
  --set l2announcements.enabled=true \
  --set externalIPs.enabled=true \
  --set l7Proxy=true \
  --set kubeProxyReplacement=true \
  --set hubble.relay.enabled=true \
  --set hubble.ui.enabled=true \
  --set operator.replicas=1
```

After that set replicas 1 to cilium operator

```sh
kubectl -n kube-system scale deployment cilium-operator --replicas 1
```

Your cluster is ready to use in your kubeconfig file `~/.kube/config`.

> Give that config to `Lens` or use with kubectl.

Remove cluster with `kind delete cluster` command.

## Metrics Server

Metrics server just for current metrics show for kubernetes top command.  
You need to still install prometheus stack for monitoring.

> https://github.com/kubernetes-sigs/metrics-server  
> https://github.com/MartinHeinz/metrics-on-kind

Enable metrics server to get metrics from your cluster.

```sh
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

Patch it for kind:

```sh
kubectl patch -n kube-system deployment metrics-server --type=json -p '[{"op":"add","path":"/spec/template/spec/containers/0/args/-","value":"--kubelet-insecure-tls"}]'
```

Verify of metrics api

```sh
kubectl top nodes
```

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

## Load Balancer

> Gateway gets IP addresses with this IP pool

Load balancer help to expose your services to outside IP address.

With `cilium`

```sh
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

<details><summary>Without cilium</summary>

In Kind there is a way use kind provider https://github.com/kubernetes-sigs/cloud-provider-kind

```sh
docker run -d --network kind -v /var/run/docker.sock:/var/run/docker.sock registry.k8s.io/cloud-provider-kind/cloud-controller-manager:v0.4.0
```

</details>

## Kind Container is a NODE

Get in the kind container to reach the nodes.

```sh
# docker ps
docker exec -it kind-control-plane bash
```
