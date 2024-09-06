---
head:
  - - meta
    - name: description
      content: Docker in Docker (DinD) is a method to run Docker inside a Docker container. This is useful when you want to run containers in your CI/CD pipelines.
  - - meta
    - name: keywords
      content: dind docker-in-docker gitlab testcontainers
---

# DinD

Docker in Docker (DinD) is a method to run Docker inside a Docker container. This is useful when you want to run containers in your CI/CD pipelines.

For example, you can use DinD in your CI/CD pipelines to up databases, run tests, and clean up the environment.

Most important thing you need to remember. When you create container and mapped a port than that port is mapping to DinD host.
So you need to use always that DinD host address to reach that port.

> `TESTCONTAINERS_HOST_OVERRIDE` is a good way to set the DinD host address.

DinD is base container of docker.

```sh
# default is alpine version
docker pull docker:27.1.2
```

Check the https://hub.docker.com/_/docker/tags to get the latest version.

## Usage in Gitlab - Runner and Pipeline

First of all, we need previliged mode to run Docker in Docker.

> This is for explaining purposes. Need to be edited before use.

```toml
listen_address = ":9252"
concurrent = 20
check_interval = 0

[session_server]
  session_timeout = 1800

[[runners]]
  name = "my-runner01.local"
  url = "https://local-gitlab.com/"
  token = "XXXXXXXXXXXXXXXX"
  executor = "docker"
  environment = ["https_proxy=http://my-proxy.com:3128"] # Add some environment variables for use
  shell = "bash"
  [runners.docker]
    services_privileged = true
    allowed_privileged_services = ["rytsh/dind:*"] # Only allow this image to run in privileged mode as service
    allowed_images = ["allow/signed/*:*", "allow/*/*:*"]
    tls_verify = false
    image = "alpine:3.20.2" # default image
    privileged = true
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/var/run/docker.sock:/var/run/docker_runner.sock","/var/lib/docker/cache/cache/:/cache", "/var/lib/docker/cache/gomod/:/go/pkg/mod/cache/", "/var/lib/docker/cache/go-build/:/root/.cache/go-build"] # Add some volumes for cache
    pull_policy = ["if-not-present"]
    shm_size = 0
```

I mounted also `docker.sock` but in the different path. This is because I don't want to use it in the default path.

Now we need to use DIND in the pipeline as service.

> Truncated scripts in the extends.

```yaml
prebuild-go-coverage-dind:
  extends: .go-coverage
  services:
    - name: $DIND_IMAGE
      alias: docker
      command: ["--tls=false"]
  variables:
    # Instruct Testcontainers to use the daemon of DinD, use port 2375 for non-tls connections.
    DOCKER_HOST: "tcp://docker:2375"
    # Instruct Docker not to start over TLS.
    DOCKER_TLS_CERTDIR: ""
    # Improve performance with overlayfs.
    DOCKER_DRIVER: overlay2
    # Testcontainers can get the host address from the DinD container.
    TESTCONTAINERS_HOST_OVERRIDE: "docker"
  rules:
    - if: $POSTGRES_AVAILABLE == "Y"
      when: never
    - if: $DIND_AVAILABLE == "N"
      when: never
    - if: $PIPELINE_DISABLE_JOB_PREBUILD_GO_COVERAGE == "Y" || $PIPELINE_DISABLE_CI_TESTER == "Y"
      when: never
    - if: $CI_COMMIT_REF_NAME =~ /feature\/depmaster/
      when: never
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
    - if: $CI_COMMIT_BRANCH && $CI_OPEN_MERGE_REQUESTS && $CI_PIPELINE_SOURCE == "push"
      when: never
    - when: on_success
```
