# Virtual Machines

For creating and managing virtual machines, I use `proxmox`. It has a nice web interface and is easy to use.

## Installation

Download the iso from the proxmox website:  
https://www.proxmox.com/en/downloads/proxmox-virtual-environment/iso

For creating a bootable usb stick, you can use `dd` or for gui users `balenaEtcher`.

https://etcher.balena.io/#download-etcher

Installation is pretty straight forward. Just follow the instructions.

### Management Machine

For creating a cluster, first we need a management machine to setup dhcp, pxe, dns, etc.  
I use `alpine linux` for this. It is a very small linux distro and perfect for this job.  

First give the iso URL to the proxmox and it will download it.

When creating the virtual machine, give it 2 cores and 1GB of ram.  
Also give it a 32GB disk but set as SATA disk.

For network, give it 2 network cards. One for the internet and one for the internal network.

And our cluster machines just will be in the internal network.

For creating internal network just create a new bridge and give it a name and leave the gateway empty.

I use to go to internet with the management machine.

I used in dhcpd server `kube-cluster` as domain name so `management.kube-cluster` will be the management machine's hostname.
