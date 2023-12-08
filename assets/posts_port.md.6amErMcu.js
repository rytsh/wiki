import{_ as s,o as a,c as e,R as t}from"./chunks/framework.07BXFssY.js";const y=JSON.parse('{"title":"Port","description":"","frontmatter":{},"headers":[],"relativePath":"posts/port.md","filePath":"posts/port.md","lastUpdated":1701291473000}'),o={name:"posts/port.md"},p=t(`<h1 id="port" tabindex="-1">Port <a class="header-anchor" href="#port" aria-label="Permalink to &quot;Port&quot;">​</a></h1><p><code>1-65535</code> avaliable ports and in range <code>1-1023</code> are the privileged ones.</p><h2 id="enable-1-1023-ports" tabindex="-1">Enable 1-1023 ports <a class="header-anchor" href="#enable-1-1023-ports" aria-label="Permalink to &quot;Enable 1-1023 ports&quot;">​</a></h2><p>Give permisstion to run below 1024 port number.</p><h3 id="method-1-sysctl-disable" tabindex="-1">Method 1 - sysctl disable <a class="header-anchor" href="#method-1-sysctl-disable" aria-label="Permalink to &quot;Method 1 - sysctl disable&quot;">​</a></h3><p>Directly disable to protect port 1024 below.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#C3E88D;"> sysctl</span><span style="color:#C3E88D;"> -w</span><span style="color:#C3E88D;"> net.ipv4.ip_unprivileged_port_start=</span><span style="color:#F78C6C;">0</span></span></code></pre></div><h3 id="method-2-setcap" tabindex="-1">Method 2 - setcap <a class="header-anchor" href="#method-2-setcap" aria-label="Permalink to &quot;Method 2 - setcap&quot;">​</a></h3><p>Setcap to allow port 1024 below to specific program.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#C3E88D;"> setcap</span><span style="color:#89DDFF;"> &#39;</span><span style="color:#C3E88D;">cap_net_bind_service=+ep</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;"> /path/to/program</span></span></code></pre></div><h3 id="method-3-authbind" tabindex="-1">Method 3 - authbind <a class="header-anchor" href="#method-3-authbind" aria-label="Permalink to &quot;Method 3 - authbind&quot;">​</a></h3><p>First install authbind tool and give permission to ports.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#C3E88D;"> touch</span><span style="color:#C3E88D;"> /etc/authbind/byport/443</span></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#C3E88D;"> chmod</span><span style="color:#F78C6C;"> 500</span><span style="color:#C3E88D;"> /etc/authbind/byport/443</span></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#C3E88D;"> chown</span><span style="color:#EEFFFF;"> $USER </span><span style="color:#C3E88D;">/etc/authbind/byport/443</span></span></code></pre></div><p>After that run with authbind, <code>--deep</code> means effect other dependecy program.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">authbind</span><span style="color:#C3E88D;"> --deep</span><span style="color:#C3E88D;"> myprogram</span></span></code></pre></div>`,15),n=[p];function l(r,c,d,i,h,u){return a(),e("div",null,n)}const m=s(o,[["render",l]]);export{y as __pageData,m as default};
