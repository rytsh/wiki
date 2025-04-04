---
head:
  - - meta
    - name: description
      content: Git changes between commits.
  - - meta
    - name: keywords
      content: git changes commit show
---

# Git Changes

Get list of changed files between two commits:

```sh
git diff --name-only <commit1> <commit2>
# git diff --name-only master..HEAD
```

Fetch the file from a specific commit:

```sh
git show <commit>:<file>
# git show HEAD~2:README.md
```
