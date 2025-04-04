---
head:
  - - meta
    - name: description
      content: Clipboard management in Linux, Windows, and macOS.
  - - meta
    - name: keywords
      content: clipboard, linux, windows, macos, management
---

# Clipboard

## Windows WSL

```sh
cat /path/to/file | clip.exe
```

## MacOS

Copy clipboard on macOS use pbcopy

```sh
echo "Hello World" | pbcopy
pbcopy < example.txt
```
