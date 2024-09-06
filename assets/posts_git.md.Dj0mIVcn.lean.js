import{_ as a,c as e,a2 as n,o}from"./chunks/framework.Gf1jShja.js";const y=JSON.parse('{"title":"git","description":"","frontmatter":{},"headers":[],"relativePath":"posts/git.md","filePath":"posts/git.md","lastUpdated":1701821943000}'),l={name:"posts/git.md"};function p(t,s,c,r,i,d){return o(),e("div",null,s[0]||(s[0]=[n(`<h1 id="git" tabindex="-1">git <a class="header-anchor" href="#git" aria-label="Permalink to &quot;git&quot;">​</a></h1><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#C3E88D;"> config</span><span style="color:#C3E88D;"> --global</span><span style="color:#C3E88D;"> user.name</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">Eray Ates</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#C3E88D;"> config</span><span style="color:#C3E88D;"> --global</span><span style="color:#C3E88D;"> user.email</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">eates23@gmail.com</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><h2 id="exclude-files" tabindex="-1">Exclude files <a class="header-anchor" href="#exclude-files" aria-label="Permalink to &quot;Exclude files&quot;">​</a></h2><blockquote><p><a href="https://stackoverflow.com/questions/7335420/global-git-ignore" target="_blank" rel="noreferrer">https://stackoverflow.com/questions/7335420/global-git-ignore</a></p></blockquote><p><code>.gitignore</code> file is good for projects but sometimes adding our own development tools adding unwanted files in projects.</p><p>To prevent that add a global <code>.gitignore</code> file and add to <code>.gitconfig</code> file.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#C3E88D;"> config</span><span style="color:#C3E88D;"> --global</span><span style="color:#C3E88D;"> core.excludesFile</span><span style="color:#89DDFF;"> &#39;</span><span style="color:#C3E88D;">~/.gitignore</span><span style="color:#89DDFF;">&#39;</span></span></code></pre></div><p>And verify it</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#C3E88D;"> config</span><span style="color:#C3E88D;"> --global</span><span style="color:#C3E88D;"> core.excludesFile</span></span></code></pre></div><h2 id="user-change" tabindex="-1">User change <a class="header-anchor" href="#user-change" aria-label="Permalink to &quot;User change&quot;">​</a></h2><p>Working for different companies and different projects, sometimes we need to change our git user.</p><p>To do that we can add <code>includeIf</code> to our <code>.gitconfig</code> file.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span>[includeIf &quot;gitdir:~/personal/*/&quot;]</span></span>
<span class="line"><span>    path = ~/.git/personal</span></span></code></pre></div><p>And create a file <code>~/.git/personal</code> and add your user info</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span>[user]</span></span>
<span class="line"><span>    name = Eray Ates</span></span>
<span class="line"><span>    email = eates23@gmail.com</span></span></code></pre></div><h2 id="gpg-key" tabindex="-1">GPG Key <a class="header-anchor" href="#gpg-key" aria-label="Permalink to &quot;GPG Key&quot;">​</a></h2><p>Check this links:</p><p><a href="https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key?platform=linux" target="_blank" rel="noreferrer">https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key?platform=linux</a><br><a href="https://docs.gitlab.com/ee/user/project/repository/signed_commits/gpg.html" target="_blank" rel="noreferrer">https://docs.gitlab.com/ee/user/project/repository/signed_commits/gpg.html</a></p><p>Install gpg(2) with your package manager.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">gpg</span><span style="color:#C3E88D;"> --full-generate-key</span></span></code></pre></div><p>I chose the DSA only for signing</p><p>And name is -&gt; &quot;Eray Ates&quot;, email is -&gt; &quot;<a href="mailto:eates23@gmail.com" target="_blank" rel="noreferrer">eates23@gmail.com</a>&quot;, after add a password.</p><p>List your keys</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">gpg</span><span style="color:#C3E88D;"> --list-secret-keys</span><span style="color:#C3E88D;"> --keyid-format=long</span></span></code></pre></div><p>You will get something like this:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#EEFFFF;">keyboxd</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#FFCB6B;">---------</span></span>
<span class="line"><span style="color:#FFCB6B;">sec</span><span style="color:#C3E88D;">   dsa2048/8C2C8572CE10E92D</span><span style="color:#C3E88D;"> 2023-11-25</span><span style="color:#EEFFFF;"> [SC]</span></span>
<span class="line"><span style="color:#FFCB6B;">      GG4ZPFCTU8CREWZPBHIY9MWKIBINDPTOBGHED9NP</span></span>
<span class="line"><span style="color:#FFCB6B;">uid</span><span style="color:#EEFFFF;">       [    </span><span style="color:#C3E88D;">son</span><span style="color:#C3E88D;"> derece</span><span style="color:#C3E88D;">    ]</span><span style="color:#C3E88D;"> Eray</span><span style="color:#C3E88D;"> Ates</span><span style="color:#89DDFF;"> &lt;</span><span style="color:#C3E88D;">eates23@gmail.co</span><span style="color:#EEFFFF;">m</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>Now use <code>8C2C8572CE10E92D</code> your GPG key ID and run this command</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">gpg</span><span style="color:#C3E88D;"> --armor</span><span style="color:#C3E88D;"> --export</span><span style="color:#C3E88D;"> 8C2C8572CE10E92D</span></span></code></pre></div><p>Copy the output and add to GitHub/GitLab GPG key settings.</p><p>Use this GPG key-id for git signing</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#C3E88D;"> config</span><span style="color:#C3E88D;"> --global</span><span style="color:#C3E88D;"> user.signingkey</span><span style="color:#C3E88D;"> 8C2C8572CE10E92D</span></span></code></pre></div><p>And always enable <code>-S</code> flag for git commit</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#C3E88D;"> config</span><span style="color:#C3E88D;"> --global</span><span style="color:#C3E88D;"> commit.gpgsign</span><span style="color:#89DDFF;"> true</span></span></code></pre></div><h2 id="gpg-tty" tabindex="-1">GPG TTY <a class="header-anchor" href="#gpg-tty" aria-label="Permalink to &quot;GPG TTY&quot;">​</a></h2><p>If you see this error when you try to commit</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">error:</span><span style="color:#C3E88D;"> gpg</span><span style="color:#C3E88D;"> failed</span><span style="color:#C3E88D;"> to</span><span style="color:#C3E88D;"> sign</span><span style="color:#C3E88D;"> the</span><span style="color:#C3E88D;"> data</span></span>
<span class="line"><span style="color:#FFCB6B;">fatal:</span><span style="color:#C3E88D;"> failed</span><span style="color:#C3E88D;"> to</span><span style="color:#C3E88D;"> write</span><span style="color:#C3E88D;"> commit</span><span style="color:#C3E88D;"> object</span></span></code></pre></div><p>Try debug it with this command</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#EEFFFF;">GIT_TRACE</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">1</span><span style="color:#FFCB6B;"> git</span><span style="color:#C3E88D;"> commit</span><span style="color:#C3E88D;"> -s</span></span></code></pre></div><p>You need to add this to your <code>~/.gnupg/gpg-agent.conf</code> file</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">pinentry-program </span><span style="color:#89DDFF;">$(</span><span style="color:#82AAFF;">which</span><span style="color:#C3E88D;"> pinentry-curses</span><span style="color:#89DDFF;">)&quot;</span><span style="color:#89DDFF;"> &gt;</span><span style="color:#C3E88D;"> ~/.gnupg/gpg-agent.conf</span></span></code></pre></div><p>Also you need to this value</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#89DDFF;"> &#39;</span><span style="color:#C3E88D;">export GPG_TTY=$(tty)</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;"> &gt;&gt;</span><span style="color:#C3E88D;"> ~/.bashrc</span></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#89DDFF;"> &#39;</span><span style="color:#C3E88D;">export GPG_TTY=$(tty)</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;"> &gt;&gt;</span><span style="color:#C3E88D;"> ~/.zshrc</span></span></code></pre></div><p>And you should restart gpg-agent</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">gpgconf</span><span style="color:#C3E88D;"> --kill</span><span style="color:#C3E88D;"> gpg-agent</span></span></code></pre></div><p>Test it and you should see a pinentry window based on your pinentry-program</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">test</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> |</span><span style="color:#FFCB6B;"> gpg</span><span style="color:#C3E88D;"> --clearsign</span></span></code></pre></div>`,46)]))}const u=a(l,[["render",p]]);export{y as __pageData,u as default};
