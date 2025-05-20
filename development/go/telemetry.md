# Telemetry

For share telemetry we need to use `opentelemetry`. It's a standard for telemetry data collection and export.

> Never use other libraries directly in code!

```sh
go get github.com/worldline-go/tell
```

Check example in here https://github.com/worldline-go/telemetry_example

## Installation

I created a [opentelemetry library](https://github.com/worldline-go/tell) for helper telemetry initialization so I will continue to use it.

```go
import (
    "github.com/worldline-go/tell"
)

type Config struct {
    // ...
    Telemetry tell.Config
}
```

Inside in the main function after load the config, we need to initialize the tell library to make connection with otel-collector.

```go
collector, err := tell.New(ctx, cfg.Telemetry)
if err != nil {
    return fmt.Errorf("failed to init telemetry; %w", err)
}

// flush metrics on failure
defer collector.Shutdown()
```

You can now use any of telemetry library or own telemetry data.

## Metric

For metrics you can create one and add lots of attributes to it but attributes cannot be dynamic! Dynamic attributes killing memory in otel-collector and hard to investigate them.

### Custom

```go
package telemetry

import (
	"fmt"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
	"go.opentelemetry.io/otel/metric"
)

var (
	GlobalAttr  []attribute.KeyValue
	GlobalMeter *Meter
)

type Meter struct {
	Error     metric.Int64Counter
	Processed metric.Int64Counter
	Rules     metric.Int64Counter
}

func AddGlobalAttr(v ...attribute.KeyValue) {
	GlobalAttr = append(GlobalAttr, v...)
}

func ExtendGlobalAttr(v ...attribute.KeyValue) []attribute.KeyValue {
	return append(GlobalAttr, v...)
}

func SetGlobalMeter() error {
	mp := otel.GetMeterProvider()

	m := &Meter{}

	var err error

	meter := mp.Meter("")

	//nolint:lll // description
	m.Processed, err = meter.Int64Counter("transaction_processed_total", metric.WithDescription("number of successfully validated count"))
	if err != nil {
		return fmt.Errorf("failed to initialize transaction_processed_total; %w", err)
	}

	m.Error, err = meter.Int64Counter("transaction_error_total", metric.WithDescription("number of error on validation count"))
	if err != nil {
		return fmt.Errorf("failed to initialize transaction_error_total; %w", err)
	}

	m.Rules, err = meter.Int64Counter("transaction_rules_total", metric.WithDescription("number of used rule on validation count"))
	if err != nil {
		return fmt.Errorf("failed to initialize transaction_error_total; %w", err)
	}

	GlobalMeter = m

	return nil
}

//nolint:gochecknoinits // set noop
func init() {
	_ = SetGlobalMeter()
}
```

### Echo

```go
// import "github.com/worldline-go/tell/metric/metricecho"
// add echo metrics
e.Use(metricecho.HTTPMetrics())
```

## Trace

### Span

Span creating a trace for a specific operation like for function.

Please check the https://opentelemetry.io/docs/specs/semconv/ for adding attributes for general thing.

### Echo

```sh
go get go.opentelemetry.io/contrib/instrumentation/github.com/labstack/echo/otelecho
```

Add echo's middleware to the service.

```go
// add echo otel tracing
e.Use(otelecho.Middleware(config.ServiceName))
```

### Http Request

So we get ctx from request's context but if we use that directly there cloud be timeout issue, so we need to create a new context with timeout.

```go
ctx := context.WithoutCancel(ctx)
```

And use that one to create new span to measure http time but don't forget to add span kind as client.  
This is important for generating service-graph!

```go
ctx, spanCall := tracer.Start(ctx, "get-transaction", trace.WithSpanKind(trace.SpanKindClient))
defer spanCall.End()

// add context propagation or use klient's inject option to do it automatically
otel.GetTextMapPropagator().Inject(ctx, propagation.HeaderCarrier(request.Header))
```

Inject to http header of traceID can done with klient's option.

```go
klient.WithInject(func(ctx context.Context, req *http.Request) {
    otel.GetTextMapPropagator().Inject(ctx, propagation.HeaderCarrier(req.Header))
})
```

### Database

```go
ctx, span := otel.Tracer("").Start(ctx,
    "add_product",
    trace.WithSpanKind(trace.SpanKindClient),
    trace.WithAttributes(attribute.String("db.name", "postgres")),
)
defer span.End()
```

### Kafka

wkafka uses franz-go library and it is help propogation.

```sh
go get github.com/twmb/franz-go/plugin/kotel
```

Use that with initializing the kafka client.

```go
kafkaTracer = kotel.NewTracer()

kafkaClient, err = wkafka.New(ctx,
    config.Application.KafkaConfig,
    wkafka.WithConsumer(config.Application.KafkaConsumer),
    wkafka.WithClientInfo(config.ServiceName, config.ServiceVersion),
    wkafka.WithKGOOptions(kgo.WithHooks(kotel.NewKotel(kotel.WithTracer(kafkaTracer)).Hooks()...)),
)
```

#### Produce message

Important to have span kind as producer.

```go
ctx, spanKafka := otel.Tracer("").Start(ctx, "produce_message", trace.WithSpanKind(trace.SpanKindProducer))
defer spanKafka.End()

if err := h.KafkaProducer.Produce(ctx, product); err != nil {
    spanKafka.SetStatus(codes.Error, err.Error())

    return c.JSON(http.StatusBadRequest, model.Message{
        Message: err.Error(),
    })
}
```

#### Consume message

`k.Tracer` is we initialized on kafka client (kotel.NewTracer()).

```go
func (k *Kafka) Consume(ctx context.Context, product model.Product) error {
	// use tracer's returned ctx for next spans
	_, span := k.Tracer.WithProcessSpan(wkafka.CtxRecord(ctx))
	defer span.End()

	span.SetAttributes(attribute.String("product.name", product.Name))

	log.Info().Str("product", product.Name).Str("description", product.Description).Msg("consume message")

	return nil
}
```

If using on batch consumer then use wkafka.CtxRecordWithIndex function to get record from the batch.

```go
_, span := s.tracer.WithProcessSpan(wkafka.CtxRecordWithIndex(ctx, 123))
defer span.End()
```
