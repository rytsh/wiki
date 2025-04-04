---
head:
  - - meta
    - name: description
      content: Network IP address management and configuration.
  - - meta
    - name: keywords
      content: network IP address
---

# Network

Communication with IP, DNS and cluster networking.

## IP

Communication with other machine we need to same network or need a router

```sh
# show devices
ip link
# show address
ip addr
# add a new address
ip addr add 192.168.1.10/24 dev eth0
# for delete
ip addr del 192.168.1.10/24 dev eth0
```

When we go to other network our exit door is __gateway__, example our for `route` command

```sh
$ route
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
default         _gateway        0.0.0.0         UG    0      0        0 ens37
172.17.0.0      0.0.0.0         255.255.0.0     U     0      0        0 docker0
172.18.0.0      0.0.0.0         255.255.0.0     U     0      0        0 br-5f56f9625c4c
192.168.2.0     0.0.0.0         255.255.255.0   U     0      0        0 ens37
192.168.39.0    0.0.0.0         255.255.255.0   U     0      0        0 virbr1
192.168.122.0   0.0.0.0         255.255.255.0   U     0      0        0 virbr0
```

But we need to declare gateway to reach specific network.
In here we want to go to `192.168.2.9/24` network but use `192.168.1.1`.

```sh
ip route add 192.168.2.0/24 via 192.168.1.1
```

For other network we need to tell default gateway (you can use `0.0.0.0` instead of `default`)

```sh
ip route add default via 192.168.2.1
```

Delete route

```sh
ip route del default
ip route del 10.0.0.0/24 via 192.168.0.36
```

When you reach to one machine to another of another machine, you need to declare route for related machines.
In linux machine ip forward disabled to prevent directly connect private network.

```sh
cat /proc/sys/net/ipv4/ip_forward
# set change
echo 1 > /proc/sys/net/ipv4/ip_forward
# persistent change in /etc/sysctl.conf

echo  net.ipv4.ip_forward = 1 >> /etc/sysctl.conf
sysctl -p
sysctl -a | grep net.ipv4.ip_forward
```

Also look at the Metric variable for priority.

## Network Namespaces

Create private network area to use in our app.

```sh
# red namespace add
ip netns add red
# blue namespace add
ip netns add blue

# get namespaces
ip netns
```

Run ip command in namespace

```sh
ip netns exec red ip link
# Or
ip -n red link

ip -n red arp
ip -n red route
```

Create virtual network

```sh
ip link add veth-red type veth peer name veth-blue
```

Veth create 2 paired network device.
https://man7.org/linux/man-pages/man4/veth.4.html

Add virtual devices to namespaces

```sh
ip link set veth-red netns red
ip link set veth-blue netns blue
```

Add an ip address

```sh
ip -n red addr add 192.168.15.1 dev veth-red
ip -n blue addr add 192.168.15.2 dev veth-blue
```

up veth

```sh
ip -n red link set veth-red up
ip -n blue link set veth-blue up
```

ping red to blue

```sh
ip netns exec red ping 192.168.15.2
```

When delete one veth also it will delete own pair

```sh
ip -n red link dev veth-red
```

## Bridge

Bridge work like switch.

Create bridge

```sh
ip link add v-net-0 type bridge
```

Check with `ip link`

Up bridge

```sh
ip link set dev v-net-0 up
```

Create 2 veth to link namespaces with bridge.

```sh
ip link add veth-red type veth peer name veth-red-br

ip link add veth-blue type veth peer name veth-blue-br
```

Add pairs to namespace and bridge.

```sh
ip link set veth-red netns red
ip link set veth-red-br master v-net-0

ip link set veth-blue netns blue
ip link set veth-blue-br master v-net-0
```

Add ip address

```sh
ip -n red addr add 192.168.15.1 dev veth-red
ip -n blue addr add 192.168.15.2 dev veth-blue

# up
ip -n red link set veth-red up
ip -n blue link set veth-blue up
```

When reaching host to namespaces' device we need to add ip address to bridge

```sh
ip addr add 192.168.15.5/24 dev v-net-0
```

Now you can check

```sh
ping 192.168.15.1
```

When reaching namespace to other network

```sh
$ ip netns exec blue ping 192.168.1.3
Connect: Network is unreachable
```

You can not reach due to route not set

```sh
ip netns exec blue route
```

Add route

```sh
ip netns exec blue ip route add 192.168.1.0/24 via 192.168.15.5
```

But this time you can reach 192.168.1.0 but cannot get data
Add nat

```sh
iptables -t nat -A POSTROUTING -s 192.168.15.0/24 -j MASQUERADE
```

Now you can communicate

List Nat

```sh
iptables -t nat -v -L -n --line-number

#delete a rule
iptables -t nat -D POSTROUTING {rule-number-here}
```

But if you want to go to internet in namespace you need to add default route to namespace

```sh
ip netns exec blue ip route add default via 192.168.15.5
```

Now you can communicate with outside network
But if outside network need to communicate inside namespace

You can add route to outside machine but this is not useful so use port forwarding

```sh
ip tables -t nat -A PREROUTING --dport 80 --to-destination 192.168.15.2:80 -j DNAT
```

Any comming traffic in 80 goes to 192.168.15.2:80

https://www.cyberciti.biz/tips/linux-iptables-examples.html
https://www.karlrupp.net/en/computer/nat_tutorial
https://www.revsys.com/writings/quicktips/nat.html
https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/4/html/security_guide/s1-firewall-ipt-fwd
