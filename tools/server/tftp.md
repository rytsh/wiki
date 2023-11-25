# TFTP

With Alpine Linux

```sh
apk add tftp-hpa
```

After that add pxe files in /var/tftpboot/

```sh
curl -fL -o /var/tftpboot/ipxe.efi https://boot.alpinelinux.org/alpine-ipxe/x86_64/ipxe.efi
```

And start the tftp server

```sh
rc-update add in.tftpd default
rc-service in.tftpd start
```

Now you can use with your dhcpd server with showing next-server address.
