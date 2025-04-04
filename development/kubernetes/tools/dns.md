---
head:
  - - meta
    - name: description
      content: DNS installation and configuration guide.
  - - meta
    - name: keywords
      content: dns
---

# DNS

DNS server for finding machines.

## CoreDNS

Choice of CoreDNS due to basic usage and have lots of pluging inside.

You can use in docker

```sh
docker run -d --restart=always --name=coredns -v $(pwd)/Corefile:/Corefile --dns=127.0.0.1 -p 10.10.10.1:53:53/tcp -p 10.10.10.1:53:53/udp coredns/coredns:1.8.0
```

But I will choice package manager beacuse it is tiny doesn't have any dependencies.

For Alpine enable first community repo.

```sh
management:~# cat /etc/apk/repositories
#/media/cdrom/apks
http://mirror1.hs-esslingen.de/pub/Mirrors/alpine/v3.18/main
http://mirror1.hs-esslingen.de/pub/Mirrors/alpine/v3.18/community
```

```sh
# apk update
apk add coredns coredns-openrc
```

And `Corefile` is like this

```
cluster.kube-cluster {
    hosts {
        10.10.10.1 management.kube-cluster cluster.kube-cluster
        10.10.10.51 master1.cluster.kube-cluster
        10.10.10.52 master2.cluster.kube-cluster
        10.10.10.53 master3.cluster.kube-cluster
        10.10.10.71 node1.cluster.kube-cluster
        10.10.10.72 node2.cluster.kube-cluster
        10.10.10.73 node3.cluster.kube-cluster
        10.10.10.74 node4.cluster.kube-cluster
        10.10.10.75 node5.cluster.kube-cluster
    }
    reload
    errors
    log
}

. {
    forward . 8.8.8.8 8.8.4.4 {
        tls_servername dns.google
    }
    cache 30
}
```

For additional cluster just add new stanza.

Edit init file to use `Corefile` check `/etc/init.d/coredns` file.

It already has a `${COREDNS_CONFIG}` variable and we can use it and openrc it will set in the `/etc/conf.d/coredns` file.

It is show `/etc/coredns/Corefile` so just change in there.

Enable and start

```sh
rc-update add coredns default
rc-service coredns start
```

### Wildcard record

Add this content

cluster.dev {
    file /etc/coredns/cluster.dev
    reload
    errors
    log
}

`admin.cluster.dev.` equal to `admin@cluster.dev` mail address, check SOA.

```
@ 3600 IN SOA cluster.dev. admin.cluster.dev. (
    1          ; serial
    7200       ; refresh (2 hours)
    3600       ; retry (1 hour)
    1209600    ; expire (2 weeks)
    3600       ; minimum (1 hour)
    )

*     IN A     10.1.2.10
```

Now every request like `www.cluster.dev` or `test.cluster.dev` show same IP.

This is very useful for our ingress. Now ingress control virtual host names.

### Redirect DNS

```
. {
    forward . 8.8.8.8 8.8.4.4 {
        tls_servername dns.google
    }
    cache 30
}
```

### Use own DNS

Edit `/etc/resolv.conf` file and add this line

```
nameserver 10.10.10.1
```
