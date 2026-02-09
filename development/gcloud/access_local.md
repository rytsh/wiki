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
gcloud compute addresses create kube-ip-global \
    --ip-version=IPV4 \
    --global

gcloud compute addresses describe kube-ip-global --format="get(address)"
##########

gcloud compute instance-groups unmanaged set-named-ports kube-group \
    --named-ports=http:8080 \
    --zone=europe-west4-a

############

# Create health check
gcloud compute health-checks create http kube \
    --port=8082 \
    --request-path=/healthz

gcloud compute backend-services create kube-backend \
    --protocol=HTTP \
    --health-checks=kube \
    --global \
    --port-name=http \
    --timeout=30s

gcloud compute url-maps create kube-url-map \
    --default-service=kube-backend

gcloud compute backend-services add-backend kube-backend \
    --instance-group=kube-group \
    --instance-group-zone=europe-west4-a \
    --global

gcloud compute target-https-proxies create kube-https-proxy \
    --url-map=kube-url-map \
    --certificate-map=kube-rytsh-io-map

gcloud compute target-http-proxies create kube-http-proxy \
    --url-map=kube-url-map

gcloud compute forwarding-rules create kube-https-forwarding-rule \
    --address=kube-ip-global \
    --global \
    --target-https-proxy=kube-https-proxy \
    --ports=443

gcloud compute forwarding-rules create kube-http-forwarding-rule \
    --address=kube-ip-global \
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
MTU = 1380

PostUp = ip route add 10.0.10.1/32 via 10.200.0.2 dev wg0

[Peer]
PublicKey = <local-public-key>
AllowedIPs = 10.200.0.2/32, 10.0.10.0/24
PersistentKeepalive = 25
```

Client Side (`/etc/wireguard/wg0.conf`):

```sh
[Interface]
Address = 10.200.0.2/24
PrivateKey = <local-private-key>
MTU = 1380

PostUp = sysctl -w net.ipv4.ip_forward=1
PostUp = ip route add 10.0.10.0/24 via 172.22.0.4
PostDown = ip route del 10.0.10.0/24

[Peer]
PublicKey = <cloud-public-key>
Endpoint = <cloud-public-ip>:51820  # Cloud'un public IP'si biliniyor
AllowedIPs = 10.200.0.1/32 # Cloud WG IP
PersistentKeepalive = 25  # Bağlantıyı canlı tut
```

```sh
# already added in PostUp, but you can add it manually if you want
sudo ip route add 10.0.10.0/24 via $(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' kup-control-plane)
```

Start WireGuard on both sides:

```sh
sudo wg-quick up wg0
# sudo systemctl enable wg-quick@wg0
# sudo wg-quick down wg0 && sudo wg-quick up wg0
```

Check connection:

```sh
sudo wg show
ping 10.200.0.1
```

## GCP firewall rules

With firewall rules, only allow 8080 and 8082 from load balancer IPs and source `130.211.0.0/22` and `135.191.0.0/16` for load balancer health checks.

Control it with `nc` command:

```sh
nc -zv <cloud-public-ip> 8080 -w 1
nc -zv <cloud-public-ip> 8082 -w 1
# For WireGuard should be open for all IPs, but you can test it with:
nc -zuv <cloud-public-ip> 51820 -w 1
```

## Server Turna

Turna configuration, add this to `/etc/turna.yaml`

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

Add turna in systemd

```sh
cat <<EOF | sudo tee /etc/systemd/system/turna.service
[Unit]
Description=turna

[Service]
ExecStart=/usr/local/bin/turna
Restart=always
User=nobody

[Install]
WantedBy=multi-user.target
EOF
```

Enable and start the service:

```sh
sudo systemctl enable turna
sudo systemctl start turna
```

Check logs and status:

```sh
sudo journalctl -u turna -f
sudo systemctl status turna
```

## Q/A

Check connection with TCPdump:

```sh
sudo tcpdump -n -i wg0 host 10.0.10.1
```
