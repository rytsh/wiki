---
head:
  - - meta
    - name: description
      content: Helm is a package manager for Kubernetes. It is used to deploy applications on Kubernetes.
  - - meta
    - name: keywords
      content: kubernetes helm
---

# Helm

> https://helm.sh/

Helm is a package manager for kubernetes. It is used to deploy applications on kubernetes.

Differences between kustomize and helm is that helm is more like a package manager and kustomize is more like a templating engine.

```sh
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

Verify installation:

```sh
helm version
```

Add `bash` completion:

```sh
echo 'source <(helm completion bash)' >> ~/.bashrc
```
