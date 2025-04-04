---
head:
  - - meta
    - name: description
      content: Kubernetes core concepts and commands.
  - - meta
    - name: keywords
      content: kubernetes
---

# Core Concepts

## kubectl

Basic commands

```
kubectl cluster-info
kubectl run nginx --image nginx
kubectl describe pod nginx
kubectl get pods
kubectl create -f pod-defination.yml
```

## Nodes

Nodes is machines, it run containers.
Get information about nodes, I have one node and it is master so it will show like that.

```sh
$ kubectl get nodes -o wide
NAME      STATUS   ROLES           AGE   VERSION   INTERNAL-IP   EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION   CONTAINER-RUNTIME
master1   Ready    control-plane   24h   v1.28.4   10.10.10.51   <none>        Alpine Linux v3.19   6.6.4-1-virt     containerd://1.7.10
master2   Ready    control-plane   23h   v1.28.4   10.10.10.52   <none>        Alpine Linux v3.19   6.6.4-1-virt     containerd://1.7.10
master3   Ready    control-plane   23h   v1.28.4   10.10.10.53   <none>        Alpine Linux v3.19   6.6.4-1-virt     containerd://1.7.10
node1     Ready    <none>          23h   v1.28.4   10.10.10.71   <none>        Alpine Linux v3.19   6.6.4-1-virt     containerd://1.7.10
node2     Ready    <none>          23h   v1.28.4   10.10.10.72   <none>        Alpine Linux v3.19   6.6.4-1-virt     containerd://1.7.10
node3     Ready    <none>          23h   v1.28.4   10.10.10.73   <none>        Alpine Linux v3.19   6.6.4-1-virt     containerd://1.7.10
```

The components on a node include the `kubelet`, a `container runtime`, and the `kube-proxy`.

## Pods

Smallest deployable units, group of one or more containers.
Pod can contain `init containers` that run during Pod startup, init containers run one by one until is completed pod container will run.

Example Pod configuration, named `pod-nginx.yaml` but this just file name could be everything.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    env: test
spec:
  containers:
  - name: nginx
    image: nginx
    imagePullPolicy: IfNotPresent
  nodeSelector:
    disktype: ssd
```

`apiVersion` is used for API location. If you are not sure `apiVersion`, run below command.

```sh
$ kubectl explain pod
KIND:       Pod
VERSION:    v1
...
```

Explain command also usable for get information about data type.

```sh
$ kubectl explain pod --recursive
KIND:       Pod
VERSION:    v1

DESCRIPTION:
    Pod is a collection of containers that can run on a host. This resource is
    created by clients and scheduled onto hosts.

FIELDS:
  apiVersion	<string>
  kind	<string>
  metadata	<ObjectMeta>
    annotations	<map[string]string>
...
```

There is another method to write yaml file easy. Impreatively declare pod with `--dry-run=client` option with yaml output format.
If you don't use `--dry-run=client` option it run.

```sh
$ kubectl run nginx --dry-run=client --image=nginx --labels=env=test --image-pull-policy=IfNotPresent --overrides='{"spec":{"nodeSelector":{"disktype":"ssd"}}}' -o yaml > pod-nginx.yaml
```

When you check the file there are some additional fields but just ignore them.

```yaml
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    env: test
  name: nginx
spec:
  containers:
  - image: nginx
    imagePullPolicy: IfNotPresent
    name: nginx
    resources: {}
  dnsPolicy: ClusterFirst
  nodeSelector:
    disktype: ssd
  restartPolicy: Always
status: {}
```

After that run on file with create command.
Create mean this is a new resource but if you edit in future give `--save-config` option.
Kubernetes protect you if you not save yaml file in cluster and making change after create, pod knowledge will destroy and cannot go back.
But you can pass `--force` option to edit it.

Just for inform you will understand in future.

```sh
$ kubectl create -f pod-nginx.yaml
# or use apply command, apply will understand this is new and run as 'create --save-config'
$ kubectl apply -f pod-nginx.yaml
```

If you want to check any events or get more information run `describe` command. Use this command to detect errors.

```sh
$ kubectl describe pod nginx
```

Use `get pods` to get list of pods

```sh
$ kubectl get pods
# or more detail
$ kubectl get pods -o wide
# or just one pod
$ kubectl get pods -o wide nginx
# or change name-space
$ kubectl get pods -n kube-system
# or get yaml file of running pod, you can edit and apply again to change
$ kubectl get pods nginx -o yaml > pod-nginx.yaml
# also you can pass `--no-headers`
# or you can filter by labels
$ kubectl get pods --selector=env=test
# or just use -l env=test
$ kubectl get pods -l env=test,foo=bar

$ kubectl get pods --show-labels
```

```sh
$ kubectl get pods
NAME    READY   STATUS    RESTARTS   AGE
nginx   0/1     Pending   0          104s
```

_READY_ mean is how many container is ready / how many containers is exist in pod.

Also you can edit running pod with edit option

```sh
$ kubectl edit pod nginx
```

If you want to edit in different text editor, set `EDITOR` or `KUBE_EDITOR` environment name.
Default `vi` in linux, `notepad` in windows.

```sh
EDITOR="vim" kubectl edit pods nginx
```

::: warning
`kubectl edit` will change your application and your yaml file remains old. Usually change yaml file and apply.
:::

::: tip
Annotations can usable to give additional information but this is not using for query.
https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/
:::

```sh
kubectl expose pod redis --name redis-service --port 6379 --target-port 6379

kubectl run custom-nginx --image=nginx --port=8080

kubectl run httpd --image=httpd:alpine --port=80 --expose
```

## ReplicationController

Scale Pods with wrap pad yaml file with this controller and it is guarantee the availability of a specified number of identical Pods.
But new ways to use `ReplicationSet`. Differences, `Replicaset` support set-based label filter like `in`, `notin`, `exists` selector.

Selector and template labels at least one is must be same.

```yaml
apiVersion: v1
kind: ReplicationController
metadata:
  name: nginx
spec:
  replicas: 3
  selector:
    app: nginx
  template:
    metadata:
      name: nginx
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
        ports:
        - containerPort: 80
```

if you want to write in command line use

```sh
$ cat <<EOF > nginx-replication.yaml
> apiVersion: v1
> ...
> EOF
```

You can use `create` or `apply` commands, if you are changing some fields use `apply`.

```sh
$ kubectl create -f nginx-replicationController.yaml
# or
$ kubectl apply -f nginx-replicationController.yaml
```

Get information

```sh
$ kubectl get replicationcontrollers -o wide
NAME    DESIRED   CURRENT   READY   AGE   CONTAINERS   IMAGES   SELECTOR
nginx   3         3         0       19m   nginx        nginx    app=nginx
```

`DESIRED` means wanted, `CURRENT` is about active, `READY` mean is working.

For delete write replication controller name, it will delete all pods.
If you don't want to delete pods pass `--cascade=false` option.

```sh
$ kubectl delete replicationcontrollers nginx
```

## ReplicaSet

ReplicaSet as ReplicationController but selection is more useful and deployments use this. Usually you use deploymonts instead of replicaSet.

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: nginx-replicaset
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      name: nginx
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
        ports:
        - containerPort: 80
```

Diferences are kind, apiVersion and selector fields. In selector field also we can add `matchExpression`

```yaml
matchExpressions:
  - {key: tier, operator: In, values: [cache]}
  - {key: environment, operator: NotIn, values: [dev]}
```

Or write open style

```yaml
matchExpressions:
  - key: tier
    operator: In
    values:
      - cache
  - key: environment
    operator: NotIn
    values:
      - dev
```

_In_, _NotIn_, _Exists_, _DoesNotExist_, _Gt_, _Lt_ operators. If you use both everyone need to pass.

Use `create` or `apply` commands and check with `get`.

```sh
$ kubectl get replicasets.apps
NAME               DESIRED   CURRENT   READY   AGE
nginx-replicaset   3         3         0       7s
```

Edit with `edit` command or change file and use `apply` command. Prefer edit yaml file.

```sh
$ kubectl edit replicasets.apps nginx-replicaset
# or change yaml file and run this command
$ kubectl replace -f nginx-replicaset.yaml
# or scale with given file
$ kubectl scale --replicas=6 -f nginx-replicaset.yaml
# or specifiy current name
$ kubectl scale --replicas=6 replicaset nginx-replicaset
```

If you want to check last applied.

```sh
kubectl apply view-last-applied -f nginx-replicaset.yaml -o yaml
# or look at the diff
kubectl diff -f nginx-replicaset.yaml
# or
cat nginx-replicaset.yaml | kubectl diff -f -
```

Also you can use `set` or `scale` commands to change some fields.
https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#scale

## Deployment

Deployment have useful stuff updating and rollback. Most of application use this.
Yaml file is same with `ReplicaSet` but kind is `Deployment`. When you create deployment, you will see in replicaset fields also.

```sh
$ kubectl create deployment my-deployment --dry-run=client --image=nginx --replicas=3 -o yaml > nginx-deployment.yaml
$ cat nginx-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    app: my-deployment
  name: my-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-deployment
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: my-deployment
    spec:
      containers:
      - image: nginx
        name: nginx
        resources: {}
status: {}
```

template field will be use when replicas is under 3 and this count looking to selector -> matchLabels field.
So if you have app=my-deployment label pods deployment will use them also.

And run with `apply` command. If you want to use `create` you should add `--save-config` option to change in future.

```sh
kubectl apply -f nginx-deployment.yaml
```

Get information of deployments and replicasets

```sh
$ kubectl get deployments,rs
NAME                            READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/my-deployment   0/3     3            0           74s

NAME                                       DESIRED   CURRENT   READY   AGE
replicaset.apps/my-deployment-57d86476b6   3         3         0       74s
replicaset.apps/nginx-replicaset           3         3         0       21m
```

https://kubernetes.io/docs/concepts/workloads/controllers/deployment/

## Namespace

https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/

It is a virtual cluster.

Create namespace.

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: dev
```

```sh
$ kubectl create -f namespace-dev.yml
# or
$ kubectl create namespace dev
```

Get namespaces

```sh
kubectl get ns
```

List pods in namespaces

```sh
$ kubectl get pods --all-namespaces
# or
$ kubectl get pods --namespace=dev
# or
$ kubectl -n kube-system describe deployments nginx
```

We can add namespace when creating component

```yaml
apiVersion: v1
kind: Pod

metadata:
  name: myapp-pod
  namespace: dev
  labels:
    app: myapp
    type: front-end
spec:
  containers:
  - name: container
    image: nginx
```

```sh
$ kubectl create -f pod-defination.yml
# or we can set when run command
$ kubectl create -f pod-defination.yml --namespace=dev
```

## Resources

We can add resource to a namespace or pods with using namespaces.
https://kubernetes.io/docs/concepts/policy/resource-quotas

## Service

If we have more than one same pod, we can use service file to reach it.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: MyApp
  type: NodePort
  ports:
  - targetPort: 80
    port: 80
    nodePort: 30008
```

NodePort is outside port. You can omit port field and targetPort show pod's port.

We declared NodePort to reach outside but in internal cluster we can use ClusterIP which is default. NodePort is not a load balancer, randomly choicing nodes.
There are more type of service, check here
https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types

```sh
kubectl get services
```

Or you can use expose command to run service with specific component name like my-deployment.
https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#expose

## StatefulSet

ServiceName is same with headless service.

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: my-statefulset
spec:
  selector:
    matchLabels:
      app: my-statefulset
  serviceName: my-statefulset-service
  replicas: 3
  template:
    metadata:
      labels:
        app: my-statefulset
    spec:
      containers:
      - name: my-statefulset
        image: nginx
        ports:
        - containerPort: 80
  podManagementPolicy: OrderedReady
  volumeClaimTemplates:
  - metadata:
      name: my-statefulset-volume
    spec:
      accessModes:
      - ReadWriteOnce
      storageClassName: my-statefulset-storage
      resources:
        requests:
          storage: 1Gi
```

## Headless Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-headless-service
spec:
  selector:
    app: my-headless-service
  clusterIP: None
  ports:
  - port: 3306
```

Pod defined

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-headless-service-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx
  subdomain: my-headless-service
  hostname: mypod
```
