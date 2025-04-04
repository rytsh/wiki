---
head:
  - - meta
    - name: description
      content: Using ssh over https to work with git over restrictive networks.
  - - meta
    - name: keywords
      content: git ssh https
---

# SSH over HTTPS

When using company networks, SSH is often blocked. To bypass this, you can use SSH over HTTPS.

> https://docs.github.com/en/authentication/troubleshooting-ssh/using-ssh-over-the-https-port

Test access with this

```sh
ssh -T -p 443 git@ssh.github.com
```

Now set origin to `ssh.github.com` like that

```sh
git remote set-url origin ssh://git@ssh.github.com:443/YOUR-USERNAME/YOUR-REPOSITORY.git
```

Ready to go 🎉
