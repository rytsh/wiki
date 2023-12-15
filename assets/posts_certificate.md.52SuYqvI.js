import{_ as s,o as a,c as n,R as e}from"./chunks/framework.07BXFssY.js";const E=JSON.parse('{"title":"Certificate","description":"","frontmatter":{},"headers":[],"relativePath":"posts/certificate.md","filePath":"posts/certificate.md","lastUpdated":1702626880000}'),p={name:"posts/certificate.md"},l=e(`<h1 id="certificate" tabindex="-1">Certificate <a class="header-anchor" href="#certificate" aria-label="Permalink to &quot;Certificate&quot;">​</a></h1><p>Generate certifiacte for servers and clients.</p><h2 id="openssl" tabindex="-1">OpenSSL <a class="header-anchor" href="#openssl" aria-label="Permalink to &quot;OpenSSL&quot;">​</a></h2><h3 id="generate-ca" tabindex="-1">Generate CA <a class="header-anchor" href="#generate-ca" aria-label="Permalink to &quot;Generate CA&quot;">​</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">openssl</span><span style="color:#C3E88D;"> genrsa</span><span style="color:#C3E88D;"> -aes128</span><span style="color:#C3E88D;"> -out</span><span style="color:#C3E88D;"> custom-ca.key</span><span style="color:#F78C6C;"> 2048</span></span>
<span class="line"><span style="color:#FFCB6B;">openssl</span><span style="color:#C3E88D;"> req</span><span style="color:#C3E88D;"> -new</span><span style="color:#C3E88D;"> -key</span><span style="color:#C3E88D;"> custom-ca.key</span><span style="color:#C3E88D;"> -subj</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">/CN=finops</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> &gt;</span><span style="color:#C3E88D;"> custom-ca.csr</span></span>
<span class="line"><span style="color:#FFCB6B;">openssl</span><span style="color:#C3E88D;"> x509</span><span style="color:#C3E88D;"> -req</span><span style="color:#C3E88D;"> -in</span><span style="color:#C3E88D;"> custom-ca.csr</span><span style="color:#C3E88D;"> -signkey</span><span style="color:#C3E88D;"> custom-ca.key</span><span style="color:#C3E88D;"> -days</span><span style="color:#F78C6C;"> 3650</span><span style="color:#C3E88D;"> -out</span><span style="color:#C3E88D;"> custom-ca.crt</span></span></code></pre></div><blockquote><p>We need to give custom-ca.crt to clients and servers in <code>/etc/ssl/certs/</code> directory.</p></blockquote><p>When you sign a csr record:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">openssl</span><span style="color:#C3E88D;"> x509</span><span style="color:#C3E88D;"> -sha256</span><span style="color:#C3E88D;"> -req</span><span style="color:#C3E88D;"> -days</span><span style="color:#F78C6C;"> 1200</span><span style="color:#C3E88D;"> -in</span><span style="color:#C3E88D;"> app.csr</span><span style="color:#C3E88D;"> -CA</span><span style="color:#C3E88D;"> custom-ca.crt</span><span style="color:#C3E88D;"> -CAkey</span><span style="color:#C3E88D;"> custom-ca.key</span><span style="color:#C3E88D;"> -CAcreateserial</span><span style="color:#C3E88D;"> -out</span><span style="color:#C3E88D;"> app.crt</span><span style="color:#C3E88D;"> -extfile</span><span style="color:#C3E88D;"> app.ext</span></span></code></pre></div><p>Ext file is optional, it is used to add SAN (Subject Alternative Name) to the certificate but SAN can be added to the csr as well.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">cat</span><span style="color:#89DDFF;"> &lt;&lt;</span><span style="color:#89DDFF;"> EOF</span><span style="color:#89DDFF;"> &gt;</span><span style="color:#EEFFFF;"> app.ext</span></span>
<span class="line"><span style="color:#C3E88D;">subjectAltName = @alt_names</span></span>
<span class="line"><span style="color:#C3E88D;">[alt_names]</span></span>
<span class="line"><span style="color:#C3E88D;">DNS.1 = app10.finops.devusage.com</span></span>
<span class="line"><span style="color:#C3E88D;">DNS.2 = app20.finops.devusage.com</span></span>
<span class="line"><span style="color:#C3E88D;">IP.1 = 10.1.1.2</span></span>
<span class="line"><span style="color:#89DDFF;">EOF</span></span></code></pre></div><p>If you use ext than it will be override csr SAN.</p><p>Check certificate:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">openssl</span><span style="color:#C3E88D;"> x509</span><span style="color:#C3E88D;"> -in</span><span style="color:#C3E88D;"> app.crt</span><span style="color:#C3E88D;"> -text</span><span style="color:#C3E88D;"> -noout</span></span></code></pre></div><h3 id="csr" tabindex="-1">CSR <a class="header-anchor" href="#csr" aria-label="Permalink to &quot;CSR&quot;">​</a></h3><p>If we need to sign a certificate with a CA, we need to generate a CSR (Certificate Signing Request). And give csr to someone who has a CA or a tool to sign it.</p><p>An exmaple config to use to generate csr:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">cat</span><span style="color:#89DDFF;"> &lt;&lt;</span><span style="color:#89DDFF;"> EOF</span><span style="color:#89DDFF;"> &gt;</span><span style="color:#EEFFFF;"> app.cnf</span></span>
<span class="line"><span style="color:#C3E88D;">[req]</span></span>
<span class="line"><span style="color:#C3E88D;">distinguished_name = req_distinguished_name</span></span>
<span class="line"><span style="color:#C3E88D;">prompt = no</span></span>
<span class="line"><span style="color:#C3E88D;">[req_distinguished_name]</span></span>
<span class="line"><span style="color:#C3E88D;">C = NL</span></span>
<span class="line"><span style="color:#C3E88D;">ST = Amsterdam</span></span>
<span class="line"><span style="color:#C3E88D;">L = Worldline</span></span>
<span class="line"><span style="color:#C3E88D;">OU = finops</span></span>
<span class="line"><span style="color:#C3E88D;">CN = finops-services@devusage.com</span></span>
<span class="line"><span style="color:#89DDFF;">EOF</span></span></code></pre></div><p>If we need to generate a CSR with SAN (Subject Alternative Name), we need to add <code>subjectAltName</code> to the config:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">cat</span><span style="color:#89DDFF;"> &lt;&lt;</span><span style="color:#89DDFF;"> EOF</span><span style="color:#89DDFF;"> &gt;</span><span style="color:#EEFFFF;"> app.cnf</span></span>
<span class="line"><span style="color:#C3E88D;">[req]</span></span>
<span class="line"><span style="color:#C3E88D;">distinguished_name = req_distinguished_name</span></span>
<span class="line"><span style="color:#C3E88D;">req_extensions = v3_req</span></span>
<span class="line"><span style="color:#C3E88D;">prompt = no</span></span>
<span class="line"><span style="color:#C3E88D;">[req_distinguished_name]</span></span>
<span class="line"><span style="color:#C3E88D;">C = NL</span></span>
<span class="line"><span style="color:#C3E88D;">ST = Amsterdam</span></span>
<span class="line"><span style="color:#C3E88D;">L = Worldline</span></span>
<span class="line"><span style="color:#C3E88D;">OU = finops</span></span>
<span class="line"><span style="color:#C3E88D;">CN = finops-services@devusage.com</span></span>
<span class="line"><span style="color:#C3E88D;">[v3_req]</span></span>
<span class="line"><span style="color:#C3E88D;">subjectAltName = @alt_names</span></span>
<span class="line"><span style="color:#C3E88D;">[alt_names]</span></span>
<span class="line"><span style="color:#C3E88D;">DNS.1 = app1.finops.devusage.com</span></span>
<span class="line"><span style="color:#C3E88D;">DNS.2 = app2.finops.devusage.com</span></span>
<span class="line"><span style="color:#C3E88D;">IP.1 = 10.1.1.1</span></span>
<span class="line"><span style="color:#89DDFF;">EOF</span></span></code></pre></div><p>First generate key and use that key and config to generate csr:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">openssl</span><span style="color:#C3E88D;"> genrsa</span><span style="color:#C3E88D;"> -out</span><span style="color:#C3E88D;"> app.key</span><span style="color:#F78C6C;"> 2048</span></span>
<span class="line"><span style="color:#FFCB6B;">openssl</span><span style="color:#C3E88D;"> req</span><span style="color:#C3E88D;"> -new</span><span style="color:#C3E88D;"> -key</span><span style="color:#C3E88D;"> app.key</span><span style="color:#C3E88D;"> -out</span><span style="color:#C3E88D;"> app.csr</span><span style="color:#C3E88D;"> -config</span><span style="color:#C3E88D;"> app.cnf</span></span></code></pre></div><p>To check the csr:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code"><code><span class="line"><span style="color:#FFCB6B;">openssl</span><span style="color:#C3E88D;"> req</span><span style="color:#C3E88D;"> -in</span><span style="color:#C3E88D;"> app.csr</span><span style="color:#C3E88D;"> -noout</span><span style="color:#C3E88D;"> -text</span></span></code></pre></div>`,23),o=[l];function t(c,r,i,y,C,d){return a(),n("div",null,o)}const u=s(p,[["render",t]]);export{E as __pageData,u as default};
