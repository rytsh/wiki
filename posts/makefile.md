---
head:
  - - meta
    - name: description
      content: Makefile example for golang projects.
  - - meta
    - name: keywords
      content: makefile golang go
---

# Makefile

Example of a good makefile for go codebase.

- Always `.PHONY` targets add above the target so we can add new without change the PHONY list.
- Default goal should be `help` and don't run anything if user not specify a target.
- Use `go list -m` to get the package name.
- `/bin` directory should be added in the `.gitignore` file.

```makefile
BINARY    := awesome
MAIN_FILE := cmd/$(BINARY)/main.go

PKG       := $(shell go list -m)
VERSION   := $(or $(IMAGE_TAG),$(shell git describe --tags --first-parent --match "v*" 2> /dev/null || echo v0.0.0))

LOCAL_BIN_DIR := $(PWD)/bin

.DEFAULT_GOAL := help

.PHONY: run
run: ## Run the application
	go run $(MAIN_FILE)

.PHONY: build
build: CGO_ENABLED ?= 0
build: GOOS ?= linux
build: GOARCH ?= amd64
build: docs ## Build the binary file
	go build -trimpath -ldflags="-s -w -X $(PKG)/config.ServiceVersion=$(VERSION)" -o $(LOCAL_BIN_DIR)/$(BINARY) $(MAIN_FILE)

.PHONY: docs
docs: ## Generate Swagger documentation
	go mod download -x
	swag init -pd -g cmd/$(BINARY)/main.go

.PHONY: lint
lint: ## Lint Go files
	@GOPATH="$(shell dirname $(PWD))" golangci-lint run ./...

.PHONY: test
test: ## Run unit tests
	@go test -v -race ./...

.PHONY: coverage
coverage: ## Run unit tests with coverage
	@go test -v -race -cover -coverpkg=./... -coverprofile=coverage.out -covermode=atomic ./...
	@go tool cover -func=coverage.out

.PHONY: help
help: ## Display this help screen
	@grep -h -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
```

Other type of information given are with using main package. So we don't need to any pkg name knowledge.

I prefer this one much more for making open source projects.

```makefile
BUILD_DATE := $(shell date -u '+%Y-%m-%d_%H:%M:%S')
BUILD_COMMIT := $(shell git rev-parse --short HEAD)
VERSION := $(or $(IMAGE_TAG),$(shell git describe --tags --first-parent --match "v*" 2> /dev/null || echo v0.0.0))

.PHONY: build
build: CGO_ENABLED ?= 0
build: GOOS ?= linux
build: GOARCH ?= amd64
build: ## Build the binary
	go build -trimpath -ldflags="-s -w -X main.version=$(VERSION) -X main.commit=$(BUILD_COMMIT) -X main.date=$(BUILD_DATE)" -o bin/$(BINARY_NAME) $(BINARY_PATH)
```

For library projects, we can use this one.

```makefile
.DEFAULT_GOAL := help

.PHONY: lint
lint: ## Lint Go files
	@GOPATH="$(shell dirname $(PWD))" golangci-lint run ./...

.PHONY: test
test: ## Run unit tests
	@go test -v -race ./...

.PHONY: coverage
coverage: ## Run unit tests with coverage
	@go test -v -race -cover -coverpkg=./... -coverprofile=coverage.out -covermode=atomic ./...
	@go tool cover -func=coverage.out

.PHONY: help
help: ## Display this help screen
	@grep -h -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
```

## WSL Coverage Browser

In wsl generate output to html file and open it with `explorer.exe`

```makefile
html-gen: ## Export html coverage result
	@go tool cover -html=./coverage.out -o ./coverage.html

html-wsl: html-gen ## Open html coverage result in wsl
	@explorer.exe `wslpath -w ./coverage.html` || true
```

Don't forget to add `/coverage.*` in the `.gitignore` file.

## Make self calls

To ignore log for directory when calling another make command in makefile.

```makefile
MAKEFLAGS += --no-print-directory
```

## Makefile run command

If we want to use parameters goes to one command we can use this:

```makefile
.PHONY: env
env: ## Use env program like make env-prog -- --services-create
	@if [ -z "$(filter-out $@,$(MAKECMDGOALS))" ]; then \
		echo "---> make env -- [flags]"; \
		echo "########################################"; \
		LOG_LEVEL=warn go run main.go --help; \
	else \
		go run main.go $(filter-out $@,$(MAKECMDGOALS)); \
	fi

# Ignore all env targets
$(filter-out env,$(MAKECMDGOALS)):
	@:
```
