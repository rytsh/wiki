---
head:
  - - meta
    - name: description
      content: QEMU command line usage.
  - - meta
    - name: keywords
      content: qemu network
---

# QEMU

Qemu is perfect for creating virtual machines.

```sh
sudo apt-get install -y qemu-system ovmf
```

https://www.qemu.org/docs/master/system/qemu-manpage.html

## Create Disk

qemu-img command to create qcow2 disk image, it will not allocate all space at once.

https://linux.die.net/man/1/qemu-img

```sh
qemu-img create -f qcow2 "disk1.qcow2" "1T"
```

## Network

Create a network card and attach it.

```sh
PROFILE_IN_NETWORK_X1P1=",net=10.10.1.0/24,dhcpstart=10.10.1.20,ipv4"
```

```sh
-device pci-bridge,id=pci.01,chassis_nr=1,addr=06,shpc=off
-netdev user,id=X1P1${PROFILE_IN_NETWORK_X1P1}
-device e1000,netdev=X1P1,bus=pci.01,mac=00:11:22:33:44:AA
```

## Port Forwarding

Add exra port forwarding option to netdev option.

```sh
,hostfwd=tcp:8822-:22
```

## Boot from ISO

Qemu to run iso file we need to add cd drive in our start script. Add bootindex=2 to make it boot from cd if bootindex=1 is not found.

```sh
-device ide-cd,drive=cdx,bootindex=2 -drive if=none,id=cdx,file=./iso/netinstall.iso,cache=unsafe,format=raw \
```

## Start Qemu

Usually you need to make a script to start qemu, and you can use virt-manager.

```sh
qemu-system-x86_64  \
    -machine pc,accel=kvm           \
    -cpu host                       \
    -m 32G                          \
    -enable-kvm                     \
    -nodefaults                     \
    -bios /usr/share/ovmf/OVMF.fd   \
    -device pci-bridge,id=pci.01,chassis_nr=1,addr=06,shpc=off -netdev user,id=X1P1,net=10.10.1.0/24,dhcpstart=10.10.1.20,ipv4 -device e1000,netdev=X1P1,bus=pci.01,mac=00:11:22:33:44:AA \
    -vnc :0 -k en-us -nographic -vga std \
    -drive if=none,id=disk1,file=/mnt/e/VM/disk1.qcow2,cache=unsafe -device ide-hd,drive=disk1,bootindex=1 \
    -watchdog i6300esb -watchdog-action none \
    -boot menu=on,once=d
```

## VNC

You can use mobaxterm, tigervnc or any other vnc client to connect to qemu.
5900 is the default port for qemu vnc.

<!-- ## Network Card

Adding network card directly to qemu fix our problem with bridge network on wsl2.

Create new virtual switch with hyper-v manager.

![hyperv_switch](./assets/hyperv_switch.png)

> https://github.com/dantmnf/WSLAttachSwitch
> Put in your path and run it from cmd.exe directly.

Run this command to add new device.

```sh
cmd.exe /c WSLAttachSwitch.exe "outside"
```

Get new IP address to new card

```sh
ifconfig -a

sudo dhclient eth1
```

Now we can use VFIO or MACVTAP to connect to Qemu.

### Bridge Network

Create a virtual bridge network.

```sh
sudo ip link add br0 type bridge
```

```sh
sudo ip addr flush dev eth1
sudo ip link set eth1 master br0

sudo ip tuntap add dev tap0 mode tap
sudo ip link set tap0 master br0
```

Check bridged network.

```sh
brctl show
```

Get IP address

```sh
sudo ifconfig eth1 0.0.0.0 up
sudo dhclient -v br0
```

Set IP address

```sh
sudo ip addr add 10.10.1.10/24 dev tap0
sudo ip link set dev tap0 up
```

Now forward all traffic to tap0 from eth1.

```sh
sudo iptables -I INPUT -i eth1 -j ACCEPT
sudo iptables -I OUTPUT -o eth1 -j ACCEPT
sudo iptables -t nat -A POSTROUTING -o eth1 -j MASQUERADE
sudo iptables -I FORWARD -i eth1 -o tap0 -j ACCEPT
sudo iptables -I FORWARD -i tap0 -o eth1 -j ACCEPT

sudo iptables -A FORWARD -i tap0 -o eth1 -j ACCEPT
sudo iptables -A FORWARD -i eth1 -o tap0 -m state --state ESTABLISHED,RELATED -j ACCEPT
sudo iptables -t nat -A POSTROUTING -o eth1 -j MASQUERADE

```

Add to qemu start script.

```sh
-netdev tap,id=X1P1,ifname=tap0,script=no,downscript=no -device e1000,netdev=X1P1,mac=00:11:22:33:44:01 \
```


### MACVTAP

```sh
sudo ip link add link eth1 name macvtap0 type macvtap mode bridge
sudo ip link set macvtap0 up

# sudo ip link delete macvtap0
sudo ip addr add dev macvtap0 192.168.68.200/22
```

For ip tables

```sh
sudo iptables -I INPUT -i macvtap0 -j ACCEPT
sudo iptables -I OUTPUT -o macvtap0 -j ACCEPT
```

Add to qemu start script.

```sh
-device virtio-net-pci,mac=ba:53:4d:71:a5:46,netdev=net0,id=net0 -netdev tap,id=net0,ifname=macvtap0,script=no,downscript=no \
``` -->

<!--
## Bridge Network

> Good articles
> https://gist.github.com/extremecoders-re/e8fd8a67a515fee0c873dcafc81d811c

Qemu is running but we need to have a bridge network to connect from our host to the virtual machine.

Create a virtual bridge network.

```sh
sudo ip link add br0 type bridge
```

```sh
sudo ip addr flush dev eth1
sudo ip link set eth1 master br0

sudo ip tuntap add dev tap0 mode tap
sudo ip link set tap0 master br0
```

```sh
sudo ip link set dev br0 up
sudo ip link set dev tap0 up
```

Check bridged network.

```sh
brctl show
```

Get IP address

```sh
sudo ifconfig eth1 0.0.0.0 up
sudo dhclient -v br0
```

Now add new network card to qemu and we can directly connect to it.

```sh
-netdev tap,id=X1P1,ifname=tap0,script=no,downscript=no -device e1000,netdev=X1P1,mac=00:11:22:33:44:01 \
```

<details><summary>Old way</summary>

Add settings to enable.

`/etc/sysctl.conf` should have `net.ipv4.ip_forward = 1` uncommented.

After that run

```sh
sysctl -p
sysctl -a | grep net.ipv4.ip_forward
```

```sh
sudo mkdir -p /etc/qemu
echo "allow qemubr0" | sudo tee /etc/qemu/bridge.conf
sudo chown root:kvm /etc/qemu/bridge.conf
sudo chmod 0660 /etc/qemu/bridge.conf

sudo chmod u+s /usr/lib/qemu/qemu-bridge-helper
```

Add bridge to qemu start script.

```sh
-device pci-bridge,id=pci.02,chassis_nr=1,addr=07,shpc=off -netdev bridge,br=qemubr0,id=n1 -device virtio-net,netdev=n1,bus=pci.02,mac=00:11:22:33:44:02
```

Give IP address to bridge.

```sh
sudo ip addr add 10.10.1.10/24 dev qemubr0
sudo ip link set qemubr0 up
```

Delete
```sh
sudo ip link set qemubr0 up
sudo brctl delbr qemubr0
```

```sh
sudo iptables -I INPUT -p udp --dport 67:68 --sport 67:68 -j ACCEPT
sudo iptables -I OUTPUT -p udp --dport 67:68 --sport 67:68 -j ACCEPT

sudo iptables -t nat -A POSTROUTING -o br0 -j MASQUERADE

sudo iptables -L -v -n --line-numbers
sudo iptables -L INPUT --line-numbers
sudo iptables -D INPUT 3
```

</details> -->
