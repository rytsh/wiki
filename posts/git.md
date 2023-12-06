# git

```sh
git config --global user.name "Eray Ates"
git config --global user.email "eates23@gmail.com"
```

## Exclude files

> https://stackoverflow.com/questions/7335420/global-git-ignore

`.gitignore` file is good for projects but sometimes adding our own development tools adding unwanted files in projects.

To prevent that add a global `.gitignore` file and add to `.gitconfig` file.

```sh
git config --global core.excludesFile '~/.gitignore'
```

And verify it

```sh
git config --global core.excludesFile
```

## User change

Working for different companies and different projects, sometimes we need to change our git user.

To do that we can add `includeIf` to our `.gitconfig` file.

```
[includeIf "gitdir:~/personal/*/"]
    path = ~/.git/personal
```

And create a file `~/.git/personal` and add your user info

```
[user]
    name = Eray Ates
    email = eates23@gmail.com
```

## GPG Key

Check this links:

https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key?platform=linux  
https://docs.gitlab.com/ee/user/project/repository/signed_commits/gpg.html

Install gpg(2) with your package manager.

```sh
gpg --full-generate-key
```

I chose the DSA only for signing

And name is -> "Eray Ates", email is -> "eates23@gmail.com", after add a password.

List your keys

```sh
gpg --list-secret-keys --keyid-format=long
```

You will get something like this:

```sh
[keyboxd]
---------
sec   dsa2048/8C2C8572CE10E92D 2023-11-25 [SC]
      GG4ZPFCTU8CREWZPBHIY9MWKIBINDPTOBGHED9NP
uid       [    son derece    ] Eray Ates <eates23@gmail.com>
```

Now use `8C2C8572CE10E92D` your GPG key ID and run this command

```sh
gpg --armor --export 8C2C8572CE10E92D
```

Copy the output and add to GitHub/GitLab GPG key settings.

Use this GPG key-id for git signing

```sh
git config --global user.signingkey 8C2C8572CE10E92D
```

And always enable `-S` flag for git commit

```sh
git config --global commit.gpgsign true
```

## GPG TTY

If you see this error when you try to commit

```sh
error: gpg failed to sign the data
fatal: failed to write commit object
```

Try debug it with this command

```sh
GIT_TRACE=1 git commit -s
```

You need to add this to your `~/.gnupg/gpg-agent.conf` file

```sh
echo "pinentry-program $(which pinentry-curses)" > ~/.gnupg/gpg-agent.conf
```

Also you need to this value

```sh
echo 'export GPG_TTY=$(tty)' >> ~/.bashrc
echo 'export GPG_TTY=$(tty)' >> ~/.zshrc
```

And you should restart gpg-agent

```sh
gpgconf --kill gpg-agent
```

Test it and you should see a pinentry window based on your pinentry-program

```sh
echo "test" | gpg --clearsign
```
