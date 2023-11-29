# Port

`1-65535` avaliable ports and in range `1-1023` are the privileged ones.

## Enable 1-1023 ports

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
