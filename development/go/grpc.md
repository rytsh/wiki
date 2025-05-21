# gRPC

In golang I really like to use gRPC with connectRPC. It looks like gRPC with fixed and completed version.

```sh
# proto-go
go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.36.6 # https://pkg.go.dev/google.golang.org/protobuf/cmd/protoc-gen-go
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.5.1 # https://pkg.go.dev/google.golang.org/grpc/cmd/protoc-gen-go-grpc
# connect-rpc
go install github.com/bufbuild/buf/cmd/buf@v1.53.0 # https://pkg.go.dev/github.com/bufbuild/buf/cmd/buf
go install connectrpc.com/connect/cmd/protoc-gen-connect-go@v1.18.1 # https://pkg.go.dev/connectrpc.com/connect/cmd/protoc-gen-connect-go
# proto-es for generate JS code
pnpm add -g @connectrpc/protoc-gen-connect-es @bufbuild/protoc-gen-es
```

Tools

```sh
go install github.com/fullstorydev/grpcurl/cmd/grpcurl@v1.9.3 # https://pkg.go.dev/github.com/fullstorydev/grpcurl/cmd/grpcurl
```

For generating buf codes create a folder I called `protobuf` in the root of the project.

Add `buf.yaml` file

```yaml
version: v1
breaking:
  use:
    - FILE
lint:
  use:
    - DEFAULT
```

Add `buf.gen.yaml` file

```yaml
version: v1
managed:
  enabled: true
  go_package_prefix:
    default: github.com/yourusername/yourproject/protobuf/gen
plugins:
  - plugin: go
    out: gen
    opt: paths=source_relative
  - plugin: connect-go
    out: gen
    opt: paths=source_relative
```

Now create a proto file.

Create file like test/v1/hello.proto

```proto
syntax = "proto3";

package test.v1;

message GetRecordRequest {
    int64 id = 1;
}

message GetRecordResponse {
    int64 id = 1;
    bytes record_details = 2;
    optional string date_reg = 3;
}

service MyService {
    rpc GetRecord (GetRecordRequest) returns (GetRecordResponse);
}
```

Now generate buf code

```sh
buf generate --path test/v1 --clean
```

## Server

For creating server you need to create with http2 server.

```go
//	"connectrpc.com/grpchealth"
//	"connectrpc.com/grpcreflect"

mux := http.NewServeMux()

// add handler to mux
mux.HandleFunc("/test/", e.ServeHTTP) // to add http handler
mux.Handle(handleGRPC.Handler()) // to add gRPC handler

// add gRPC health check
healthChecker := grpchealth.NewStaticChecker(handleGRPC.ServiceName())
mux.Handle(grpchealth.NewHandler(healthChecker))

// add gRPC reflection
reflector := grpcreflect.NewStaticReflector(handleGRPC.ServiceName())
mux.Handle(grpcreflect.NewHandlerV1(reflector))
mux.Handle(grpcreflect.NewHandlerV1Alpha(reflector))

// //////////////////////////////////

s.server = &http.Server{
    Addr:    addr,
    Handler: h2c.NewHandler(s.mux, &http2.Server{}),
}

log.Info().Msgf("starting server on port %s", addr)

if err := s.server.ListenAndServe(); err != nil {
    return fmt.Errorf("failed to start server: %w", err)
}
```

## Client

For client side best to use only http client with http2 transporter.

Check [klient library](https://github.com/worldline-go/klient) to easy to create http client.

```go
// "github.com/worldline-go/grpc/health"

type Client struct {
	testClient testv1connect.TestServiceClient
}

func New(ctx context.Context, opts ...klient.OptionClientFn) (*Client, error) {
	k, err := klient.New(klient.OptionsPre(opts, klient.WithHTTP2(true))...)
	if err != nil {
		return nil, err //nolint:wrapcheck // no need to wrap
	}

	otelInterceptor, err := otelconnect.NewInterceptor(otelconnect.WithoutMetrics())
	if err != nil {
		return nil, err //nolint:wrapcheck // no need to wrap
	}

	// health check
	if err := health.Check(ctx, k.HTTP, testv1connect.TestServiceName); err != nil {
		return nil, err //nolint:wrapcheck // no need to wrap
	}

	testClient := testv1connect.NewTestServiceClient(k.HTTP, "", connect.WithInterceptors(otelInterceptor))

	return &Client{testClient: testClient}, nil
}

// GetRecord returns the record with the given id.
//   - If the record is not found, it returns nil.
func (c *Client) GetRecord(ctx context.Context, id int64) (*Record, error) {
	record, err := c.testClient.GetRecord(ctx, &connect.Request[v1.GetRecordRequest]{
		Msg: &v1.GetRecordRequest{
			ID: id,
			FileId:   fileID,
		},
	})
	if err != nil {
		if connectErr := new(connect.Error); errors.As(err, &connectErr) {
			if connectErr.Code() == connect.CodeNotFound {
				return nil, ErrNotFound
			}
		}

		return nil, err //nolint:wrapcheck // no need to wrap
	}

	return transformRecord(record)
}
```
