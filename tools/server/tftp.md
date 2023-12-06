# TFTP

With Alpine Linux

```sh
# apk update
apk add tftp-hpa
```

After that add pxe files in /var/tftpboot/

Example alpine's `boot.ipxe` file check https://wiki.alpinelinux.org/wiki/Netboot_Alpine_Linux_using_iPXE

And start the tftp server

```sh
rc-update add in.tftpd default
rc-service in.tftpd start
```

Now you can use with your dhcpd server with showing next-server address.
