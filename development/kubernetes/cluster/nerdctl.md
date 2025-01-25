# nerdctl

Without using docker in machines but still want to give commands can run as docker, `nerdctl` is a good choice.

Install nerdctl with containerd and enable in systemd.

```sh
#!/usr/bin/env bash

###################
# Containerd
###################

set -e

cd $(dirname $(realpath $0))
mkdir -p tools && cd tools

function nerdctl_full_install() {
    curl -fSLO https://github.com/containerd/nerdctl/releases/download/v2.0.3/nerdctl-full-2.0.3-linux-amd64.tar.gz
    sudo tar Cxzvf /usr/local nerdctl-full-2.0.3-linux-amd64.tar.gz
}

function containerd_systemd_enable() {
    sudo systemctl daemon-reload
    sudo systemctl enable --now containerd
}

function nerdctl_permission() {
    sudo chown root "$(which nerdctl)"
    sudo chmod +s "$(which nerdctl)"
}

nerdctl_full_install
containerd_systemd_enable
nerdctl_permission
```
