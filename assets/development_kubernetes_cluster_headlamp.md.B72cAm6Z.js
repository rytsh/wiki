import{_ as s,c as e,a2 as n,o as l}from"./chunks/framework.BQmytedh.js";const m=JSON.parse('{"title":"headlamp","description":"","frontmatter":{},"headers":[],"relativePath":"development/kubernetes/cluster/headlamp.md","filePath":"development/kubernetes/cluster/headlamp.md","lastUpdated":1735582393000}'),p={name:"development/kubernetes/cluster/headlamp.md"};function t(o,a,c,r,d,i){return l(),e("div",null,a[0]||(a[0]=[n(`<h1 id="headlamp" tabindex="-1">headlamp <a class="header-anchor" href="#headlamp" aria-label="Permalink to &quot;headlamp&quot;">​</a></h1><blockquote><p>I really liked headlamp amazing tool 🎉</p></blockquote><blockquote><p><a href="https://headlamp.dev/" target="_blank" rel="noreferrer">https://headlamp.dev/</a><br><a href="https://artifacthub.io/packages/helm/headlamp/headlamp" target="_blank" rel="noreferrer">https://artifacthub.io/packages/helm/headlamp/headlamp</a></p></blockquote><p>Lens like dashboard for kubernetes, it has web-based UI and easy to use.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">helm</span><span style="color:#C3E88D;"> repo</span><span style="color:#C3E88D;"> add</span><span style="color:#C3E88D;"> headlamp</span><span style="color:#C3E88D;"> https://headlamp-k8s.github.io/headlamp/</span></span>
<span class="line"><span style="color:#FFCB6B;">helm</span><span style="color:#C3E88D;"> install</span><span style="color:#C3E88D;"> headlamp</span><span style="color:#C3E88D;"> headlamp/headlamp</span><span style="color:#C3E88D;"> --namespace</span><span style="color:#C3E88D;"> kube-system</span></span></code></pre></div><p>Create http route to access it</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">cat</span><span style="color:#89DDFF;"> &lt;&lt;</span><span style="color:#89DDFF;">EOF</span><span style="color:#89DDFF;"> |</span><span style="color:#FFCB6B;"> kubectl</span><span style="color:#C3E88D;"> -n</span><span style="color:#C3E88D;"> kube-system</span><span style="color:#C3E88D;"> apply</span><span style="color:#C3E88D;"> -f</span><span style="color:#C3E88D;"> -</span></span>
<span class="line"><span style="color:#C3E88D;">apiVersion: gateway.networking.k8s.io/v1</span></span>
<span class="line"><span style="color:#C3E88D;">kind: HTTPRoute</span></span>
<span class="line"><span style="color:#C3E88D;">metadata:</span></span>
<span class="line"><span style="color:#C3E88D;">  name: headlamp-kube</span></span>
<span class="line"><span style="color:#C3E88D;">spec:</span></span>
<span class="line"><span style="color:#C3E88D;">  parentRefs:</span></span>
<span class="line"><span style="color:#C3E88D;">  - name: kube</span></span>
<span class="line"><span style="color:#C3E88D;">    namespace: default</span></span>
<span class="line"><span style="color:#C3E88D;">  hostnames:</span></span>
<span class="line"><span style="color:#C3E88D;">  - &quot;headlamp.kube.com&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">  rules:</span></span>
<span class="line"><span style="color:#C3E88D;">  - matches:</span></span>
<span class="line"><span style="color:#C3E88D;">    - path:</span></span>
<span class="line"><span style="color:#C3E88D;">        type: PathPrefix</span></span>
<span class="line"><span style="color:#C3E88D;">        value: /</span></span>
<span class="line"><span style="color:#C3E88D;">    backendRefs:</span></span>
<span class="line"><span style="color:#C3E88D;">    - name: headlamp</span></span>
<span class="line"><span style="color:#C3E88D;">      port: 80</span></span>
<span class="line"><span style="color:#C3E88D;">      namespace: kube-system</span></span>
<span class="line"><span style="color:#89DDFF;">EOF</span></span></code></pre></div><p>Create Token</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">kubectl</span><span style="color:#C3E88D;"> create</span><span style="color:#C3E88D;"> token</span><span style="color:#C3E88D;"> headlamp</span><span style="color:#C3E88D;"> --namespace</span><span style="color:#C3E88D;"> kube-system</span></span></code></pre></div>`,9)]))}const y=s(p,[["render",t]]);export{m as __pageData,y as default};