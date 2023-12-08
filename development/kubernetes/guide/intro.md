# Introduction

To stay updated we always need to look https://kubernetes.io/docs/home/  
Check glossary https://kubernetes.io/docs/reference/glossary/?fundamental=true  
Check cheatsheet https://kubernetes.io/docs/reference/kubectl/cheatsheet/  
Check commands https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands  
Kubernetes use YAML for configuration, if you not familiar with it check watch this video https://www.youtube.com/watch?v=o9pT9cWzbnI

## Master components

__kube-apiserver__  API server  
__etcd__  Key-Value store  
__kube-scheduler__ Control to which pods run on which nodes  
__kube-controller-manager__ Node, Replication, Endpoints, Service Account & Token controllers  
__cloud-controller-manager__ Link to cloud API, not usable for premises cluster

## Node components

__kubelet__  Manage containers  
__kube-proxy__ Used to reach services  
__container_runtime__ Responsible for running containers [Docker, containerd, CRI-O]
