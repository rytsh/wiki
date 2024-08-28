import{_ as s,c as n,o as a,a4 as o}from"./chunks/framework.DpC1ZpOZ.js";const u=JSON.parse('{"title":"Bucket Golang Concurrency","description":"","frontmatter":{},"headers":[],"relativePath":"posts/bucket_go.md","filePath":"posts/bucket_go.md","lastUpdated":1720342953000}'),l={name:"posts/bucket_go.md"},p=o(`<h1 id="bucket-golang-concurrency" tabindex="-1">Bucket Golang Concurrency <a class="header-anchor" href="#bucket-golang-concurrency" aria-label="Permalink to &quot;Bucket Golang Concurrency&quot;">​</a></h1><p>When gets buch of data processing with goroutines, it&#39;s better to create buckets and them process them concurrently.</p><p>First we need to process count and minimal size of each bucket.</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">var</span><span style="color:#EEFFFF;"> ProcessCount </span><span style="color:#C792EA;">int</span></span>
<span class="line"><span style="color:#89DDFF;">var</span><span style="color:#EEFFFF;"> BucketSize   </span><span style="color:#C792EA;">int</span></span></code></pre></div><p>Now our logic with using <code>errgroup</code> library in extended std library.</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#EEFFFF;">bucketSize </span><span style="color:#89DDFF;">:=</span><span style="color:#82AAFF;"> len</span><span style="color:#89DDFF;">(</span><span style="color:#EEFFFF;">datas</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;"> /</span><span style="color:#EEFFFF;"> p</span><span style="color:#89DDFF;">.</span><span style="color:#EEFFFF;">Count</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#EEFFFF;"> bucketSize </span><span style="color:#89DDFF;">&lt;</span><span style="color:#EEFFFF;"> p</span><span style="color:#89DDFF;">.</span><span style="color:#EEFFFF;">MinBucketSize </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#EEFFFF;">    bucketSize </span><span style="color:#89DDFF;">=</span><span style="color:#EEFFFF;"> p</span><span style="color:#89DDFF;">.</span><span style="color:#EEFFFF;">MinBucketSize</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#EEFFFF;">g</span><span style="color:#89DDFF;">,</span><span style="color:#EEFFFF;"> ctx </span><span style="color:#89DDFF;">:=</span><span style="color:#EEFFFF;"> errgroup</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">WithContext</span><span style="color:#89DDFF;">(</span><span style="color:#EEFFFF;">ctx</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#546E7A;font-style:italic;">// bucketing transactions and call it</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#EEFFFF;"> i </span><span style="color:#89DDFF;">:=</span><span style="color:#F78C6C;"> 0</span><span style="color:#89DDFF;">;</span><span style="color:#EEFFFF;"> i </span><span style="color:#89DDFF;">&lt;</span><span style="color:#82AAFF;"> len</span><span style="color:#89DDFF;">(</span><span style="color:#EEFFFF;">datas</span><span style="color:#89DDFF;">);</span><span style="color:#EEFFFF;"> i </span><span style="color:#89DDFF;">+=</span><span style="color:#EEFFFF;"> bucketSize </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#EEFFFF;">    index </span><span style="color:#89DDFF;">:=</span><span style="color:#EEFFFF;"> i</span></span>
<span class="line"></span>
<span class="line"><span style="color:#EEFFFF;">    g</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Go</span><span style="color:#89DDFF;">(func()</span><span style="color:#C792EA;"> error</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">        return</span><span style="color:#82AAFF;"> process</span><span style="color:#89DDFF;">(</span><span style="color:#EEFFFF;">ctx</span><span style="color:#89DDFF;">,</span><span style="color:#EEFFFF;"> datas</span><span style="color:#89DDFF;">[</span><span style="color:#EEFFFF;">index</span><span style="color:#89DDFF;">:</span><span style="color:#82AAFF;">min</span><span style="color:#89DDFF;">(</span><span style="color:#EEFFFF;">index</span><span style="color:#89DDFF;">+</span><span style="color:#EEFFFF;">bucketSize</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> len</span><span style="color:#89DDFF;">(</span><span style="color:#EEFFFF;">datas</span><span style="color:#89DDFF;">))])</span></span>
<span class="line"><span style="color:#89DDFF;">    })</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#EEFFFF;"> g</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Wait</span><span style="color:#89DDFF;">()</span></span></code></pre></div><p><code>Wait</code> method will wait until all goroutines are done. If any of them returns an error, it will return that first error after cancel the context and wait for all goroutines to finish.</p>`,7),e=[p];function t(F,c,r,i,y,D){return a(),n("div",null,e)}const d=s(l,[["render",t]]);export{u as __pageData,d as default};