---
head:
  - - meta
    - name: description
      content: DHCPD installation and configuration guide.
  - - meta
    - name: keywords
      content: dhcpd
---

# DHCPD

For giving IP addresses to the clients with specific MAC addresses, `dhcpd` very common option.

Check here for more info: https://wiki.archlinux.org/title/dhcpd

## Installation

With Alpine linux

```sh
# apk update
apk add dhcp
```

Configure it

```sh
vim /etc/dhcp/dhcpd.conf
```

With this config we give IP addresses to the clients with specific MAC addresses.
Other clients will get IP addresses from the range.

We also setting the hostname for the clients.

```
option domain-name kube-cluster;
option domain-name-servers 10.10.10.1;
option subnet-mask 255.255.255.0;
option routers 10.10.10.1;
subnet 10.10.10.0 netmask 255.255.255.0 {
  range 10.10.10.100 10.10.10.250;
}

group {
  #next-server 10.10.10.1;
  #filename "boot.ipxe";

  option domain-name "cluster.kube-cluster";

  host master1.cluster{
    hardware ethernet ba:ba:00:00:11:01;
    fixed-address 10.10.10.51;
    option host-name "master1";
  }

  host master2.cluster{
    hardware ethernet ba:ba:00:00:11:02;
    fixed-address 10.10.10.52;
    option host-name "master2";
  }

  host master3.cluster{
    hardware ethernet ba:ba:00:00:11:03;
    fixed-address 10.10.10.53;
    option host-name "master3";
  }

  host node1.cluster{
    hardware ethernet ba:ba:00:00:12:01;
    fixed-address 10.10.10.71;
    option host-name "node1";
  }

  host node2.cluster{
    hardware ethernet ba:ba:00:00:12:02;
    fixed-address 10.10.10.72;
    option host-name "node2";
  }

  host node3.cluster{
    hardware ethernet ba:ba:00:00:12:03;
    fixed-address 10.10.10.73;
    option host-name "node3";
  }
}
```

Add interface to listen

```sh
vim /etc/conf.d/dhcpd
# DHCPD_IFACE="eth1"
```

Now enable and start the service

```sh
rc-update add dhcpd default
rc-service dhcpd start
```

When you change the config, you need to restart the service

```sh
rc-service dhcpd restart
```
