import{_ as a,o as n,c as l,ag as p}from"./chunks/framework.BcBuEkoe.js";const D=JSON.parse('{"title":"Access Local","description":"","frontmatter":{},"headers":[],"relativePath":"development/gcloud/access_local.md","filePath":"development/gcloud/access_local.md","lastUpdated":1770596029000}'),o={name:"development/gcloud/access_local.md"};function e(t,s,c,r,y,F){return n(),l("div",null,s[0]||(s[0]=[p(`<h1 id="access-local" tabindex="-1">Access Local <a class="header-anchor" href="#access-local" aria-label="Permalink to &quot;Access Local&quot;">​</a></h1><p>Create certificate with wildcard in certificate manager. Than use <code>gcloud</code> command to create mapping.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">gcloud</span><span style="color:#C3E88D;"> certificate-manager</span><span style="color:#C3E88D;"> maps</span><span style="color:#C3E88D;"> create</span><span style="color:#C3E88D;"> example-map</span><span style="color:#C3E88D;"> --project=example-project</span></span></code></pre></div><p>Than add mapping rule to the map.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">gcloud</span><span style="color:#C3E88D;"> certificate-manager</span><span style="color:#C3E88D;"> maps</span><span style="color:#C3E88D;"> entries</span><span style="color:#C3E88D;"> create</span><span style="color:#C3E88D;"> example-wildcard-entry</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --map=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">example-map</span><span style="color:#89DDFF;">&quot;</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --certificates=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">example-cert</span><span style="color:#89DDFF;">&quot;</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --hostname=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">*.example.com</span><span style="color:#89DDFF;">&quot;</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --project=example-project</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">gcloud</span><span style="color:#C3E88D;"> certificate-manager</span><span style="color:#C3E88D;"> maps</span><span style="color:#C3E88D;"> entries</span><span style="color:#C3E88D;"> create</span><span style="color:#C3E88D;"> example-base-entry</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --map=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">example-map</span><span style="color:#89DDFF;">&quot;</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --certificates=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">example-cert</span><span style="color:#89DDFF;">&quot;</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --hostname=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">xyz.io</span><span style="color:#89DDFF;">&quot;</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --project=example-project</span></span></code></pre></div><hr><p>Check for the URL map with load balancer.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#546E7A;font-style:italic;"># this is main IP address we use in load balancer</span></span>
<span class="line"><span style="color:#FFCB6B;">gcloud</span><span style="color:#C3E88D;"> compute</span><span style="color:#C3E88D;"> addresses</span><span style="color:#C3E88D;"> create</span><span style="color:#C3E88D;"> kube-lb-ip</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --ip-version=IPV4</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --global</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">gcloud</span><span style="color:#C3E88D;"> compute</span><span style="color:#C3E88D;"> addresses</span><span style="color:#C3E88D;"> describe</span><span style="color:#C3E88D;"> kube-lb-ip</span><span style="color:#C3E88D;"> --global</span><span style="color:#C3E88D;"> --format=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">get(address)</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#546E7A;font-style:italic;">##########</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">kube-health</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">gcloud</span><span style="color:#C3E88D;"> compute</span><span style="color:#C3E88D;"> instance-groups</span><span style="color:#C3E88D;"> unmanaged</span><span style="color:#C3E88D;"> set-named-ports</span><span style="color:#C3E88D;"> kube-group</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --named-ports=http:8080</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --zone=europe-west4-a</span></span>
<span class="line"></span>
<span class="line"><span style="color:#546E7A;font-style:italic;">############</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">gcloud</span><span style="color:#C3E88D;"> compute</span><span style="color:#C3E88D;"> backend-services</span><span style="color:#C3E88D;"> create</span><span style="color:#C3E88D;"> kube-backend-service</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --protocol=HTTP</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --health-checks=kube-health-http</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --global</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --port-name=http</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --timeout=30s</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">gcloud</span><span style="color:#C3E88D;"> compute</span><span style="color:#C3E88D;"> backend-services</span><span style="color:#C3E88D;"> add-backend</span><span style="color:#C3E88D;"> kube-backend-service</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --instance-group=kube-group</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --instance-group-zone=europe-west4-a</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --global</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">gcloud</span><span style="color:#C3E88D;"> compute</span><span style="color:#C3E88D;"> url-maps</span><span style="color:#C3E88D;"> create</span><span style="color:#C3E88D;"> kube-url-map</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --default-service=kube-backend-service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">gcloud</span><span style="color:#C3E88D;"> compute</span><span style="color:#C3E88D;"> target-https-proxies</span><span style="color:#C3E88D;"> create</span><span style="color:#C3E88D;"> kube-https-proxy</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --url-map=kube-url-map</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --certificate-map=kube-rytsh-io-map</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">gcloud</span><span style="color:#C3E88D;"> compute</span><span style="color:#C3E88D;"> target-http-proxies</span><span style="color:#C3E88D;"> create</span><span style="color:#C3E88D;"> kube-http-proxy</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --url-map=kube-url-map</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">gcloud</span><span style="color:#C3E88D;"> compute</span><span style="color:#C3E88D;"> forwarding-rules</span><span style="color:#C3E88D;"> create</span><span style="color:#C3E88D;"> kube-https-forwarding-rule</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --address=kube-lb-ip</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --global</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --target-https-proxy=kube-https-proxy</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --ports=443</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">gcloud</span><span style="color:#C3E88D;"> compute</span><span style="color:#C3E88D;"> forwarding-rules</span><span style="color:#C3E88D;"> create</span><span style="color:#C3E88D;"> kube-http-forwarding-rule</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --address=kube-lb-ip</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --global</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --target-http-proxy=kube-http-proxy</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --ports=80</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">gcloud</span><span style="color:#C3E88D;"> compute</span><span style="color:#C3E88D;"> url-maps</span><span style="color:#C3E88D;"> import</span><span style="color:#C3E88D;"> kube-http-redirect-map</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --global</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --source</span><span style="color:#C3E88D;"> /dev/stdin</span><span style="color:#89DDFF;"> &lt;&lt;</span><span style="color:#89DDFF;">EOF</span></span>
<span class="line"><span style="color:#C3E88D;">name: kube-http-redirect-map</span></span>
<span class="line"><span style="color:#C3E88D;">defaultUrlRedirect:</span></span>
<span class="line"><span style="color:#C3E88D;">  redirectResponseCode: MOVED_PERMANENTLY_DEFAULT</span></span>
<span class="line"><span style="color:#C3E88D;">  httpsRedirect: true</span></span>
<span class="line"><span style="color:#C3E88D;">  stripQuery: false</span></span>
<span class="line"><span style="color:#89DDFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">gcloud</span><span style="color:#C3E88D;"> compute</span><span style="color:#C3E88D;"> target-http-proxies</span><span style="color:#C3E88D;"> update</span><span style="color:#C3E88D;"> kube-http-proxy</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#C3E88D;">    --url-map=kube-http-redirect-map</span></span></code></pre></div><h2 id="wireguard" tabindex="-1">Wireguard <a class="header-anchor" href="#wireguard" aria-label="Permalink to &quot;Wireguard&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#C3E88D;"> apt</span><span style="color:#C3E88D;"> install</span><span style="color:#C3E88D;"> wireguard</span></span>
<span class="line"><span style="color:#FFCB6B;">wg</span><span style="color:#C3E88D;"> genkey</span><span style="color:#89DDFF;"> |</span><span style="color:#FFCB6B;"> sudo</span><span style="color:#C3E88D;"> tee</span><span style="color:#C3E88D;"> /etc/wireguard/privatekey</span><span style="color:#89DDFF;"> |</span><span style="color:#FFCB6B;"> wg</span><span style="color:#C3E88D;"> pubkey</span><span style="color:#89DDFF;"> |</span><span style="color:#FFCB6B;"> sudo</span><span style="color:#C3E88D;"> tee</span><span style="color:#C3E88D;"> /etc/wireguard/publickey</span></span></code></pre></div><p>Server Side (<code>/etc/wireguard/wg0.conf</code>):</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#EEFFFF;">Interface</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#FFCB6B;">Address</span><span style="color:#C3E88D;"> =</span><span style="color:#C3E88D;"> 10.200.0.1/24</span></span>
<span class="line"><span style="color:#FFCB6B;">PrivateKey</span><span style="color:#C3E88D;"> =</span><span style="color:#89DDFF;"> &lt;</span><span style="color:#C3E88D;">cloud-private-ke</span><span style="color:#EEFFFF;">y</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#FFCB6B;">ListenPort</span><span style="color:#C3E88D;"> =</span><span style="color:#F78C6C;"> 51820</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#EEFFFF;">Peer</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#FFCB6B;">PublicKey</span><span style="color:#C3E88D;"> =</span><span style="color:#89DDFF;"> &lt;</span><span style="color:#C3E88D;">local-public-ke</span><span style="color:#EEFFFF;">y</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#FFCB6B;">AllowedIPs</span><span style="color:#C3E88D;"> =</span><span style="color:#C3E88D;"> 10.200.0.2/32</span><span style="color:#546E7A;font-style:italic;">  # Local WG IP</span></span></code></pre></div><p>Also add this</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#C3E88D;"> ip</span><span style="color:#C3E88D;"> route</span><span style="color:#C3E88D;"> add</span><span style="color:#C3E88D;"> 10.0.10.1/32</span><span style="color:#C3E88D;"> via</span><span style="color:#F78C6C;"> 10.200.0.2</span><span style="color:#C3E88D;"> dev</span><span style="color:#C3E88D;"> wg0</span></span></code></pre></div><p>Client Side (<code>/etc/wireguard/wg0.conf</code>):</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#EEFFFF;">Interface</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#FFCB6B;">Address</span><span style="color:#C3E88D;"> =</span><span style="color:#C3E88D;"> 10.200.0.2/24</span></span>
<span class="line"><span style="color:#FFCB6B;">PrivateKey</span><span style="color:#C3E88D;"> =</span><span style="color:#89DDFF;"> &lt;</span><span style="color:#C3E88D;">local-private-ke</span><span style="color:#EEFFFF;">y</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#546E7A;font-style:italic;"># Port forwarding için (eğer local router arkasındaysa)</span></span>
<span class="line"><span style="color:#FFCB6B;">PostUp</span><span style="color:#C3E88D;"> =</span><span style="color:#C3E88D;"> iptables</span><span style="color:#C3E88D;"> -A</span><span style="color:#C3E88D;"> FORWARD</span><span style="color:#C3E88D;"> -i</span><span style="color:#C3E88D;"> wg0</span><span style="color:#C3E88D;"> -j</span><span style="color:#C3E88D;"> ACCEPT</span></span>
<span class="line"><span style="color:#FFCB6B;">PostDown</span><span style="color:#C3E88D;"> =</span><span style="color:#C3E88D;"> iptables</span><span style="color:#C3E88D;"> -D</span><span style="color:#C3E88D;"> FORWARD</span><span style="color:#C3E88D;"> -i</span><span style="color:#C3E88D;"> wg0</span><span style="color:#C3E88D;"> -j</span><span style="color:#C3E88D;"> ACCEPT</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#EEFFFF;">Peer</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#FFCB6B;">PublicKey</span><span style="color:#C3E88D;"> =</span><span style="color:#89DDFF;"> &lt;</span><span style="color:#C3E88D;">cloud-public-ke</span><span style="color:#EEFFFF;">y</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#FFCB6B;">Endpoint</span><span style="color:#C3E88D;"> =</span><span style="color:#89DDFF;"> &lt;</span><span style="color:#C3E88D;">cloud-public-i</span><span style="color:#EEFFFF;">p</span><span style="color:#89DDFF;">&gt;</span><span style="color:#C3E88D;">:51820</span><span style="color:#546E7A;font-style:italic;">  # Cloud&#39;un public IP&#39;si biliniyor</span></span>
<span class="line"><span style="color:#FFCB6B;">AllowedIPs</span><span style="color:#C3E88D;"> =</span><span style="color:#C3E88D;"> 10.200.0.1/32</span><span style="color:#546E7A;font-style:italic;"> # Cloud WG IP</span></span>
<span class="line"><span style="color:#FFCB6B;">PersistentKeepalive</span><span style="color:#C3E88D;"> =</span><span style="color:#F78C6C;"> 25</span><span style="color:#546E7A;font-style:italic;">  # Bağlantıyı canlı tut</span></span></code></pre></div><p>Add route in your WSL to control plane.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#546E7A;font-style:italic;"># sudo ip route add 10.0.10.0/24 via $(docker inspect -f &#39;{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}&#39; kup-control-plane)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#546E7A;font-style:italic;"># docker network check bridge kind</span></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#C3E88D;"> iptables</span><span style="color:#C3E88D;"> -I</span><span style="color:#C3E88D;"> DOCKER-USER</span><span style="color:#C3E88D;"> -i</span><span style="color:#C3E88D;"> wg0</span><span style="color:#C3E88D;"> -o</span><span style="color:#C3E88D;"> br-65a645fb34b3</span><span style="color:#C3E88D;"> -j</span><span style="color:#C3E88D;"> ACCEPT</span></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#C3E88D;"> iptables</span><span style="color:#C3E88D;"> -I</span><span style="color:#C3E88D;"> DOCKER-USER</span><span style="color:#C3E88D;"> -i</span><span style="color:#C3E88D;"> br-65a645fb34b3</span><span style="color:#C3E88D;"> -o</span><span style="color:#C3E88D;"> wg0</span><span style="color:#C3E88D;"> -m</span><span style="color:#C3E88D;"> state</span><span style="color:#C3E88D;"> --state</span><span style="color:#C3E88D;"> ESTABLISHED,RELATED</span><span style="color:#C3E88D;"> -j</span><span style="color:#C3E88D;"> ACCEPT</span></span></code></pre></div><p>Start WireGuard on both sides:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#C3E88D;"> wg-quick</span><span style="color:#C3E88D;"> up</span><span style="color:#C3E88D;"> wg0</span></span>
<span class="line"><span style="color:#546E7A;font-style:italic;"># sudo systemctl enable wg-quick@wg0</span></span>
<span class="line"><span style="color:#546E7A;font-style:italic;"># sudo wg-quick down wg0 &amp;&amp; sudo wg-quick up wg0</span></span></code></pre></div><h2 id="server-turna" tabindex="-1">Server Turna <a class="header-anchor" href="#server-turna" aria-label="Permalink to &quot;Server Turna&quot;">​</a></h2><p>Turna configuration</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#F07178;">server</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">  entrypoints</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">    healthz</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">      address</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">:8082</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#F07178;">    http</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">      address</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">:8080</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#F07178;">  http</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">    middlewares</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">      wireguard</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">        service</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">          loadbalancer</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">            servers</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">            -</span><span style="color:#F07178;"> url</span><span style="color:#89DDFF;">:</span><span style="color:#C3E88D;"> http://10.0.10.1</span></span>
<span class="line"><span style="color:#F07178;">      healthz</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">        hello</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">          message</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">OK</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#F07178;">    routers</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">      project</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">        endpoints</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">          -</span><span style="color:#C3E88D;"> http</span></span>
<span class="line"><span style="color:#F07178;">        path</span><span style="color:#89DDFF;">:</span><span style="color:#C3E88D;"> /*</span></span>
<span class="line"><span style="color:#F07178;">        middlewares</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">          -</span><span style="color:#C3E88D;"> wireguard</span></span>
<span class="line"><span style="color:#F07178;">      healthz</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">        endpoints</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">          -</span><span style="color:#C3E88D;"> healthz</span></span>
<span class="line"><span style="color:#F07178;">        path</span><span style="color:#89DDFF;">:</span><span style="color:#C3E88D;"> /healthz</span></span>
<span class="line"><span style="color:#F07178;">        middlewares</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">          -</span><span style="color:#C3E88D;"> healthz</span></span></code></pre></div>`,23)]))}const E=a(o,[["render",e]]);export{D as __pageData,E as default};
