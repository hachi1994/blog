---
title: umi+React+dva+TypeScript整合项目
date: 2021-12-10
tags:
 - TypeScript
 - React
 - dva
 - umi
categories:
 - 框架
---

#### 创建项目
1. 使用yarn来管理npm依赖，使用create-umi（https://github.com/umijs/create-umi）来创建umi项目。
   ```
   yarn create umi [appName]
   项目目录
     create abc/package.json
     create abc/.gitignore
     create abc/.editorconfig
     create abc/.env
     create abc/.eslintrc
     create abc/.prettierignore
     create abc/.prettierrc
     create abc/.umirc.js
     create abc/mock/.gitkeep
     create abc/src/assets/yay.jpg
     create abc/src/global.css
     create abc/src/layouts/index.css
     create abc/src/layouts/index.tsx
     create abc/src/pages/index.css
     create abc/src/pages/index.tsx
     create abc/tsconfig.json
     create abc/typings.d.ts
   ```
2. 配置文件.umirc.ts
```
 import { IConfig } from 'umi-types';
 // ref: https://umijs.org/config/
 const config: IConfig = {
 treeShaking: true,
 //路由
 routes: [
     {
     path: '/',
     component: '../layouts/index',
     routes: [
         { path: '/', component: '../pages/index' },
         { path: '/uploadImg', component: '../pages/uploadImg/index' }
     ]
     }
 ],
 //代理转发
 proxy: {
     "/api": {
     target: 'http://api.jaelizumi.cn/',
     "changeOrigin": true
     }
 },
 //对webpack进行配置
 chainWebpack(config,{webpack}){
     config.resolve.alias.set('s','/src')
 },
 //配置插件列表
 plugins: [
     // ref: https://umijs.org/plugin/umi-plugin-react.html
     ['umi-plugin-react', {
     antd: true,
     dva: true,
     dynamicImport: false,
     title: 'react_umi',
     dll: false,

     routes: {
         exclude: [
         /components\//,
         ],
     },
     }],
 ],
 }

 export default config;
```

3. 在umi中使用antd
   1. antd可以通过配置来启用，配置.umirc.ts文件中的antd为true,然后在文件中直接导入antd
   ```
    .umirc.ts
     plugins: [
        ['umi-plugin-react', {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'react_umi',
        dll: false,

        routes: {
            exclude: [
            /components\//,
            ],
        },
     }],

     index.tsx
     import { Button, message, Upload } from 'antd'
    ]
   ``` 
4. 在umi中使用dva（https://v2.umijs.org/zh/guide/with-dva.html#model-%E6%B3%A8%E5%86%8C）
   1. 在.umirc.ts 文件中开启dva
   2. 在src文件夹中创建app.js文件，进行dva相关配置。
```
    export const dva = {
        config: {
            onError(e) {
            e.preventDefault();
            console.error(e.message);
            },
        },
        plugins: [
            require('dva-logger')(),
        ],
    };
```
   3. 创建model文件，不需要指定namespace，namespace默认为model的文件名，全局model存在/src/models目录中，page model在对应的page目录中,约定 model.js 为单文件 model，解决只有一个 model 时不需要建 models 目录的问题，有 model.js 则不去找 models/**/*.js
   ```
        + src
        + models
            - g.js
        + pages
            + a
            + models
                - a.js
                - b.js
                + ss
                - s.js
            - page.js
            + c
            - model.js
            + d
                + models
                - d.js
                - page.js
            - page.js
   ```
   4. 在页面中，从dva中引入connect，注入model，并导出组件，可以通过props访问dispatch，state等
   ```
    //model.js
    export default {
        state: {
            name:1,
            age:20
        },

        reducers: {
            'setState'(state, { payload: id }) {
                let qq = 'lhc'
                let o = {
                ...state,
                qq
                };

                return o
            },
        },
    };
    // page/uploadImg/index.tsx
    function App(props: any) {
        function foc(){
            props.dispatch({
                type:'uploadImg/setState'
            })
        }
        let [count, setCount] = useState(1)
        return (
            <div>
                <Button type='primary' onClick={foc}>{count}</Button>
            </div>
        )
    }
    export default connect((uploadImg) => {return {...uploadImg}})(App)
   ```
   5. 当使用单文件model时，引用model中的属性，使用dispatch需要
   ```
    //单文件组件model.js
    const {xx} = props.model
    dispatch({
        type:'model/setState'
    })

    //命名model
    const {xx} = props.modelNamespace
    dispatch({
        type:'modelNamespace/setState'
    })

   ```
