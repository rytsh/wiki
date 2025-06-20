---
head:
  - - meta
    - name: description
      content: Posgres backup and restore with pg_dump and pg_restore commands.
  - - meta
    - name: keywords
      content: postgres backup pg_dump pg_restore postgresql
---

# Postgres Backup

Add postgresql repos to apt sources, if you use ubuntu do like that:

```sh
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget -qO- https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo tee /etc/apt/trusted.gpg.d/pgdg.asc &>/dev/null
```

After that run `sudo apt update` and install postgresql-client, replace 15 with your postgresql version:

```sh
sudo apt install postgresql-client-15 -y
```

## Backup

Add `-Fc` option to restore with pg_restore, it will create a custom format dump file and we can use with pg_restore.

```sh
pg_dump -h postgresql -p 5432 -U postgres --dbname=mydb -Fc --file="mydb-dump.dmp"

# only data
pg_dump -h postgresql -p 15432 -U postgres --dbname=mydb --data-only -Fc --file="mydb-dump.dmp"


# only schema
pg_dump -h postgresql -p 5432 -U postgres --dbname=mydb --schema-only > schema.sql
```

## Restore

```sh
pg_restore -h postgresql -p 5432 -U postgres --dbname=mydb ./mydb-dump.dmp

# only schema
psql -h postgresql -p 5432 -U postgres --dbname=mydb -f ./schema.sql
```
