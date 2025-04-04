---
head:
  - - meta
    - name: description
      content: Test containers and their usage in Go.
  - - meta
    - name: keywords
      content: testcontainers go golang test
---

# Test Containers

With this project https://golang.testcontainers.org/, help us to creating container with code in test steps.

## Usage

It is good to start with struct of the testcontainers.

```go
type Container struct {
	Host      string
	Container testcontainers.Container
}

func (c *Container) Close(ctx context.Context) {
	if c.Container != nil {
		c.Container.Terminate(ctx)
	}
}
```

Now we can create container and add to the struct.

> Always keep in mind to use `host, err := postgresContainer.Host(ctx)` when getting container's host address.
> Don't use any hardcoded address.

`Host` function will check `TESTCONTAINERS_HOST_OVERRIDE` so you can use this value for DIND solutions in pipelines.

```go
func PostgresContainer(ctx context.Context) (*Container, error) {
	req := testcontainers.ContainerRequest{
		Image:        "postgres:13.15-alpine",
		ExposedPorts: []string{"5432/tcp"},
		Env: map[string]string{
			"POSTGRES_HOST_AUTH_METHOD": "trust",
		},
		WaitingFor: wait.ForLog("database system is ready to accept connections").WithOccurrence(2).WithStartupTimeout(5 * time.Second),
	}
	postgresContainer, err := testcontainers.GenericContainer(ctx, testcontainers.GenericContainerRequest{
		ContainerRequest: req,
		Started:          true,
	})
	if err != nil {
		return nil, err
	}

	host, err := postgresContainer.Host(ctx)
	if err != nil {
		return nil, err
	}

	port, err := postgresContainer.MappedPort(ctx, "5432")
	if err != nil {
		return nil, err
	}

	return &Container{
		Host:      net.JoinHostPort(host, port.Port()),
		Container: postgresContainer,
	}, nil
}
```

After that you can use this container's host to connect it and make some test.
