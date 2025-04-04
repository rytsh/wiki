---
head:
  - - meta
    - name: description
      content: Option pattern is a design pattern that allows you to specify optional parameters for a function or method. It is useful for handling configuration values and user just add option what they want to change on default configuration.
  - - meta
    - name: keywords
      content: option generic pattern golang go
---

# Option Pattern with Generic

Option pattern good to handle configuration values and user just add option what they want to change on default configuration.

In this I want to show how to make apply part as generic and not repeat same code for each option.

```go
type (
	OptionTime func(o *optionTime)
	OptionCall func(o *optionCall)
)

// ///////////////////////////////////////////////////////////////////////////

type defaulter interface {
	Default()
}

func apply[T any, O ~func(*T)](opts []O) *T {
	opt := new(T)
	for _, o := range opts {
		o(opt)
	}

	if d, ok := any(opt).(defaulter); ok {
		d.Default()
	}

	return opt
}
```

Now define our option functions.

```go

// ///////////////////////////////////////////////////////////////////////////
// funcs of OptionTime

type optionTime struct {
	TimeFormat string
}

func (o *optionTime) Default() {
	if o.TimeFormat == "" {
		o.TimeFormat = time.RFC3339
	}
}

func WithTimeFormat(format string) OptionTime {
	return func(o *optionTime) {
		o.TimeFormat = format
	}
}

// ///////////////////////////////////////////////////////////////////////////
// funcs of OptionCall

type optionCall struct {
	Callback func(string) string
}

func (o *optionCall) Default() {
	if o.Callback == nil {
		o.Callback = func(s string) string {
			return s
		}
	}
}

func WithCallback(callback func(string) string) OptionCall {
	return func(o *optionCall) {
		o.Callback = callback
	}
}
```

That's all, now we need to just accept and call apply function to get our struct.

```go
func MyFunc(opts ...OptionTime) string {
	o := apply(opts)

	// /////////////////
}
```
