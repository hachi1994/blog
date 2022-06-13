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

