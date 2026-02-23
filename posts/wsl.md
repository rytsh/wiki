---
head:
  - - meta
    - name: description
      content: I like windows's UI simple I can do jobs faster than mac and adding linux terminal on that is perfect work environment for me.
  - - meta
    - name: keywords
      content: wsl
---

# WSL 🍻

> I LOVE WSL!

I like windows's UI simple I can do jobs faster than mac and adding linux terminal on that is perfect work environment for me.

Some benefist of this setup:

- Use new windows terminal (best terminal ever) setting default terminal to wsl
- Run docker under wsl
- Vscode and see the wsl file system
- View Linux gui apps under wsl
- Runnable .exe files from terminal

There is still some cons, need to much more flexibility of the wsl machine like networking, passthrough devices.

## Issues

### Cannot execute windows binaries

> Old trick, looks not needed anymore

[microsoft/WSL#8843 (comment)](https://github.com/microsoft/WSL/issues/8843#issuecomment-1459120198)

```sh
sudo sh -c 'echo :WSLInterop:M::MZ::/init:PF > /usr/lib/binfmt.d/WSLInterop.conf'
```

After shutdown and restart WSL, you can execute windows binaries.

```sh
wsl --shutdown
```

### WSL - hard disk got all space

First install `Optimize-VHD` and it is come with `Microsoft-Hyper-V` check powershell and if not exist than install it:

> Remember to run powershell as administrator

```powershell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```

Or just management tools:

```powershell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-Management-PowerShell
```

Than in your `ext4.vhdx` file location run (this takes time):

```powershell
Optimize-VHD -Path "C:\Users\rytsh\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu_42thkp1fnegsc\LocalState\ext4.vhdx" -Mode Full
```

> Use windirstat program easily to find big files https://windirstat.net/
