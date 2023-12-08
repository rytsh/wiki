import{_ as s,o as a,c as n,R as p}from"./chunks/framework.07BXFssY.js";const D=JSON.parse('{"title":"Network","description":"","frontmatter":{},"headers":[],"relativePath":"development/kubernetes/network.md","filePath":"development/kubernetes/network.md","lastUpdated":1701994294000}'),e={name:"development/kubernetes/network.md"},l=p(`<h1 id="network" tabindex="-1">Network <a class="header-anchor" href="#network" aria-label="Permalink to &quot;Network&quot;">​</a></h1><p>Communication with IP, DNS and cluster networking.</p><h2 id="ip" tabindex="-1">IP <a class="header-anchor" href="#ip" aria-label="Permalink to &quot;IP&quot;">​</a></h2><p>Communication with other machine we need to same network or need a router</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#546E7A;font-style:italic;"># show devices</span></span>
<span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> link</span></span>
<span class="line"><span style="color:#546E7A;font-style:italic;"># show address</span></span>
<span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> addr</span></span>
<span class="line"><span style="color:#546E7A;font-style:italic;"># add a new address</span></span>
<span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> addr</span><span style="color:#C3E88D;"> add</span><span style="color:#F78C6C;"> 192.168</span><span style="color:#C3E88D;">.1.10/24</span><span style="color:#C3E88D;"> dev</span><span style="color:#C3E88D;"> eth0</span></span>
<span class="line"><span style="color:#546E7A;font-style:italic;"># for delete</span></span>
<span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> addr</span><span style="color:#C3E88D;"> del</span><span style="color:#F78C6C;"> 192.168</span><span style="color:#C3E88D;">.1.10/24</span><span style="color:#C3E88D;"> dev</span><span style="color:#C3E88D;"> eth0</span></span></code></pre></div><p>When we go to other network our exit door is <strong>gateway</strong>, example our for <code>route</code> command</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#C3E88D;"> route</span></span>
<span class="line"><span style="color:#FFCB6B;">Kernel</span><span style="color:#C3E88D;"> IP</span><span style="color:#C3E88D;"> routing</span><span style="color:#C3E88D;"> table</span></span>
<span class="line"><span style="color:#FFCB6B;">Destination</span><span style="color:#C3E88D;">     Gateway</span><span style="color:#C3E88D;">         Genmask</span><span style="color:#C3E88D;">         Flags</span><span style="color:#C3E88D;"> Metric</span><span style="color:#C3E88D;"> Ref</span><span style="color:#C3E88D;">    Use</span><span style="color:#C3E88D;"> Iface</span></span>
<span class="line"><span style="color:#FFCB6B;">default</span><span style="color:#C3E88D;">         _gateway</span><span style="color:#F78C6C;">        0.0</span><span style="color:#C3E88D;">.0.0</span><span style="color:#C3E88D;">         UG</span><span style="color:#F78C6C;">    0</span><span style="color:#F78C6C;">      0</span><span style="color:#F78C6C;">        0</span><span style="color:#C3E88D;"> ens37</span></span>
<span class="line"><span style="color:#FFCB6B;">172.17.0.0</span><span style="color:#F78C6C;">      0.0</span><span style="color:#C3E88D;">.0.0</span><span style="color:#F78C6C;">         255.255</span><span style="color:#C3E88D;">.0.0</span><span style="color:#C3E88D;">     U</span><span style="color:#F78C6C;">     0</span><span style="color:#F78C6C;">      0</span><span style="color:#F78C6C;">        0</span><span style="color:#C3E88D;"> docker0</span></span>
<span class="line"><span style="color:#FFCB6B;">172.18.0.0</span><span style="color:#F78C6C;">      0.0</span><span style="color:#C3E88D;">.0.0</span><span style="color:#F78C6C;">         255.255</span><span style="color:#C3E88D;">.0.0</span><span style="color:#C3E88D;">     U</span><span style="color:#F78C6C;">     0</span><span style="color:#F78C6C;">      0</span><span style="color:#F78C6C;">        0</span><span style="color:#C3E88D;"> br-5f56f9625c4c</span></span>
<span class="line"><span style="color:#FFCB6B;">192.168.2.0</span><span style="color:#F78C6C;">     0.0</span><span style="color:#C3E88D;">.0.0</span><span style="color:#F78C6C;">         255.255</span><span style="color:#C3E88D;">.255.0</span><span style="color:#C3E88D;">   U</span><span style="color:#F78C6C;">     0</span><span style="color:#F78C6C;">      0</span><span style="color:#F78C6C;">        0</span><span style="color:#C3E88D;"> ens37</span></span>
<span class="line"><span style="color:#FFCB6B;">192.168.39.0</span><span style="color:#F78C6C;">    0.0</span><span style="color:#C3E88D;">.0.0</span><span style="color:#F78C6C;">         255.255</span><span style="color:#C3E88D;">.255.0</span><span style="color:#C3E88D;">   U</span><span style="color:#F78C6C;">     0</span><span style="color:#F78C6C;">      0</span><span style="color:#F78C6C;">        0</span><span style="color:#C3E88D;"> virbr1</span></span>
<span class="line"><span style="color:#FFCB6B;">192.168.122.0</span><span style="color:#F78C6C;">   0.0</span><span style="color:#C3E88D;">.0.0</span><span style="color:#F78C6C;">         255.255</span><span style="color:#C3E88D;">.255.0</span><span style="color:#C3E88D;">   U</span><span style="color:#F78C6C;">     0</span><span style="color:#F78C6C;">      0</span><span style="color:#F78C6C;">        0</span><span style="color:#C3E88D;"> virbr0</span></span></code></pre></div><p>But we need to declare gateway to reach specific network.<br> In here we want to go to <code>192.168.2.9/24</code> network but use <code>192.168.1.1</code>.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> route</span><span style="color:#C3E88D;"> add</span><span style="color:#F78C6C;"> 192.168</span><span style="color:#C3E88D;">.2.0/24</span><span style="color:#C3E88D;"> via</span><span style="color:#F78C6C;"> 192.168</span><span style="color:#C3E88D;">.1.1</span></span></code></pre></div><p>For other network we need to tell default gateway (you can use <code>0.0.0.0</code> instead of <code>default</code>)</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> route</span><span style="color:#C3E88D;"> add</span><span style="color:#C3E88D;"> default</span><span style="color:#C3E88D;"> via</span><span style="color:#F78C6C;"> 192.168</span><span style="color:#C3E88D;">.2.1</span></span></code></pre></div><p>Delete route</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> route</span><span style="color:#C3E88D;"> del</span><span style="color:#C3E88D;"> default</span></span>
<span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> route</span><span style="color:#C3E88D;"> del</span><span style="color:#F78C6C;"> 10.0</span><span style="color:#C3E88D;">.0.0/24</span><span style="color:#C3E88D;"> via</span><span style="color:#F78C6C;"> 192.168</span><span style="color:#C3E88D;">.0.36</span></span></code></pre></div><p>When you reach to one machine to another of another machine, you need to declare route for related machines.<br> In linux machine ip forward disabled to prevent directly connect private network.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">cat</span><span style="color:#C3E88D;"> /proc/sys/net/ipv4/ip_forward</span></span>
<span class="line"><span style="color:#546E7A;font-style:italic;"># set change</span></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#F78C6C;"> 1</span><span style="color:#89DDFF;"> &gt;</span><span style="color:#C3E88D;"> /proc/sys/net/ipv4/ip_forward</span></span>
<span class="line"><span style="color:#546E7A;font-style:italic;"># persistent change in /etc/sysctl.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#C3E88D;">  net.ipv4.ip_forward</span><span style="color:#C3E88D;"> =</span><span style="color:#F78C6C;"> 1</span><span style="color:#89DDFF;"> &gt;&gt;</span><span style="color:#C3E88D;"> /etc/sysctl.conf</span></span>
<span class="line"><span style="color:#FFCB6B;">sysctl</span><span style="color:#C3E88D;"> -p</span></span>
<span class="line"><span style="color:#FFCB6B;">sysctl</span><span style="color:#C3E88D;"> -a</span><span style="color:#89DDFF;"> |</span><span style="color:#FFCB6B;"> grep</span><span style="color:#C3E88D;"> net.ipv4.ip_forward</span></span></code></pre></div><p>Also look at the Metric variable for priority.</p><h2 id="network-namespaces" tabindex="-1">Network Namespaces <a class="header-anchor" href="#network-namespaces" aria-label="Permalink to &quot;Network Namespaces&quot;">​</a></h2><p>Create private network area to use in our app.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#546E7A;font-style:italic;"># red namespace add</span></span>
<span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> netns</span><span style="color:#C3E88D;"> add</span><span style="color:#C3E88D;"> red</span></span>
<span class="line"><span style="color:#546E7A;font-style:italic;"># blue namespace add</span></span>
<span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> netns</span><span style="color:#C3E88D;"> add</span><span style="color:#C3E88D;"> blue</span></span>
<span class="line"></span>
<span class="line"><span style="color:#546E7A;font-style:italic;"># get namespaces</span></span>
<span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> netns</span></span></code></pre></div><p>Run ip command in namespace</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> netns</span><span style="color:#C3E88D;"> exec</span><span style="color:#C3E88D;"> red</span><span style="color:#C3E88D;"> ip</span><span style="color:#C3E88D;"> link</span></span>
<span class="line"><span style="color:#546E7A;font-style:italic;"># Or</span></span>
<span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> -n</span><span style="color:#C3E88D;"> red</span><span style="color:#C3E88D;"> link</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> -n</span><span style="color:#C3E88D;"> red</span><span style="color:#C3E88D;"> arp</span></span>
<span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> -n</span><span style="color:#C3E88D;"> red</span><span style="color:#C3E88D;"> route</span></span></code></pre></div><p>Create virtual network</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> link</span><span style="color:#C3E88D;"> add</span><span style="color:#C3E88D;"> veth-red</span><span style="color:#C3E88D;"> type</span><span style="color:#C3E88D;"> veth</span><span style="color:#C3E88D;"> peer</span><span style="color:#C3E88D;"> name</span><span style="color:#C3E88D;"> veth-blue</span></span></code></pre></div><p>Veth create 2 paired network device. <a href="https://man7.org/linux/man-pages/man4/veth.4.html" target="_blank" rel="noreferrer">https://man7.org/linux/man-pages/man4/veth.4.html</a></p><p>Add virtual devices to namespaces</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> link</span><span style="color:#C3E88D;"> set</span><span style="color:#C3E88D;"> veth-red</span><span style="color:#C3E88D;"> netns</span><span style="color:#C3E88D;"> red</span></span>
<span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> link</span><span style="color:#C3E88D;"> set</span><span style="color:#C3E88D;"> veth-blue</span><span style="color:#C3E88D;"> netns</span><span style="color:#C3E88D;"> blue</span></span></code></pre></div><p>Add an ip address</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> -n</span><span style="color:#C3E88D;"> red</span><span style="color:#C3E88D;"> addr</span><span style="color:#C3E88D;"> add</span><span style="color:#F78C6C;"> 192.168</span><span style="color:#C3E88D;">.15.1</span><span style="color:#C3E88D;"> dev</span><span style="color:#C3E88D;"> veth-red</span></span>
<span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> -n</span><span style="color:#C3E88D;"> blue</span><span style="color:#C3E88D;"> addr</span><span style="color:#C3E88D;"> add</span><span style="color:#F78C6C;"> 192.168</span><span style="color:#C3E88D;">.15.2</span><span style="color:#C3E88D;"> dev</span><span style="color:#C3E88D;"> veth-blue</span></span></code></pre></div><p>up veth</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> -n</span><span style="color:#C3E88D;"> red</span><span style="color:#C3E88D;"> link</span><span style="color:#C3E88D;"> set</span><span style="color:#C3E88D;"> veth-red</span><span style="color:#C3E88D;"> up</span></span>
<span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> -n</span><span style="color:#C3E88D;"> blue</span><span style="color:#C3E88D;"> link</span><span style="color:#C3E88D;"> set</span><span style="color:#C3E88D;"> veth-blue</span><span style="color:#C3E88D;"> up</span></span></code></pre></div><p>ping red to blue</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> netns</span><span style="color:#C3E88D;"> exec</span><span style="color:#C3E88D;"> red</span><span style="color:#C3E88D;"> ping</span><span style="color:#F78C6C;"> 192.168</span><span style="color:#C3E88D;">.15.2</span></span></code></pre></div><p>When delete one veth also it will delete own pair</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> -n</span><span style="color:#C3E88D;"> red</span><span style="color:#C3E88D;"> link</span><span style="color:#C3E88D;"> dev</span><span style="color:#C3E88D;"> veth-red</span></span></code></pre></div><h2 id="bridge" tabindex="-1">Bridge <a class="header-anchor" href="#bridge" aria-label="Permalink to &quot;Bridge&quot;">​</a></h2><p>Bridge work like switch.</p><p>Create bridge</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> link</span><span style="color:#C3E88D;"> add</span><span style="color:#C3E88D;"> v-net-0</span><span style="color:#C3E88D;"> type</span><span style="color:#C3E88D;"> bridge</span></span></code></pre></div><p>Check with <code>ip link</code></p><p>Up bridge</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> link</span><span style="color:#C3E88D;"> set</span><span style="color:#C3E88D;"> dev</span><span style="color:#C3E88D;"> v-net-0</span><span style="color:#C3E88D;"> up</span></span></code></pre></div><p>Create 2 veth to link namespaces with bridge.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> link</span><span style="color:#C3E88D;"> add</span><span style="color:#C3E88D;"> veth-red</span><span style="color:#C3E88D;"> type</span><span style="color:#C3E88D;"> veth</span><span style="color:#C3E88D;"> peer</span><span style="color:#C3E88D;"> name</span><span style="color:#C3E88D;"> veth-red-br</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> link</span><span style="color:#C3E88D;"> add</span><span style="color:#C3E88D;"> veth-blue</span><span style="color:#C3E88D;"> type</span><span style="color:#C3E88D;"> veth</span><span style="color:#C3E88D;"> peer</span><span style="color:#C3E88D;"> name</span><span style="color:#C3E88D;"> veth-blue-br</span></span></code></pre></div><p>Add pairs to namespace and bridge.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> link</span><span style="color:#C3E88D;"> set</span><span style="color:#C3E88D;"> veth-red</span><span style="color:#C3E88D;"> netns</span><span style="color:#C3E88D;"> red</span></span>
<span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> link</span><span style="color:#C3E88D;"> set</span><span style="color:#C3E88D;"> veth-red-br</span><span style="color:#C3E88D;"> master</span><span style="color:#C3E88D;"> v-net-0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> link</span><span style="color:#C3E88D;"> set</span><span style="color:#C3E88D;"> veth-blue</span><span style="color:#C3E88D;"> netns</span><span style="color:#C3E88D;"> blue</span></span>
<span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> link</span><span style="color:#C3E88D;"> set</span><span style="color:#C3E88D;"> veth-blue-br</span><span style="color:#C3E88D;"> master</span><span style="color:#C3E88D;"> v-net-0</span></span></code></pre></div><p>Add ip address</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> -n</span><span style="color:#C3E88D;"> red</span><span style="color:#C3E88D;"> addr</span><span style="color:#C3E88D;"> add</span><span style="color:#F78C6C;"> 192.168</span><span style="color:#C3E88D;">.15.1</span><span style="color:#C3E88D;"> dev</span><span style="color:#C3E88D;"> veth-red</span></span>
<span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> -n</span><span style="color:#C3E88D;"> blue</span><span style="color:#C3E88D;"> addr</span><span style="color:#C3E88D;"> add</span><span style="color:#F78C6C;"> 192.168</span><span style="color:#C3E88D;">.15.2</span><span style="color:#C3E88D;"> dev</span><span style="color:#C3E88D;"> veth-blue</span></span>
<span class="line"></span>
<span class="line"><span style="color:#546E7A;font-style:italic;"># up</span></span>
<span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> -n</span><span style="color:#C3E88D;"> red</span><span style="color:#C3E88D;"> link</span><span style="color:#C3E88D;"> set</span><span style="color:#C3E88D;"> veth-red</span><span style="color:#C3E88D;"> up</span></span>
<span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> -n</span><span style="color:#C3E88D;"> blue</span><span style="color:#C3E88D;"> link</span><span style="color:#C3E88D;"> set</span><span style="color:#C3E88D;"> veth-blue</span><span style="color:#C3E88D;"> up</span></span></code></pre></div><p>When reaching host to namespaces&#39; device we need to add ip address to bridge</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> addr</span><span style="color:#C3E88D;"> add</span><span style="color:#F78C6C;"> 192.168</span><span style="color:#C3E88D;">.15.5/24</span><span style="color:#C3E88D;"> dev</span><span style="color:#C3E88D;"> v-net-0</span></span></code></pre></div><p>Now you can check</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">ping</span><span style="color:#F78C6C;"> 192.168</span><span style="color:#C3E88D;">.15.1</span></span></code></pre></div><p>When reaching namespace to other network</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#C3E88D;"> ip</span><span style="color:#C3E88D;"> netns</span><span style="color:#C3E88D;"> exec</span><span style="color:#C3E88D;"> blue</span><span style="color:#C3E88D;"> ping</span><span style="color:#F78C6C;"> 192.168</span><span style="color:#C3E88D;">.1.3</span></span>
<span class="line"><span style="color:#FFCB6B;">Connect:</span><span style="color:#C3E88D;"> Network</span><span style="color:#C3E88D;"> is</span><span style="color:#C3E88D;"> unreachable</span></span></code></pre></div><p>You can not reach due to route not set</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> netns</span><span style="color:#C3E88D;"> exec</span><span style="color:#C3E88D;"> blue</span><span style="color:#C3E88D;"> route</span></span></code></pre></div><p>Add route</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> netns</span><span style="color:#C3E88D;"> exec</span><span style="color:#C3E88D;"> blue</span><span style="color:#C3E88D;"> ip</span><span style="color:#C3E88D;"> route</span><span style="color:#C3E88D;"> add</span><span style="color:#F78C6C;"> 192.168</span><span style="color:#C3E88D;">.1.0/24</span><span style="color:#C3E88D;"> via</span><span style="color:#F78C6C;"> 192.168</span><span style="color:#C3E88D;">.15.5</span></span></code></pre></div><p>But this time you can reach 192.168.1.0 but cannot get data Add nat</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">iptables</span><span style="color:#C3E88D;"> -t</span><span style="color:#C3E88D;"> nat</span><span style="color:#C3E88D;"> -A</span><span style="color:#C3E88D;"> POSTROUTING</span><span style="color:#C3E88D;"> -s</span><span style="color:#F78C6C;"> 192.168</span><span style="color:#C3E88D;">.15.0/24</span><span style="color:#C3E88D;"> -j</span><span style="color:#C3E88D;"> MASQUERADE</span></span></code></pre></div><p>Now you can communicate</p><p>List Nat</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">iptables</span><span style="color:#C3E88D;"> -t</span><span style="color:#C3E88D;"> nat</span><span style="color:#C3E88D;"> -v</span><span style="color:#C3E88D;"> -L</span><span style="color:#C3E88D;"> -n</span><span style="color:#C3E88D;"> --line-number</span></span>
<span class="line"></span>
<span class="line"><span style="color:#546E7A;font-style:italic;">#delete a rule</span></span>
<span class="line"><span style="color:#FFCB6B;">iptables</span><span style="color:#C3E88D;"> -t</span><span style="color:#C3E88D;"> nat</span><span style="color:#C3E88D;"> -D</span><span style="color:#C3E88D;"> POSTROUTING</span><span style="color:#C3E88D;"> {rule-number-here}</span></span></code></pre></div><p>But if you want to go to internet in namespace you need to add default route to namespace</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> netns</span><span style="color:#C3E88D;"> exec</span><span style="color:#C3E88D;"> blue</span><span style="color:#C3E88D;"> ip</span><span style="color:#C3E88D;"> route</span><span style="color:#C3E88D;"> add</span><span style="color:#C3E88D;"> default</span><span style="color:#C3E88D;"> via</span><span style="color:#F78C6C;"> 192.168</span><span style="color:#C3E88D;">.15.5</span></span></code></pre></div><p>Now you can communicate with outside network<br> But if outside network need to communicate inside namespace</p><p>You can add route to outside machine but this is not useful so use port forwarding</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">ip</span><span style="color:#C3E88D;"> tables</span><span style="color:#C3E88D;"> -t</span><span style="color:#C3E88D;"> nat</span><span style="color:#C3E88D;"> -A</span><span style="color:#C3E88D;"> PREROUTING</span><span style="color:#C3E88D;"> --dport</span><span style="color:#F78C6C;"> 80</span><span style="color:#C3E88D;"> --to-destination</span><span style="color:#F78C6C;"> 192.168</span><span style="color:#C3E88D;">.15.2:80</span><span style="color:#C3E88D;"> -j</span><span style="color:#C3E88D;"> DNAT</span></span></code></pre></div><p>Any comming traffic in 80 goes to 192.168.15.2:80</p><p><a href="https://www.cyberciti.biz/tips/linux-iptables-examples.html" target="_blank" rel="noreferrer">https://www.cyberciti.biz/tips/linux-iptables-examples.html</a><br><a href="https://www.karlrupp.net/en/computer/nat_tutorial" target="_blank" rel="noreferrer">https://www.karlrupp.net/en/computer/nat_tutorial</a><br><a href="https://www.revsys.com/writings/quicktips/nat.html" target="_blank" rel="noreferrer">https://www.revsys.com/writings/quicktips/nat.html</a><br><a href="https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/4/html/security_guide/s1-firewall-ipt-fwd" target="_blank" rel="noreferrer">https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/4/html/security_guide/s1-firewall-ipt-fwd</a></p>`,69),o=[l];function t(c,r,i,y,C,d){return a(),n("div",null,o)}const h=s(e,[["render",t]]);export{D as __pageData,h as default};
