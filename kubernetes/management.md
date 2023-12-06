# Management Machine

For creating a cluster, first we need a management machine to setup dhcp, pxe, dns, etc.  
I use `alpine linux` for this. It is a very small linux distro and perfect for this job.  

First give the iso URL to the proxmox and it will download it.

When creating the virtual machine, give it 2 cores and 1GB of ram.  
Also give it a 32GB disk, (based on kernel setting sata can view it).

For network, give it 2 network cards. One for the internet and one for the internal network.  
Use Intel E1000 for both of them.

And our cluster machines just will be in the internal network.

For creating internal network just create a new bridge and give it a name and leave the gateway empty.

I use to go to internet with the management machine.

#### Network Config

Setting manual IP address for the management machine.

In my case eth0 is the internet and eth1 is the internal network.

```sh
cat /etc/network/interfaces 
auto lo
iface lo inet loopback

auto eth0
iface eth0 inet static
        address 192.168.68.220/24

auto eth1
iface eth1 inet static
        address 10.10.10.1/24

up ip route add default via 192.168.68.1
```

And need to restart the network service.

```sh
rc-service networking restart
```

Inside of the `/etc/resolv.conf` file, we set search name.  
To set directly with command line use this command:

```sh
setup-dns -s kube-cluster
```

```sh
cat /etc/resolv.conf
search kube-cluster
nameserver 192.168.68.1
```

Also need to set route for connecting to internet, if you didn't set in network config.

```sh
ip route add default via 192.168.68.1
```

We will change nameserver later and use our own dns server.

I used in dhcpd server `kube-cluster` as domain name so `management.kube-cluster` will be the management machine's hostname.

### SSH

Inside of the /etc/ssh/sshd_config file, we need to change the `PermitRootLogin` to `yes` and restart the service.  
After pushing the ssh key to the management machine, we can connect to it with ssh and close the root login.

> If you can directly to push public-key to the management machine, that would be better!

```sh
# push the ssh public key to the management machine
ssh-copy-id root@192.168.68.220
```

Now we can connect to the management machine with ssh.

```sh
ssh root@192.168.68.220
```

And switch `PermitRootLogin` to `prohibit-password` and restart the service.

```sh
rc-service sshd restart
```

Change the motd message.

```sh
vim /etc/motd
```

### TFTP

Go and install [tftp](../tools/server/tftp).

https://wiki.alpinelinux.org/wiki/Netboot_Alpine_Linux_using_iPXE

For setup ipxe, we need to add `boot.ipxe` file to the `/var/tftpboot/` directory.

```
#!ipxe

set base-url http://10.10.10.1:7080

kernel ${base-url}/boot/vmlinuz-virt console=tty0 modules=loop,squashfs quiet nomodeset alpine_repo=https://dl-cdn.alpinelinux.org/alpine/v3.18/main modloop=http://10.10.10.1:7080/boot/modloop-virt
initrd ${base-url}/boot/initramfs-virt
boot
```

```sh
mkdir -p /var/boot
cd /var/boot

curl -fSL https://dl-cdn.alpinelinux.org/alpine/v3.18/releases/x86_64/alpine-netboot-3.18.5-x86_64.tar.gz | tar -xz --overwrite
```

Now we need to serve this directory to `0.0.0.0:7080`

With [turna](https://worldline-go.github.io/turna/introduction/getting-started.html#linux), we can do this.

```sh
# install it to /bin/ directory
curl -fSL https://github.com/worldline-go/turna/releases/latest/download/turna_Linux_x86_64.tar.gz | tar -xz --overwrite -C /bin/ turna

# add config to /var/boot/turna.yaml
cat <<EOF > /var/boot/turna.yaml
server:
  entrypoints:
    web:
      address: ":7080"
  http:
    middlewares:
      folder:
        folder:
          path: /var/boot
          browse: true
    routers:
      boot:
        path: /*
        middlewares:
          - folder
EOF
```

Now we can start `turna` server

```sh
CONFIG_FILE=/var/boot/turna.yaml turna
```

We enabled the browse option so we can check the files from the browser.

### DHCPD

Go and install [dhcpd](../tools/server/dhcpd) after that setup same as network config.

## Add machines to the cluster

Create new machine but just give 1 network for internal bridge and set mac address manually based on DHCPD config.

When we setup the correctly tftpd and dhcpd, we can see the ipxe will work and we can see the alpine linux boot screen.
