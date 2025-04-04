import{_ as e,o as a,c as n,ag as o}from"./chunks/framework.BcBuEkoe.js";const h=JSON.parse('{"title":"DHCP Windows","description":"DHCP management in Windows.","frontmatter":{"head":[["meta",{"name":"description","content":"DHCP management in Windows."}],["meta",{"name":"keywords","content":"DHCP Windows"}]]},"headers":[],"relativePath":"posts/dhcp_windows.md","filePath":"posts/dhcp_windows.md","lastUpdated":1743799263000}'),t={name:"posts/dhcp_windows.md"};function p(l,s,c,i,d,r){return a(),n("div",null,s[0]||(s[0]=[o('<h1 id="dhcp-windows" tabindex="-1">DHCP Windows <a class="header-anchor" href="#dhcp-windows" aria-label="Permalink to &quot;DHCP Windows&quot;">​</a></h1><p>In windows, I have sometimes problem with connection to internet on wifi due to DHCP auto IP adds not working properly. To fix that I just calling manually DHCP client to get new IP address.</p><p>Open cmd as administrator and run below command.</p><p>Show network interfaces</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">netsh.exe</span><span style="color:#C3E88D;"> interface</span><span style="color:#C3E88D;"> show</span><span style="color:#C3E88D;"> interface</span></span></code></pre></div><p>Get new IP address</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">netsh.exe</span><span style="color:#C3E88D;"> interface</span><span style="color:#C3E88D;"> ip</span><span style="color:#C3E88D;"> set</span><span style="color:#C3E88D;"> address</span><span style="color:#C3E88D;"> name=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Wi-Fi</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;"> source=dhcp</span></span></code></pre></div>',7)]))}const w=e(t,[["render",p]]);export{h as __pageData,w as default};
