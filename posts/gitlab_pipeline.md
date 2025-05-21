---
head:
  - - meta
    - name: description
      content: Gitlab pipeline features and examples.
  - - meta
    - name: keywords
      content: gitlab pipeline comment features
---

# Gitlab Pipeline

Gitlab's pipeline is very easy to understand and use it.
Also it has good documentation (not like github!) and YAML configuration in a page easy to search and see.

> https://docs.gitlab.com/ee/ci/yaml/

In gitlab there are stages and jobs. Generally jobs inside of stage and when finishes it will pass to next stage.

Some of features with gitlab pipeline:

- Artifacts to pass files between jobs
- Cache to store files (_NOT USE THIS AS ARTIFACTS_)
- _needs_, ignore order of stages and run jobs after another job even in same stage
- Import other yaml parts from another repos and extend them in a job
- Dependency control of artifacts
- Services to create some container near to job like DIND container or database container for testing
- Trigger another repo's pipeline
- Rules to control when to run a job
- Tags to run a job in a specific runner
- Mutex for job run only one time in a runner
- Control environment variables or files in project or group level
- Allow failure to continue pipeline even if a job fails
- Manual trigger to run a job manually
- Generate pipeline on a job and run generated pipeline

Some examples of how to use it.

## Simple pipeline

In here build just a name of the job and add script, tags, stage also rules to control when to run.

```yaml
build:
  stage: build
  tags:
    - linux
  image:
    name: $BUILD_IMAGE
  script:
    - echo "Building the project"
  rules:
    - if: $PIPELINE_DISABLE_JOB_BUILD == "Y"
      when: never
    - if: '$CI_MERGE_REQUEST_TARGET_BRANCH_NAME == $CI_DEFAULT_BRANCH'
    - if: '$CI_COMMIT_REF_NAME == $CI_DEFAULT_BRANCH'
    - if: $CI_COMMIT_TAG
```

## GIT_STRATEGY

GIT_STRATEGY is a variable to control how to clone the repository.

`none` is to not clone the repository, useful for just running some script.

```yaml
build:
  variables:
    GIT_STRATEGY: none
```

## Import yaml

In same file, include another yaml file directly tell the path of the file.

```yaml
include:
  - '/parts/variables.yml'
```

In another repository give project name and file name to include.

```yaml
include:
  - project: 'cicd/pipeline'
    ref: master
    file: 'service.yml'

variables:
  DOCKER_IMAGE_NAME: "awesome-service"
```

`file` also be array of strings to include multiple files.

## Resource Group (MUTEX)

Add resource group in a job to run one job at a time and wait next job to run.

```yaml
test:
  resource_group: bank-1-test
```

## Artifacts

Pass files between jobs with artifacts.

```yaml
build:
  stage: build
  artifacts:
    paths:
      - bin
```

## Needs and Dependencies

Needs to run a job after another job even in same stage or another stage.

```yaml
deploy:
  needs:
    - job: build
      artifacts: true
```

On dependencies, just control the download of artifacts from previous job.

Give empty array for not to download artifacts. Ex `dependencies: []`

```yaml
deploy:
  dependencies:
    - build
```

## Pages

Gitlab pages are awesome to host static files, same as github pages.

It should be public folder in artifacts and job name should be `pages`.

```yaml
pages:
  artifacts:
    paths:
      - public
```

## Worflow

Use workflow to set rules in generally.

```yaml
workflow:
  rules:
    - if: $CI_COMMIT_TAG
```

## Generate Pipeline

In here I used [mugo](https://github.com/rytsh/mugo) to generate a pipeline with some environment variables.

```yaml
generate-pipeline:
  stage: generate
  image: $IMAGE
  extends: .default-tag
  before_script:
    - DOCKER_FILE=${PIPELINE_IMAGE_FILE_PREFIX}$(dirname ${CI_COMMIT_TAG})${PIPELINE_IMAGE_FILE_SUFFIX}
    - eval $(grep -z -o -P '(?<=# ---)(?s).*(?=# ---)' ${DOCKER_FILE} | tr -d '#' | xargs --null | xargs -I {} echo export {})
  script:
    - mugo ci/gitlab-ci-tpl.yml -o generated-ci.yml
  artifacts:
    paths:
      - generated-ci.yml
    expire_in: 10m

trigger:
  stage: trigger
  trigger:
    include:
      - artifact: generated-ci.yml
        job: generate-pipeline
    strategy: depend
```

## Proxy on Pipeline

Don't set proxy in the runner, set it as pipeline variable.

Use `HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY` also `http_proxy`, `https_proxy`, `no_proxy` in the pipeline.
