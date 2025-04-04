---
head:
  - - meta
    - name: description
      content: Port forwarding with netsh in Windows.
  - - meta
    - name: keywords
      content: port forwarding netsh
---

# Port

## Port Forwarding Windows

> To do that you need to run command prompt as administrator.

Add port forwarding rule.

```sh
netsh.exe interface portproxy add v4tov4 listenport=8080 listenaddress=192.168.1.10 connectport=8080 connectaddress=172.16.10.10
```

Show port forwarding rules.

```sh
netsh.exe interface portproxy show all
```

Delete port forwarding rule.

```sh
netsh.exe interface portproxy delete v4tov4 listenport=8080 listenaddress=192.168.1.10
```

## Port Forwarding SSH

```sh
ssh -nNT -L 5858:localhost:5757 remotehost
```

Now request to `localhost:5858` will be forwarded to `localhost:5757` of the remote machine.

Use `-R` instead of `-L` to reverse the direction of the tunnel.

In remote host, request to `localhost:5858` will be forwarded to `localhost:5757` of the local machine.

## Enable 1-1023 ports

`1-65535` avaliable ports and in range `1-1023` are the privileged ones.

Give permisstion to run below 1024 port number.

### Method 1 - sysctl disable

Directly disable to protect port 1024 below.

```sh
sudo sysctl -w net.ipv4.ip_unprivileged_port_start=0
```

### Method 2 - setcap

Setcap to allow port 1024 below to specific program.

```sh
sudo setcap 'cap_net_bind_service=+ep' /path/to/program
```

### Method 3 - authbind

First install authbind tool and give permission to ports.

```sh
sudo touch /etc/authbind/byport/443
sudo chmod 500 /etc/authbind/byport/443
sudo chown $USER /etc/authbind/byport/443
```

After that run with authbind, `--deep` means effect other dependecy program.

```sh
authbind --deep myprogram
```
