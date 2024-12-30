import{_ as a,c as n,a2 as p,o}from"./chunks/framework.BQmytedh.js";const i=JSON.parse('{"title":"Proxy Socks5","description":"","frontmatter":{},"headers":[],"relativePath":"development/kubernetes/cluster/proxy.md","filePath":"development/kubernetes/cluster/proxy.md","lastUpdated":1735567375000}'),l={name:"development/kubernetes/cluster/proxy.md"};function e(t,s,c,r,F,y){return o(),n("div",null,s[0]||(s[0]=[p(`<h1 id="proxy-socks5" tabindex="-1">Proxy Socks5 <a class="header-anchor" href="#proxy-socks5" aria-label="Permalink to &quot;Proxy Socks5&quot;">​</a></h1><p>To reach with socks5 proxy.</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#F07178;">server</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">  entrypoints</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">    socks5</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">      address</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">:1080</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#F07178;">  tcp</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">    middlewares</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">      socks5</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">        socks5</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">          no_auth_authenticator</span><span style="color:#89DDFF;">:</span><span style="color:#FF9CAC;"> true</span></span>
<span class="line"><span style="color:#F07178;">          ip_map</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">            &quot;</span><span style="color:#C3E88D;">*.kube.com</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">10.0.10.1</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#F07178;">    routers</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">      socks5</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">        entrypoints</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">          -</span><span style="color:#C3E88D;"> socks5</span></span>
<span class="line"><span style="color:#F07178;">        middlewares</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">          -</span><span style="color:#C3E88D;"> socks5</span></span></code></pre></div>`,3)]))}const d=a(l,[["render",e]]);export{i as __pageData,d as default};
