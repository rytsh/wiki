# headlamp

> I really liked headlamp amazing tool 🎉

> https://headlamp.dev/  
> https://artifacthub.io/packages/helm/headlamp/headlamp

Lens like dashboard for kubernetes, it has web-based UI and easy to use.

```sh
helm repo add headlamp https://headlamp-k8s.github.io/headlamp/
helm install headlamp headlamp/headlamp --namespace kube-system
```

Create http route to access it

```sh
cat <<EOF | kubectl -n kube-system apply -f -
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: headlamp-kube
spec:
  parentRefs:
  - name: kube
    namespace: default
  hostnames:
  - "headlamp.kube.com"
  rules:
  - matches:
    - path:
        type: PathPrefix
        value: /
    backendRefs:
    - name: headlamp
      port: 80
      namespace: kube-system
EOF
```

Create Token

```sh
kubectl create token headlamp --namespace kube-system
```
