---
title: 在nginx部署node，并启动一个node服务
date: 2021-04-16
tags:
 - nginx
 - nodeJs
categories:
 - nginx
 - nodeJs
---

## 通过nvm安装node
```
//安装git并且clone nvm到本地
yum install git
git clone https://github.com/cnpm/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`

//激活nvm
echo ". ~/.nvm/nvm.sh" >> /etc/profile
source /etc/profile

//列出所有nodeJs版本
nvm list-remote

//安装nodeJs
nvm install v6.9.5
nvm install v7.4.0

//运行nvm ls查看已安装的Node.js版本。
nvm ls

//运行nvm use <版本号>可以切换Node.js版本
nvm use v7.4.0
```
**注意：每次重新连接服务器之后都需要重新nvm use一次node否则会报command not found的错误**

## 部署一个node服务

1.使用npm初始化一个项目
```
npm init -y
npm install --save-d express

新建index.js代码如下

let express = require('express')
let app = express()
app.get('/userList',function(req,res){
    res.send('helloworld')
})

var server = app.listen(3000,function(){
    console.log('running at 3000')
})

使用node index.js 启动服务
就可以通过ip:3000访问到服务了
```


node项目位于服务器/root/nodeServer文件夹下
参考文章(https://helpcdn.aliyun.com/document_detail/50775.html)

