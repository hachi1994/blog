 - \---

   title: 记录刷题中的错题的知识点

   date: 2022-06-22

   tags:

    \- JavaScript

   categories:

    \- JavaScript

   \---

## JavaScript

- ###### `typeof`只能检测数据类型，而不能检测从数据类型中派生的其他类型，数组为object派生对象，所以依然返回object

- `delete`只能删除

- 三元运算符有限级高于赋值运算符

- `Object(1.0)`可以将1.0包装成一个Number对象的实例.

- `delete`只能用于删除隐式全局变量和`eval`方法中的变量,对象的属性,方法,不能删除通过`let var `声明的变量,全局作用于和函数作用域中的变量,且对象的属性被设置为不可配置(Non-configurable)也不能被删除.

- `str.search()`方法返回匹配字符的第一个下标.

- `arr.concat()`会返回原数组的一个副本.

- class的访问器get没有set是无法赋值的.

- `var`和函数声明都会发生变量提升.

- `+`作为一元运算符时，会将参数转换为数字返回

- try catch finally , try 里的语句必然会执行,catch则是捕获到try语句中的错误才执行,finally必然会在try catch后执行.

- `arr.indexOf()`方法不能判断NaN,如果传入NaN则返回-1.

- 函数声明的arguments参数是一个伪数组不是真正的数组,

- `fn.call()`在非严格模式下,第一个参数传入null或undefined,this指向window.

- onpressbutton,在js中不存在onpressbutton事件.

- \d 匹配数字

  - \d   匹配一个数字字符。等价于 [0-9]。
    \D   匹配一个非数字字符。等价于 [^0-9]。
    \f    匹配一个换页符。等价于 \x0c 和 \cL。
    \n   匹配一个换行符。等价于 \x0a 和 \cJ。
    \r    匹配一个回车符。等价于 \x0d 和 \cM。
    \s   匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \f\n\r\t\v]。
    \S   匹配任何非空白字符。等价于 [^ \f\n\r\t\v]。
    \t    匹配一个制表符。等价于 \x09 和 \cI。
    \v   匹配一个垂直制表符。等价于 \x0b 和 \cK。
    \w   匹配字母、数字、下划线。等价于'[A-Za-z0-9_]'。
    \W  匹配非字母、数字、下划线。等价于 '[^A-Za-z0-9_]'。

- `arr.forEach()`参数是一个函数,函数内的return是退出当前迭代执行下一次迭代

- 非严格模式下,IIFE(立即执行函数)的this指向window

- ES6的class和let一样都存在暂时性死区,不存在变量提升,在执行到声明前不能被访问.

- 构造函数如果又返回对象,那么就会返回这个对象,否则会返回创建的那个对象.

- 及时在`if(false){}`这种语句里通过`var`声明变量也是会在编译器预处理阶段进行变量提升.

- 箭头函数的this会绑定在所在执行上下文,如果一个是箭头函数在另一个函数内,那么this绑定在了其外部第一个非箭头函数的作用域.

- 类的静态方法和实例方法可以重名,静态方法只能通过类直接调用,实例方法只能通过实例进行调用.静态方法的this不会指向实例对象.

- 通过`Object.defineProperty()`定义的属性是默认不可枚举的,不能通过for in Object.key() 来遍历出来.

  - **defineProperty为对象设置属性后，该属性的描述符writable、configurable以及enumberable默认为false。**

    ***\*enumberable为false代表该属性不可遍历\****

- null和undefined可以 == 返回true,但是其本身与任何其他值==都返回false

- js中分母为零不会抛出错误而是返回NaN.

- while是微任务,setTimeout是宏任务,微任务优先宏任务执行.

- `let f = (a=a)=>a`等于用a去赋值a,如果调用`f()`,此时a并未被初始化,所以会报错.

- 函数声明也存在变量提升,会把该函数提升到当前作用域顶端.且return后面的语句中的变量和函数声明也可以提升.

- +运算符与非数值运算,会将非数值转成数值在计算,null=>0 undefined => NaN 

- 0/0,NaN/0结果为NaN,其他值/0均为Infinite.

- `var a = b = 1`等同于`var a = b;b=1;`

- `eval` 将会返回对最后一个表达式的求值结果。 

- 对原型对象进行覆盖是将prototype指向了一个新的地址,原来创建的对象的原型不受影响

  ```typescript
  function F(){}
  F.prototype.a = 1;
  let a = new F();
  F.prototype = {
    b:2
  }
  console.log(a.a);//1
  
  ```

- Symol

  - Symbol值不能与其他类型的值进行运算
  - Symbol 值不可以和其他类型值进行混合运算,否则会报错
  - Symbol 值如果想要作为属性名，那就不能再用点运算符，因为点运算符后面跟的总是字符串
  - 在对象内部使用Symbol 值作为属性名的时候，必须要将值放在方括号中

- js传参包括基本数据类型传参和复杂数据类型传参，基本数据类型传参实际上是复制值传递，函数对形参的处理不会影响到外面的实参，而复杂数据类型传参是引用传递，即把数据的地址复制一份后传递到函数中，此时形参和实参指向同一地址的对象，对于形参的修改会影响到实参。

  ```typescript
  function fn(o,val){
  
             o.b = 1;
  
             val = 1;
  
  }
  
  var obj = {b:0};
  
  var num = 0;
  
  fn(obj,num);
  
  console.log(obj,num);//{b:1} 0
  ```

- js运算符优先级 算术运算符>关系运算符>逻辑运算符（先&&后||）> 赋值

- 使用`let`声明的变量不会成为全局变量，不会成为window的属性。

- js全局函数不包含setTimeout ，这是window对象的方法

  - escape()、unescape()、encodeURI()、decodeURI()、

      encodeURIComponent()、decodeURIComponent()

     Number()、String()

    isFinite()、isNaN()、parseFloat()、parseInt()

      eval()

- js原始数据类型 Undefined、Null、Boolean、Number 和 String。

- **continue语句只能用在while语句、do/while语句、for语句、或者for/in语句的循环体内，在其它地方使用都会引起错误！**是停止当前语句，并从头执行该语句。

- exec() 方法是一个正则表达式方法。

  exec() 方法用于检索字符串中的正则表达式的匹配。

  该函数返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null

- 

## React

- `React.lazy`用于动态引入组件

- Redirect用于重定向,

  访问inbox.message/3会跳转到/message/3

  ```
  <Route path="inbox" component={Inbox}>
  
  ＜Redirect from="messages/:id" to="/messages/:id" />
  
  </Route>
  ```

- d



