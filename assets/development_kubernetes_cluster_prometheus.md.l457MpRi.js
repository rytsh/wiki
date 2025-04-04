import{_ as a,o as n,c as e,ag as p}from"./chunks/framework.BcBuEkoe.js";const D=JSON.parse('{"title":"Prometheus","description":"Prometheus stack deployment and configuration.","frontmatter":{"head":[["meta",{"name":"description","content":"Prometheus stack deployment and configuration."}],["meta",{"name":"keywords","content":"kubernetes prometheus"}]]},"headers":[],"relativePath":"development/kubernetes/cluster/prometheus.md","filePath":"development/kubernetes/cluster/prometheus.md","lastUpdated":1743799263000}'),l={name:"development/kubernetes/cluster/prometheus.md"};function o(t,s,c,r,y,i){return n(),e("div",null,s[0]||(s[0]=[p(`<h1 id="prometheus" tabindex="-1">Prometheus <a class="header-anchor" href="#prometheus" aria-label="Permalink to &quot;Prometheus&quot;">​</a></h1><p>Check <a href="https://prometheus-community.github.io/helm-charts" target="_blank" rel="noreferrer">https://prometheus-community.github.io/helm-charts</a> to install the prometheus stack</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#546E7A;font-style:italic;">#!/usr/bin/env bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#546E7A;font-style:italic;">###################</span></span>
<span class="line"><span style="color:#546E7A;font-style:italic;"># Prometheus Stack</span></span>
<span class="line"><span style="color:#546E7A;font-style:italic;">###################</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">set</span><span style="color:#C3E88D;"> -e</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">&gt; [1/10] PROMETHEUS STACK PART</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">&gt; [2/10] Add prometheus stack repo</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#FFCB6B;">helm</span><span style="color:#C3E88D;"> repo</span><span style="color:#C3E88D;"> add</span><span style="color:#C3E88D;"> prometheus-community</span><span style="color:#C3E88D;"> https://prometheus-community.github.io/helm-charts</span><span style="color:#89DDFF;"> ||</span><span style="color:#82AAFF;"> true</span></span>
<span class="line"><span style="color:#FFCB6B;">helm</span><span style="color:#C3E88D;"> repo</span><span style="color:#C3E88D;"> update</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">&gt; [3/10] Install prometheus stack</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#FFCB6B;">helm</span><span style="color:#C3E88D;"> install</span><span style="color:#C3E88D;"> kube-prometheus-stack</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">  --create-namespace</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">  --namespace</span><span style="color:#C3E88D;"> kube-prometheus-stack</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">  prometheus-community/kube-prometheus-stack</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">  --set</span><span style="color:#C3E88D;"> prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.resources.requests.storage=4Gi</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">  --set</span><span style="color:#C3E88D;"> grafana.persistence.enabled=</span><span style="color:#89DDFF;">true</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">  --set</span><span style="color:#C3E88D;"> grafana.persistence.type=pvc</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">  --set</span><span style="color:#C3E88D;"> grafana.persistence.size=2Gi</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">  --set</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">grafana.adminPassword=awesomepassword</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">&gt; [5/10] Add grafana repo</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#FFCB6B;">helm</span><span style="color:#C3E88D;"> repo</span><span style="color:#C3E88D;"> add</span><span style="color:#C3E88D;"> grafana</span><span style="color:#C3E88D;"> https://grafana.github.io/helm-charts</span><span style="color:#89DDFF;"> ||</span><span style="color:#82AAFF;"> true</span></span>
<span class="line"><span style="color:#FFCB6B;">helm</span><span style="color:#C3E88D;"> repo</span><span style="color:#C3E88D;"> update</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">&gt; [8/10] Install loki-stack</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#FFCB6B;">helm</span><span style="color:#C3E88D;"> install</span><span style="color:#C3E88D;"> loki</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">  --namespace</span><span style="color:#C3E88D;"> kube-prometheus-stack</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">  grafana/loki-stack</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">&gt; [9/10] Install tempo</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#FFCB6B;">helm</span><span style="color:#C3E88D;"> install</span><span style="color:#C3E88D;"> tempo</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">  --namespace</span><span style="color:#C3E88D;"> kube-prometheus-stack</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">  grafana/tempo</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">  --set</span><span style="color:#C3E88D;"> persistence.enabled=</span><span style="color:#89DDFF;">true</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">  --set</span><span style="color:#C3E88D;"> persistence.size=5Gi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">&gt; [10/10] Add grafana.kube.com</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#FFCB6B;">cat</span><span style="color:#89DDFF;"> &lt;&lt;</span><span style="color:#89DDFF;">EOF</span><span style="color:#89DDFF;"> |</span><span style="color:#FFCB6B;"> kubectl</span><span style="color:#C3E88D;"> -n</span><span style="color:#C3E88D;"> kube-prometheus-stack</span><span style="color:#C3E88D;"> apply</span><span style="color:#C3E88D;"> -f</span><span style="color:#C3E88D;"> -</span></span>
<span class="line"><span style="color:#C3E88D;">apiVersion: gateway.networking.k8s.io/v1</span></span>
<span class="line"><span style="color:#C3E88D;">kind: HTTPRoute</span></span>
<span class="line"><span style="color:#C3E88D;">metadata:</span></span>
<span class="line"><span style="color:#C3E88D;">  name: grafana-kube</span></span>
<span class="line"><span style="color:#C3E88D;">spec:</span></span>
<span class="line"><span style="color:#C3E88D;">  parentRefs:</span></span>
<span class="line"><span style="color:#C3E88D;">  - name: kube</span></span>
<span class="line"><span style="color:#C3E88D;">    namespace: kube-gateway</span></span>
<span class="line"><span style="color:#C3E88D;">  hostnames:</span></span>
<span class="line"><span style="color:#C3E88D;">  - &quot;grafana.kube.com&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">  rules:</span></span>
<span class="line"><span style="color:#C3E88D;">  - matches:</span></span>
<span class="line"><span style="color:#C3E88D;">    - path:</span></span>
<span class="line"><span style="color:#C3E88D;">        type: PathPrefix</span></span>
<span class="line"><span style="color:#C3E88D;">        value: /</span></span>
<span class="line"><span style="color:#C3E88D;">    backendRefs:</span></span>
<span class="line"><span style="color:#C3E88D;">    - name: kube-prometheus-stack-grafana</span></span>
<span class="line"><span style="color:#C3E88D;">      port: 80</span></span>
<span class="line"><span style="color:#C3E88D;">      namespace: kube-prometheus-stack</span></span>
<span class="line"><span style="color:#89DDFF;">EOF</span></span></code></pre></div><h2 id="loki-datasource-to-grafana" tabindex="-1">Loki datasource to Grafana <a class="header-anchor" href="#loki-datasource-to-grafana" aria-label="Permalink to &quot;Loki datasource to Grafana&quot;">​</a></h2><p>Go to sources and add loki datasource with <code>http://loki:3100</code>, just save and skip error. Look predefined dashboards and explore loki.</p>`,5)]))}const u=a(l,[["render",o]]);export{D as __pageData,u as default};
