---
title: devServer的proxy设置
date: 2021-09-29
tags:
 - webpack
categories:
 - webpack
---

## devServer的proxy的几个使用场景

1. 如果我们的项目和后端开发服务器不在一个域下，则需要配置项目的webpack配置。
2. 情景一：所有请求/api/xxx的都会被代理到 http://xxx.xxx.xxx.x:8002/api/xxx,例如/api/user => http://xxx.xxx.xxx.x:8002/api/user
    ```
    module.exports = {
        outputDir: 'dist',
        indexPath: 'index.html',
        devServer: {
            open: false,
            port: 8090,
            proxy: {
                '/api': 'http://xxx.xxx.xxx.x:8002',
                
            },
        }
    }
    ```
3. 情景二：多个路径代理到同一个target下
    ```
    module.exports = {
        outputDir: 'dist',
        indexPath: 'index.html',
        devServer: {
            open: false,
            port: 8090,
            proxy: [{
            context: ['/auth', '/api'],
            target: 'http://xxx.xxx.xxx.x:8002',
        }]
        }
    }
    ```
4. 情景三：如果不希望存在api这个路径，则可以将api重写成/,即api/user => http://119.3.103.139:8002/user
   ```
   module.exports = {
        outputDir: 'dist',
        indexPath: 'index.html',
        devServer: {
            open: false,
            port: 8090,
            proxy: {
                '/api': {
                    target: 'http://119.3.103.139:8002',
                    secure: false,
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': '/'
                    }
                }
            },
        }
    }
   ```
5. 情景四：默认情况下不接受运行在https上，且使用了无效证书的后端服务器，如果需要接受则需要传入参数secure:false
    ```
   module.exports = {
        devServer: {
            proxy: {
                '/api': {
                    target: 'http://119.3.103.139:8002',
                    secure: false,
                }
            },
        }
    }
   ```
6. 如何解决跨域，需要传入changeOrigin参数，该参数会使得本地虚拟一个服务器接受一个请求并且代理转发该请求。
   ```
   module.exports = {
        devServer: {
            proxy: {
                '/api': {
                    target: 'http://119.3.103.139:8002',
                    secure: false,
                    changeOrigin: true,
                }
            },
        }
    }
   ```


