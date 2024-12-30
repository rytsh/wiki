import{_ as e,c as a,a2 as l,o as t}from"./chunks/framework.BQmytedh.js";const b=JSON.parse('{"title":"kubectl","description":"","frontmatter":{},"headers":[],"relativePath":"development/kubernetes/cluster/kubectl.md","filePath":"development/kubernetes/cluster/kubectl.md","lastUpdated":1735492606000}'),n={name:"development/kubernetes/cluster/kubectl.md"};function o(p,s,c,r,i,d){return t(),a("div",null,s[0]||(s[0]=[l(`<h1 id="kubectl" tabindex="-1">kubectl <a class="header-anchor" href="#kubectl" aria-label="Permalink to &quot;kubectl&quot;">​</a></h1><p>We need to have kubectl to talk with kube-apiserver. We can install kubectl using the following command.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#C3E88D;"> -fSLO</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">https://dl.k8s.io/release/</span><span style="color:#89DDFF;">$(</span><span style="color:#FFCB6B;">curl</span><span style="color:#C3E88D;"> -L -s https://dl.k8s.io/release/stable.txt</span><span style="color:#89DDFF;">)</span><span style="color:#C3E88D;">/bin/linux/amd64/kubectl</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> &amp;&amp;</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#FFCB6B;">chmod</span><span style="color:#C3E88D;"> +x</span><span style="color:#C3E88D;"> kubectl</span><span style="color:#89DDFF;"> &amp;&amp;</span><span style="color:#EEFFFF;"> \\</span></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#C3E88D;"> mv</span><span style="color:#C3E88D;"> kubectl</span><span style="color:#C3E88D;"> /usr/local/bin/kubectl</span></span></code></pre></div><p>Verify installation:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">kubectl</span><span style="color:#C3E88D;"> version</span><span style="color:#C3E88D;"> --client</span></span></code></pre></div><p>Add <code>bash</code> completion:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#89DDFF;"> &#39;</span><span style="color:#C3E88D;">source &lt;(kubectl completion bash)</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;"> &gt;&gt;</span><span style="color:#C3E88D;"> ~/.bashrc</span></span></code></pre></div>`,7)]))}const F=e(n,[["render",o]]);export{b as __pageData,F as default};