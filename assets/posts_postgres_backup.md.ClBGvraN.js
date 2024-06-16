import{_ as s,c as a,o as e,a3 as o}from"./chunks/framework.BEbjkBe4.js";const g=JSON.parse('{"title":"Postgres Backup","description":"","frontmatter":{},"headers":[],"relativePath":"posts/postgres_backup.md","filePath":"posts/postgres_backup.md","lastUpdated":1700051936000}'),p={name:"posts/postgres_backup.md"},t=o(`<h1 id="postgres-backup" tabindex="-1">Postgres Backup <a class="header-anchor" href="#postgres-backup" aria-label="Permalink to &quot;Postgres Backup&quot;">​</a></h1><p>Add postgresql repos to apt sources, if you use ubuntu do like that:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#C3E88D;"> sh</span><span style="color:#C3E88D;"> -c</span><span style="color:#89DDFF;"> &#39;</span><span style="color:#C3E88D;">echo &quot;deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main&quot; &gt; /etc/apt/sources.list.d/pgdg.list</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#FFCB6B;">wget</span><span style="color:#C3E88D;"> -qO-</span><span style="color:#C3E88D;"> https://www.postgresql.org/media/keys/ACCC4CF8.asc</span><span style="color:#89DDFF;"> |</span><span style="color:#FFCB6B;"> sudo</span><span style="color:#C3E88D;"> tee</span><span style="color:#C3E88D;"> /etc/apt/trusted.gpg.d/pgdg.asc</span><span style="color:#89DDFF;"> &amp;&gt;</span><span style="color:#EEFFFF;">/dev/null</span></span></code></pre></div><p>After that run <code>sudo apt update</code> and install postgresql-client, replace 15 with your postgresql version:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#C3E88D;"> apt</span><span style="color:#C3E88D;"> install</span><span style="color:#C3E88D;"> postgresql-client-15</span><span style="color:#C3E88D;"> -y</span></span></code></pre></div><h2 id="backup" tabindex="-1">Backup <a class="header-anchor" href="#backup" aria-label="Permalink to &quot;Backup&quot;">​</a></h2><p>Add <code>-Fc</code> option to restore with pg_restore, it will create a custom format dump file and we can use with pg_restore.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">pg_dump</span><span style="color:#C3E88D;"> -h</span><span style="color:#C3E88D;"> postgresql</span><span style="color:#C3E88D;"> -p</span><span style="color:#F78C6C;"> 5432</span><span style="color:#C3E88D;"> -U</span><span style="color:#C3E88D;"> postgres</span><span style="color:#C3E88D;"> --dbname=mydb</span><span style="color:#C3E88D;"> -Fc</span><span style="color:#C3E88D;"> --file=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">mydb-dump.dmp</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><h2 id="restore" tabindex="-1">Restore <a class="header-anchor" href="#restore" aria-label="Permalink to &quot;Restore&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme vp-code" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">pg_restore</span><span style="color:#C3E88D;"> -h</span><span style="color:#C3E88D;"> postgresql</span><span style="color:#C3E88D;"> -p</span><span style="color:#F78C6C;"> 5432</span><span style="color:#C3E88D;"> -U</span><span style="color:#C3E88D;"> postgres</span><span style="color:#C3E88D;"> --dbname=sonar</span><span style="color:#C3E88D;"> ./mydb-dump.dmp</span></span></code></pre></div>`,10),l=[t];function n(c,r,d,i,u,y){return e(),a("div",null,l)}const h=s(p,[["render",n]]);export{g as __pageData,h as default};
