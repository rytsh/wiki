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

Useful for macOS.

```sh
mkdir -p ~/.zsh
curl -o ~/.zsh/_git https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.zsh
echo "fpath=(~/.zsh \$fpath)" >> ~/.zshrc
echo "zstyle ':completion:*:*:git:*' script ~/.zsh/_git" >> ~/.zshrc
```

```sh
curl -o ~/.git-prompt.sh https://raw.githubusercontent.com/git/git/master/contrib/completion/git-prompt.sh
echo "source ~/.git-prompt.sh" >> ~/.zshrc
```

Add this settings in the `~/.zshrc` file.

```sh
{ # Terminal View
B2='\e[1;38;5;33m'
LB2='\e[1;38;5;81m'
GY2='\e[1;38;5;242m'
G2='\e[1;38;5;82m'
P2='\e[1;38;5;161m'
PP2='\e[1;38;5;93m'
R2='\e[1;38;5;196m'
Y2='\e[1;38;5;214m'
W2='\e[0m'
B='%{[1;38;5;33m%}'
LB='%{[1;38;5;81m%}'
GY='%{[1;38;5;242m%}'
G='%{[1;38;5;82m%}'
P='%{[1;38;5;161m%}'
PP='%{[1;38;5;93m%}'
R='%{[1;38;5;196m%}'
Y='%{[1;38;5;214m%}'
W='%{[0m%}'

get_prompt_symbol() {
  [[ $UID == 0 ]] && echo "#" || echo "\$"
}

setopt PROMPT_SUBST

if [[ $PS1 && -f ~/.git-prompt.sh ]]; then
  source ~/.git-prompt.sh

  export GIT_PS1_SHOWDIRTYSTATE=1
  export GIT_PS1_SHOWSTASHSTATE=1
  export GIT_PS1_SHOWUNTRACKEDFILES=0

  COLOR_PS1="\e[1;38;5;242m|\e[1;38;5;81m"
  precmd () {
    export PS1="${GY}[${Y}%n${GY}@${P}%m${GY}:${B}%~$(__git_ps1 ${GY2}\|${LB2}%s)${GY}]${W}\$(get_prompt_symbol) "
  }
else
  precmd () {
    export PS1="${GY}[${Y}%n${GY}@${P}%m${GY}:${B}%~${GY}]${W}\$(get_prompt_symbol) "
  }
fi
}
```
