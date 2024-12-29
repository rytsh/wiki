# Kubernetes Packages

Use https://artifacthub.io/ to find packages for Kubernetes.

Before installing any package, make sure you have `kubectl` and `helm` installed.  
Also setup completed for your cluster like load balancer, metrics server, etc.

## Prometheus Stack

> https://artifacthub.io/packages/helm/prometheus-community/prometheus

This will add prometheus and grafana to your cluster. This stack uses `helm` to install.

```sh
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
```

> for different storage classes, change `storageClassName`
> 
> ```yaml
> --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.storageClassName=local-storage
> --set grafana.persistence.storageClassName=local-storage
> ```

```sh
helm install kube-prometheus-stack \
  --create-namespace \
  --namespace kube-prometheus-stack \
  prometheus-community/kube-prometheus-stack \
  --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.resources.requests.storage=4Gi \
  --set grafana.persistence.enabled=true \
  --set grafana.persistence.type=pvc \
  --set grafana.persistence.size=2Gi \
  --set "grafana.adminPassword=kube#1234"
```

## Loki Stack

```sh
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
```

```sh
helm install loki \
  --namespace kube-prometheus-stack \
  grafana/loki-stack
```

Add to grafana with this address `http://loki:3100`

> TODO: change data source to persistance

## Tempo

```sh
helm install tempo \
  --namespace kube-prometheus-stack \
  grafana/tempo \
  --set persistence.enabled=true \
  --set persistence.size=5Gi
```

Add to grafana with this address `http://tempo:3100`

## Access Grafana

Access with `grafana.kube.com` with `admin` and `kube#1234` password.

Add route:

```sh
cat <<EOF | kubectl -n kube-prometheus-stack apply -f -
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: grafana-kube
spec:
  parentRefs:
  - name: kube
    namespace: default
  hostnames:
  - "grafana.kube.com"
  rules:
  - matches:
    - path:
        type: PathPrefix
        value: /
    backendRefs:
    - name: kube-prometheus-stack-grafana
      port: 80
      namespace: kube-prometheus-stack
EOF
```

Test with curl in kind container

```sh
curl -kv --connect-to grafana.kube.com:443:10.0.10.0:443 https://grafana.kube.com
```
