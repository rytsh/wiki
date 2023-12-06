import{_ as s,o as n,c as a,R as p}from"./chunks/framework.07BXFssY.js";const b=JSON.parse('{"title":"DHCPD","description":"","frontmatter":{},"headers":[],"relativePath":"tools/server/dhcpd.md","filePath":"tools/server/dhcpd.md","lastUpdated":1701821943000}'),e={name:"tools/server/dhcpd.md"},l=p(`<h1 id="dhcpd" tabindex="-1">DHCPD <a class="header-anchor" href="#dhcpd" aria-label="Permalink to &quot;DHCPD&quot;">​</a></h1><p>For giving IP addresses to the clients with specific MAC addresses, <code>dhcpd</code> very common option.</p><p>Check here for more info: <a href="https://wiki.archlinux.org/title/dhcpd" target="_blank" rel="noreferrer">https://wiki.archlinux.org/title/dhcpd</a></p><h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-label="Permalink to &quot;Installation&quot;">​</a></h2><p>With Alpine linux</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#88846F;"># apk update</span></span>
<span class="line"><span style="color:#A6E22E;">apk</span><span style="color:#E6DB74;"> add</span><span style="color:#E6DB74;"> dhcp</span></span></code></pre></div><p>Configure it</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#A6E22E;">vim</span><span style="color:#E6DB74;"> /etc/dhcp/dhcpd.conf</span></span></code></pre></div><p>With this config we give IP addresses to the clients with specific MAC addresses.<br> Other clients will get IP addresses from the range.</p><p>We also setting the hostname for the clients.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki monokai vp-code"><code><span class="line"><span>option domain-name kube-cluster;</span></span>
<span class="line"><span>option domain-name-servers 10.10.10.1;</span></span>
<span class="line"><span>option subnet-mask 255.255.255.0;</span></span>
<span class="line"><span>option routers 10.10.10.1;</span></span>
<span class="line"><span>subnet 10.10.10.0 netmask 255.255.255.0 {</span></span>
<span class="line"><span>  range 10.10.10.100 10.10.10.250;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>group {</span></span>
<span class="line"><span>  #next-server 10.10.10.1;</span></span>
<span class="line"><span>  #filename &quot;boot.ipxe&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  option domain-name &quot;cluster.kube-cluster&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  host master1.cluster{</span></span>
<span class="line"><span>    hardware ethernet ba:ba:00:00:11:01;</span></span>
<span class="line"><span>    fixed-address 10.10.10.51;</span></span>
<span class="line"><span>    option host-name &quot;master1&quot;;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  host master2.cluster{</span></span>
<span class="line"><span>    hardware ethernet ba:ba:00:00:11:02;</span></span>
<span class="line"><span>    fixed-address 10.10.10.52;</span></span>
<span class="line"><span>    option host-name &quot;master2&quot;;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  host master3.cluster{</span></span>
<span class="line"><span>    hardware ethernet ba:ba:00:00:11:03;</span></span>
<span class="line"><span>    fixed-address 10.10.10.53;</span></span>
<span class="line"><span>    option host-name &quot;master3&quot;;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  host node1.cluster{</span></span>
<span class="line"><span>    hardware ethernet ba:ba:00:00:12:01;</span></span>
<span class="line"><span>    fixed-address 10.10.10.71;</span></span>
<span class="line"><span>    option host-name &quot;node1&quot;;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  host node2.cluster{</span></span>
<span class="line"><span>    hardware ethernet ba:ba:00:00:12:02;</span></span>
<span class="line"><span>    fixed-address 10.10.10.72;</span></span>
<span class="line"><span>    option host-name &quot;node2&quot;;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  host node3.cluster{</span></span>
<span class="line"><span>    hardware ethernet ba:ba:00:00:12:03;</span></span>
<span class="line"><span>    fixed-address 10.10.10.73;</span></span>
<span class="line"><span>    option host-name &quot;node3&quot;;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Add interface to listen</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#A6E22E;">vim</span><span style="color:#E6DB74;"> /etc/conf.d/dhcpd</span></span>
<span class="line"><span style="color:#88846F;"># DHCPD_IFACE=&quot;eth1&quot;</span></span></code></pre></div><p>Now enable and start the service</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#A6E22E;">rc-update</span><span style="color:#E6DB74;"> add</span><span style="color:#E6DB74;"> dhcpd</span><span style="color:#E6DB74;"> default</span></span>
<span class="line"><span style="color:#A6E22E;">rc-service</span><span style="color:#E6DB74;"> dhcpd</span><span style="color:#E6DB74;"> start</span></span></code></pre></div><p>When you change the config, you need to restart the service</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai vp-code"><code><span class="line"><span style="color:#A6E22E;">rc-service</span><span style="color:#E6DB74;"> dhcpd</span><span style="color:#E6DB74;"> restart</span></span></code></pre></div>`,17),t=[l];function o(c,i,r,d,h,u){return n(),a("div",null,t)}const g=s(e,[["render",o]]);export{b as __pageData,g as default};
