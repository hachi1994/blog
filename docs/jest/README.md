---
layout: post
title: JEST自学
date: 2021-04-20
tags:
 - Jest
 - React
 - Vue
categories:
 - 前端自动化测试
---

0. 测试命令
   ```
   //package.json
   "scripts":{
       "test":"jest --watchAll",//监控测试得文件变化
       "coverage":"jest --coverage"//生成覆盖率文件
   }
   ```
## 1️⃣环境安装

```
npm i jest -D

// 新建业务逻辑文件 game.js
function remove(distance) {
    return distance
}
function  attack(ap) {
    return ap
}
module.exports = {
    remove,attack
}

// 新建测试文件 game.test.js
const { remove, attack } = require('./game')

test('200移动',()=> {
    expect(remove(200)).toBe(200)
})
test('200攻击',()=>{
    expect(attack(200)).toBe(200)
})
```
1. `test` 方法:Jest封装的测试方法，一般填写两个参数，描述和测试方法
2. `expect`方法：预期方法，就是你调用了什么方法，传递了什么参数，得到的预期是什么
3. 修改package.json文件的`test`script为`jest`，`npm run test`,会输出测试结果.
   
## 2️⃣jest基本配置和覆盖率生成

```
//使用命令生成配置文件 jest.config.js
npx jest --init
// 执行命令生成覆盖率文件
npx jest --coverage
```
1. 修改 jest.config.js文件中的coverageDirectory参数可以修改生成的覆盖率报告文件夹名
   
## 3️⃣匹配器 
1. toBe()匹配器，等同于 `===`
   `expect(remove(200)).toBe(200)//true`
   `expect(remove({name:1})).toBe({name:1})//false`
2. toEqual()匹配器，内容相同即可，等同于`==`
   `expect(remove({name:1})).toEqual({name:1})//true`
3. toBeNull()匹配器，只匹配null.,undefined不匹配
   `expect(null).toNull()//true`
4. toBeDefined(),只要定义过了就匹配
   ```
   let a = 1;
   expect(a).toBeDefined()//true
   ```
5. toBeTruthy(),判断是否是真的
   `expect(0).toBeTruthy()//false`
   `expect(1).toBeTruthy()//true`
6. toBeFalsy(),判断是否是假的
   `expect(0).toBeFalsy()//true`
   `expect(1).toBeFalsy()//false`
7. toBeGreaterThan(),判断当前值是否大于传入值
   ```
   expect(10).toBeGreaterThan(9)//true
   ```
8. toBeLessThan(),判断当前值是否小于传入值
   ```
    expect(10).toBeLessThan(9)//false
   ```
9. toBeGreaterThanOrEqual(),判断当前值是否大于等于传入值
    ```
    expect(9).toBeGreaterThanOrEqual(9)//true
    expect(10).toBeGreaterThanOrEqual(9)//true
    ```
10. toBeLessThanOrEqual(),判断当前值是否小于等于传入值
    ```
    expect(9).toBeLessThanOrEqual(9)//true
    expect(8).toBeLessThanOrEqual(9)//true
    ```
11. toBeCloseTo(),用于消除JavaScript中浮点数算数得错误
    ```
    expect(0.1+0.2).toEqual(0.3)//false 应当为0.30000000000000004
    expect(0.1+0.2).toCloseTo(0.3)//true
    ```
12. toMatch(),字符串匹配
    ```
    expect('acgddddd').toMatch('gd')//true
    expect('acgddddd').toMatch('gdx')//false
    ```
13. toContain(),匹配数组或Set是否包含。
    ```
    expect([1,2,3]).toContain(1)//true
    expect([1,2,3]).toContain(4)//false
    ```
14. toThrow(),可以检测一个方法会不会抛出异常
    ```
    function throwE(){
        throw new Error('错误')
    }
    expect(throwE).toThrow()//true
    expect(throwE).toThrow('abc')//false
    ```
15. not匹配器，用于取反
    ```
    expect([1,2,3,4]).not.toContain(5)//不包含5，返回true
    function throwE(){
        return 123;
    }
    expect(throwE).not.toThrow()//true
    ```
## 4️⃣使jest支持import和ES6语法
1. 安装bebel转换器
```
npm install @babel/core@7.4.5 @babel/preset-env@7.4.5 -D

```
2. 新建.文件bebelrc
   ```
   //.babelrc
   {
       "presets":[
           [
               "@bebel/preset-env",{
                "targets":{
                    "node":"current"
                }
               }
           ]
       ]
   }
   ``` 
3. 修改game.test.js文件,再次执行npm run test
   ```
   import {remove,attack} from './game'
   ```
##  5️⃣异步代码测试
1. 新建异步请求逻辑文件
   <div style='font-weight:normal;color:red'>需要先修改jest.config.js文件中的testEnvironment配置项为node</div>

   ```
   npm i --save-d axios
   //fetchData.js
   import axios from 'axios'
   export const  fetchData = (fn) => {
        axios.get('http://120.55.162.212:3000/userList').then((response)=>{
            fn(response.data)
        })
   }
   ```
2. 新建测试文件
   <div style='font-weight:normal;color:red'>需要加done方法使得可以在请求结束进行测试，否则该测试永远会通过.</div>

   ```
   //fetchData.test.js
    import { fetchData } from './fetchData'
    test('测试请求数据', (done) => {
        fetchData((data) => {
            console.log(data)
            expect(data).toEqual('hellworld')
            done()
        })
        
    })
   ```
3. 直接返回promise对象的测试例子
   <div style='font-weight:normal;color:red'>需要注意test方法中需要使用return才能测试成功</div>

   ```
    //fetchData.js文件中新增
    import { fetchData, fetchTwoData } from './fetchData'
    export const fetchTwoData = () => {
       return axios.get('http://120.55.162.212:3000/userList')
    }
    //fetchData.test.js中新增
    test('测试直接返回promuse',()=>{
        return fetchTwoData().then((response)=>{
            console.log(response.data)
            expect(response.data).toEqual('helloworld')

        })
    })  
   ```
4. 测试接口返回不正常的情况
   <div style='font-weight:normal;color:red'>需要注意使用expect.assertions(1)断言使得必须执行一次expect才能通过测试</div>
   
   ```
   //fetchData.js新增
    import { fetchData, fetchTwoData,fetchError } from './fetchData'
    export const fetchThreeData = ()=>{
        return axios.get('http://120.55.162.212:3000/userList_error)
    }
   //fetchData.test.js新增
   test('测试错误',()=>{
        expect.assertions(1)
        return fetchError().catch((e)=>{
            console.log(e.toString())
            expect(e.toString().indexOf('404')>-1).toBe(true)
        })
   })
   ```
5. async...await...形式进行测试
   ```
   //fetchData.js新增
   import { fetchData, fetchTwoData, fetchError, fetchAsyncWaitData } from './fetchData'
    export const fetchAsyncWaitData = () => {
        return axios.get('http://120.55.162.212:3000/userList')
    }
   //fetchData.test.js新增
    test('测试async await形式', async () => {
        let response = await fetchAsyncWaitData()
        console.log(response.data)
        expect(response.data).toEqual('helloworld')
    })
   ```
##  6️⃣Jest中四个钩子函数
1. 新建player.js
   ```
   export default class Player {
        name(name){
            this.name = name?name:'lhc'
        }
        yearsOld(yearsOld){
            this.yearsOld = '我的年龄'+yearsOld?yearsOld:20
        }
        operate(operate){
            this.operate = '我的操作'+operate?operate:'无操作'
            this.info = this.name + this.yearsOld + this.operate
        }
    }
   ``` 

2. 新建player.test.js文件
   ```
    import Player from './player'
    const player = new Player()
    beforeAll(()=>{
        console.log('刚来')
    })
    afterAll(()=>{
        console.log('完事')
    })
    beforeEach(()=>{
        console.log('每个')
    })
    afterEach(()=>{
        console.log('每个1')
    })
    test('测试新建运动员',()=>{
        player.name('wade')
        player.yearsOld(20)
        player.operate('attack')
        expect(player.info).toEqual('wade20attack')
    })
   ```
3. beforeAll()
   beforeAll()钩子函数的意思是在所有测试用例之前进行执行。
4. afterAll()
   afterAll()钩子函数是在完成所有测试用例之后才执行的函数。
5. beforeEach()
   beforeEach()钩子函数，是在每个测试用例前都会执行一次的钩子函数。
6. afterEach()
   afterEach()钩子函数，是在每次测试用例完成测试之后执行一次的钩子函数
##  7️⃣测试用例分组
1. 使用describe(),可以对多个测试用例进行分组
   ```
     //newplayer.js
     export default class NewPlayer {
        name(name){
            this.name = name
        }
    }
    //player.test.js
    import Player from './player'
    import NewPlayer from './newPlayer'
    const player = new Player()
    const newPlayer = new NewPlayer()
    describe('测试老运动员',()=>{
        test('测试新建运动员',()=>{
            player.name('wade')
            player.yearsOld(20)
            player.operate('attack')
            console.log(2)
            expect(player.info).toEqual('wade20attack')
        })
    })
    describe('测试新运动员',()=>{
        test('测试新的运动员',()=>{
            console.log(1)
            newPlayer.name('lhc')
            expect(newPlayer.name).toEqual('lhc1')
        })
    })
   ```

8️⃣钩子函数作用域
1. 钩子函数在父级可以作用域子域
2. 同级的钩子函数互不干扰
3. 先执行外部的钩子函数
   ```
    describe('父级', () => {
        beforeAll(() => {
            console.log('父级执行了！')
        })
        expect(1).toEqual(1)
        describe('测试老运动员', () => {
            beforeAll(() => {
                console.log("子级执行了")
            })
            test('测试新建运动员', () => {
                player.name('wade')
                player.yearsOld(20)
                player.operate('attack')
                expect(player.info).toEqual('wade20attack')
            })
        })
        describe('测试新运动员', () => {
            beforeAll(() => {
                console.log("子级执行了1")
            })
            test('测试新的运动员', () => {
                newPlayer.name('lhc')
                expect(newPlayer.name).toEqual('lhc')
            })
        })
    })
    //输出结果 
    //父级执行了，子级执行了，子级执行了
   ```