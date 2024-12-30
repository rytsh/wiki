import{_ as a,c as n,a2 as p,o}from"./chunks/framework.BQmytedh.js";const d=JSON.parse('{"title":"Proxy Socks5","description":"","frontmatter":{},"headers":[],"relativePath":"development/kubernetes/cluster/proxy.md","filePath":"development/kubernetes/cluster/proxy.md","lastUpdated":1735579610000}'),l={name:"development/kubernetes/cluster/proxy.md"};function e(t,s,c,r,y,i){return o(),n("div",null,s[0]||(s[0]=[p(`<h1 id="proxy-socks5" tabindex="-1">Proxy Socks5 <a class="header-anchor" href="#proxy-socks5" aria-label="Permalink to &quot;Proxy Socks5&quot;">​</a></h1><p>To reach with socks5 proxy.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">cat</span><span style="color:#89DDFF;"> &lt;&lt;</span><span style="color:#89DDFF;">EOF</span><span style="color:#89DDFF;"> |</span><span style="color:#FFCB6B;"> sudo</span><span style="color:#C3E88D;"> tee</span><span style="color:#C3E88D;"> /opt/kube-proxy.yaml</span></span>
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
<span class="line"><span style="color:#C3E88D;">            &quot;*.kube.com&quot;: &quot;10.0.10.1&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">    routers:</span></span>
<span class="line"><span style="color:#C3E88D;">      socks5:</span></span>
<span class="line"><span style="color:#C3E88D;">        entrypoints:</span></span>
<span class="line"><span style="color:#C3E88D;">          - socks5</span></span>
<span class="line"><span style="color:#C3E88D;">        middlewares:</span></span>
<span class="line"><span style="color:#C3E88D;">          - socks5</span></span>
<span class="line"><span style="color:#89DDFF;">EOF</span></span></code></pre></div><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#C3E88D;"> run</span><span style="color:#C3E88D;"> -d</span><span style="color:#C3E88D;"> --restart=always</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#EEFFFF;">--name </span><span style="color:#C3E88D;">kube-proxy</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#EEFFFF;">--network </span><span style="color:#C3E88D;">kind</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#EEFFFF;">-p </span><span style="color:#C3E88D;">1080:1080</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#EEFFFF;">-v </span><span style="color:#C3E88D;">/opt/kube-proxy.yaml:/turna.yaml</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#EEFFFF;">ghcr.io/rakunlabs/turna:v0.7.12</span></span></code></pre></div><p>To Access socks5 proxy, in firefox there is a good extension called <code>FoxyProxy</code> and add there with <code>localhost:1080</code></p>`,5)]))}const E=a(l,[["render",e]]);export{d as __pageData,E as default};
