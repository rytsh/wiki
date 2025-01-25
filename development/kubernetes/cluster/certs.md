# Cert Manager

Auto generate certificates for Kubernetes.

```sh
echo "> Add cert-manager repo"
helm repo add jetstack https://charts.jetstack.io || true
helm repo update

echo "> Install cert-manager"
helm install cert-manager jetstack/cert-manager \
  --create-namespace \
  --namespace cert-manager \
  --set config.apiVersion="controller.config.cert-manager.io/v1alpha1" \
  --set config.kind="ControllerConfiguration" \
  --set crds.enabled=true \
  --set config.enableGatewayAPI=true

kubectl create namespace kube-gateway

echo "> Create CA Cluster Issuer"
cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: self-signed
  namespace: kube-gateway
spec:
  selfSigned: {}
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: ca
  namespace: kube-gateway
spec:
  isCA: true
  privateKey:
    algorithm: ECDSA
    size: 256
  secretName: ca
  commonName: ca
  issuerRef:
    name: self-signed
    kind: Issuer
---
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: ca-issuer
  namespace: kube-gateway
spec:
  ca:
    secretName: ca
EOF

echo "> Add *.kube.com address gateway"
cat <<EOF | kubectl apply -f -
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: kube
  namespace: kube-gateway
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

echo "> Add proxy address gateway"
cat <<EOF | kubectl apply -f -
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: kube-proxy
  namespace: kube-gateway
spec:
  gatewayClassName: cilium
  listeners:
    - name: kube-proxy
      hostname: "proxy"
      port: 80
      protocol: HTTP
      allowedRoutes:
        namespaces:
          from: All
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

## Get CA certificate

```sh
kubectl get secrets ca -o jsonpath='{.data.tls\.crt}' | base64 -d > ~/ca.crt
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
