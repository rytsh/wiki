---
head:
  - - meta
    - name: description
      content: Fake time in various environments and manipulations of system time for testing purposes.
  - - meta
    - name: keywords
      content: Faketime Go
---

# Fake Time

## Go faketime

> Unfortunatelly, libfaketime not usable with golang. But we can write alternative for that.

## libfaketime

When changing date, libfaketime amazing to do that.

In debian image

```dockerfile
RUN apt-get update && apt-get install --no-install-recommends -y \
    libfaketime
```

After that just show that so file to `LD_PRELOAD` env and give the `FAKETIME` env to set the date.

```sh
LD_PRELOAD=/usr/lib/x86_64-linux-gnu/faketime/libfaketime.so.1 FAKETIME="2000-01-01 00:00:00" date
```

Default is seconds, `FAKETIME="-120"` is 2 minutes ago. But usable with "m", "h", "d" and "y" suffixes.

Use as start

```sh
export LD_PRELOAD=/usr/lib/x86_64-linux-gnu/faketime/libfaketime.so.1
```

When we do that it is always show the same date. But if we add __@__ as prefix it will be start date.

```sh
export FAKETIME="@2000-01-01 00:00:00"
```

Now sub process run more than once `date`, than it will be increase the date.

```sh
/bin/bash -c 'while [ $SECONDS -lt 5 ]; do date; sleep 1; done'
# Sat Jan  1 00:00:00 UTC 2000
# Sat Jan  1 00:00:01 UTC 2000
# Sat Jan  1 00:00:02 UTC 2000
# Sat Jan  1 00:00:03 UTC 2000
# Sat Jan  1 00:00:04 UTC 2000
```
