# Pre-requests

## Enable port forwarding

```sh
echo "net.ipv4.ip_forward = 1" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

## Change Kernel

`tproxy` module is used for transparent proxying.  
In WSL2 not exist yet this module but use a patched kernel to use it.

Get existing kernel from https://github.com/Locietta/xanmod-kernel-WSL2

> Use 6.12.7 version, some other versions may not work:  
> https://github.com/Locietta/xanmod-kernel-WSL2/releases/download/6.12.7-locietta-WSL2-xanmod1.1/bzImage-x64v3

Edit `/mnt/c/Users/<username>/.wslconfig`

```
[wsl2]
kernel = C:\\tools\\kernel\\bzImage-x64v3
kernelCommandLine = cgroup_no_v1=all
```

`wsl.exe --shutdown` and restart WSL2.  
`uname -a` to show kernel version.
