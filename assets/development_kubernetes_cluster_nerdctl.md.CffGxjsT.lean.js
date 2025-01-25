import{_ as n,c as a,a2 as l,o as e}from"./chunks/framework.BQmytedh.js";const F=JSON.parse('{"title":"nerdctl","description":"","frontmatter":{},"headers":[],"relativePath":"development/kubernetes/cluster/nerdctl.md","filePath":"development/kubernetes/cluster/nerdctl.md","lastUpdated":1737799799000}'),p={name:"development/kubernetes/cluster/nerdctl.md"};function o(t,s,c,r,i,y){return e(),a("div",null,s[0]||(s[0]=[l(`<h1 id="nerdctl" tabindex="-1">nerdctl <a class="header-anchor" href="#nerdctl" aria-label="Permalink to &quot;nerdctl&quot;">​</a></h1><p>Without using docker in machines but still want to give commands can run as docker, <code>nerdctl</code> is a good choice.</p><p>Install nerdctl with containerd and enable in systemd.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#546E7A;font-style:italic;">#!/usr/bin/env bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#546E7A;font-style:italic;">###################</span></span>
<span class="line"><span style="color:#546E7A;font-style:italic;"># Containerd</span></span>
<span class="line"><span style="color:#546E7A;font-style:italic;">###################</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">set</span><span style="color:#C3E88D;"> -e</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#89DDFF;"> $(</span><span style="color:#FFCB6B;">dirname</span><span style="color:#89DDFF;"> $(</span><span style="color:#FFCB6B;">realpath</span><span style="color:#EEFFFF;font-style:italic;"> $0</span><span style="color:#89DDFF;">))</span></span>
<span class="line"><span style="color:#FFCB6B;">mkdir</span><span style="color:#C3E88D;"> -p</span><span style="color:#C3E88D;"> tools</span><span style="color:#89DDFF;"> &amp;&amp;</span><span style="color:#82AAFF;"> cd</span><span style="color:#C3E88D;"> tools</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#82AAFF;"> nerdctl_full_install</span><span style="color:#89DDFF;">()</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#FFCB6B;">    curl</span><span style="color:#C3E88D;"> -fSLO</span><span style="color:#C3E88D;"> https://github.com/containerd/nerdctl/releases/download/v2.0.3/nerdctl-full-2.0.3-linux-amd64.tar.gz</span></span>
<span class="line"><span style="color:#FFCB6B;">    sudo</span><span style="color:#C3E88D;"> tar</span><span style="color:#C3E88D;"> Cxzvf</span><span style="color:#C3E88D;"> /usr/local</span><span style="color:#C3E88D;"> nerdctl-full-2.0.3-linux-amd64.tar.gz</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#82AAFF;"> containerd_systemd_enable</span><span style="color:#89DDFF;">()</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#FFCB6B;">    sudo</span><span style="color:#C3E88D;"> systemctl</span><span style="color:#C3E88D;"> daemon-reload</span></span>
<span class="line"><span style="color:#FFCB6B;">    sudo</span><span style="color:#C3E88D;"> systemctl</span><span style="color:#C3E88D;"> enable</span><span style="color:#C3E88D;"> --now</span><span style="color:#C3E88D;"> containerd</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#82AAFF;"> nerdctl_permission</span><span style="color:#89DDFF;">()</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#FFCB6B;">    sudo</span><span style="color:#C3E88D;"> chown</span><span style="color:#C3E88D;"> root</span><span style="color:#89DDFF;"> &quot;$(</span><span style="color:#82AAFF;">which</span><span style="color:#C3E88D;"> nerdctl</span><span style="color:#89DDFF;">)&quot;</span></span>
<span class="line"><span style="color:#FFCB6B;">    sudo</span><span style="color:#C3E88D;"> chmod</span><span style="color:#C3E88D;"> +s</span><span style="color:#89DDFF;"> &quot;$(</span><span style="color:#82AAFF;">which</span><span style="color:#C3E88D;"> nerdctl</span><span style="color:#89DDFF;">)&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">nerdctl_full_install</span></span>
<span class="line"><span style="color:#FFCB6B;">containerd_systemd_enable</span></span>
<span class="line"><span style="color:#FFCB6B;">nerdctl_permission</span></span></code></pre></div>`,4)]))}const D=n(p,[["render",o]]);export{F as __pageData,D as default};
