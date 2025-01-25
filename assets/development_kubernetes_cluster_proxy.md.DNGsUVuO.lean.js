import{_ as n,c as a,a2 as l,o as p}from"./chunks/framework.BQmytedh.js";const E=JSON.parse('{"title":"Proxy Socks5","description":"","frontmatter":{},"headers":[],"relativePath":"development/kubernetes/cluster/proxy.md","filePath":"development/kubernetes/cluster/proxy.md","lastUpdated":1737798836000}'),o={name:"development/kubernetes/cluster/proxy.md"};function e(t,s,c,r,F,y){return p(),a("div",null,s[0]||(s[0]=[l(`<h1 id="proxy-socks5" tabindex="-1">Proxy Socks5 <a class="header-anchor" href="#proxy-socks5" aria-label="Permalink to &quot;Proxy Socks5&quot;">​</a></h1><p>To reach with socks5 proxy.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#546E7A;font-style:italic;">#!/usr/bin/env bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">export</span><span style="color:#EEFFFF;"> KIND_EXPERIMENTAL_PROVIDER</span><span style="color:#89DDFF;">=\${</span><span style="color:#EEFFFF;">KIND_EXPERIMENTAL_PROVIDER</span><span style="color:#89DDFF;">:-</span><span style="color:#EEFFFF;">docker</span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#C3E88D;"> ip</span><span style="color:#C3E88D;"> route</span><span style="color:#C3E88D;"> add</span><span style="color:#C3E88D;"> 10.0.10.0/24</span><span style="color:#C3E88D;"> via</span><span style="color:#89DDFF;"> $(\${</span><span style="color:#EEFFFF;">KIND_EXPERIMENTAL_PROVIDER</span><span style="color:#89DDFF;">}</span><span style="color:#EEFFFF;"> inspect -f </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}</span><span style="color:#89DDFF;">&#39;</span><span style="color:#EEFFFF;"> kind-control-plane</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">cat</span><span style="color:#89DDFF;"> &lt;&lt;</span><span style="color:#89DDFF;">EOF</span><span style="color:#89DDFF;"> |</span><span style="color:#FFCB6B;"> sudo</span><span style="color:#C3E88D;"> tee</span><span style="color:#C3E88D;"> /opt/kube-proxy.yaml</span></span>
<span class="line"><span style="color:#C3E88D;">server:</span></span>
<span class="line"><span style="color:#C3E88D;">  entrypoints:</span></span>
<span class="line"><span style="color:#C3E88D;">    socks5:</span></span>
<span class="line"><span style="color:#C3E88D;">      address: &quot;:1080&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">  tcp:</span></span>
<span class="line"><span style="color:#C3E88D;">    middlewares:</span></span>
<span class="line"><span style="color:#C3E88D;">      socks5:</span></span>
<span class="line"><span style="color:#C3E88D;">        socks5:</span></span>
<span class="line"><span style="color:#C3E88D;">          no_auth_authenticator: true</span></span>
<span class="line"><span style="color:#C3E88D;">          ip_map:</span></span>
<span class="line"><span style="color:#C3E88D;">            &quot;*.finops.com&quot;: &quot;10.0.10.1&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">    routers:</span></span>
<span class="line"><span style="color:#C3E88D;">      socks5:</span></span>
<span class="line"><span style="color:#C3E88D;">        entrypoints:</span></span>
<span class="line"><span style="color:#C3E88D;">          - socks5</span></span>
<span class="line"><span style="color:#C3E88D;">        middlewares:</span></span>
<span class="line"><span style="color:#C3E88D;">          - socks5</span></span>
<span class="line"><span style="color:#89DDFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#89DDFF;"> \${</span><span style="color:#EEFFFF;">KIND_EXPERIMENTAL_PROVIDER</span><span style="color:#89DDFF;">}</span><span style="color:#EEFFFF;"> ps </span><span style="color:#89DDFF;">|</span><span style="color:#FFCB6B;"> grep</span><span style="color:#C3E88D;"> -q</span><span style="color:#C3E88D;"> kube-proxy</span><span style="color:#89DDFF;">;</span><span style="color:#89DDFF;font-style:italic;"> then</span></span>
<span class="line"><span style="color:#89DDFF;">  \${</span><span style="color:#EEFFFF;">KIND_EXPERIMENTAL_PROVIDER</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;"> restart</span><span style="color:#C3E88D;"> kube-proxy</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">else</span></span>
<span class="line"><span style="color:#89DDFF;">  \${</span><span style="color:#EEFFFF;">KIND_EXPERIMENTAL_PROVIDER</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;"> run</span><span style="color:#C3E88D;"> -d</span><span style="color:#C3E88D;"> --restart=always</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">  --name</span><span style="color:#C3E88D;"> kube-proxy</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">  --network</span><span style="color:#C3E88D;"> kind</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">  -p</span><span style="color:#C3E88D;"> 1080:1080</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">  -v</span><span style="color:#C3E88D;"> /opt/kube-proxy.yaml:/turna.yaml</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">  ghcr.io/worldline-go/turna:v0.8.0</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">fi</span></span></code></pre></div><p>To access socks5 proxy, there is a good extension called <code>FoxyProxy</code> and add there with <code>localhost:1080</code></p>`,4)]))}const i=n(o,[["render",e]]);export{E as __pageData,i as default};
