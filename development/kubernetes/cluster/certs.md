# Cert Manager

Auto generate certificates for Kubernetes.

```sh
helm repo add jetstack https://charts.jetstack.io
```

```sh
cat <<EOF | grep -v '^[[:space:]]*$' | xargs -I {} sh -c 'docker pull {} && kind load docker-image {}'
quay.io/jetstack/cert-manager-cainjector:v1.16.2
quay.io/jetstack/cert-manager-controller:v1.16.2
quay.io/jetstack/cert-manager-startupapicheck:v1.16.2
quay.io/jetstack/cert-manager-webhook:v1.16.2
EOF
```

```sh
helm install cert-manager jetstack/cert-manager \
  --create-namespace \
  --namespace cert-manager \
  --set config.apiVersion="controller.config.cert-manager.io/v1alpha1" \
  --set config.kind="ControllerConfiguration" \
  --set crds.enabled=true \
  --set config.enableGatewayAPI=true
```

Create CA issuer

```sh
kubectl apply -f https://raw.githubusercontent.com/cilium/cilium/1.16.5/examples/kubernetes/servicemesh/ca-issuer.yaml
```

```sh
cat <<EOF | kubectl apply -f -
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: kube
  namespace: default
  annotations:
    cert-manager.io/issuer: ca-issuer
spec:
  gatewayClassName: cilium
  listeners:
    - name: kube-subdomain
      hostname: "*.kube.com"
      port: 443
      protocol: HTTPS
      allowedRoutes:
        namespaces:
          from: All
      tls:
        mode: Terminate
        certificateRefs:
          - name: kube-com-tls
    - name: kube
      hostname: kube.com
      port: 443
      protocol: HTTPS
      allowedRoutes:
        namespaces:
          from: All
      tls:
        mode: Terminate
        certificateRefs:
          - name: kube-com-tls
EOF
```

Auto generated certificates on the gateway.

```sh
kubectl describe certificates.cert-manager.io kube-com-tls
#....
#Spec:
#  Dns Names:
#    *.kube.com
#    kube.com
```

# mkcert

> Use cert manager for better management of certificates.

Go application to easily create certificates.

> https://github.com/FiloSottile/mkcert

## Installation

```sh
curl -fSLO https://github.com/FiloSottile/mkcert/releases/download/v1.4.4/mkcert-v1.4.4-linux-amd64
chmod +x mkcert-v1.4.4-linux-amd64
sudo mv mkcert-v1.4.4-linux-amd64 /usr/local/bin/mkcert
```

## Usage

Generate keys

```sh
mkcert -key-file key.pem -cert-file cert.pem kube.com "*.kube.com" localhost 127.0.0.1 ::1
```

Show CA key path

```sh
mkcert -CAROOT
```
