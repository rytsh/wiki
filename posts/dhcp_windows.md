---
head:
  - - meta
    - name: description
      content: DHCP management in Windows.
  - - meta
    - name: keywords
      content: DHCP Windows
---

# DHCP Windows

In windows, I have sometimes problem with connection to internet on wifi due to DHCP auto IP adds not working properly.
To fix that I just calling manually DHCP client to get new IP address.

Open cmd as administrator and run below command.

Show network interfaces

```sh
netsh.exe interface show interface
```

Get new IP address

```sh
netsh.exe interface ip set address name="Wi-Fi" source=dhcp
```
