---
title: ES6学习
date: 2021-10-15
tags:
 - es6
 - js
categories:
 - es6
---

### ES6学习

#### Proxy（代理）

1. 概念：Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。
2. Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。
3. 拦截操作：Proxy一共有13种拦截操作，针对目标为对象有11种，如果目标对象为函数，则还有2种方法。
4. 使用方法：下面13种拦截操作可能会有target（拦截的目标对象），propKey（拦截的属性名），value（设置的属性值），receiver（proxy对象），propDesc（属性描述），proto（设置的原型），args（通过bind，apply，call调用时的传参），ctx（目标对象的上下文对象）这几种参数
   ```
   let handle = {
       //拦截对象的属性读取操作
       get:function(target,propKey,receiver){
           if (propKey in target) {
                return target[propKey];
            } else {
                throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
            }
       },
       //set代理应当返回一个布尔值。严格模式下，set代理如果没有返回true，就会报错。
       set:function(target,propKey,value,receiver){
           target[propKey] = value
           return true
       },
       //apply方法拦截函数的调用、call和apply操作。
       apply:function(target,ctx,args){

       },
       //has()方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。
       //has()方法隐藏某些属性，不被in运算符发现
       has:function (target, key) {
         if (key[0] === '_') {
             return false;
         }
         return key in target;
        },
        //construct()方法用于拦截new命令，下面是拦截对象的写法。target（目标对象），args（构造函数参数数组），newTarget（new命令作用的构造函数）
        //construct()方法返回的必须是一个对象，否则会报错。且必须作用于函数
        //construct()方法中的this指向的是handler，而不是实例对象。
        construct (target, args, newTarget) {
            return new target(...args);
        } ,
        //deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除
        //注意，目标对象自身的不可配置（configurable）的属性，不能被deleteProperty方法删除，否则报错。
        deleteProperty (target, key) {
            invariant(key, 'delete');
            delete target[key];
            return true;
        },
        //defineProperty()方法拦截了Object.defineProperty()操作。
        //这里的false只是用来提示操作失败，本身并不能阻止添加新属性。
        //如果目标对象不可扩展（non-extensible），则defineProperty()不能增加目标对象上不存在的属性，否则会报错。
        //如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty()方法不得改变这两个设置。
        defineProperty (target, key, descriptor) {
            return false;
        },
        //getOwnPropertyDescriptor()方法拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined。
        //handler.getOwnPropertyDescriptor()方法对于第一个字符为下划线的属性名会返回undefined。
        getOwnPropertyDescriptor (target, key) {
            if (key[0] === '_') {
                return;
            }
            return Object.getOwnPropertyDescriptor(target, key);
        },
        //getPrototypeOf()方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。
        //Object.prototype.__proto__
        //Object.prototype.isPrototypeOf()
        //Object.getPrototypeOf()
        //Reflect.getPrototypeOf()
        //instanceof
        //getPrototypeOf()方法的返回值必须是对象或者null，否则报错。另外，如果目标对象不可扩展（non-extensible）， getPrototypeOf()方法必须返回目标对象的原型对象。
        getPrototypeOf(target) {
            return proto;
        },
        //isExtensible()方法拦截Object.isExtensible()操作。
        isExtensible: function(target) {
            console.log("called");
            return true;
        },
        //ownKeys()方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。
        //Object.getOwnPropertyNames()
        //Object.getOwnPropertySymbols()
        //Object.keys()
        //for...in循环
        ownKeys(target) {
            return ['a'];
        },
        //preventExtensions()方法拦截Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动转为布尔值。
        preventExtensions: function(target) {
            return true;
        },
        //setPrototypeOf()方法主要用来拦截Object.setPrototypeOf()方法。
        //该方法只能返回布尔值，否则会被自动转为布尔值。另外，如果目标对象不可扩展（non-extensible），setPrototypeOf()方法不得改变目标对象的原型。
        setPrototypeOf (target, proto) {
            throw new Error('Changing the prototype is forbidden');
        },
        


   }
        //Proxy.revocable()方法返回一个可取消的 Proxy 实例。
        let target = {};
        let handler = {};
        let {proxy, revoke} = Proxy.revocable(target, handler);

        proxy.foo = 123;
        proxy.foo // 123

        revoke();
        revoke();
        proxy.foo // TypeError: Revoked
   ```

#### Reflect
1. Reflect和Proxy一样是es6为了操作对象而提供的新api，作用有：
   1. 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。未来的新方法将只部署在Reflect对象上。
   ```
    let obj = {}
    Reflect.defineProperty(obj,'name',{value:'lhc',writable:true})
   ```
   2. 修改某些Object方法的返回结果，让其变得更合理。
   ```
    //当无法定义属性时老的defineProperty方法会抛出一个错误，新的会返回false
    // 老写法
    try {
    Object.defineProperty(target, property, attributes);
    // success
    } catch (e) {
    // failure
    }

    // 新写法
    if (Reflect.defineProperty(target, property, attributes)) {
    // success
    } else {
    // failure
    }
   ```
   3. 让Object操作都变成函数行为。
   ```
   Reflect.has(obj,'name')//等价于
   name in obj
   ```
   4. Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。
   ```
    //下面的操作通过Proxy修改了obj_1的set操作，是在原有赋值操作不变得前提下增加了日志。确保完成原有的行为，然后再部署额外的功能。
    let obj_1 = new Proxy({},{
        set:function(t,k,v,c){
            Reflect.set(t,k,v,c)
            console.log(t+'set'+ k + 'value is ' + v)
            return true
        }
    })
    obj_1.name = 123// [object Object]setnamevalue is 123
   ```
   4. 有了Reflect对象以后，很多操作会更易读。
   ```
   // 老写法
    Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1

    // 新写法
    Reflect.apply(Math.floor, undefined, [1.75]) // 1
   ```
2. Reflect对象一共有 13 个静态方法一一对应Proxy对象的13个方法
   ```
    Reflect.apply(target, thisArg, args)
    Reflect.construct(target, args)
    Reflect.get(target, name, receiver)
    Reflect.set(target, name, value, receiver)
    Reflect.defineProperty(target, name, desc)
    Reflect.deleteProperty(target, name)
    Reflect.has(target, name)
    Reflect.ownKeys(target)
    Reflect.isExtensible(target)
    Reflect.preventExtensions(target)
    Reflect.getOwnPropertyDescriptor(target, name)
    Reflect.getPrototypeOf(target)
    Reflect.setPrototypeOf(target, prototype)
   ```
3. 实际应用：观察者模式，监控一个对象的属性变化，当变化时自动执行一系列方法。
   ```
    //当属性变化时依次执行的方法队列
    let queue = new Set()
    //将方法加入方法队列
    const observe = fn => queue.add(fn)
    //定义新的对象的拦截操作
    function set(target,propKey,value,receiver){
        //执行默认赋值操作
        const result = Reflect.set(target,propKey,value,receiver)
        //依次执行方法队列中额外的方法
        queue.forEach(fn=>fn())
        return result 
    }
    //使用代理拦截对象的set操作
    const observable = obj => new Proxy(obj,{set})

    //使用
    let o = {name:'123',age:20}
    observe(function(){console.log(o.name,o.age,'set!)})
    observe(function(){console.log(o.name,o.age,'hello!')})
    let proxyO = observable(o)
    proxyO.name = 'wade'// output 'wade 20 set! wade 20 hello!'


   ```


#### Promise

1. Promise.allSettled()
该方法用于确定一组异步操作是否都已结束（不论成功还是失败）。参数为一个数组，每个元素都是一个Promise对象，返回也是一个Promise对象，当每个Promise对象状态都发生改变后，返回的Promise对象的状态才会改变。fulfilled状态表示成功，rejected状态表示失败。
```
function p1(){
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve(1)
        }, 1000);
    })
}
function p2(){
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve(2)
        }, 2000);
    })
}
function p3(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            reject(3)
        }, 3000);
    })
}
Promise.allSettled([p1(),p2(),p3()]).then((res)=>{
    console.log(res,142)
})
//2s后输出[
  { status: 'fulfilled', value: 1 },
  { status: 'fulfilled', value: 2 },
  { status: 'rejected', reason: 3 }
] 142
```
2. Promise.any() ES2021引入
该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。只要参数中任一一个Promise实例状态变为fulfilled，返回的包装实例状态就为fulfilled，如果所有参数实例状态都为rejected，那么返回的包装实例状态就为rejected。
Promise.any()抛出的错误，不是一个一般的 Error 错误对象，而是一个 AggregateError 实例。它相当于一个数组，每个成员对应一个被rejected的操作所抛出的错误。
```
Promise.any([new Promise((r,rj)=>{rj(1)})]).catch((e)=>{console.log(e)})
//AggregateError: All promises were rejected
```
3. Promise.resolve()
```
let thenAble = {
    then(){
        console.log(1)
        console.log('hoho')
    }
}
Promise.resolve(thenAble).then((r)=>console.log(r))//如果传一个thenable对象，则直接执行thenable对象的then方法,输出1 hoho
Promise.resolve().then((r)=>{console.log(r)})//参数为空 返回一个Promise实例
Promise.resolve('hello').then((r)=>{console.log(r)})//参数为一个非Promise对象则直接返回一个Promise对象状态为resolve，输出hello
Promise.resolve(new Promise(r=>r(1))).then(r=>console.log(r))//1 原封不动的返回这个Promise对象
```
4. Promise.reject()
该方法会返回一个Promise实例，状态为rejected
Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。
```
Promise.reject('错了').catch((e)=> {
    throw new Error(e)
})
//UnhandledPromiseRejectionWarning: Error: 错了 
//at D:\code\es6\promise.js:45:11
```

#### ES6 Module

1. ES6 模块自动采用严格模式，有以下限制
       - 变量必须声明后再使用
       - 函数的参数不能有同名属性，否则报错
       - 不能使用with语句
       - 不能对只读属性赋值，否则报错
       - 不能使用前缀 0 表示八进制数，否则报错
       - 不能删除不可删除的属性，否则报错
       - 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
       - eval不会在它的外层作用域引入变量
       - eval和arguments不能被重新赋值
       - arguments不会自动反映函数参数的变化
       - 不能使用arguments.callee
       - 不能使用arguments.caller
       - 禁止this指向全局对象
       - 不能使用fn.caller和fn.arguments获取函数调用的堆栈
       - 增加了保留字（比如protected、static和interface）
2. export
   如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量
    ```
        //1 直接输出变量
        export let name = 1
        //2 输出一组变量
        let age = 20
        let name = 'lhc;
        export {age,name}
        //3 输出函数
        export let foo = (x) => (y) => x + y
        //4 另一种输出函数的方式
        let foo = (x) => (y) => x + y
        export {foo}
        //5 输出类
        export class Person {}
        //6 另一种输出类的方式
        class Person {}
        export {Person}      
        //7 通过as关键字重命名输出的内容
        let a = 1
        let b = 2
        export {
            a as c,
            b as d,
            b as e,
        }

        //8 错误输出，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。以下情况均报错
        export 1//等于直接输出1，并没有与变量建立关系
        let m = 1
        export m//等于直接输出1，并没有与变量建立关系
        
        function foo(){}
        export foo //报错
    ```

    export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
    ```
    //module.js
    let a = 1
    export {a}
    setTimeout(() => {
        a = 4
    }, 2000);

    //demo
    import {a} from './module1.js'
    console.log(a)

    setTimeout(() => {
        console.log(a)
    }, 5000);
    //输出 1 5s后输出4
    ```
2. import
   使用export命令定义了模块的对外接口以后，其他 JS 文件就可以通过import命令加载这个模块。 
   1. 导入时大括号内的名称必须与模块导出时变量的名字一样,可以通过as关键字为重新命名导出的变量。
   ```
   //module.js
   export let name = '123'
   //import.js
   import {name} from './module.js
   import {name as newName} from './module.js
   ```
   2. 不能修改导入的变量，因为它们是只读的。若导入的变量是一个对象，则可以修改其属性，但是不建议这么做。
   ```
   //module.js
   export let name = '123'
   export let o = {
       name:'123'
   }
   //import.js
   import {name,o} from './module.js
   o.name = '234'//合法
   name = '234'// Syntax Error : 'a' is read-only;
   ```
   3. import带有变量提升
   ```
   //module.js
   export let name = '123'
   //import.js
   console.log(name)//123 合法操作
   import {name} from './module.js
   ```
   4. import是静态执行不能使用表达式和变量
   ```
   //module.js
   export let name = '123'
   //import.js
   let moduleName ='./module.js'
   import {name} from moduleName //报错

   import {'na'+'me'} from './module.js //报错
   ```
   5. CommonJS 与 ES6模块最好不要一起使用，即使不会报错。因为import在静态解析阶段执行，会早于require执行，可能会出现非预期结果
   ```
    require('core-js/modules/es6.symbol');
    require('core-js/modules/es6.promise');
    import React from 'React';
   ```
   6. 通过*关键字可以整体加载,不允许运行的时候改变导入的变量
   ```
    //module.js
    let a = 1
    let b = 2
    export { a, b }
    //import.js
    import * as o from './module1.js'
    console.log(o) // {a:1,b:2}

    o.a = 3 //报错 Cannot assign to read only property 'a' of object '[object Module]'
   ```
   7. export default 默认导出，通过export default 导出的模块，导入时可以任意命名。且一个模块只能使用一次export default
   ```
    //module.js
    let a = 1
    let b = 2
    export default {a,b}
    //import.js
    import ab from './module1.js'
    console.log(ab) // {a:1,b:2}

    //module.js
    export default function foo(){} // foo视同匿名函数，foo函数名在模块外无效。
    //import.js
    import fo from './module.js'
   ```
   8. import export 复合使用
   ```
    //module.js
    export {a,b} from './module_1.js'
    //等同于
    import {a,b} from './module_1.js'
    export {a,b}

    //还有以下几种情况
    export {a as aa} from './module_1.js'

    export * from './module_1.js'

    export {default} from './module_1.js'

    export {a as default } from './module_1.js'
    //等同于
    import {a} from './module_1.js'
    export default a

    export {default as a} from './module_1.js'

    export * as a from './module_1.js'
    // 等同于
    import * as a from "mod";
    export {a};
   ```
   9. import()函数，支持动态加载模块。可以在运行时异步加载模块。
   ```
   //直接使用
   import('./testModule.js').then(r=>console.log(r)).catch(e=>console.log('模块加载失败'))
   
   
   //用在async函数中
   async function foc(){
    let o = await import('./testModule.js')
    return o
   }
   foc().then(r => console.log(r))
   
   //用在if语句中，可以直接解构返回的模块
   if(判断){
       import('./testModule.js').then(({a,b}) => console.log(a))
   }
   ```