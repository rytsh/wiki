import{_ as s,c as t,a2 as r,o as a}from"./chunks/framework.BQmytedh.js";const d=JSON.parse('{"title":"Metric Server","description":"","frontmatter":{},"headers":[],"relativePath":"development/kubernetes/cluster/metrics-server.md","filePath":"development/kubernetes/cluster/metrics-server.md","lastUpdated":1737798836000}'),o={name:"development/kubernetes/cluster/metrics-server.md"};function n(l,e,p,c,i,u){return a(),t("div",null,e[0]||(e[0]=[r(`<h1 id="metric-server" tabindex="-1">Metric Server <a class="header-anchor" href="#metric-server" aria-label="Permalink to &quot;Metric Server&quot;">​</a></h1><p>Metrics server just for current metrics show for kubernetes top command.<br> You need to still install prometheus stack for monitoring.</p><blockquote><p><a href="https://github.com/kubernetes-sigs/metrics-server" target="_blank" rel="noreferrer">https://github.com/kubernetes-sigs/metrics-server</a><br><a href="https://github.com/MartinHeinz/metrics-on-kind" target="_blank" rel="noreferrer">https://github.com/MartinHeinz/metrics-on-kind</a></p></blockquote><p>Enable metrics server to get metrics from your cluster.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">&gt; Install metrics-server</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#FFCB6B;">kubectl</span><span style="color:#C3E88D;"> apply</span><span style="color:#C3E88D;"> -f</span><span style="color:#C3E88D;"> https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml</span></span>
<span class="line"><span style="color:#FFCB6B;">kubectl</span><span style="color:#C3E88D;"> patch</span><span style="color:#C3E88D;"> -n</span><span style="color:#C3E88D;"> kube-system</span><span style="color:#C3E88D;"> deployment</span><span style="color:#C3E88D;"> metrics-server</span><span style="color:#C3E88D;"> --type=json</span><span style="color:#C3E88D;"> -p</span><span style="color:#89DDFF;"> &#39;</span><span style="color:#C3E88D;">[{&quot;op&quot;:&quot;add&quot;,&quot;path&quot;:&quot;/spec/template/spec/containers/0/args/-&quot;,&quot;value&quot;:&quot;--kubelet-insecure-tls&quot;}]</span><span style="color:#89DDFF;">&#39;</span></span></code></pre></div><p>Verify of metrics api</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">kubectl</span><span style="color:#C3E88D;"> top</span><span style="color:#C3E88D;"> nodes</span></span></code></pre></div>`,7)]))}const y=s(o,[["render",n]]);export{d as __pageData,y as default};
