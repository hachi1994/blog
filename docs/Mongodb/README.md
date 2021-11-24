---
title: MongoDB
date: 2021-04-16
tags:
 - MongoDB
categories:
 - MongoDB
---

## MongoDB路径

安装包位置   `/mongodb/mongodb-linux-x86_64-rhel70-5.0.4`
数据库位置   `/mongodb/mongodbDataBase`
log位置     `/mongodb/mongodbLog`
启动命令    
```
 cd /mongodb/mongodb-linux-x86_64-rhel70-5.0.4/bin
./mongod --dbpath /mongodb/mongodbDataBase --logpath /mongodb/mongodbLog/mongodb.log  --fork --bind_ip_all
```
停止命令  
```
cd mongodb-linux-x86_64-rhel70-5.0.4/bin
./mongod -shutdown -dbpath=/mongodb/mongodbDataBase
```
进入mongo后台管理Shell 
```
cd mongodb-linux-x86_64-rhel70-5.0.4/bin 
./mongo
```
使用配置启动mongodb `./mongod --config mongodb-linux-x86_64-rhel70-5.0.4/mongodb.conf`
使用账号登陆mongodb `./mongo 127.0.0.1:27017/admin --username "root" --password "123456"`
在nginx部署mongodb(https://juejin.cn/post/6844903827032768525)
js链接mongodbb并进行查询，插入数据等操作
```javascript
/*

 */
  const MongoClient = require('mongodb').MongoClient;
  const url = 'mongodb://mongod部署服务器ip地址:27017';
  const dbName = 'test';
  const client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });
  function close() {
      client.close().then((r) => {
          console.log('关闭');
      })
  }
  asy
  async function search() {
      client.connect((e) => {
          if (e) { console.log('连接失败') }
          const db = client.db(dbName)
          const collection = db.collection('test')
          let res = collection.findOne({ name: 'wade' })
          res.then(r => {
              console.log(r)
              close()
          })



      })
  }
  async function run() {
      await client.connect()
      const db = client.db(dbName)
      const collection = db.collection('test')
      let res = await collection.findOne({ name: 'wade' })
      close()
      return res
    
  }
  run().then(r => console.log('查询成功',r)).catch(e=>{console.log('查询失败');})


```


