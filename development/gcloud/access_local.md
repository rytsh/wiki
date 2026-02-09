# Access Local

Create certificate with wildcard in certificate manager. Than use `gcloud` command to create mapping.

```sh
gcloud certificate-manager maps create example-map --project=example-project
```

Than add mapping rule to the map.

```sh
gcloud certificate-manager maps entries create example-wildcard-entry \
    --map="example-map" \
    --certificates="example-cert" \
    --hostname="*.example.com" \
    --project=example-project

gcloud certificate-manager maps entries create example-base-entry \
    --map="example-map" \
    --certificates="example-cert" \
    --hostname="xyz.io" \
    --project=example-project
```

---

Check for the URL map with load balancer.

```sh
# this is main IP address we use in load balancer
gcloud compute addresses create kube-lb-ip \
    --ip-version=IPV4 \
    --global

gcloud compute addresses describe kube-lb-ip --global --format="get(address)"

##########

kube-health

gcloud compute instance-groups unmanaged set-named-ports kube-group \
    --named-ports=http:8080 \
    --zone=europe-west4-a

############

gcloud compute backend-services create kube-backend-service \
    --protocol=HTTP \
    --health-checks=kube-health-http \
    --global \
    --port-name=http \
    --timeout=30s

gcloud compute backend-services add-backend kube-backend-service \
    --instance-group=kube-group \
    --instance-group-zone=europe-west4-a \
    --global

gcloud compute url-maps create kube-url-map \
    --default-service=kube-backend-service

gcloud compute target-https-proxies create kube-https-proxy \
    --url-map=kube-url-map \
    --certificate-map=kube-rytsh-io-map

gcloud compute target-http-proxies create kube-http-proxy \
    --url-map=kube-url-map

gcloud compute forwarding-rules create kube-https-forwarding-rule \
    --address=kube-lb-ip \
    --global \
    --target-https-proxy=kube-https-proxy \
    --ports=443

gcloud compute forwarding-rules create kube-http-forwarding-rule \
    --address=kube-lb-ip \
    --global \
    --target-http-proxy=kube-http-proxy \
    --ports=80

gcloud compute url-maps import kube-http-redirect-map \
    --global \
    --source /dev/stdin <<EOF
name: kube-http-redirect-map
defaultUrlRedirect:
  redirectResponseCode: MOVED_PERMANENTLY_DEFAULT
  httpsRedirect: true
  stripQuery: false
EOF

gcloud compute target-http-proxies update kube-http-proxy \
    --url-map=kube-http-redirect-map
```

## Wireguard

```sh
sudo apt install wireguard
wg genkey | sudo tee /etc/wireguard/privatekey | wg pubkey | sudo tee /etc/wireguard/publickey
```

Server Side (`/etc/wireguard/wg0.conf`):


```sh
[Interface]
Address = 10.200.0.1/24
PrivateKey = <cloud-private-key>
ListenPort = 51820

[Peer]
PublicKey = <local-public-key>
AllowedIPs = 10.200.0.2/32  # Local WG IP
```

Also add this

```sh
sudo ip route add 10.0.10.1/32 via 10.200.0.2 dev wg0
```

Client Side (`/etc/wireguard/wg0.conf`):

```sh
[Interface]
Address = 10.200.0.2/24
PrivateKey = <local-private-key>

# Port forwarding için (eğer local router arkasındaysa)
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT

[Peer]
PublicKey = <cloud-public-key>
Endpoint = <cloud-public-ip>:51820  # Cloud'un public IP'si biliniyor
AllowedIPs = 10.200.0.1/32 # Cloud WG IP
PersistentKeepalive = 25  # Bağlantıyı canlı tut
```

Add route in your WSL to control plane.

```sh
# sudo ip route add 10.0.10.0/24 via $(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' kup-control-plane)

# docker network check bridge kind
sudo iptables -I DOCKER-USER -i wg0 -o br-65a645fb34b3 -j ACCEPT
sudo iptables -I DOCKER-USER -i br-65a645fb34b3 -o wg0 -m state --state ESTABLISHED,RELATED -j ACCEPT
```

Start WireGuard on both sides:

```sh
sudo wg-quick up wg0
# sudo systemctl enable wg-quick@wg0
# sudo wg-quick down wg0 && sudo wg-quick up wg0
```

## Server Turna

Turna configuration

```yaml
server:
  entrypoints:
    healthz:
      address: ":8082"
    http:
      address: ":8080"
  http:
    middlewares:
      wireguard:
        service:
          loadbalancer:
            servers:
            - url: http://10.0.10.1
      healthz:
        hello:
          message: "OK"
    routers:
      project:
        endpoints:
          - http
        path: /*
        middlewares:
          - wireguard
      healthz:
        endpoints:
          - healthz
        path: /healthz
        middlewares:
          - healthz
```
