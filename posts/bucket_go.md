---
head:
  - - meta
    - name: description
      content: When gets buch of data processing with goroutines, it's better to create buckets and them process them concurrently.
  - - meta
    - name: keywords
      content: golang concurrency goroutine bucket
---

# Bucket Golang Concurrency

> Check library in here https://github.com/rakunlabs/bucket

When gets buch of data processing with goroutines, it's better to create buckets and them process them concurrently.

First we need to process count and minimal size of each bucket.

```go
var ProcessCount int
var BucketSize   int
```

Now our logic with using `errgroup` library in extended std library.

```go
bucketSize := len(datas) / p.Count

if bucketSize < p.MinBucketSize {
    bucketSize = p.MinBucketSize
}

g, ctx := errgroup.WithContext(ctx)

// bucketing transactions and call it
for i := 0; i < len(datas); i += bucketSize {
    index := i

    g.Go(func() error {
        return process(ctx, datas[index:min(index+bucketSize, len(datas))])
    })
}

return g.Wait()
```

`Wait` method will wait until all goroutines are done. If any of them returns an error, it will return that first error after cancel the context and wait for all goroutines to finish.
