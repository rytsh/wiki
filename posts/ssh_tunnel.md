---
head:
  - - meta
    - name: description
      content: SSH tunnel that allows you to create a secure connection between two networks over an untrusted network.
  - - meta
    - name: keywords
      content: ssh tunnel sshuttle
---

# SSH Tunnel

sshuttle is very useful for accessing a remote network via ssh.

First run in a ssh server container in the remote machine which also has python:

```sh
docker run -d --restart always -p 8822:22 \
--name ssh-tunnel \
ghcr.io/rytsh/dock/ssh:latest
```

Default username and password is `user` and `user#1234`.

Try to access with ssh but skip host key checking due to it is a new container:

```sh
ssh -p 8822 -o StrictHostKeyChecking=no user@localhost
```

## sshuttle

Install sshuttle in the local machine [sshuttle](https://github.com/sshuttle/sshuttle).
This service redirect our network traffic to the remote network via ssh.

Now we can access the `10.10.1.0/24` network in the remote machine with running:

```sh
sudo $(which sshuttle) -v -e "ssh -o StrictHostKeyChecking=no" --python python3 -r user@localhost 10.10.1.0/24
```
