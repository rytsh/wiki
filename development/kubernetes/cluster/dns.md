# Core DNS

Setup a core DNS server locally to reach all of our gateways without any problem.

In here we transfer all DNS solution of `*.kube.com` to our cilium gateway which is `10.0.10.0`.  
Others will use our WSL's DNS address which is I get from `cat /etc/resolv.conf` command.

Create locahost certificate

```sh
mkcert -key-file key.pem -cert-file cert.pem localhost
# copy CA public key as well
cp $(mkcert -CAROOT)/rootCA.pem .
```

```sh
cat <<EOF > Corefile
kube.com {
    file /etc/coredns/cluster.kube
    reload
    errors
    log
    cache 30
}

. {
    forward . 10.255.255.254 {
        tls_servername dns.google
    }
    cache 30
}

https://.:5553 {
    tls cert.pem key.pem {
        client_auth nocert
    }
    forward . /etc/resolv.conf
    errors
    log
}
EOF
```

```sh
cat <<EOF > kube.com
@ 3600 IN SOA kube.com. admin.kube.com. (
    1          ; serial
    7200       ; refresh (2 hours)
    3600       ; retry (1 hour)
    1209600    ; expire (2 weeks)
    3600       ; minimum (1 hour)
    )

*     IN A     10.0.10.0
EOF
```

Now run it

```sh
docker run -d --restart=always --name=coredns \
  -v $(pwd)/Corefile:/Corefile -v $(pwd)/kube.com/etc/coredns/kube.com \
  -v $(pwd)/rootCA.pem:/ca.pem -v $(pwd)/cert.pem:/cert.pem -v $(pwd)/key.pem:/key.pem \
  --dns=127.0.0.1 \
  -p 0.0.0.0:5553:5553 \
  coredns/coredns:1.12.0
```

Test with kdig

```sh
sudo apt install knot-dnsutils
```

```sh
kdig -d @localhost -p 5553 +tls-ca=/rootCA.pem +tls-hostname=localhost wikipedia.org
```

## Forward 10.0.10.0/24 to cilium

> TODO Still checking

First we need to forward all traffic to cilium gateway.

Do it in node:

```sh
ip route add 10.0.10.0/24 via $(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="InternalIP")].address}')
sysctl -w net.ipv4.ip_forward=1
```

Second we need to tell in our local machine to forward all traffic to that machine.

```sh
ip route add 10.0.10.0/24 via $(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' kind-control-plane)
```
