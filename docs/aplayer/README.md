---
title: APlayer
date: 2020-09-21
tags:
 - vuepress
categories:
 - vuepress插件
---

# aplayer
12345
<timer/>
<Vssue :title="$title" />

<a-player 
    :options="{
        fixed:true,
        audio: [
            {
                name: '童话镇',
                artist: '陈一发儿',
                url: 'https://assets.chenyifaer.com/music/童话镇-陈一发儿.mp3',
                cover: 'https://assets.chenyifaer.com/images/cover.jpg',
            },
            {
                name: '1',
                artist: '1',
                url: '/mp3/1.mp3',
                cover: 'https://assets.chenyifaer.com/images/cover.jpg',
            },
            {
                name: '阿婆说',
                artist: '陈一发儿',
                url: 'https://assets.chenyifaer.com/music/阿婆说-陈一发儿.flac',
                cover: 'https://assets.chenyifaer.com/images/cover.jpg',
            },
        ]
    }"
/>
