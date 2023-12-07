import{_ as s,o as a,c as n,R as l}from"./chunks/framework.07BXFssY.js";const X=JSON.parse('{"title":"Install Kubernetes","description":"","frontmatter":{},"headers":[],"relativePath":"kubernetes/install.md","filePath":"kubernetes/install.md","lastUpdated":1701909486000}'),p={name:"kubernetes/install.md"},e=l(`<h1 id="install-kubernetes" tabindex="-1">Install Kubernetes <a class="header-anchor" href="#install-kubernetes" aria-label="Permalink to &quot;Install Kubernetes&quot;">​</a></h1><p>Login to one of master nodes.</p><p>Install packages before to start.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#88846F;"># enable community repo in /etc/apk/repositories</span></span>
<span class="line"><span style="color:#A6E22E;">apk</span><span style="color:#E6DB74;"> update</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6E22E;">apk</span><span style="color:#E6DB74;"> add</span><span style="color:#E6DB74;"> &#39;kubelet=~1.28&#39;</span></span>
<span class="line"><span style="color:#A6E22E;">apk</span><span style="color:#E6DB74;"> add</span><span style="color:#E6DB74;"> &#39;kubeadm=~1.28&#39;</span></span>
<span class="line"><span style="color:#A6E22E;">apk</span><span style="color:#E6DB74;"> add</span><span style="color:#E6DB74;"> &#39;kubeadm-bash-completion=~1.28&#39;</span></span></code></pre></div><p>Before to install add modules <a href="https://kubernetes.io/docs/setup/production-environment/container-runtimes/" target="_blank" rel="noreferrer">https://kubernetes.io/docs/setup/production-environment/container-runtimes/</a></p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#A6E22E;">cat</span><span style="color:#F92672;"> &lt;&lt;</span><span style="color:#F8F8F2;">EOF</span><span style="color:#F92672;"> |</span><span style="color:#F8F8F2;"> tee /etc/modules-load.d/k8s.conf</span></span>
<span class="line"><span style="color:#E6DB74;">overlay</span></span>
<span class="line"><span style="color:#E6DB74;">br_netfilter</span></span>
<span class="line"><span style="color:#F8F8F2;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6E22E;">modprobe</span><span style="color:#E6DB74;"> overlay</span></span>
<span class="line"><span style="color:#A6E22E;">modprobe</span><span style="color:#E6DB74;"> br_netfilter</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;"># sysctl params required by setup, params persist across reboots</span></span>
<span class="line"><span style="color:#A6E22E;">cat</span><span style="color:#F92672;"> &lt;&lt;</span><span style="color:#F8F8F2;">EOF</span><span style="color:#F92672;"> |</span><span style="color:#F8F8F2;"> tee /etc/sysctl.d/k8s.conf</span></span>
<span class="line"><span style="color:#E6DB74;">net.bridge.bridge-nf-call-iptables  = 1</span></span>
<span class="line"><span style="color:#E6DB74;">net.bridge.bridge-nf-call-ip6tables = 1</span></span>
<span class="line"><span style="color:#E6DB74;">net.ipv4.ip_forward                 = 1</span></span>
<span class="line"><span style="color:#F8F8F2;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6E22E;">sysctl</span><span style="color:#AE81FF;"> -p</span><span style="color:#E6DB74;"> /etc/sysctl.d/k8s.conf</span></span></code></pre></div><p>Verify that settings are applied.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#A6E22E;">lsmod</span><span style="color:#F92672;"> |</span><span style="color:#A6E22E;"> grep</span><span style="color:#E6DB74;"> br_netfilter</span></span>
<span class="line"><span style="color:#A6E22E;">lsmod</span><span style="color:#F92672;"> |</span><span style="color:#A6E22E;"> grep</span><span style="color:#E6DB74;"> overlay</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6E22E;">sysctl</span><span style="color:#E6DB74;"> net.bridge.bridge-nf-call-iptables</span><span style="color:#E6DB74;"> net.bridge.bridge-nf-call-ip6tables</span><span style="color:#E6DB74;"> net.ipv4.ip_forward</span></span></code></pre></div><p>Close swap with <code>swapoff -a</code> and comment swap parition in <code>/etc/fstab</code></p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#A6E22E;">apk</span><span style="color:#E6DB74;"> add</span><span style="color:#E6DB74;"> containerd</span><span style="color:#E6DB74;"> containerd-openrc</span></span></code></pre></div><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#A6E22E;">rc-update</span><span style="color:#E6DB74;"> add</span><span style="color:#E6DB74;"> ntpd</span></span>
<span class="line"><span style="color:#A6E22E;">rc-update</span><span style="color:#E6DB74;"> add</span><span style="color:#E6DB74;"> containerd</span><span style="color:#E6DB74;"> default</span></span>
<span class="line"><span style="color:#A6E22E;">rc-update</span><span style="color:#E6DB74;"> add</span><span style="color:#E6DB74;"> kubelet</span><span style="color:#E6DB74;"> default</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6E22E;">rc-service</span><span style="color:#E6DB74;"> ntpd</span><span style="color:#E6DB74;"> start</span></span>
<span class="line"><span style="color:#A6E22E;">rc-service</span><span style="color:#E6DB74;"> containerd</span><span style="color:#E6DB74;"> start</span></span>
<span class="line"><span style="color:#A6E22E;">rc-service</span><span style="color:#E6DB74;"> kubelet</span><span style="color:#E6DB74;"> start</span></span></code></pre></div><blockquote><p>Preparation is completed and we can set this node as template.</p></blockquote><hr><blockquote><p>Cilium can handle kube-proxy so we don&#39;t need to install it.<br><code>--skip-phases=addon/kube-proxy</code></p></blockquote><p>Before to start, need to add load balancer to support HA.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#A6E22E;">kubeadm</span><span style="color:#E6DB74;"> init</span><span style="color:#AE81FF;"> --control-plane-endpoint</span><span style="color:#E6DB74;"> &quot;cluster.kube-cluster:6443&quot;</span><span style="color:#AE81FF;"> --upload-certs</span><span style="color:#AE81FF;"> --skip-phases=addon/kube-proxy</span></span></code></pre></div><p>After that you will get this kind of output.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki monokai vp-code"><code><span class="line"><span>Your Kubernetes control-plane has initialized successfully!</span></span>
<span class="line"><span></span></span>
<span class="line"><span>To start using your cluster, you need to run the following as a regular user:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  mkdir -p $HOME/.kube</span></span>
<span class="line"><span>  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config</span></span>
<span class="line"><span>  sudo chown $(id -u):$(id -g) $HOME/.kube/config</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Alternatively, if you are the root user, you can run:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  export KUBECONFIG=/etc/kubernetes/admin.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>You should now deploy a pod network to the cluster.</span></span>
<span class="line"><span>Run &quot;kubectl apply -f [podnetwork].yaml&quot; with one of the options listed at:</span></span>
<span class="line"><span>  https://kubernetes.io/docs/concepts/cluster-administration/addons/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>You can now join any number of the control-plane node running the following command on each as root:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  kubeadm join cluster.kube-cluster:6443 --token 84r14X.XXXXXXXXXXXXXXXX \\</span></span>
<span class="line"><span>	--discovery-token-ca-cert-hash sha256:9806b525aa16XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \\</span></span>
<span class="line"><span>	--control-plane --certificate-key a373ab55fa13697XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Please note that the certificate-key gives access to cluster sensitive data, keep it secret!</span></span>
<span class="line"><span>As a safeguard, uploaded-certs will be deleted in two hours; If necessary, you can use</span></span>
<span class="line"><span>&quot;kubeadm init phase upload-certs --upload-certs&quot; to reload certs afterward.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Then you can join any number of worker nodes by running the following on each as root:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>kubeadm join cluster.kube-cluster:6443 --token 84r14X.XXXXXXXXXXXXXXXX \\</span></span>
<span class="line"><span>	--discovery-token-ca-cert-hash sha256:9806b525aa16XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></span></code></pre></div><p>Record this in management machine.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#A6E22E;">mkdir</span><span style="color:#AE81FF;"> -p</span><span style="color:#F8F8F2;"> $HOME</span><span style="color:#E6DB74;">/.kube</span></span>
<span class="line"><span style="color:#A6E22E;">scp</span><span style="color:#E6DB74;"> root@master1:/etc/kubernetes/admin.conf</span><span style="color:#F8F8F2;"> $HOME</span><span style="color:#E6DB74;">/.kube/config</span></span></code></pre></div><h2 id="network" tabindex="-1">Network <a class="header-anchor" href="#network" aria-label="Permalink to &quot;Network&quot;">​</a></h2><p>Download cilium cli in management machine.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#F8F8F2;">CILIUM_CLI_VERSION</span><span style="color:#F92672;">=</span><span style="color:#E6DB74;">$(</span><span style="color:#A6E22E;">curl</span><span style="color:#AE81FF;"> -s</span><span style="color:#E6DB74;"> https://raw.githubusercontent.com/cilium/cilium-cli/main/stable.txt)</span></span>
<span class="line"><span style="color:#F8F8F2;">CLI_ARCH</span><span style="color:#F92672;">=</span><span style="color:#E6DB74;">amd64</span></span>
<span class="line"><span style="color:#F92672;">if</span><span style="color:#F8F8F2;"> [ </span><span style="color:#E6DB74;">&quot;$(</span><span style="color:#A6E22E;">uname</span><span style="color:#AE81FF;"> -m</span><span style="color:#E6DB74;">)&quot;</span><span style="color:#F92672;"> =</span><span style="color:#E6DB74;"> &quot;aarch64&quot;</span><span style="color:#F8F8F2;"> ]; </span><span style="color:#F92672;">then</span><span style="color:#F8F8F2;"> CLI_ARCH</span><span style="color:#F92672;">=</span><span style="color:#E6DB74;">arm64</span><span style="color:#F8F8F2;">; </span><span style="color:#F92672;">fi</span></span>
<span class="line"><span style="color:#A6E22E;">curl</span><span style="color:#AE81FF;"> -L</span><span style="color:#AE81FF;"> --fail</span><span style="color:#AE81FF;"> --remote-name-all</span><span style="color:#E6DB74;"> https://github.com/cilium/cilium-cli/releases/download/</span><span style="color:#F8F8F2;">\${CILIUM_CLI_VERSION}</span><span style="color:#E6DB74;">/cilium-linux-</span><span style="color:#F8F8F2;">\${CLI_ARCH}</span><span style="color:#E6DB74;">.tar.gz{,.sha256sum}</span></span>
<span class="line"><span style="color:#A6E22E;">sha256sum</span><span style="color:#AE81FF;"> -c</span><span style="color:#E6DB74;"> cilium-linux-</span><span style="color:#F8F8F2;">\${CLI_ARCH}</span><span style="color:#E6DB74;">.tar.gz.sha256sum</span></span>
<span class="line"><span style="color:#A6E22E;">tar</span><span style="color:#E6DB74;"> xzvfC</span><span style="color:#E6DB74;"> cilium-linux-</span><span style="color:#F8F8F2;">\${CLI_ARCH}</span><span style="color:#E6DB74;">.tar.gz</span><span style="color:#E6DB74;"> /usr/local/bin</span></span>
<span class="line"><span style="color:#A6E22E;">rm</span><span style="color:#E6DB74;"> cilium-linux-</span><span style="color:#F8F8F2;">\${CLI_ARCH}</span><span style="color:#E6DB74;">.tar.gz{,.sha256sum}</span></span></code></pre></div><p>Run install command, it will install on kubectl context.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#A6E22E;">cilium</span><span style="color:#E6DB74;"> install</span></span></code></pre></div><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#A6E22E;">cilium</span><span style="color:#E6DB74;"> status</span></span></code></pre></div><p>Add CNI plugin.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#A6E22E;">curl</span><span style="color:#AE81FF;"> -fkSLO</span><span style="color:#E6DB74;"> https://github.com/containernetworking/plugins/releases/download/v1.4.0/cni-plugins-linux-amd64-v1.4.0.tgz</span></span>
<span class="line"><span style="color:#A6E22E;">mkdir</span><span style="color:#AE81FF;"> -p</span><span style="color:#E6DB74;"> /usr/libexec/cni</span></span>
<span class="line"><span style="color:#A6E22E;">tar</span><span style="color:#AE81FF;"> -C</span><span style="color:#E6DB74;"> /usr/libexec/cni</span><span style="color:#AE81FF;"> -xzf</span><span style="color:#E6DB74;"> cni-plugins-linux-amd64-v1.4.0.tgz</span></span></code></pre></div><p>Or just for cilium:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#A6E22E;">mkdir</span><span style="color:#AE81FF;"> -p</span><span style="color:#E6DB74;"> /usr/libexec/cni</span></span>
<span class="line"><span style="color:#A6E22E;">cp</span><span style="color:#E6DB74;"> /opt/cni/bin/</span><span style="color:#FD971F;">*</span><span style="color:#E6DB74;"> /usr/libexec/cni/</span></span></code></pre></div><p>Before to join the node make shared of folders.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#A6E22E;">mount</span><span style="color:#AE81FF;"> --make-rshared</span><span style="color:#E6DB74;"> /run</span></span>
<span class="line"><span style="color:#A6E22E;">mount</span><span style="color:#AE81FF;"> --make-rshared</span><span style="color:#E6DB74;"> /sys</span></span></code></pre></div><p>Make it persistent.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#A6E22E;">cat</span><span style="color:#F92672;"> &lt;&lt;</span><span style="color:#F8F8F2;">EOF</span><span style="color:#F92672;"> &gt;</span><span style="color:#F8F8F2;"> /etc/local.d/rc.local</span></span>
<span class="line"><span style="color:#E6DB74;">#!/bin/sh</span></span>
<span class="line"><span style="color:#E6DB74;">/bin/mount --make-rshared /run</span></span>
<span class="line"><span style="color:#F8F8F2;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6E22E;">chmod</span><span style="color:#E6DB74;"> +x</span><span style="color:#E6DB74;"> /etc/local.d/rc.local</span></span>
<span class="line"><span style="color:#A6E22E;">rc-update</span></span>
<span class="line"><span style="color:#A6E22E;">rc-update</span><span style="color:#E6DB74;"> add</span><span style="color:#E6DB74;"> local</span><span style="color:#E6DB74;"> boot</span></span></code></pre></div><h3 id="hubble" tabindex="-1">Hubble <a class="header-anchor" href="#hubble" aria-label="Permalink to &quot;Hubble&quot;">​</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#A6E22E;">cilium</span><span style="color:#E6DB74;"> hubble</span><span style="color:#E6DB74;"> enable</span></span></code></pre></div><p>Check UI</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#A6E22E;">cilium</span><span style="color:#E6DB74;"> hubble</span><span style="color:#E6DB74;"> ui</span></span>
<span class="line"><span style="color:#88846F;">#or</span></span>
<span class="line"><span style="color:#A6E22E;">kubectl</span><span style="color:#E6DB74;"> port-forward</span><span style="color:#AE81FF;"> -n</span><span style="color:#E6DB74;"> kube-system</span><span style="color:#E6DB74;"> svc/hubble-ui</span><span style="color:#AE81FF;"> --address</span><span style="color:#AE81FF;"> 0.0</span><span style="color:#E6DB74;">.0.0</span><span style="color:#AE81FF;"> 12000</span><span style="color:#E6DB74;">:80</span></span></code></pre></div>`,38),o=[e];function t(c,r,i,d,y,u){return a(),n("div",null,o)}const b=s(p,[["render",t]]);export{X as __pageData,b as default};
