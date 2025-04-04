---
head:
  - - meta
    - name: description
      content: kubectl for accessing Kubernetes API on command line.
  - - meta
    - name: keywords
      content: kubernetes kubectl
---

# kubectl

We need to have kubectl to talk with kube-apiserver. We can install kubectl using the following command.

```sh
curl -fSLO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" && \
chmod +x kubectl && \
sudo mv kubectl /usr/local/bin/kubectl
```

Verify installation:

```sh
kubectl version --client
```

Add `bash` completion:

```sh
echo 'source <(kubectl completion bash)' >> ~/.bashrc
```
