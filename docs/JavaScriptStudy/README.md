---
title: JavaScript高级程序设计学习
date: 2022-05-09
tags:
 - JavaScript
categories:
 - JavaScript
---

# JavaScript高级程序设计学习



## 集合引用类型

### Array

- ECMAScript 数组也是动态大小的，会随着数据添加而 自动增长。

#### 创建数组

```
let a1 = new Array(20)
let a2 = new Array(1,2,3,4,5)
let a3 = Array(20)
let a4 = Array(1,2,3)
let a5 = Array.from([1,2,3])
let a6 = Array.from("1,2,3,4")
let a7 = Array.from(new Map().set(1,2))//[[1,2]]
let a8 = Array.from(new Set().add(1).add(2).add(3).add(Symbol('nihao')))//[ 1, 2, 3, Symbol(nihao) ]
let a9 = Array.from({
    *[Symbol.iterator](){
        yield 1;
        yield 2;
        yield 3;
        yield 4;
    }
})//[1,2,3,4]
//from方法接受第二，第三个参数，分别为针对数组每一项进行的处理的函数，指定处理函数的this值
let a10 = Array.from([1,2,3],function(x){return x*2})//[2,4,6]
let a11 = Array.from([1,2,3],function(x){return this.condition*x},{condition:2})//[2,4,6]
//Array.of()可以把一组参数转换为数组
let a12 = Array.of(1,2,3,4,5)//[1,2,3,4,5]
```

#### 数组空位

ES6中会见数组中的空位认为是存在的元素undefined，ES6之前的数组操作方法普遍会忽略这个空位。

**由于行为不一致和存在性能隐患，因此实践中要避免使用数组空位。如果确实需要 空位，则可以显式地用 undefined 值代替**

#### 数组索引

通过索引访问数组中的元素，如果提供的索引小于数组长度-1，则返回该位置的元素，否则将该数组的长度扩展到该索引+1，若直接设置数组的长度，该长度大于原数组的长度，则数组默认用undefined填充，若长度小于原长度，则直接舍去多出来的元素。

#### 检测数组

```
let a1 = [1,2,3]
a1 instanceof Array
Array.isArray(a1)
```

#### 迭代器方法

ES6中Array原型提供的3个迭代器方法，keys(),values(),entries(),

其中keys()返回数组索引的迭代器，values()返回数组元素的迭代器，entries()返回数组索引/值的键值对对迭代器。

```
let a1 = [1,2,3,4,5]

//key迭代器
let keyI = a1.keys()
let keyResult = keyI.next()
while(!result.done){
    console.log(result.value)
    result = keyI.next()
}//0,1,2,3,4

//value迭代器
let valueI = a1.values()
let valueResult = valueI.next()
while(!valueResult.done){
    console.log(valueResult.value)
    valueResult = valueI.next()
}//1,2,3,4,5

// key/value 迭代器

let keyValueI = a1.entries()
let keyValueResult = keyValueI.next()
while(!keyValueResult.done){
    console.log(keyValueResult.value)
    keyValueResult = keyValueI.next()
}//[ 0, 1 ] [ 1, 2 ] [ 2, 3 ] [ 3, 4 ] [ 4, 5 ]
```

