---
title: MongoDB
date: 2021-04-16
tags:
 - MongoDB
categories:
 - MongoDB
---

## MongoDB路径

安装包位置  `/usr/local/mongodb4`
数据库位置  `/var/lib/mongodb`
logo位置    `/var/log/mongodb`
启动命令    `mongodb]# mongod --dbpath /var/lib/mongodb --logpath /var/log/mongodb/mongod.log --fork`
停止命令  `mongod --dbpath /var/lib/mongodb --logpath /var/log/mongodb/mongod.log --shutdown`
进入mongo后台管理Shell `cd /usr/local/mongodb4/bin ` `./mongo`
使用配置启动mongodb `./mongod --config /usr/local/mongoDB/mongodb.conf`
使用账号登陆mongodb `./mongo 127.0.0.1:27017/admin --username "root" --password "123456"`
在nginx部署mongodb(https://juejin.cn/post/6844903827032768525)
js链接mongodb
```javascript
/*
 * @Author: your name
 * @Date: 2021-04-16 10:34:54
 * @LastEditTime: 2021-04-16 12:13:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hello-vue3\server.js
 */
let url = 'mongodb://120.55.162.212:27017/userList'

let mongoose = require('mongoose') 
const db = mongoose.connect('mongodb://root:123456@120.55.162.212:27017', { useNewUrlParser: true }, err => {
  if (err) {
    console.log('出错---------->', err)
  } else {
    console.log('链接成功')
  }
})

```


