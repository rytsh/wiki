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

Add this one to `~/.zshrc`.

```sh
# Zsh'in değişkenleri okuması için gerekli ayar
setopt prompt_subst

autoload -Uz vcs_info
precmd() { vcs_info }

# vcs_info untracked dosyalari varsayilan olarak degisiklik saymaz.
zstyle ':vcs_info:git*+set-message:*' hooks git-untracked
+vi-git-untracked() {
  if [[ -z ${hook_com[unstaged]} && -n $(git ls-files --others --exclude-standard 2>/dev/null) ]]; then
    hook_com[unstaged]='%F{214}*%f'
  fi
}

zstyle ':vcs_info:*' enable git
zstyle ':vcs_info:git:*' check-for-changes true
zstyle ':vcs_info:git:*' stagedstr '%F{82}+%f'
zstyle ':vcs_info:git:*' unstagedstr '%F{214}*%f'
zstyle ':vcs_info:git:*' formats '|%F{81}%b%f%c%u'
zstyle ':vcs_info:git:*' actionformats '|%F{81}%b|%a%f%c%u'

# Renk tanımları (Zsh formatı) - %B ile kalın (bold) yapıyoruz
local B=$'%B%F{33}'     # Mavi
local LB=$'%B%F{81}'    # Açık Mavi
local GY=$'%B%F{242}'   # Gri
local G=$'%B%F{82}'     # Yeşil
local P=$'%B%F{161}'    # Pembe
local PP=$'%B%F{93}'    # Mor
local R=$'%B%F{196}'    # Kırmızı
local Y=$'%B%F{214}'    # Sarı
local W=$'%b%f'         # Sıfırla (bold ve renk kapat)

# Prompt symbol fonksiyonu
get_prompt_symbol() {
  [[ $UID == 0 ]] && echo "#" || echo "$"
}

# Prompt'u ayarla
# %n: kullanıcı, %m: hostname (makine adı), %~: dizin
PROMPT="${GY}[${Y}%n${GY}@${P}%m${GY}:${B}%~"'${vcs_info_msg_0_}'"${GY}]${W}"'$(get_prompt_symbol) '
```
