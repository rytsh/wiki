---
head:
  - - meta
    - name: description
      content: HAPROXY load balancer installation and configuration guide.
  - - meta
    - name: keywords
      content: haproxy load balancer
---

# Load Balancers

## HAPROXY

```sh
apk add haproxy
```

Add config to the `/etc/haproxy/haproxy.cfg` file.

```sh
mv /etc/haproxy/haproxy.cfg /etc/haproxy/haproxy.cfg.bak
```

```sh
defaults
  maxconn 4000
  mode http
  log /dev/log local0
  option dontlognull
  timeout http-request 5s
  timeout connect 5000
  timeout client 2000000 # ddos protection
  timeout server 2000000 # stick-table type ip size 100k expire 30s store conn_cur

frontend kubernetes
    bind *:6443
    mode tcp
    option tcplog
    default_backend kubernetes-cluster

backend kubernetes-cluster
    option httpchk GET /healthz
    http-check expect status 200
    mode tcp
    option ssl-hello-chk
    balance roundrobin
        server master1 master1.cluster.kube-cluster:6443 check
        server master2 master2.cluster.kube-cluster:6443 check
        server master3 master3.cluster.kube-cluster:6443 check
```

Enable and start the service.

```sh
rc-update add haproxy default
rc-service haproxy start
```

Check the connection

```sh
curl -k https://cluster.kube-cluster:6443/healthz
```
