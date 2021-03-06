---
title: JavaScript高级程序设计学习
date: 2022-05-09
tags:
 - JavaScript
categories:
 - JavaScript
---

# JavaScript高级程序设计100学习



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

#### 复制和填充方法

##### fill()

用于向数组填充元素，三个参数，第一个参数填充元素，第二个起始索引，第三个结束索引，**填充不包含结束索引**，如果索引为负数，则表示从数组尾算起。

fill()默认忽略超出范围的索引，0长度情况，反方向情况。

```
const a = [0,0,0,0,0,0]

a.fill(1,-2,-1)//[0,0,0,0,1,0]
a.fill(1,10,20)//[0,0,0,0,0,0]
```

##### copyWithIn

copyWithIn从指定位置开始浅复制内容，插入到开始位置，索引原则和fill一致,忽略原则和fill一致

```
const a = [0,1,2,3,4,5,6]
a.copyWithin(1,4,5);/浅复制索引为4到索引为5的元素，从1索引位置开始插入。
console.log(a)//0,4,2,3,4,5,6
```

#### 转换方法

数组的转换，是对数组的每一个元素调用其toString(),toLocalString(),valueOf()方法，valueOf() 返回的还是数组本身。而 toString()返回由数组中每个值的等效字符串拼接而成的一个逗号分隔的 字符串。

**数组的toLocaleString()默认调用数组每一个元素的toLocaleString()，toString()调用每个元素的toString()。**

**join()默认调用toString()**

```
const a = [{ toLocaleString: () => { return 'loaclString1' }, toString: () => { return 'toString1' } }, { toLocaleString: () => { return 'loaclString2' }, toString: () => { return 'toString2' } }]
console.log(a.toLocaleString())//loaclString1,loaclString2
console.log(a.toString())//toString1,toString2
console.log(a.join("|"))//toString1|toString2
```

#### 栈方法

##### push()推入，pop()弹出

栈方法对应后进先出，push从数组尾部插入任意元素，返回新的长度。pop用于从尾部删除一项，返回删除的项。

#### 队列方法

##### shift(),push()

用于从尾部插入元素，从头部取出元素，后进后出。shift()从数组头部取出一项，并返回该项，然后长度-1

#### unshift()

用于从头部插入元素，返回插入元素后的数组长度。

#### 排序方法

##### reverse()

对数组进行方向排序

##### sort()

默认对数组进行升序排序，但是是对数组每一项调用String()，所以数值排序是不准的。

接受一个函数作为参数，接受2个参数，为前一个值和后一个值，若前值在后值前则返回-1,若前值在后值后则返回1，相等则返回0；

```
const a = [2,1,4,7,3,9,8]
a.sort(function(v1,v2){
	if(v1<v2){
		return -1
	}else if(v1>v2){
		return 1
	}else {
		return 0 
	}
})
```

#### 操作方法

**concat**()方法可以在现有数组全部元素基础上创建一个新的数组。它首先会创建一个当前数组的副本，然后再把它的参数添加到副本末尾，最后返回这个新构建的数组。如果参数是一个或多个数组，**concat**()会把数组的每一项添加到结果数组。

slice()方法则用于创建一个包含原数组一个或多个元素的新数组，不影响老数组，接受两个参数，起始索引和结束索引，传一个参数，则返回该索引开始到数组末尾的元素，如果两个参数则返回开始索引到结束索引之间的元素。

splice()方法会改变原数组，用于在数组中间插入元素，有删除，替换，插入三种用法。接受三个参数，分别是起始索引，要删除的元素，要操作的元素。

```
const a = [0,1,2,3,4,5,6]

//从0开始删除1项
let removeItem = a.splice(0,1);
console.log(a,removeItem)//[ 1, 2, 3, 4, 5, 6 ] [ 0 ]
//从1开始，插入3项
removeItem =  a.splice(1,0,9,9,9);
console.log(a,removeItem)//[1, 9, 9, 9, 2,3, 4, 5, 6] []
//从1开始替换一项为20
removeItem = a.splice(1,1,20)
console.log(a,removeItem)//[ 1, 20, 9, 9, 2,3,  4, 5, 6 ] [ 9 ]
```

#### 搜索和位置方法

##### 严格相等

indexOf(),lastIndexOf(),includes()，均接受两个参数，要搜索的元素和搜索起始位置。

##### 断言函数

find(),findIndex(),允许按照定义的断言进行搜索，每个元素都会执行这个函数。函数接受3个参数，元素、索引、数组本身，函数返回true则表示匹配。find()返回第一个匹配的元素，findIndex(),返回第一个匹配元素的索引.find(),findIndex()接受第二个参数,用于指定断言中的this.

```
const a = [0, 1, 2, 3, 4, 5, 6]
let result =  a.find(function(v, i, a){
    return v < this.condition
}, { condition: 1 })//0

```

#### 迭代方法

以下方法均不改变原数组

- every()对数组每一项执行传入的函数,每一项执行函数都返回true,则这个方法返回true
- filter()对数组每一项执行传入的函数,返回true的项组成数组最后返回.
- forEach()对数组的每一项都执行传入的函数.
- map()对数组的每一项都执行传入的函数,返回由传入函数调用结果组成的数组
- some()对数组对数组每一项执行传入的函数,有一项返回true,则这个方法返回true



#### 归并方法

reduce(),reduceRight()方法,会迭代数组每一项,并在此基础上构建一个最终返回值.reduce从第一项开始到末尾,reduceRight从末尾开始到第一项.

两个方法均接受两个参数,分别是一个归并函数,和可选的以之为七点初始值.

归并函数接受四个参数,上一个归并值,当前值,当前索引,数组本身.若不传第二个参数,则归并会从数组第二项开始,若传了第二个参数,则传的参数作为第一项,数组的第一项作为第二项.

```
const a = [0, 1, 2, 3, 4, 5, 6]

let result = a.reduce((p,c,i,a)=>{
    return p+c;
},10)
let result1 =  a.reduce((p,c,i,a)=>{
    return p+c;
})
let result2 =  a.reduceRight((p,c,i,a)=>{
    return p+c;
})
console.log(result)//10+0+1+2+3+4+5+6
console.log(result1)//0+1+2+3+4+5+6
console.log(result2)//6+5+4+3+2+1+0
```

### Map

- 初始化new Map(可迭代对象,需为键值对形式)
- api,set会返回映射实例,所以可以链式操作.

```
let m = new Map([
    ["name", "lhc"],
    ["age", 20]
])
let m1 = new Map({
    [Symbol.iterator]: function* () {
        yield ["name", "lhc"];
        yield ["age", 20]
    }
})
const m1Name = m1.get("name")

console.log(m)//Map(2) { 'name' => 'lhc', 'age' => 20 }
console.log(m1)//Map(2) { 'name' => 'lhc', 'age' => 20}
console.log(m1Name)//lhc
m1.set('male', 'male')
console.log(m1)//Map(3) { 'name' => 'lhc', 'age' => 20, 'male' => 'male' }

m1.delete("name")
console.log(m1)//Map(2) { 'age' => 20, 'male' => 'male' }

console.log(m1.has("name"),m1.has("age"),m1.size)//false,true,2

m1.clear()
console.log(m1)//Map(0) {}
m1.set("name","lhc").set("age",20)

let objKey = {}
let objVal = {}
let arrKey = []
let arrVal = []
let m2 = new Map()
m2.set(objKey,objVal)
m2.set(arrKey,arrVal)

objKey.fo = "fo"
objVal.va = "val"
arrKey.push(1)
arrVal.push(2)

console.log(m2.get(objKey),m2.get(arrKey))//{ va: 'val' } [ 2 ]
```

- Map 可以使用任何 JavaScript 数据类型作为 键。

- Map的迭代是顺序的

  map的entries返回这个map的迭代器,通过for of 可以遍历出map的每一项键值对.

  forEach则通过回调的形式遍历

  ```
  let objKey = {}
  let objVal = {}
  let arrKey = []
  let arrVal = []
  let m2 = new Map()
  m2.set(objKey,objVal)
  m2.set(arrKey,arrVal)
  
  objKey.fo = "fo"
  objVal.va = "val"
  arrKey.push(1)
  arrVal.push(2)
  
  for (const iterator of m2.entries()) {
      console.log(iterator)
      //[ { fo: 'fo' }, { va: 'val' } ]
      //[ [ 1 ], [ 2 ] ]        
  }
  
  m2.forEach((value,key)=>{
      console.log(value,'-----',key)
      //{ va: 'val' } ----- { fo: 'fo' }
      //[ 2 ] ----- [ 1 ]       
  })
  ```

- keys(),values()则返回map的键和值得迭代器.

#### Map还是Object?

- 删除操作Map的delete会比Object的delete性能高.



## 集合引用类型

在 ECMAScript 中，这意味着必须暴露一个属性作为“默认迭代器”，而 且这个属性必须使用特殊的 Symbol.iterator 作为键。这个默认迭代器属性必须引用一个迭代器工厂 函数，调用这个工厂函数必须返回一个新迭代器

- 字符串
- 数组
- 映射
- 集合
- arguments对象
- NodeList等DOM集合

以上都实现了Iterable接口

### 检测默认迭代器是否存在

```
let obj = {}
let num = 1;
console.log(num[Symbol.iterator])//undefined
console.log(obj[Symbol.iterator])//undefined
```

### 生成器

生成器的形式是一个函数，函数名称前面加一个星号（*）表示它是一个生成器。只要是可以定义 函数的地方，就可以定义生成器。

**箭头函数不能用来定义生成器函数。**

生成器函数只会在初次调用 next()方法后开始执行

通过 yield 中断执行

return会使得生成器函数处于done状态

```
function *g(n){
    while(n--){
        yield;
    }
}

let ge = g(20)
for (const iterator of ge) {
    console.log('foo')
}
```

yield 关键字还可以作为函数的中间参数使用。上一次让 生成器函数暂停的 yield 关键字会接收到传给 next()方法的第一个值

即第一次调用next()传入的参数不会返回,因为这次是为了开始执行迭代器,会返回默认的yield的值.

```
function *g(itial){
    console.log(itial)
    console.log(yield)
}
let ge = g('初始值')
ge.next('第一次')//初始值
ge.next('第二次')//第二次
```

利用生成器生成数组

```
function *g(length){
    while(length--){
        yield length;
    }
}
console.log(Array.from(g(20)))
//[19, 18, 17, 16, 15, 14, 13,12, 11, 10,  9,  8,  7,  6, 5,  4,  3,  2,  1,  0]
```

#### 提前终止迭代器

一个实现 Iterator 接口的对象一定有 next() 方法，还有一个可选的 return()方法用于提前终止迭代器。生成器对象除了有这两个方法，还有第三 个方法：throw()。

- return()方法会强制生成器进入关闭状态。提供给 return()方法的值，就是终止迭代器对象的值：

  ```
  console.log(g().return(20))//{ value: 20, done: true }
  ```

- throw()方法会在暂停的时候将一个提供的错误注入到生成器对象中。如果错误未被处理，生成器 就会关闭

  不过，假如生成器函数内部处理了这个错误，那么生成器就不会关闭，而且还可以恢复执行。错误 处理会跳过对应的 yield，因此在这个例子中会跳过一个值

  **如果生成器对象还没有开始执行，那么调用 throw()抛出的错误不会在函数内部被捕获，因为这相当于在函数块外部抛出了错误。**

  ```
  function* generatorFn() {
      for (const x of [1, 2, 3]) {
          try {
              yield x;
          } catch (e) { }
      }
  }
  const g = generatorFn();
  console.log(g.next()); // { done: false, value: 1}
  g.throw('foo');
  console.log(g.next()); // { done: false, value: 3} 
  ```

  

  

  ### 总结

  迭代是一种所有编程语言中都可以看到的模式。ECMAScript 6 正式支持迭代模式并引入了两个新的 语言特性：迭代器和生成器。 迭代器是一个可以由任意对象实现的接口，支持连续获取对象产出的每一个值。任何实现 Iterable 接口的对象都有一个 Symbol.iterator 属性，这个属性引用默认迭代器。默认迭代器就像一个迭代器 工厂，也就是一个函数，调用之后会产生一个实现 Iterator 接口的对象。 迭代器必须通过连续调用 next()方法才能连续取得值，这个方法返回一个 IteratorObject。这 个对象包含一个 done 属性和一个 value 属性。前者是一个布尔值，表示是否还有更多值可以访问；后 者包含迭代器返回的当前值。这个接口可以通过手动反复调用 next()方法来消费，也可以通过原生消 费者，比如 for-of 循环来自动消费。 生成器是一种特殊的函数，调用之后会返回一个生成器对象。生成器对象实现了 Iterable 接口， 因此可用在任何消费可迭代对象的地方。生成器的独特之处在于支持 yield 关键字，这个关键字能够 暂停执行生成器函数。使用 yield 关键字还可以通过 next()方法接收输入和产生输出。在加上星号之 后，yield 关键字可以将跟在它后面的可迭代对象序列化为一连串值。

## 对象、类与面向对象编程 



### 属性的类型

#### Object.defineProperty()定义对象的一个属性

- Configurable 描述该属性是否可以通过delete操作符删除
- Enumerable 描述该属性是否可以被for in 遍历处理
- writable 描述该属性是否可修改
- value 表示该属性的实际值

```
let o = {}
Object.defineProperty(o,'name',{
    value:'aaa',
    'writable':true,    //无法被修改
    'configurable':false,   //无法被删除
    'enumerable':false  //无法被for in遍历
})

for (const key in o) {
    if (Object.hasOwnProperty.call(o, key)) {
        const element = o[key];
        console.log(key)
        console.log(element)
    }
}
```

#### 访问器属性 getter和setter

- Configurable 描述该属性是否可以通过delete操作符删除
- Enumerable 描述该属性是否可以被for in 遍历处理
- Get 获取函数，在读取属性时调用。默认值为 undefined。
- Set 设置函数，在写入属性时调用。默认值为 undefined。

```
let o = {
    name_:'lhc'
}
Object.defineProperty(o, 'name', {
    'get': function () {
        console.log('获取值!',this)
        return this.name_;
    },
    'set': function (v) {
        this.name_ = "设置的" + v;
    }
})
o.name = 'james'
console.log(o.name_)
```

#### 定义多个属性 Object.defineProperties()

### 对象相等判断

Object.is()

```
console.log(Object.is(0,-0)) // false
let a = {n:1}
let b = a
console.log(Object.is(a,b))//true
```

### 对象解构

用新变量名解构

```
let o = {name:'c',age:20}
let {name:n,age:a} = o
console.log(n,a)//c,20
```

解构可以设置默认值,同时和别名一起使用

```
let o = {name:'c',age:20}
let {name:n,age:a,male:m ='male'} = o
console.log(n,a,m)//c,20,male
```

null和undefined不能被解构

嵌套解构

```
let o = {
    oo:{
        age:20
    }
}
let {oo:{age:aa,name:n='lhc'}} = o
console.log(aa,n)//20 lhc
```

### 创建对象

#### 构造函数模式

```
function Person(name,age){
    this.name = name;
    this.age = age;
    this.sayName = function(){
        console.log(this.name)
    }
}
let p = new Person('lhc',20)
p.sayName()
```

构造函数创建对象过程

(1) 在内存中创建一个新对象。 

(2) 这个新对象内部的[[Prototype]]特性被赋值为构造函数的 prototype 属性。

(3) 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）。 

(4) 执行构造函数内部的代码（给新对象添加属性）。

 (5) 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。

- 如果不使用new 操作符调用构造函数,那么属性和方法会添加到global对象中,在浏览器中默认是window

#### 原型模式

```
function Person(){}
Person.prototype.name = 'lhc'
Person.prototype.say = function(){
    console.log(this.name)
}
let p1 = new Person()
let p2 = new Person()
console.log(p1.name,p2.name)//lhc lhc
```

##### 原型

创建一个函数时,会为这个函数创建一个prototype属性,指向其原型对象,原型对象获得一个constructor属性,<span style='color:red;'>**指回**</span>与其关联额构造函数.

```
function Person(){}
console.log(Person.prototype.constructor)//[Function: Person]
```

自定义构造函数时,只会获得constructor属性,其他方法均继承自Object,通过构造函数创建的实例,会获得一个双下划线proto属性,指向其原型.

```
function Person(){}
Person.prototype.name = 'lhc'
Person.prototype.say = function(){
    console.log(this.name)
}
let p1 = new Person()
console.log(p1.__proto__)//{ name: 'lhc', say: [Function (anonymous)] }
```

原型链的会终止与Object.prototype

```
function Person(){}
console.log(Person.prototype.__proto__ === Object.prototype)
```

##### 原型层级

实例上的属性和方法会遮住原型上的属性和方法,访问实例的属性和方法时会现在实例中搜索,如果搜索到了就直接返回,不会继续搜索,如果没有搜索到那么就去实例的原型对象上搜索.

delete操作符可以解除遮盖.

```
function Person(){}
Person.prototype.name = 'lhc'
Person.prototype.say = function(){
    console.log(this.name)
}
let p1 = new Person()
p1.name = 'aaa'
console.log(p1.name)//aaa
delete p1.name
console.log(p1.name)//lhc
```

<p style='color:red;font-weight:800;'>hasOwnProperty()方法用于确定某个属性是在实例上还是在原型对象上。</p>

```JavaScript
function Person(){}
Person.prototype.name = 'lhc'
let p1 = new Person()
p1.name = 'aaa'
console.log(Reflect.hasOwnProperty.apply(p1,['name']))//true
delete p1.name
console.log(Reflect.hasOwnProperty.call(p1,'name'))//false
```

**原型和in操作符**

in操作符会在可以通过对象访问指定属性时返回true,无论是在对象本身或原型上.

**要获得对象上所有可枚举的实例属性，可以使用 Object.keys()方法。这个方法接收一个对象作 为参数，返回包含该对象所有可枚举属性名称的字符串数组**

#### 对象迭代

为了能按顺序迭代出对象,ES6提供了Object.values() Object.entries()方法

Object.values() 返回对象值的数组，Object.entries()返回键/值对的数组。

```
let o = {
    name:'lhc',
    age:20
}
let vEntries = Object.values(o)
let kEntries = Object.entries(o)
kEntries.forEach((e,i)=>{
    console.log(e)
})[ 'name', 'lhc' ] [ 'age', 20 ]
vEntries.forEach((e)=>{console.log(e)})//lhc 20
```

#### 原型的问题

原型真正的问题 来自包含引用值的属性。原型上的引用类型的属性会在所有实例中共享,通过一个实例修改了这个引用类型的值,所有的实例该属性都会被修改..

### 继承

#### 基于原型链的继承

基于原型链的继承的问题,原型上的引用属性会被多个实例所共享,修改一个实例的该属性会导致其他实例的该属性一起被修改.

```
function Super(){
    this.name = 'super'
    this.colors = ['red','green','blue']
}
function Sub(){

}
Sub.prototype = new Super()

let sub1 = new Sub()
let sub2 = new Sub()
console.log(sub1.name)//super

sub1.colors.push('black')
console.log(sub1.colors,sub2.colors)//[ 'red', 'green', 'blue', 'black' ] [ 'red', 'green', 'blue', 'black' ]

```

#### 借用构造函数进行继承

原理:在子类的构造函数中调用父类构造函数,使用 apply()和 call()方法以新创建的对象为上下文执行构造函数.

<p style='color:green;'>优点:可以传递参数</p>

```
function Super(name){
    this.name = name
    this.colors = ['red','green','blue']
}
function Sub(name){
    Super.call(this,name)
}
let sub1 = new Sub('sub')
console.log(sub1.name)//sub
```

<p style='color:red;'>问题:必须在构造函数中定义方法，因此函数不能重用。此外，子类也不能访问父类原型上定义的方法，因此所有类型只能使用构造函数模
式.</p>


#### 组合继承

组合继承（有时候也叫伪经典继承）综合了原型链和盗用构造函数，将两者的优点集中了起来.

```
function Super(name){
    this.name = name
    this.sayMyName = function(){
        console.log(this.name)
    }
}
//继承了属性
function Sub(name){
    Super.call(this,name)
}
//继承了方法
Sub.prototype = new Super()
let sub1 = new Sub('sub')
console.log(sub1.name)//sub
sub1.sayMyName()//sub
```

<p style='color:green;font-weight:700;'>组合继承弥补了原型链和盗用构造函数的不足，是 JavaScript 中使用最多的继承模式。而且组合继 承也保留了 instanceof 操作符和 isPrototypeOf()方法识别合成对象的能力。</p>

#### 原型式继承

适用情况:你有一个对象，想在它的基础上再创建一个新对象。

```
let originO = {
    name:'lhc',
    age:20,
    cars:['benz']
}
function object(o){
    function F(){}
    F.prototype = o
    return new F()
}
let sub1 = object(originO)
sub1.name = 'james'
sub1.age = 34;
sub1.cars.push('bmw')


let sub2 = object(originO)
sub2.name = 'wade'
sub2.age = 37
sub2.cars.push('linken')
console.log(sub1,sub2,originO.cars)//{ name: 'james', age: 34 } { name: 'wade', age: 37 } [ 'benz', 'bmw', 'linken' ]
```

原型式继承非常适合不需要单独创建构造函数，但仍然需要在对象间共享信息的场合。但要记住， 属性中包含的引用值始终会在相关对象间共享，跟使用原型模式是一样的。

ECMAScript 5 通过增加 Object.create()方法将原型式继承的概念规范化了.

Object.create()的第二个参数与 Object.defineProperties()的第二个参数一样：每个新增 属性都通过各自的描述符来描述。以这种方式添加的属性会遮蔽原型对象上的同名属性。

```
let originO = {
    name:'lhc',
    age:20,
    cars:['benz']
}

let newO = Object.create(originO,{
    name:{
        value:'wade'
    }
})
console.log(newO.name)//wade
```

#### 寄生式继承

寄生式继承背后的思路类似于寄生构造函数和工厂模式：创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象

```
function object(o){
    function F(){}
    F.prototype = o
    return new F()
}

function createAnotherObject(obj){
    let clone = object(obj)
    clone.say = function(){
        console.log('hi')
    }
    return clone
}

let person = {
    name:'lhc',
    age:20
}
let clone = createAnotherObject(person)
clone.say()//hi
```

这个例子基于 person 对象返回了一个新对象。新返回的 anotherPerson 对象具有 person 的所有属性和方法，还有一个新方法叫 sayHi()。 寄生式继承同样适合主要关注对象，而不在乎类型和构造函数的场景。object()函数不是寄生式 继承所必需的，任何返回新对象的函数都可以在这里使用。

<span style='color:red'>通过寄生式继承给对象添加函数会导致函数难以重用，与构造函数模式类似。</span>

#### 寄生式组合继承

组合继承其实也存在效率问题。最主要的效率问题就是父类构造函数始终会被调用两次：一次在是 创建子类原型时调用，另一次是在子类构造函数中调用。本质上，子类原型最终是要包含超类对象的所 有实例属性，子类构造函数只要在执行时重写自己的原型就行了。

寄生式组合继承通过盗用构造函数继承属性，但使用混合式原型链继承方法。基本思路是不通过调 用父类构造函数给子类原型赋值，而是取得父类原型的一个副本

```
function object(o){
    function F(){}
    F.prototype = o
    return new F()
}

function inheritPrototype(subType,superType){
    let prototype = object(superType.prototype)//创建父对象原型的副本
    prototype.constructor = subType//对该父对象原型的副本进行增强，避免重写原型后导致的constructor丢失
    subType.prototype = prototype//赋值对象
}

function SuperType(name){
    this.name = name
    
}
SuperType.prototype.say = function(){
    console.log(this.name)
}

function Subtype(age,name){
    this.age = age
    SuperType.call(this,name)
}
inheritPrototype(Subtype,SuperType)

Subtype.prototype.sayAge = function(){
    console.log(this.age)
}
let sub = new Subtype(20,'lhc')
sub.say()//lhc
sub.sayAge()//20
console.log(sub.__proto__.constructor === Subtype)//true
```

### 类

#### 创建类

**函数声明可以提升，但类定义不能**

**函数受函数作用域限制**，而类受块作用域限制

1. 类声明

2. 函数表达式

   ```
   console.log(SuperType)//ReferenceError: Cannot access 'SuperType' before initialization
   class SuperType{
   
   }
   let Subtype = class {
   
   }
   
   {
   	class BlockClass {
   	
   	}
   }
   console.log(BlockClass)//ReferenceError: BlockClass is not defined
   ```

#### 类的构成

**类表达式的名称是可选的。在把类表达式赋值给变量后，可以通过 name 属性取得类表达式的名称 字符串。但不能在类表达式作用域外部访问这个标识符**

```
let Subtype = class SubTypeClass {
    sayName(){
        console.log(Subtype.name,SubTypeClass.name)
    }
}
let s = new Subtype()
s.sayName()//SubTypeClass SubTypeClass
console.log(SubTypeClass)//ReferenceError: SubTypeClass is not defined
```

#### 实例化

类的实例化分为5个步骤

1. 在内存中创建一个新对象。
2. 这个新对象内部的[[Prototype]]指针被赋值为构造函数的 prototype 属性
3. 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）
4. 执行构造函数内部的代码（给新对象添加属性）。
5. 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。

**默认情况下，类构造函数会在执行之后返回 this 对象。构造函数返回的对象会被用作实例化的对 象，如果没有什么引用新创建的 this 对象，那么这个对象会被销毁。**

```
class Person {
    constructor(override){
        this.name = 'person'
        if(override){
            return {
                name:'override'
            }
        }
    }
}
let p1 = new Person()
let p2 = new Person(true)
console.log(p1 instanceof Person)//true
console.log(p2 instanceof Person)//false
```

#### 类是特殊的函数

类有prototype属性，这个原型的constructor指向这个类本身

```
class Person {
    constructor(override){
        this.name = 'person'
        if(override){
            return {
                name:'override'
            }
        }
    }
}

console.log(Person.prototype)//{}
console.log(Person === Person.prototype.constructor)//true
```

**当使用类创建一个实例时，该实例的将默认使用该类当成构造函数，而不是调用类中的constructor，所以实例不是**

**Person.constructor 的实例，而是类的实例，**

**当直接使用类的构造函数实例化时，该实例就是该构造函数的实例**

```javascript
class Person {
    constructor(override) {
        this.name = 'person'
        if (override) {
            return {
                name: 'override'
            }
        }
    }
}

let p = new Person()
let p1 = new Person.constructor()
console.log(p.constructor === Person, p instanceof Person, p instanceof Person.constructor)//true true false
console.log(p1.constructor === Person, p1 instanceof Person, p1 instanceof Person.constructor)//false false true
```

#### 实例、原型和类成员

##### 实例成员



每次通过new调用类标识符时，都会执行类构造函数。在这个函数内部，可以为新创建的实例（this） 添加“自有”属性。至于添加什么样的属性，则没有限制。另外，在构造函数执行完毕后，仍然可以给 实例继续添加新成员。 每个实例都对应一个唯一的成员对象，这意味着所有成员都不会在原型上共享



##### 原型方法

定义在类块中的方法为原型方法,可以实现实例间的共享

```typescript
class Man{
    say(){
        console.log('hi');
        
    }
}
let m1:Man = new Man()
Man.prototype.say()//hi
m1.say()//hi
```

##### :bulb: 访问器

类支持获取和设置访问器

```typescript
class Person {
    constructor(private _name:string){
        this._name = _name
    }
    get n(){
        console.log('helo')
        return this._name
    }
    set n(v:string){
        this._name = v
    }

}
let p:Person = new Person("lhc")
console.log(p.n)//lhc
p.n = 'ame'
console.log(p.n)//ame
```

##### 静态类方法

可以在类上定义静态方法。这些方法通常用于执行不特定于实例的操作，也不要求存在类的实例。

与原型成员类似，静态成员每个类上只能有一个



```typescript
class Test {
    constructor() {
        this.sayThis = function(){
            console.log('this',this)
        }
    }
    public sayThis(): void {
        console.log('prototype',this)
    }
    public sayPrototyype(): void {
        console.log('prototype',this.constructor)
    }
    static sayThiss(): void {
        console.log('class', this)
    }
}

let t:Test = new Test();
t.sayPrototyype()//prototype [class Test]
t.sayThis()//this Test { sayThis: [Function (anonymous)] }
Test.prototype.sayThis()//prototype {}
Test.sayThiss()//class [class Test]
```

##### :alarm_clock: 迭代器方法

类支持定义迭代器方法,也可以将类变成一个可迭代对象.

```typescript
class IteratorClass {
    *yieldFunction(){
        yield 1
        yield 2
        yield 3

    }
}
let i:IteratorClass = new IteratorClass()
let it = i.yieldFunction()
for (const iterator of it) {
    console.log(iterator)//1 2 3
}
```

```typescript
class NameClass {
    constructor(public nameList: string[]) {
        this.nameList = nameList
    }
    //直接将类变成可迭代对象
    *[Symbol.iterator]() {
        yield* this.nameList.entries()
    }
}
let n:NameClass = new NameClass(["a","b","c"])

for (const iterator of n) {
    console.log(iterator[0],iterator[1])// 0 a 1 b 2 c
}
```

```typescript
class NameClass {
    constructor(public nameList: string[]) {
        this.nameList = nameList
    }
    //直接返回迭代器实例
    [Symbol.iterator]() {
        return this.nameList.entries()
    }
}
let n:NameClass = new NameClass(["a","b","c"])

for (const iterator of n) {
    console.log(iterator[0],iterator[1])// 0 a 1 b 2 c
}
```

#### :red_circle: 继承

**类继承使用的是新语法，但背后依旧使用的是原型链。**

ES6 类支持单继承。使用 extends 关键字，就可以继承任何拥有[[Construct]]和原型的对象。 很大程度上，这意味着不仅可以继承一个类，也可以继承普通的构造函数（保持向后兼容）

##### 构造函数、HomeObject 和 super()

派生类的方法可以通过 super 关键字引用它们的原型。这个关键字只能在派生类中使用，而且仅 限于类构造函数、实例方法和静态方法内部。在类构造函数中使用 super 可以调用父类构造函数。

:one:super 只能在派生类构造函数和静态方法中使用。

:two:不能单独引用 super 关键字，要么用它调用构造函数，要么用它引用静态方法

:three:调用 super()会调用父类构造函数，并将返回的实例赋值给 this。

:four:super()的行为如同调用构造函数，如果需要给父类构造函数传参，则需要手动传入。

:five:如果没有定义类构造函数，在实例化派生类时会调用 super()，而且会传入所有传给派生类的 参数。

:six:在类构造函数中，不能在调用 super()之前引用 this。

:seven:如果在派生类中显式定义了构造函数，则要么必须在其中调用 super()，要么必须在其中返回 一个对象



##### 抽象基类

使用 new.target可以实现基类只需要被继承,而不必实例化.

```typescript
class Father {
    constructor(){
        if(new.target === Father){
            throw new Error('基类不能被实例化!')
        }
    }
}

class Son extends Father {
    constructor(){
        super()

    }
}

let s:Son = new Son()//class Son {}
let f:Father = new Father()//Error: 基类不能被实例化!
```

### 代理与反射

代理和反射为开发者提供了拦截并向基本操作嵌入额外行为的能力,可以对对目标对象进行的操作加以控制.

#### 空代理

定义一个空代理`let proxy = new Proxy({},{});`,第一个参数为目标对象,第二个对象为处理程序.

对代理对象或目标对象的操作和访问会同时反映到目标对象和或目标对象上,因为他们操作的实际是同一个对象.

```typescript
let target = {
    age:20
}
let proxy = new Proxy(target,{});
proxy.age = 3;
target.age = 21;
console.log(target.age,proxy.age);//21 21
```

目标对象和代理对象严格不相等

`console.log(target===proxy);//false`

#### 定义各种捕获器

##### get

最简洁的写法是借助Reflect可以更方便执行捕获器的默认行为.

```typescript
let target = {
    age:20
}
let proxy = new Proxy(target,{
    get:function(...arguments) {
        return Reflect.get(...arguments) + '被获取';
    }
});

console.log(proxy.age)//20被获取
```

#### 撤销代理

撤销需要调用revoke()方法

撤销函数和代理对象是在实例化时同时生成的

```typescript
let target = {
    age:20
}
let {proxy,revoke} =  Proxy.revocable(target,{
    get:function(...arguments) {
        return Reflect.get(...arguments) + '被获取';
    }
});
console.log(proxy.age)//20被获取
revoke()
console.log(proxy.age)//Cannot perform 'get' on a proxy that has been revoked
```

#### 代理另一个代理

```
let target = {
    age: 20
}
let { proxy, revoke } = Proxy.revocable(target, {
    get: function (...arguments) {
        return Reflect.get(...arguments) + '被获取';
    }
});
let { proxy: otherProxy, revoke: otherRevoke } = Proxy.revocable(proxy, {
    get: function (...arguments) {
        return Reflect.get(...arguments) + '被获取';
    }
})
console.log(otherProxy.age)//20被获取被获取
```

### 函数

#### 箭头函数

箭头函数不能使用 arguments、super 和 new.target，也不能用作构造函数。此外，箭头函数也没有 prototype 属性。

#### arguments

arguments是一个类数组对象,保存着传入函数的参数,可以通过 arguments[0] arguments[1] .. 访问传入函数的第一个,第二个等参数.

arguments可以和命名参数一起使用.

```typescript
function add<E>(v1: E, v2: E, v3: E, v4: E): E {
    return arguments[0] + v1 + v2 + arguments[3];
}
console.log(add<number>(1, 2, 3, 4))//10
```

箭头函数没有arguments,但是可以通过包装使得箭头函数可以使用arguments

```typescript
function outAdd<E>(v1: E, v2: E, v3: E, v4: E): any {
    return (): E => {
        return arguments[0] + arguments[1] + v3 + v4;
    }
}
console.log(outAdd<number>(1,2,3,4)())//10
```

#### 没有重载

JavaScript中函数后定义的同名函数会覆盖先定义的同名函数,不能重载.

可以通过判断传入函数的参数的类型,个数,来模拟重载.

#### 函数声明和函数表达式

函数表达式在使用前必须要声明，而且没有提升过程，而函数声明有提升过程。

#### 函数内部

##### arguments.callee()

可以通过`arguments.callee()`来调用函数本身，使得函数逻辑与函数名解耦

##### this

`this`在函数声明中指向全局作用域，一般在网页中指向window。通过对象来调用指向调用的那个对象。

而在箭头函数中则指向所在执行上下文， 

##### caller

函数的`caller`属性指向调用该函数的那个函数

##### new Target

函数中的的该属性用于判断该函数是作为构造函数来调用。当作为构造函数调用时会引用被调用的构造函数，正常调用则返回undefined

```javascript
function F(){
    console.log(new.target)
}
let f= new F();//[Function: F]

F();//undefined
```





#### 函数的属性和方法

##### length

length属性返回函数命名参数的个数

##### prototype

该属性返回一个对象，保存了引用类型所有的实例方法，这些方法被所有实例共享。

该对象的属性不能通过for in 来遍历。

##### call apply

通过call apply 可以以指定的this来调用函数，call传参为函数列表，apply接受一个参数数组。

使用call apply 可以控制函数的调用上下文。

```typescript
let o = {
    name:'lhc',
    sayName(){
        console.log(this.name);
    }
}
let o_1 = {
    name:'wade'
}
o.sayName()//lhc

o.sayName.call(o_1)//wade
```

##### 函数表达式

函数声明会进行提升，而函数表达式不会进行提升，当需要根据条件声明不同函数时，可以使用函数表达式,而不要使用函数声明。

```
let flag = true;
let f:()=>number;
if(flag){
    f = function(){
        return 1;
    }
}else {
    f = function(){
        return 2;
    }
}
```

##### 闭包

闭包指的是那些引用了另一个函数作用域中变量的函数

闭包内不能直接访问包裹函数的this和arguments，如果要访问需要想把this和arguments保存到一个闭包能访问的变量中。

```typescript
let number = 1;
let o = {
    number: 2,
    sayNum() {
        let that = this;
        let args = arguments;
        return function () {
            console.log(that.number, args.length);
        }
    }
}
o.sayNum()()//2 0 
```

##### IIFE 立即执行函数

ES6之前，因为没有块级作用域，IIFE执行完，其作用域就会被销毁，且IIFE中的变量在IIFE外是访问不到的。

```typescript
(function(){
    let i  = 1;
    console.log(i)//1
})()
console.log(i)//找不到名称“i”
```

ES6中可以通过块级作用域来替代。

```typescript
{
    let i = 1;
    console.log(i)
}
console.log(i)//找不到名称“i”
```

#### 闭包的模块模式

闭包可以返回一个对象，其中包含了一些只能这个闭包访问的变量或方法。

```typescript
function fun(){
    let name = 'lhc';
    let age = 20;
    return {
        name:name,
        age:age,
        sayName(){
            console.log(name);
        }
    }
}
let lhc = fun();
```

#### 小结

- 函数表达式与函数声明是不一样的。函数声明要求写出函数名称，而函数表达式并不需要。没 有名称的函数表达式也被称为匿名函数。
- ES6 新增了类似于函数表达式的箭头函数语法，但两者也有一些重要区别
- JavaScript 中函数定义与调用时的参数极其灵活。arguments 对象，以及 ES6 新增的扩展操作符， 可以实现函数定义和调用的完全动态化。
- 函数内部也暴露了很多对象和引用，涵盖了函数被谁调用、使用什么调用，以及调用时传入了 什么参数等信息。
- 闭包的作用域链中包含自己的一个变量对象，然后是包含函数的变量对象，直到全局上下文的 变量对象。
- 通常，函数作用域及其中的所有变量在函数执行完毕后都会被销毁
- 闭包在被函数返回之后，其作用域会一直保存在内存中，直到闭包被销毁。
- 函数可以在创建之后立即调用，执行其中代码之后却不留下对函数的引用
- 立即调用的函数表达式如果不在包含作用域中将返回值赋给一个变量，则其包含的所有变量都 会被销毁。
- 虽然 JavaScript 没有私有对象属性的概念，但可以使用闭包实现公共方法，访问位于包含作用域 中定义的变量。
- 可以访问私有变量的公共方法叫作特权方法。
- 特权方法可以使用构造函数或原型模式通过自定义类型中实现，也可以使用模块模式或模块增 强模式在单例对象上实现。

### Promise和异步函数

#### Promise.resolve()和Promise.reject()

`Promise.resolve()`等价于`new Promise(resolve=>resolve())`

且`Promise.resolve()`可以包装任意一个值，如果传入的值本事就是一个期约，那它的行为就类似于一个空包装。

```typescript
let r = Promise.resolve(1);
console.log(r===Promise.resolve(r))//true
```



Promise.reject()会实例化一个拒绝的期约并抛出一个异步错误 （这个错误不能通过 try/catch 捕获，而只能通过拒绝处理程序捕获）

关键在于，Promise.reject()并没有照搬 Promise.resolve()的幂等逻辑。如果给它传一个期 约对象，则这个期约会成为它返回的拒绝期约的理由

```typescript
let rej = Promise.reject(1);
Promise.reject(rej).catch(r=>console.log(r))//Promise { <rejected> 1 }
```

#### Promise的实例方法

##### Promise.prototype.then()

Promise.prototype.then()是为期约实例添加处理程序的主要方法。这个 then()方法接收最多 两个参数：onResolved 处理程序和 onRejected 处理程序。这两个参数都是可选的，如果提供的话， 则会在期约分别进入“兑现”和“拒绝”状态时执行。

如前所述，两个处理程序参数都是可选的。而且，传给 then()的任何非函数类型的参数都会被静 默忽略。如果想只提供 onRejected 参数，那就要在 onResolved 参数的位置上传入 undefined。

```typescript
let p:any = new Promise((resolve,reject)=>{
    reject(1);
})
p.then(null,(r:any)=>console.log(r))//1

```

抛出异常会返回拒绝的期约

```typescript
let p:any = new Promise(()=>{
    throw new Error("error")
})
p.then(null,(r:any)=>console.log(r))//Error: error
```

##### Promise.prototype.catch()

Promise.prototype.catch()方法用于给期约添加拒绝处理程序.这个方法是一个语法糖相当于`Promise.prototype.then(null, onRejected)`

这个方法只接收一个参数： onRejected 处理程序

```typescript
let p:any = new Promise(()=>{
    throw new Error("error")
})
p.catch((r:any)=>console.log(r))//Error: error
```

