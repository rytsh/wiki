---
head:
  - - meta
    - name: description
      content: Github actions run with act tool.
  - - meta
    - name: keywords
      content: github actions act
---

# Github Actions

## Run in local

Install https://github.com/nektos/act program.

After that go to your repository and run the specific workflow:

```sh
# List all jobs
act -l
# Run a specific job
act -j <job_id>
```
