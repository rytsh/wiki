---
head:
  - - meta
    - name: description
      content: Proxmox Virtual Machine Management to create, manage, and configure virtual machines.
  - - meta
    - name: keywords
      content: proxmox vm
---

# Virtual Machines

For creating and managing virtual machines, I use `proxmox`. It has a nice web interface and is easy to use.

## Installation

Download the iso from the proxmox website:
https://www.proxmox.com/en/downloads/proxmox-virtual-environment/iso

For creating a bootable usb stick, you can use `dd` or for gui users `balenaEtcher`.

https://etcher.balena.io/#download-etcher

Installation is pretty straight forward. Just follow the instructions.

### Stop VM in Proxmox

Click the shell in browser

```sh
qm stop <vmid>
```

### IP Address motd change

Make changes in this file

```sh
vim /etc/issue
```
