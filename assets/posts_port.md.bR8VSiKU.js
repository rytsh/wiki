import{_ as s,c as a,o,a4 as e}from"./chunks/framework.DpC1ZpOZ.js";const u=JSON.parse('{"title":"Port","description":"","frontmatter":{},"headers":[],"relativePath":"posts/port.md","filePath":"posts/port.md","lastUpdated":1705834210000}'),t={name:"posts/port.md"},n=e(`<h1 id="port" tabindex="-1">Port <a class="header-anchor" href="#port" aria-label="Permalink to &quot;Port&quot;">​</a></h1><h2 id="port-forwarding-windows" tabindex="-1">Port Forwarding Windows <a class="header-anchor" href="#port-forwarding-windows" aria-label="Permalink to &quot;Port Forwarding Windows&quot;">​</a></h2><blockquote><p>To do that you need to run command prompt as administrator.</p></blockquote><p>Add port forwarding rule.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">netsh.exe</span><span style="color:#C3E88D;"> interface</span><span style="color:#C3E88D;"> portproxy</span><span style="color:#C3E88D;"> add</span><span style="color:#C3E88D;"> v4tov4</span><span style="color:#C3E88D;"> listenport=</span><span style="color:#F78C6C;">8080</span><span style="color:#C3E88D;"> listenaddress=</span><span style="color:#F78C6C;">192.168.1.10</span><span style="color:#C3E88D;"> connectport=</span><span style="color:#F78C6C;">8080</span><span style="color:#C3E88D;"> connectaddress=</span><span style="color:#F78C6C;">172.16.10.10</span></span></code></pre></div><p>Show port forwarding rules.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">netsh.exe</span><span style="color:#C3E88D;"> interface</span><span style="color:#C3E88D;"> portproxy</span><span style="color:#C3E88D;"> show</span><span style="color:#C3E88D;"> all</span></span></code></pre></div><p>Delete port forwarding rule.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">netsh.exe</span><span style="color:#C3E88D;"> interface</span><span style="color:#C3E88D;"> portproxy</span><span style="color:#C3E88D;"> delete</span><span style="color:#C3E88D;"> v4tov4</span><span style="color:#C3E88D;"> listenport=</span><span style="color:#F78C6C;">8080</span><span style="color:#C3E88D;"> listenaddress=</span><span style="color:#F78C6C;">192.168.1.10</span></span></code></pre></div><h2 id="port-forwarding-ssh" tabindex="-1">Port Forwarding SSH <a class="header-anchor" href="#port-forwarding-ssh" aria-label="Permalink to &quot;Port Forwarding SSH&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">ssh</span><span style="color:#C3E88D;"> -nNT</span><span style="color:#C3E88D;"> -L</span><span style="color:#C3E88D;"> 5858:localhost:5757</span><span style="color:#C3E88D;"> remotehost</span></span></code></pre></div><p>Now request to <code>localhost:5858</code> will be forwarded to <code>localhost:5757</code> of the remote machine.</p><p>Use <code>-R</code> instead of <code>-L</code> to reverse the direction of the tunnel.</p><p>In remote host, request to <code>localhost:5858</code> will be forwarded to <code>localhost:5757</code> of the local machine.</p><h2 id="enable-1-1023-ports" tabindex="-1">Enable 1-1023 ports <a class="header-anchor" href="#enable-1-1023-ports" aria-label="Permalink to &quot;Enable 1-1023 ports&quot;">​</a></h2><p><code>1-65535</code> avaliable ports and in range <code>1-1023</code> are the privileged ones.</p><p>Give permisstion to run below 1024 port number.</p><h3 id="method-1-sysctl-disable" tabindex="-1">Method 1 - sysctl disable <a class="header-anchor" href="#method-1-sysctl-disable" aria-label="Permalink to &quot;Method 1 - sysctl disable&quot;">​</a></h3><p>Directly disable to protect port 1024 below.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#C3E88D;"> sysctl</span><span style="color:#C3E88D;"> -w</span><span style="color:#C3E88D;"> net.ipv4.ip_unprivileged_port_start=</span><span style="color:#F78C6C;">0</span></span></code></pre></div><h3 id="method-2-setcap" tabindex="-1">Method 2 - setcap <a class="header-anchor" href="#method-2-setcap" aria-label="Permalink to &quot;Method 2 - setcap&quot;">​</a></h3><p>Setcap to allow port 1024 below to specific program.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#C3E88D;"> setcap</span><span style="color:#89DDFF;"> &#39;</span><span style="color:#C3E88D;">cap_net_bind_service=+ep</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;"> /path/to/program</span></span></code></pre></div><h3 id="method-3-authbind" tabindex="-1">Method 3 - authbind <a class="header-anchor" href="#method-3-authbind" aria-label="Permalink to &quot;Method 3 - authbind&quot;">​</a></h3><p>First install authbind tool and give permission to ports.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#C3E88D;"> touch</span><span style="color:#C3E88D;"> /etc/authbind/byport/443</span></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#C3E88D;"> chmod</span><span style="color:#F78C6C;"> 500</span><span style="color:#C3E88D;"> /etc/authbind/byport/443</span></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#C3E88D;"> chown</span><span style="color:#EEFFFF;"> $USER </span><span style="color:#C3E88D;">/etc/authbind/byport/443</span></span></code></pre></div><p>After that run with authbind, <code>--deep</code> means effect other dependecy program.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">authbind</span><span style="color:#C3E88D;"> --deep</span><span style="color:#C3E88D;"> myprogram</span></span></code></pre></div>`,28),l=[n];function p(r,c,d,i,h,y){return o(),a("div",null,l)}const b=s(t,[["render",p]]);export{u as __pageData,b as default};