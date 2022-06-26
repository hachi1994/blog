---
title: 手写代码系列
date: 2021-11-20
tags:
 - JavaScript
categories:
 - JavaScript
---

### 手写代码

#### 六种继承

```javascript
// 基于原型链继承
function SuperType(name){

}
function SubType(){

}
SubType.prototype = new SuperType();

//借用构造函数继承
function SuperType(name){
  this.name = name;
}
function SubType(name,age){
  SuperType.call(this,name);
  this.age = age;
}
//组合式继承
function SuperType(name){
  this.name = name;
}
function SubType(name,age){
  SuperType.call(this,name);
  this.age = age;
}
SubType.prototype = new SuperType();

//原型式继承
function object(obj) {
  function F() { }
  F.prototype = obj;
  return new F();
}
//寄生式继承
function inherit(pbj) {
  let clone = object(obj);
  clone.prototype.sayName = function () {
    console.log(this.name);
  }
  return clone;
}
//寄生式组合继承
function SuperType(n) {
  this.n = n;
}
function SubType(n, a) {
  SuperType.call(this, n);
  this.a = a;
}
function inherit(subType, superType) {
  let prototype = object(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
}
SuperType.prototype.sayName = function () {
  console.log(this.n);
}
inherit(SubType, SuperType);
SubType.prototype.sayAge = function () {
  console.log(this.a);
}
```



#### 节流

```javascript
function throttle(f,w,...args){
    let p = 0;
    return function(){
        let n = Date.now();
        if(n - p >= w){
            f.call(this,...args);
        }
    }
}
```

#### 防抖

```javascript
function debounce(f, w, i, ...args) {
    let t = null;
    return function () {
        if (t) clearTimeout(t);
        if (!t && i) {
            f.call(this, ...args);
        }
        t = setTimeout(() => {
            f.apply(this, args)
        }, w)
    }
}

let q = debounce(function(x){console.log(x)},2000,false,'1');
q();
```

#### 数组扁平化

```javascript
 function flatten(arr: any[]): any[] {
         return arr.reduce((result, currentvalue) => {
             return result.concat(Array.isArray(currentvalue) ? flatten(currentvalue) : currentvalue)
         }, [])
     }
     let arr = flatten([[1, 2, 3], [4, 5, [5.1, 5.2]], 6, 7])
     console.log(arr)
```

#### 数组去重

```javascript
 let singleArr: any[] = [1, 2, 3, 3, 4, 2, 5]
 let objArr: any[] = [{ name: 'lhc', age: 20 }, { name: 'abc', age: 23 }, { name: 'cde', age: 20 }]
 let hasO:object = {}
 let newArr = objArr.reduce((result,current)=>{
     hasO[current.age]?'':hasO[current.age] = true && result.push(current)
     return result
 },[])
 console.log([...new Set(singleArr)],newArr)
```

#### 深拷贝 浅拷贝

```javascript
//浅拷贝
 let o = { name: 1, age: 2 }
 console.log(Object.assign({}, o) === o)
 //深拷贝
 function deep(obj: object) {
     if (typeof obj !== 'object') return
     let newO = Array.isArray(obj) ? [] : {}
     for (const key in obj) {
         if (Object.prototype.hasOwnProperty.call(obj, key)) {
             const element = obj[key];
             newO[key] =  typeof element === 'object' ? deep(element) : element

         }
     }
     return newO
 }
```

#### 手写bind

```javascript
Function.prototype._bind = function (context, ...args1) {
  let _this = this;
  return function (...args2) {
    _this.call(context, ...args1, ...args2)
  }
}
let o = {name:1};
function foc(){
  console.log(this.name);
}
foc._bind(o)();
```

#### 数组去重

考虑减少匹配次数

```javascript
const _deleteRepeat = array => {
  // 补全代码
  let arr = []
  let length = array.length % 2 == 0 ? array.length / 2 : (array.length + 1) / 2;
  for (let i = 0; i < length; i++) {
    if (typeof array[i] === 'number') {
      if (!arr.includes(array[i])) {
        arr.push(array[i])
      }
    }
    if (typeof array[array.length - i] === 'number') {
      if (!arr.includes(array[array.length - i])) {
        arr.push(array[array.length - i]);
      }
    }
  }
  return arr;
}
```

```javascript
const _deleteRepeat = array => {
  return [...new Set(array)]
}
```

#### 使定时器不需要回调

```typescript
let delay = (fn,wait)=> {
  new Promise(r=>{
    setTimeout(r=>{
      f();
    },wait)
  })
}
delay(()=>{
  console.log(1)
},2000);
```

#### 判断是否是数组的几种方法

```javascript
let arr = [];
Array.isArray();
arr instanceof Array;
arr.__proto__.constructor === Array;
Object.prototype.toString.call(arr).slice(8,-1)==='Array'
```

#### reduce实现map

```javascript
Array.prototype._map = function (fn, context) {
  let result = [];
  this.reduce((p, c, i, arr) => {
    result[i] = fn.call(context, arr[i], i, arr)
  }, 0)
  return result;
}

let arr = [1,2,3];
console.log(arr._map((x)=>x*2 ))//[2,4,6]
```





#### 怎么取消Promise 

```javascript
     class CancelToken {
     constructor(cancelFn) {
         this.promise = new Promise((resolve, reject) => {
             cancelFn(() => {
                 setTimeout(console.log, 0, "delay cancelled");
                 resolve();
             });
         });
     }
 }
 const startButton = document.querySelector('#start');
 const cancelButton = document.querySelector('#cancel');

 function cancellableDelayedResolve(delay) {
     setTimeout(console.log, 0, "set delay");
     return new Promise((resolve, reject) => {
         //resolve 部分
         const id = setTimeout((() => {
             setTimeout(console.log, 0, "delayed resolve");
             resolve();
         }), delay);
         
         const cancelToken = new CancelToken((cancelCallback) =>
             cancelButton.addEventListener("click", cancelCallback));
         cancelToken.promise.then(() => clearTimeout(id));
     });
 }
 startButton.addEventListener("click", () => cancellableDelayedResolve(1000));
```

### typeScript版本

```typescript
interface ObjectAndArray {
    [key: string | number]: any,
}
//深拷贝
function deep(object: ObjectAndArray | any[]): (object | any[]) {
    if (!object || typeof object !== 'object') return {}
    let newO = Array.isArray(object) ? [] : {} as ObjectAndArray
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            const element = object[key];
            newO[key] = typeof element === 'object' ? deep(element) : element
        }
    }

    return newO
}
//扁平化
function flatten(nums: any[]): any[] {
    return nums.reduce((r, i) => {
        return r.concat(Array.isArray(i) ? flatten(i) : i)
    }, [])


}
//去重
new Set([1, 2, 3, 3, 4])
let hasO = {} as ObjectAndArray
let arr = [{ a: 1, b: 2 }, { a: 1, b: 3 }, { a: 2, b: 4 }]
let a: any[] = arr.reduce((r, i) => {
    hasO[i.a] ? "" : hasO[i.a] = true && (r as any[]).push(i)
    return r
}, [])
//柯里化
function add<T>(num: T) {
    return function (num2: T) {
        if (typeof num === 'number' && typeof num2 === 'number') {
            return num + num2
        }
    }
}
add<number>(1)(2)
```

