# Machine

## Alpine

When open the alpine and see the login screen, just type `root` and press enter.

```
setup-alpine

-> keyboard none
-> hostname master1
-> initialize interface eth0
-> set dhcp
-> manual network configuration no
-> password toor
-> timezone UTC
-> no need proxy
-> mirror select Triple Alkmar 9
-> setup a user no
-> openssh yes
-> ssh prohibit-password
-> sshkey URL to your public key, http://10.10.10.1:7080/id_rsa.pub
-> select disk sda
-> use sys
-> erase disk yes
```

Installation completed and reboot machine.

### Install packages

```sh
apk update
apk add bash bash-completion vim curl iproute2-ss uuidgen
```

Set bash as default shell in `/etc/passwd` file.

### Clone Machine

> Do that after adding all packages for kubernetes.

Set machine as template and before to that close the machine.

```sh
poweroff
```

Select as template and change name to node.

After that click to clone and set a name like `master1` or `worker1`.

Before to start the machine, change the mac address based on dhcpd config.

After to create new machine, set it as template for worker and reduce memory.

### Set Hostname

> TODO: configure hostname automatically with dhcp

Add new hostname

```sh
NODE_NAME=master2

echo "${NODE_NAME}" > /etc/hostname
hostname -F /etc/hostname
sed -i s@master1@${NODE_NAME}@g /etc/hosts

uuidgen > /etc/machine-id
```
