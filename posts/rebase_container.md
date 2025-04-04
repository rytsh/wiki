---
head:
  - - meta
    - name: description
      content: Rebase a container image to a new base image.
  - - meta
    - name: keywords
      content: crane docker rebase
---

# Rebase Container

Crane tool has rebase command to rebase a container image to a new base image.
This is useful when the base image is updated and you want to update the container image to use the new base image.

https://github.com/google/go-containerregistry/tree/main/cmd/crane

```sh
VERSION=v0.19.0
OS=Linux
ARCH=x86_64

curl -fSL https://github.com/google/go-containerregistry/releases/download/${VERSION}/go-containerregistry_${OS}_${ARCH}.tar.gz | tar -oxz -C ~/bin/ crane
```

## Example

Old dockerfile

```dockerfile
FROM alpine:3.18.6

COPY test test
```

First build the container image

```sh
docker build -t rytsh/test:3.18.6 .
docker push rytsh/test:3.18.6
```

Rebase the container image to use `alpine:3.19.1` as the base image

```sh
# first login with crane
crane auth login docker.io -u rytsh -p <password>
crane rebase --old_base alpine:3.18.6 --new_base alpine:3.19.1 -t rytsh/test:3.19.1 rytsh/test:3.18.6
```
