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

Create folder `/opt/registry` and run the following command to start a registry.

```sh
sudo install -d -m 0777 /opt/registry
```

Append authentication to the registry.

```sh
-e REGISTRIES="k8s.gcr.io gcr.io quay.io your.own.registry another.public.registry" \
-e AUTH_REGISTRIES="auth.docker.io:dockerhub_username:dockerhub_password your.own.registry:username:password" \
```

```sh
docker run -d --restart=always --name docker_registry_proxy \
    --net kind --hostname docker-registry-proxy \
    -p 0.0.0.0:3128:3128 -e ENABLE_MANIFEST_CACHE=true \
    -v /opt/registry/docker_mirror_cache:/docker_mirror_cache \
    -v /opt/registry/docker_mirror_certs:/ca \
    rpardini/docker-registry-proxy:0.6.4
```

Kind installation complete run these commands to setup the registry.

```sh
KIND_NAME=${1-kind}
SETUP_URL=http://docker-registry-proxy:3128/setup/systemd
pids=""
for NODE in $(kind get nodes --name "$KIND_NAME"); do
  docker exec "$NODE" sh -c "\
      curl $SETUP_URL \
      | sed s/docker\.service/containerd\.service/g \
      | sed '/Environment/ s/$/ \"NO_PROXY=127.0.0.0\/8,10.0.0.0\/8,172.16.0.0\/12,192.168.0.0\/16\"/' \
      | bash" & pids="$pids $!" # Configure every node in background
done
wait $pids # Wait for all configurations to end
```
