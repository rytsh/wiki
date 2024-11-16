import{_ as n,c as a,a2 as l,o as p}from"./chunks/framework.BQmytedh.js";const i=JSON.parse('{"title":"Option Pattern with Generic","description":"","frontmatter":{},"headers":[],"relativePath":"posts/option_pattern.md","filePath":"posts/option_pattern.md","lastUpdated":1731793199000}'),o={name:"posts/option_pattern.md"};function t(F,s,e,c,r,y){return p(),a("div",null,s[0]||(s[0]=[l(`<h1 id="option-pattern-with-generic" tabindex="-1">Option Pattern with Generic <a class="header-anchor" href="#option-pattern-with-generic" aria-label="Permalink to &quot;Option Pattern with Generic&quot;">​</a></h1><p>Option pattern good to handle configuration values and user just add option what they want to change on default configuration.</p><p>In this I want to show how to make apply part as generic and not repeat same code for each option.</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">type</span><span style="color:#89DDFF;"> (</span></span>
<span class="line"><span style="color:#FFCB6B;">	OptionTime</span><span style="color:#89DDFF;"> func(</span><span style="color:#EEFFFF;font-style:italic;">o</span><span style="color:#89DDFF;"> *</span><span style="color:#FFCB6B;">optionTime</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#FFCB6B;">	OptionCall</span><span style="color:#89DDFF;"> func(</span><span style="color:#EEFFFF;font-style:italic;">o</span><span style="color:#89DDFF;"> *</span><span style="color:#FFCB6B;">optionCall</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#546E7A;font-style:italic;">// ///////////////////////////////////////////////////////////////////////////</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">type</span><span style="color:#FFCB6B;"> defaulter</span><span style="color:#89DDFF;"> interface</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#82AAFF;">	Default</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#82AAFF;"> apply</span><span style="color:#89DDFF;">[</span><span style="color:#EEFFFF;font-style:italic;">T</span><span style="color:#FFCB6B;"> any</span><span style="color:#89DDFF;">,</span><span style="color:#EEFFFF;font-style:italic;"> O</span><span style="color:#89DDFF;"> ~func(*</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">)](</span><span style="color:#EEFFFF;font-style:italic;">opts</span><span style="color:#89DDFF;"> []</span><span style="color:#FFCB6B;">O</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;"> *</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#EEFFFF;">	opt </span><span style="color:#89DDFF;">:=</span><span style="color:#82AAFF;"> new</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">	for</span><span style="color:#EEFFFF;"> _</span><span style="color:#89DDFF;">,</span><span style="color:#EEFFFF;"> o </span><span style="color:#89DDFF;">:=</span><span style="color:#89DDFF;font-style:italic;"> range</span><span style="color:#EEFFFF;"> opts </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#82AAFF;">		o</span><span style="color:#89DDFF;">(</span><span style="color:#EEFFFF;">opt</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">	if</span><span style="color:#EEFFFF;"> d</span><span style="color:#89DDFF;">,</span><span style="color:#EEFFFF;"> ok </span><span style="color:#89DDFF;">:=</span><span style="color:#FFCB6B;"> any</span><span style="color:#89DDFF;">(</span><span style="color:#EEFFFF;">opt</span><span style="color:#89DDFF;">).(</span><span style="color:#FFCB6B;">defaulter</span><span style="color:#89DDFF;">);</span><span style="color:#EEFFFF;"> ok </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#EEFFFF;">		d</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Default</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#89DDFF;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">	return</span><span style="color:#EEFFFF;"> opt</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>Now define our option functions.</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="color:#546E7A;font-style:italic;">// ///////////////////////////////////////////////////////////////////////////</span></span>
<span class="line"><span style="color:#546E7A;font-style:italic;">// funcs of OptionTime</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">type</span><span style="color:#FFCB6B;"> optionTime</span><span style="color:#89DDFF;"> struct</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#EEFFFF;">	TimeFormat </span><span style="color:#C792EA;">string</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#89DDFF;"> (</span><span style="color:#EEFFFF;font-style:italic;">o </span><span style="color:#89DDFF;">*</span><span style="color:#FFCB6B;">optionTime</span><span style="color:#89DDFF;">)</span><span style="color:#82AAFF;"> Default</span><span style="color:#89DDFF;">()</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">	if</span><span style="color:#EEFFFF;"> o</span><span style="color:#89DDFF;">.</span><span style="color:#EEFFFF;">TimeFormat </span><span style="color:#89DDFF;">==</span><span style="color:#89DDFF;"> &quot;&quot;</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#EEFFFF;">		o</span><span style="color:#89DDFF;">.</span><span style="color:#EEFFFF;">TimeFormat </span><span style="color:#89DDFF;">=</span><span style="color:#EEFFFF;"> time</span><span style="color:#89DDFF;">.</span><span style="color:#EEFFFF;">RFC3339</span></span>
<span class="line"><span style="color:#89DDFF;">	}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#82AAFF;"> WithTimeFormat</span><span style="color:#89DDFF;">(</span><span style="color:#EEFFFF;font-style:italic;">format</span><span style="color:#C792EA;"> string</span><span style="color:#89DDFF;">)</span><span style="color:#FFCB6B;"> OptionTime</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">	return</span><span style="color:#89DDFF;"> func(</span><span style="color:#EEFFFF;font-style:italic;">o</span><span style="color:#89DDFF;"> *</span><span style="color:#FFCB6B;">optionTime</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#EEFFFF;">		o</span><span style="color:#89DDFF;">.</span><span style="color:#EEFFFF;">TimeFormat </span><span style="color:#89DDFF;">=</span><span style="color:#EEFFFF;"> format</span></span>
<span class="line"><span style="color:#89DDFF;">	}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#546E7A;font-style:italic;">// ///////////////////////////////////////////////////////////////////////////</span></span>
<span class="line"><span style="color:#546E7A;font-style:italic;">// funcs of OptionCall</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">type</span><span style="color:#FFCB6B;"> optionCall</span><span style="color:#89DDFF;"> struct</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#EEFFFF;">	Callback </span><span style="color:#89DDFF;">func(</span><span style="color:#C792EA;">string</span><span style="color:#89DDFF;">)</span><span style="color:#C792EA;"> string</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#89DDFF;"> (</span><span style="color:#EEFFFF;font-style:italic;">o </span><span style="color:#89DDFF;">*</span><span style="color:#FFCB6B;">optionCall</span><span style="color:#89DDFF;">)</span><span style="color:#82AAFF;"> Default</span><span style="color:#89DDFF;">()</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">	if</span><span style="color:#EEFFFF;"> o</span><span style="color:#89DDFF;">.</span><span style="color:#EEFFFF;">Callback </span><span style="color:#89DDFF;">==</span><span style="color:#89DDFF;"> nil</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#EEFFFF;">		o</span><span style="color:#89DDFF;">.</span><span style="color:#EEFFFF;">Callback </span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;"> func(</span><span style="color:#EEFFFF;font-style:italic;">s</span><span style="color:#C792EA;"> string</span><span style="color:#89DDFF;">)</span><span style="color:#C792EA;"> string</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">			return</span><span style="color:#EEFFFF;"> s</span></span>
<span class="line"><span style="color:#89DDFF;">		}</span></span>
<span class="line"><span style="color:#89DDFF;">	}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#82AAFF;"> WithCallback</span><span style="color:#89DDFF;">(</span><span style="color:#EEFFFF;font-style:italic;">callback</span><span style="color:#89DDFF;"> func(</span><span style="color:#C792EA;">string</span><span style="color:#89DDFF;">)</span><span style="color:#C792EA;"> string</span><span style="color:#89DDFF;">)</span><span style="color:#FFCB6B;"> OptionCall</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">	return</span><span style="color:#89DDFF;"> func(</span><span style="color:#EEFFFF;font-style:italic;">o</span><span style="color:#89DDFF;"> *</span><span style="color:#FFCB6B;">optionCall</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#EEFFFF;">		o</span><span style="color:#89DDFF;">.</span><span style="color:#EEFFFF;">Callback </span><span style="color:#89DDFF;">=</span><span style="color:#EEFFFF;"> callback</span></span>
<span class="line"><span style="color:#89DDFF;">	}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>That&#39;s all, now we need to just accept and call apply function to get our struct.</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">func</span><span style="color:#82AAFF;"> MyFunc</span><span style="color:#89DDFF;">(</span><span style="color:#EEFFFF;font-style:italic;">opts</span><span style="color:#89DDFF;"> ...</span><span style="color:#FFCB6B;">OptionTime</span><span style="color:#89DDFF;">)</span><span style="color:#C792EA;"> string</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#EEFFFF;">	o </span><span style="color:#89DDFF;">:=</span><span style="color:#82AAFF;"> apply</span><span style="color:#89DDFF;">(</span><span style="color:#EEFFFF;">opts</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#546E7A;font-style:italic;">	// /////////////////</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div>`,8)]))}const E=n(o,[["render",t]]);export{i as __pageData,E as default};
