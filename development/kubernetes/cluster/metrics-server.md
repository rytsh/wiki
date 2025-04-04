---
head:
  - - meta
    - name: description
      content: Metric server for current metrics.
  - - meta
    - name: keywords
      content: kubernetes metric
---

# Metric Server

Metrics server just for current metrics show for kubernetes top command.
You need to still install prometheus stack for monitoring.

> https://github.com/kubernetes-sigs/metrics-server
> https://github.com/MartinHeinz/metrics-on-kind

Enable metrics server to get metrics from your cluster.

```sh
echo "> Install metrics-server"
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
kubectl patch -n kube-system deployment metrics-server --type=json -p '[{"op":"add","path":"/spec/template/spec/containers/0/args/-","value":"--kubelet-insecure-tls"}]'
```

Verify of metrics api

```sh
kubectl top nodes
```
