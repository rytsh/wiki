# Registry

> TODO: UPDATE HERE

When moving images to kind like that it is slow and and every cluster will have to download the same image. To avoid this we can use a registry.

```sh
cat <<EOF | grep -v '^[[:space:]]*$' | xargs -I {} sh -c 'docker pull {} && kind load docker-image {}'
quay.io/prometheus-operator/prometheus-config-reloader:v0.79.2
quay.io/prometheus-operator/prometheus-operator:v0.79.2
quay.io/prometheus/alertmanager:v0.27.0
quay.io/prometheus/node-exporter:v1.8.2
quay.io/prometheus/prometheus:v3.0.1
EOF
```

```sh
docker run -d --name proxy --restart=always --net=kind -e REGISTRY_PROXY_REMOTEURL=https://registry-1.docker.io registry:2
```
