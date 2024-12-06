# 502 error code

> TL;DR: If server directly closes the connection, client will get nothing `EOF` error.  
> Than proxies convert it to `502 Bad Gateway` error and mostly related with server side code.

> There is good article about it https://blog.cloudflare.com/the-complete-guide-to-golang-net-http-timeouts/

In http server there is settings read and write timeouts.  
Write timeout is between you get the request body and reponse.

```go
// not recommended in production codes
http.Server{
    ReadTimeout:  10 * time.Second,
    WriteTimeout: 10 * time.Second,
}
```

When we add timeout in the http-server code than it is working worse than without timeout.  
If our request takes 30 seconds than, we will wait 30 seconds and after that we will get `EOF` error.

Best of do this kind of things outside of the microservice.
