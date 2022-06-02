3. 1. MongoDB
   
      安装包位置   `/mongodb/mongodb-linux-x86_64-rhel70-5.0.4`
      数据库位置   `/mongodb/mongodbDataBase`
      log位置     `/mongodb/mongodbLog`
   
      ### 普通启动
   
      普通启动没有用户权限控制，并且默认开启了全部ip访问，不够安全。    
   
      ```
      1. cd /mongodb/mongodb-linux-x86_64-rhel70-5.0.4/bin
      2. /mongod --dbpath /mongodb/mongodbDataBase --logpath /mongodb/mongodbLog/mongodb.log  --fork --bind_ip_all
      ```
   
      停止命令  
   
      ```
      1. cd mongodb-linux-x86_64-rhel70-5.0.4/bin
      2. ./mongod -shutdown -dbpath=/mongodb/mongodbDataBase
      
      或者
      1. ./mongo
      2. use admin
      3. db.shutdownServer() //需要具有admin数据库的操作权限才能操作
      ```
   
      进入mongo自带的shell
   
      ```
      1. cd mongodb-linux-x86_64-rhel70-5.0.4/bin 
      2. ./mongo
      ```
   
      ### 通过配置文件启动，并且增加了用户权限控制
   
      1. 配置文件
         文件位置/mongodb/conf/mongod.conf
   
      ```
      processManagement:
         fork: true #后台启动
      net:
         #bindIp: localhost,127.0.0.1,223.xxx.xxx.xxx.xxx
         bindIp: 0.0.0.0 #开启全ip访问
         port: 27017 #端口
      storage:
         dbPath: = /mongodb/mongodbDataBase #数据存储位置
      systemLog:
         destination: file
         path: "/mongodb/mongodbLog/mongodb.log" #log位置
         logAppend: true #每次都是在log后面追加新的日志
      storage:
         journal:
            enabled: true
      security:
          authorization: enabled #开启认证
      ```
   
      2. 使用配置启动mongodb `./mongod --dbPath=/mongodb/mongodbDataBase --config /mongodb/conf/mongod.conf`
   
      3. 连接数据库并新增一个超级管理员权限
   
         ```
          1. ./mongo  //连接数据库
          2. use admin //切换到admin库
          3. db.createUser(
            {
              user: "root",
              pwd: passwordPrompt(), // 通过弹出框输入密码或者可以直接写明文密码
              roles: [ { role: "root", db: "admin" }, "readWriteAnyDatabase" ]
              //root用户可以修改admin库增加修改删除权限，并且可以读写其他的库
            }
          )
          4. 断开重连数据库
          5. ./mongo --port 27017  --authenticationDatabase "admin" -u "root" -p 使用账号，密码连接数据库
          6. 还可以对指定数据库增加用户权限
          use test
          db.createUser(
            {
              user: "myTester",
              pwd:  passwordPrompt(),   // or cleartext password
              roles: [ { role: "readWrite", db: "test" }]
            }
          )
         
         ```
   
      在nginx部署mongodb(https://juejin.cn/post/6844903827032768525)
      js通过账号和密码连接数据库并进行查询，插入数据等操作
   
      ```javascript
      /*
      
       */
        const MongoClient = require('mongodb').MongoClient;
        const url = 'mongodb://user:password@mongod部署服务器ip地址:27017/auth=admin';
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
   
      ### 创建角色
   
      #### 于admin库中创建角色
   
      下面是以admin为校验库来创建了一个developer角色,对test库有读写权限
   
      ```
      ./mongo --port 27017  --authenticationDatabase "admin" -u "root" -p 使用root账号以admin为校验库登录数据库
      use admin //切换到admin库
      db.createUser(
         {
           user: "developer",
           pwd: passwordPrompt(), // 通过弹出框输入密码或者可以直接写明文密码
           roles: [ { role: "readWrite", db: "test" }]
         }
       )
      ```
   
      以此来创建的用户在用数据库连接工具连接时.
   
      <img src="./adminDb.png">
   
      #### 于其他数据库中创建角色时
   
      切换到其他数据库中直接创建角色
   
      ```
      use test
      db.createUser(
      {
       user: "myTester",
       pwd:  passwordPrompt(),   // or cleartext password
       roles: [ { role: "readWrite", db: "test" }]
      }
      )
      ```
   
      以此来创建的用户在用数据库连接工具连接时，校验dataBase要填创建时所在的库.
   
      <img src="./testDb.png">
   
      ### 创建数据库
   
      使用use 数据库名来创建数据库
   
      <span style='color:red'>我们刚创建的数据库 并不在数据库的列表中， 要显示它，我们需要向其插入一些数据.</span>
   
      ```
      use test
      db.test.insert({name:'xxx'})
      show dbs
      admin   0.000GB
      config  0.000GB
      local   0.000GB
      test    0.000GB
      ```
   
      ### MongoDB的一些数据库操作
   
      #### 遍历数据插入某字段
   
      ```
      db.getCollection('test').find().forEach(
         function(item){                
             db.getCollection('test').update({"_id":item._id},{$set:{"date": new Date()}})
         }
      )
      ```
   
      
   
      ### 附录
   
      1. mongoShell的一些操作
         1. help：列出所有的 function
         2. show dbs：展示当前实例中所有的 databases。
         3. use ：切换到指定的 db，接下来的操作将会在此 db 中。
         4. show collections：展示出当前 db 中所有的 collections。
         5. show users：展示当前 db 中已经添加的所有用户。
         6. show roles：展示当前 db 中所有内置的或者自定义的用户角色。
         7. show profile：这涉及到 profile 相关的配置，默认情况下展示出最近 5 个操作耗时超过 1 秒的操作，通常用于跟踪慢查询。
         8. db.help()：展示出可以在 db 上进行的操作 function。
         9. db..help()：展示出可以在 colleciton 上进行的操作
      2. 配置文件手册
         1. https://docs.mongodb.com/manual/reference/configuration-options
         2. https://docs.mongodb.com/manual/reference/parameters/
      3. 配置文件详解
         1. https://www.cnblogs.com/xibuhaohao/p/12580331.html