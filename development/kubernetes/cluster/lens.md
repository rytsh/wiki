# Lens

> Try another tool like `k9s` or `headlamp`.

Lens is awesome UI for kubernetes but new versions are not free so we use some comminity version on github.

> https://github.com/MuhammedKalkan/OpenLens

## Installation

Install linux version to work without any issue.

### Windows

Windows is easy way to run Lens. Just download exe file and run it.

> I see some error on port forwarding:/

> https://github.com/MuhammedKalkan/OpenLens/releases/download/v6.5.2-366/OpenLens.6.5.2-366.exe

### Linux

For debian based systems (Ubuntu, debian, etc.):

> This will install also additional packages

```sh
curl -fSLO https://github.com/MuhammedKalkan/OpenLens/releases/download/v6.5.2-366/OpenLens-6.5.2-366.amd64.deb && \
sudo apt install ./OpenLens-6.5.2-366.amd64.deb
```

Run with `open-lens` command.

## Add Cluster

`File -> Add Cluster` and replace your `~/.kube/config` file in the editor.

After that your cluster will be ready to use, click and work it.

## Add Extension

Add this extension to see logs and shell in the pod's menu.

```
@alebcay/openlens-node-pod-menu
```
