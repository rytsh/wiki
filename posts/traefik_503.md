---
head:
  - - meta
    - name: description
      content: Convert 404 to 503 in Traefik or any other reverse proxy to prevent data not found on query.
  - - meta
    - name: keywords
      content: traefik reverse proxy service unavailable 503
---

# Traefik 404 -> 503

In traefik, if not found a service it is returns 404 Not Found error.
But this is not good and it could be data not found on query.

To prevent this, we can return 503 Service Unavailable error if really service is not exist.

Traefik's dynamic configuration we can add this rule to catchall
if not found any service and redirect to empty servers list will return 503 error.

```yaml
http:
  routers:
    catchall:
      # attached only to web entryPoint
      entryPoints:
        - "http"
        - "https"
      # catchall rule
      rule: "Host(`proxy`)"
      service: unavailable
      # lowest possible priority
      # evaluated when no other router is matched
      priority: 1
  services:
    # Service that will always answer a 503 Service Unavailable response
    unavailable:
      loadBalancer:
        servers: {}
```
