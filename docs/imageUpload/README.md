---
title: 通过Vue+Express+NodeJs实现前端上传文件至华为云OBS
date: 2021-11-26
tags:
 - JavaScirpt
 - NodeJs
categories:
 - JavaScirpt
 - NodeJs
---

1. 实现前端页面
   ```
    <script setup lang="ts">
        import { reactive, ref } from 'vue'
        let fileList = reactive([])
        function handlePreview(file: object): any {
            console.log(file)
        }
        function beforeRemove(file: object, list: any[]): any {
            console.log(file, list)
        }
        function handleRemove(file: object, list: any[]): any {
            console.log(file, list)
        }
    </script>
    <template>
        <div>
            <el-upload
                class="upload-demo"
                action="/api/uploadImg"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :file-list="fileList"
            >
                <el-button size="small" type="primary">Click to upload</el-button>
                <template #tip>
                    <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                </template>
            </el-upload>
        </div>
    </template>
   ```
   2. NodeJs代码,使用formidable包，可以在express的req.files.name获取上传文件的formdata流,并将上传的文件返回的url返回给前台
   ```
    const express = require('express')
    const app = express()
    const port = 8002
    const formidable = require('express-formidable')
    const MongoClient = require('mongodb').MongoClient;
    //const url = 'xxxx';
    const url = 'xxxx'
    const dbName = 'test';
    const client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const ObsClient = require('esdk-obs-nodejs')
    const fs = require('fs')
    const endPointUrl = 'xxxx'
    const AK = 'xxxx'
    const SK = 'xxxx'
    const bucketName = 'xxxx'

    const obsClient = new ObsClient({
        access_key_id: AK,
        secret_access_key: SK,
        server: endPointUrl
    })

    app.use(formidable())

    app.use((req, res, next) => {
        //设置请求头

        req.method === 'OPTIONS' ? res.status(204).end() : next()
    })
    app.all('', function (req, res, next) {

        if (req.method.toLowerCase() == 'options') {
            res.send(200)
        } else {
            next()
        }
        next();

    });
    app.post('/api/uploadImg', (req, res) => {
        const  name = req.files.file.name
        const file = req.files.file.path //获取流的临时存储路径
        obsClient.putObject({
            Bucket: bucketName,
            Key: name,
            // 创建文件流，其中localfile为待上传的本地文件路径，需要指定到具体的文件名
            Body:  file,
            ACL: obsClient.enums.AclPublicRead
        }, (err, result) => {
            if (err) {
                res.send({
                    "code": 1,
                    "msg": "上传失败"
                })
            } else {
                let resUrl = obsClient.createSignedUrlSync({
                    Method: 'GET',
                    Bucket: bucketName,
                    Key: name
                })
                const SignedUrl = resUrl.SignedUrl
                const URI = `https://zardluansource.obs.cn-east-2.myhuaweicloud.com/${encodeURI(name)}`
                insert(name, URI).then(r => {
                    run(name).then(r => {
                        res.send({
                            "code": 0,
                            "msg": "上传成功",
                            "data": {
                                "url": r.url,
                                "name": r.name
                            }
                        })
                    }).catch(e => {
                        res.send({
                            "code": 1,
                            "msg": "上传失败"
                        })
                    })
                }).catch(e => {
                    res.send({
                        "code": 1,
                        "msg": "上传失败"
                    })
                })
                console.log(resUrl)


            }
        });
    })
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })

        async function run(name) {
            await client.connect()
            const db = client.db(dbName)
            const collection = db.collection('test')
            let res = await collection.findOne({ name: name })
            close()
            return res

        }
        async function insert(name, url) {
            await client.connect()
            const db = client.db(dbName)
            const collection = db.collection('test')
            let res = await collection.insertOne({ name: name, url: url })
            return res
            //close()
        }
        function close() {
            client.close().then((r) => {
                console.log('关闭');
            })
        }


   ```