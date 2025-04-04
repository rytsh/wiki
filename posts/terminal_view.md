---
head:
  - - meta
    - name: description
      content: Terminal colorization and git status in your terminal view.
  - - meta
    - name: keywords
      content: terminal view bash zsh
---

# Terminal View

There is a great way to improve your terminal view. You can add some colors and git status to your terminal view.

Check here: https://github.com/git/git/tree/master/contrib/completion

## Bash

```sh
curl -o ~/.git-completion.bash https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash
curl -o ~/.git-prompt.sh https://raw.githubusercontent.com/git/git/master/contrib/completion/git-prompt.sh
```

Add this settings in the `~/.bashrc` file.

```sh
{ # Terminal View
B='\[\e[1;38;5;33m\]'
LB='\[\e[1;38;5;81m\]'
GY='\[\e[1;38;5;242m\]'
G='\[\e[1;38;5;82m\]'
P='\[\e[1;38;5;161m\]'
PP='\[\e[1;38;5;93m\]'
R='\[\e[1;38;5;196m\]'
Y='\[\e[1;38;5;214m\]'
W='\[\e[0m\]'

get_prompt_symbol() {
  [[ $UID == 0 ]] && echo "#" || echo "\$"
}

if [[ $PS1 && -f ~/.git-prompt.sh ]]; then
  source ~/.git-completion.bash
  source ~/.git-prompt.sh

  export GIT_PS1_SHOWDIRTYSTATE=1
  export GIT_PS1_SHOWSTASHSTATE=1
  export GIT_PS1_SHOWUNTRACKEDFILES=0

  export PS1="$GY[$Y\u$GY@$P\h$GY:$B\W\$(__git_ps1 \"$GY|$LB%s\")$GY]$W\$(get_prompt_symbol) "
else
  export PS1="$GY[$Y\u$GY@$P\h$GY:$B\W$GY]$W\$(get_prompt_symbol) "
fi
}
```

## Zsh

Useful for macOS. Just use ohmyzsh https://github.com/ohmyzsh/ohmyzsh

```sh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```
