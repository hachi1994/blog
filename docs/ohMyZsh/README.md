---
title: oh-my-zsh
date: 2021-12-22
tags:
 - Linux
categories:
 - Linux
---

### oh-my-zsh
1. .oh-my-zsh 文件
   ```
   cd /root/.oh-my-zsh
   
   ```
2. 配置文件
   ```
    vim ~/.zshrc

    //应用配置
    source ~/.zshrc
   ```

4. 使用主题
   ```
    vim ~/.zshrc
    # 修改如下内容
    ZSH_THEME="af-magic"
    # 刷新配置，每次修改后都需要
    source ~/.zshrc
   ```


5. 使用插件
   ```
   下载插件
   git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

   修改配置
   vim ~/.zshrc
   plugins=(
        git
        zsh-syntax-highlighting
    )
    source ~/.zshrc
   ```
5. 使用zsh后发现各种命令出现command not find情况
   因为各种命令去依旧使用的是.bashrc中的配置，所以解决这个问题的方法是，复制.bashrc里的配置到.zshrc中，再source即可。
   ```
      vim ~/.bashrc 
      复制其中的内容
      vim ~/.zshrc
      将.bashrc中内容复制进来
      source ~/.zshrc
   ```