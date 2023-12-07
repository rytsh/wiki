import{_ as s,o as a,c as n,R as e}from"./chunks/framework.07BXFssY.js";const m=JSON.parse('{"title":"DNS","description":"","frontmatter":{},"headers":[],"relativePath":"tools/server/dns.md","filePath":"tools/server/dns.md","lastUpdated":1701909486000}'),p={name:"tools/server/dns.md"},l=e(`<h1 id="dns" tabindex="-1">DNS <a class="header-anchor" href="#dns" aria-label="Permalink to &quot;DNS&quot;">​</a></h1><p>DNS server for finding machines.</p><h2 id="coredns" tabindex="-1">CoreDNS <a class="header-anchor" href="#coredns" aria-label="Permalink to &quot;CoreDNS&quot;">​</a></h2><p>Choice of CoreDNS due to basic usage and have lots of pluging inside.</p><p>You can use in docker</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#A6E22E;">docker</span><span style="color:#E6DB74;"> run</span><span style="color:#AE81FF;"> -d</span><span style="color:#AE81FF;"> --restart=always</span><span style="color:#AE81FF;"> --name=coredns</span><span style="color:#AE81FF;"> -v</span><span style="color:#E6DB74;"> $(</span><span style="color:#66D9EF;">pwd</span><span style="color:#E6DB74;">)/Corefile:/Corefile</span><span style="color:#AE81FF;"> --dns=127.0.0.1</span><span style="color:#AE81FF;"> -p</span><span style="color:#AE81FF;"> 10.10</span><span style="color:#E6DB74;">.10.1:53:53/tcp</span><span style="color:#AE81FF;"> -p</span><span style="color:#AE81FF;"> 10.10</span><span style="color:#E6DB74;">.10.1:53:53/udp</span><span style="color:#E6DB74;"> coredns/coredns:1.8.0</span></span></code></pre></div><p>But I will choice package manager beacuse it is tiny doesn&#39;t have any dependencies.</p><p>For Alpine enable first community repo.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#A6E22E;">management:~#</span><span style="color:#E6DB74;"> cat</span><span style="color:#E6DB74;"> /etc/apk/repositories</span><span style="color:#F8F8F2;"> </span></span>
<span class="line"><span style="color:#88846F;">#/media/cdrom/apks</span></span>
<span class="line"><span style="color:#A6E22E;">http://mirror1.hs-esslingen.de/pub/Mirrors/alpine/v3.18/main</span></span>
<span class="line"><span style="color:#A6E22E;">http://mirror1.hs-esslingen.de/pub/Mirrors/alpine/v3.18/community</span></span></code></pre></div><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#88846F;"># apk update</span></span>
<span class="line"><span style="color:#A6E22E;">apk</span><span style="color:#E6DB74;"> add</span><span style="color:#E6DB74;"> coredns</span><span style="color:#E6DB74;"> coredns-openrc</span></span></code></pre></div><p>And <code>Corefile</code> is like this</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki monokai vp-code"><code><span class="line"><span>cluster.kube-cluster {</span></span>
<span class="line"><span>    hosts {</span></span>
<span class="line"><span>        10.10.10.1 management.kube-cluster cluster.kube-cluster</span></span>
<span class="line"><span>        10.10.10.51 master1.cluster.kube-cluster</span></span>
<span class="line"><span>        10.10.10.52 master2.cluster.kube-cluster</span></span>
<span class="line"><span>        10.10.10.53 master3.cluster.kube-cluster</span></span>
<span class="line"><span>        10.10.10.71 node1.cluster.kube-cluster</span></span>
<span class="line"><span>        10.10.10.72 node2.cluster.kube-cluster</span></span>
<span class="line"><span>        10.10.10.73 node3.cluster.kube-cluster</span></span>
<span class="line"><span>        10.10.10.74 node4.cluster.kube-cluster</span></span>
<span class="line"><span>        10.10.10.75 node5.cluster.kube-cluster</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    reload</span></span>
<span class="line"><span>    errors</span></span>
<span class="line"><span>    log</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>. {</span></span>
<span class="line"><span>    forward . 8.8.8.8 8.8.4.4 {</span></span>
<span class="line"><span>        tls_servername dns.google</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    cache 30</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>For additional cluster just add new stanza.</p><p>Edit init file to use <code>Corefile</code> check <code>/etc/init.d/coredns</code> file.</p><p>It already has a <code>\${COREDNS_CONFIG}</code> variable and we can use it and openrc it will set in the <code>/etc/conf.d/coredns</code> file.</p><p>It is show <code>/etc/coredns/Corefile</code> so just change in there.</p><p>Enable and start</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#A6E22E;">rc-update</span><span style="color:#E6DB74;"> add</span><span style="color:#E6DB74;"> coredns</span><span style="color:#E6DB74;"> default</span></span>
<span class="line"><span style="color:#A6E22E;">rc-service</span><span style="color:#E6DB74;"> coredns</span><span style="color:#E6DB74;"> start</span></span></code></pre></div><h3 id="wildcard-record" tabindex="-1">Wildcard record <a class="header-anchor" href="#wildcard-record" aria-label="Permalink to &quot;Wildcard record&quot;">​</a></h3><p>Add this content</p><p>cluster.dev { file /etc/coredns/cluster.dev reload errors log }</p><p><code>admin.cluster.dev.</code> equal to <code>admin@cluster.dev</code> mail address, check SOA.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki monokai vp-code"><code><span class="line"><span>@ 3600 IN SOA cluster.dev. admin.cluster.dev. (</span></span>
<span class="line"><span>    1          ; serial</span></span>
<span class="line"><span>    7200       ; refresh (2 hours)</span></span>
<span class="line"><span>    3600       ; retry (1 hour)</span></span>
<span class="line"><span>    1209600    ; expire (2 weeks)</span></span>
<span class="line"><span>    3600       ; minimum (1 hour)</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>*     IN A     10.1.2.10</span></span></code></pre></div><p>Now every request like <code>www.cluster.dev</code> or <code>test.cluster.dev</code> show same IP.</p><p>This is very useful for our ingress. Now ingress control virtual host names.</p><h3 id="redirect-dns" tabindex="-1">Redirect DNS <a class="header-anchor" href="#redirect-dns" aria-label="Permalink to &quot;Redirect DNS&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki monokai vp-code"><code><span class="line"><span>. {</span></span>
<span class="line"><span>    forward . 8.8.8.8 8.8.4.4 {</span></span>
<span class="line"><span>        tls_servername dns.google</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    cache 30</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="use-own-dns" tabindex="-1">Use own DNS <a class="header-anchor" href="#use-own-dns" aria-label="Permalink to &quot;Use own DNS&quot;">​</a></h3><p>Edit <code>/etc/resolv.conf</code> file and add this line</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki monokai vp-code"><code><span class="line"><span>nameserver 10.10.10.1</span></span></code></pre></div>`,30),o=[l];function c(r,t,i,d,u,h){return a(),n("div",null,o)}const v=s(p,[["render",c]]);export{m as __pageData,v as default};
