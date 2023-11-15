import{_ as s,o as a,c as o,Q as p}from"./chunks/framework.362cc540.js";const g=JSON.parse('{"title":"Postgres Backup","description":"","frontmatter":{},"headers":[],"relativePath":"posts/postgres_backup.md","filePath":"posts/postgres_backup.md","lastUpdated":1700051936000}'),e={name:"posts/postgres_backup.md"},n=p(`<h1 id="postgres-backup" tabindex="-1">Postgres Backup <a class="header-anchor" href="#postgres-backup" aria-label="Permalink to &quot;Postgres Backup&quot;">​</a></h1><p>Add postgresql repos to apt sources, if you use ubuntu do like that:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai"><code><span class="line"><span style="color:#A6E22E;">sudo</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">sh</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">-c</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;echo &quot;deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main&quot; &gt; /etc/apt/sources.list.d/pgdg.list&#39;</span></span>
<span class="line"><span style="color:#A6E22E;">wget</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">-qO-</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">https://www.postgresql.org/media/keys/ACCC4CF8.asc</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">|</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">sudo</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">tee</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">/etc/apt/trusted.gpg.d/pgdg.asc</span><span style="color:#F8F8F2;"> &amp;</span><span style="color:#F92672;">&gt;</span><span style="color:#F8F8F2;">/dev/null</span></span></code></pre></div><p>After that run <code>sudo apt update</code> and install postgresql-client, replace 15 with your postgresql version:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai"><code><span class="line"><span style="color:#A6E22E;">sudo</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">apt</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">install</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">postgresql-client-15</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">-y</span></span></code></pre></div><h2 id="backup" tabindex="-1">Backup <a class="header-anchor" href="#backup" aria-label="Permalink to &quot;Backup&quot;">​</a></h2><p>Add <code>-Fc</code> option to restore with pg_restore, it will create a custom format dump file and we can use with pg_restore.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai"><code><span class="line"><span style="color:#A6E22E;">pg_dump</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">-h</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">postgresql</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">-p</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">5432</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">-U</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">postgres</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">--dbname=mydb</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">-Fc</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">--file=</span><span style="color:#E6DB74;">&quot;mydb-dump.dmp&quot;</span></span></code></pre></div><h2 id="restore" tabindex="-1">Restore <a class="header-anchor" href="#restore" aria-label="Permalink to &quot;Restore&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai"><code><span class="line"><span style="color:#A6E22E;">pg_restore</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">-h</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">postgresql</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">-p</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">5432</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">-U</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">postgres</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">--dbname=sonar</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">./mydb-dump.dmp</span></span></code></pre></div>`,10),l=[n];function t(c,r,F,y,d,i){return a(),o("div",null,l)}const h=s(e,[["render",t]]);export{g as __pageData,h as default};
