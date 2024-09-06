import{_ as n,c as a,a2 as o,o as l}from"./chunks/framework.Gf1jShja.js";const i=JSON.parse('{"title":"Test Containers","description":"","frontmatter":{},"headers":[],"relativePath":"posts/test_containers.md","filePath":"posts/test_containers.md","lastUpdated":1724424893000}'),p={name:"posts/test_containers.md"};function t(F,s,e,r,c,D){return l(),a("div",null,s[0]||(s[0]=[o(`<h1 id="test-containers" tabindex="-1">Test Containers <a class="header-anchor" href="#test-containers" aria-label="Permalink to &quot;Test Containers&quot;">​</a></h1><p>With this project <a href="https://golang.testcontainers.org/" target="_blank" rel="noreferrer">https://golang.testcontainers.org/</a>, help us to creating container with code in test steps.</p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><p>It is good to start with struct of the testcontainers.</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">type</span><span style="color:#FFCB6B;"> Container</span><span style="color:#89DDFF;"> struct</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#EEFFFF;">	Host      </span><span style="color:#C792EA;">string</span></span>
<span class="line"><span style="color:#EEFFFF;">	Container </span><span style="color:#FFCB6B;">testcontainers</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">Container</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#89DDFF;"> (</span><span style="color:#EEFFFF;font-style:italic;">c </span><span style="color:#89DDFF;">*</span><span style="color:#FFCB6B;">Container</span><span style="color:#89DDFF;">)</span><span style="color:#82AAFF;"> Close</span><span style="color:#89DDFF;">(</span><span style="color:#EEFFFF;font-style:italic;">ctx</span><span style="color:#FFCB6B;"> context</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">Context</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">	if</span><span style="color:#EEFFFF;"> c</span><span style="color:#89DDFF;">.</span><span style="color:#EEFFFF;">Container </span><span style="color:#89DDFF;">!=</span><span style="color:#89DDFF;"> nil</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#EEFFFF;">		c</span><span style="color:#89DDFF;">.</span><span style="color:#EEFFFF;">Container</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Terminate</span><span style="color:#89DDFF;">(</span><span style="color:#EEFFFF;">ctx</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">	}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>Now we can create container and add to the struct.</p><blockquote><p>Always keep in mind to use <code>host, err := postgresContainer.Host(ctx)</code> when getting container&#39;s host address.<br> Don&#39;t use any hardcoded address.</p></blockquote><p><code>Host</code> function will check <code>TESTCONTAINERS_HOST_OVERRIDE</code> so you can use this value for DIND solutions in pipelines.</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">func</span><span style="color:#82AAFF;"> PostgresContainer</span><span style="color:#89DDFF;">(</span><span style="color:#EEFFFF;font-style:italic;">ctx</span><span style="color:#FFCB6B;"> context</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">Context</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;"> (*</span><span style="color:#FFCB6B;">Container</span><span style="color:#89DDFF;">,</span><span style="color:#C792EA;"> error</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#EEFFFF;">	req </span><span style="color:#89DDFF;">:=</span><span style="color:#FFCB6B;"> testcontainers</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">ContainerRequest</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#EEFFFF;">		Image</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">        &quot;</span><span style="color:#C3E88D;">postgres:13.15-alpine</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#EEFFFF;">		ExposedPorts</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;"> []</span><span style="color:#C792EA;">string</span><span style="color:#89DDFF;">{</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">5432/tcp</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#EEFFFF;">		Env</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;"> map[</span><span style="color:#C792EA;">string</span><span style="color:#89DDFF;">]</span><span style="color:#C792EA;">string</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">			&quot;</span><span style="color:#C3E88D;">POSTGRES_HOST_AUTH_METHOD</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">trust</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">		},</span></span>
<span class="line"><span style="color:#EEFFFF;">		WaitingFor</span><span style="color:#89DDFF;">:</span><span style="color:#EEFFFF;"> wait</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ForLog</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">database system is ready to accept connections</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">WithOccurrence</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">WithStartupTimeout</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;"> *</span><span style="color:#EEFFFF;"> time</span><span style="color:#89DDFF;">.</span><span style="color:#EEFFFF;">Second</span><span style="color:#89DDFF;">),</span></span>
<span class="line"><span style="color:#89DDFF;">	}</span></span>
<span class="line"><span style="color:#EEFFFF;">	postgresContainer</span><span style="color:#89DDFF;">,</span><span style="color:#EEFFFF;"> err </span><span style="color:#89DDFF;">:=</span><span style="color:#EEFFFF;"> testcontainers</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GenericContainer</span><span style="color:#89DDFF;">(</span><span style="color:#EEFFFF;">ctx</span><span style="color:#89DDFF;">,</span><span style="color:#FFCB6B;"> testcontainers</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">GenericContainerRequest</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#EEFFFF;">		ContainerRequest</span><span style="color:#89DDFF;">:</span><span style="color:#EEFFFF;"> req</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#EEFFFF;">		Started</span><span style="color:#89DDFF;">:</span><span style="color:#FF9CAC;">          true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">	})</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">	if</span><span style="color:#EEFFFF;"> err </span><span style="color:#89DDFF;">!=</span><span style="color:#89DDFF;"> nil</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">		return</span><span style="color:#89DDFF;"> nil,</span><span style="color:#EEFFFF;"> err</span></span>
<span class="line"><span style="color:#89DDFF;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#EEFFFF;">	host</span><span style="color:#89DDFF;">,</span><span style="color:#EEFFFF;"> err </span><span style="color:#89DDFF;">:=</span><span style="color:#EEFFFF;"> postgresContainer</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Host</span><span style="color:#89DDFF;">(</span><span style="color:#EEFFFF;">ctx</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">	if</span><span style="color:#EEFFFF;"> err </span><span style="color:#89DDFF;">!=</span><span style="color:#89DDFF;"> nil</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">		return</span><span style="color:#89DDFF;"> nil,</span><span style="color:#EEFFFF;"> err</span></span>
<span class="line"><span style="color:#89DDFF;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#EEFFFF;">	port</span><span style="color:#89DDFF;">,</span><span style="color:#EEFFFF;"> err </span><span style="color:#89DDFF;">:=</span><span style="color:#EEFFFF;"> postgresContainer</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">MappedPort</span><span style="color:#89DDFF;">(</span><span style="color:#EEFFFF;">ctx</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">5432</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">	if</span><span style="color:#EEFFFF;"> err </span><span style="color:#89DDFF;">!=</span><span style="color:#89DDFF;"> nil</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">		return</span><span style="color:#89DDFF;"> nil,</span><span style="color:#EEFFFF;"> err</span></span>
<span class="line"><span style="color:#89DDFF;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">	return</span><span style="color:#89DDFF;"> &amp;</span><span style="color:#FFCB6B;">Container</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#EEFFFF;">		Host</span><span style="color:#89DDFF;">:</span><span style="color:#EEFFFF;">      net</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">JoinHostPort</span><span style="color:#89DDFF;">(</span><span style="color:#EEFFFF;">host</span><span style="color:#89DDFF;">,</span><span style="color:#EEFFFF;"> port</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Port</span><span style="color:#89DDFF;">()),</span></span>
<span class="line"><span style="color:#EEFFFF;">		Container</span><span style="color:#89DDFF;">:</span><span style="color:#EEFFFF;"> postgresContainer</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">	},</span><span style="color:#89DDFF;"> nil</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>After that you can use this container&#39;s host to connect it and make some test.</p>`,10)]))}const E=n(p,[["render",t]]);export{i as __pageData,E as default};
