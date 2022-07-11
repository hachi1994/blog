 - \---

   title: 记录刷题中的错题的知识点，以及面试题

   date: 2022-06-22

   tags:

    \- JavaScript

   categories:

    \- JavaScript

   \---

## JavaScript

- ###### `typeof`只能检测数据类型，而不能检测从数据类型中派生的其他类型，数组为object派生对象，所以依然返回object

- 三元运算符优先级高于赋值运算符

- `Object(1.0)`可以将1.0包装成一个Number对象的实例.

- `delete`只能用于删除隐式全局变量和`eval`方法中的变量,对象的属性,方法,不能删除通过`let var `声明的变量,全局作用于和函数作用域中的变量,且对象的属性被设置为不可配置(Non-configurable)也不能被删除.

- `str.search()`方法返回匹配字符的第一个下标.

- `arr.concat()`会返回原数组的一个副本.

- class的访问器get没有set是无法赋值的.

- `var`和函数声明都会发生变量提升.

- `+`作为一元运算符时，会将参数转换为数字返回

- try catch finally , try 里的语句必然会执行,catch则是捕获到try语句中的错误才执行,finally必然会在try catch后执行.

  - finally中有return则try里的return不生效。

    ```javascript
    var i = 100;
    function foo() {     //bbb 是 try... finally...这个代码块
        bbb: try {        //break语句的标签引用，用于跳出 bbb标签 代码块
            console.log("position1");//打印position1
            return i++;  } //继续执行return右边的代码，此时i++为100，i为101
        finally {                //只要有finally，不管try语句里写啥（return,break之类的失效），都会执行finally语句
            break bbb;     //跳出bbb标签代码块
        }                   //跳出try...finally后，因为finally中没有return，故可执行后续代码
                               //如果finally中有return，则无法执行后续代码了
        console.log("position2");//打印position2
        return i;//返回i,i=101
    }
    foo();
    ```

    

- `arr.indexOf()`方法不能判断NaN,如果传入NaN则返回-1. `arr.include()`可以判断NaN

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

- js中数值类型不区分int float double 统一用8字节64位来表示数字.

- **continue语句只能用在while语句、do/while语句、for语句、或者for/in语句的循环体内，在其它地方使用都会引起错误！**是停止当前语句，并从头执行该语句。

- exec() 方法是一个正则表达式方法。

  exec() 方法用于检索字符串中的正则表达式的匹配。

  该函数返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null

- 变量提升优先于函数提升

- `process.nextTick`和`Promise.then`同为微任务，但是前者优先后者执行。

- 正则?

  - \1 用于匹配第一个捕获组

  - i 表示忽略大小写

  - ? 0或1次

  - [] 匹配括号中的字符集合，匹配其中任一字符

  - +匹配 1或多次

  - . 匹配除了/n /r 外任何字符

  - "*" 匹配0或多次

  - \d 数字 \D 非数字 \w 字符下划线 \W 非字符

  - 正则表达式内的^表示非,在头用于匹配开头. `/[^abc]/`表示匹配非abc

  - ?=xxx 匹配某个字符且该字符后必须跟着xxx
    - abc(?=cde)则可以匹配abccdeabceaf中的第一个abc,因为第一个abc后跟了cde

  - {n} : 出现n次

    {n,} : 出现n到多次

    {n,m} : 出现n到m次

  

- 三元运算符将值转成boolean再比较， == === 将值转成number类型再比较

  - Boolean([]) =>  true 
  - Number([]) => 0
  - Boolean({}) => true
  - Number({}) => NaN
  - Number(false) => 0

- Promise的then可以用于前面的请求成功或失败的情况，前面抛出错误才会进入catch。

- `in` 操作符用在数组中，表示判断 对应的索引在不在数组中，而不是判断值在不在数组中。

  - `1 in [i]//false index i not exist `

- `<NOSCRIPT>`标签用来定义脚本未被执行时的替代内容。

- 数据量大的情况下连接字符串的最好方式是 `Array.join()`  因为不需要创建新变量。

- call aplly 传入的上下文是null在非严格情况下是全局。

- 事件循环 同步代码=>异步代码(微任务代码=>宏任务代码)

- js内置对象 Arguments Math Date Object Array Boolean  Error Function  String RegExp 

- 阻止冒泡`ie e.cancelBubble = true 其他 e.stopPropagation()`

- 阻止默认行为`ie e.returnValue = false 其他e.preventDefault()`

- 原生获取dom父节点 `element.parentNode`

- 定义在原型对象上的方法属性 in操作符返回true hasOwnProperty返回false

  - ```javascript
    let ooc = new Object();
    Object.prototype.ahh = 'a';
    console.log(Object.hasOwnProperty.call(ooc,'ahh'));//false
    console.log('ahh' in ooc);//true
    ```

- with(obj){代码} with 代码块首先会以obj为this,如果obj没有找到属性,那么就回去其上级作用域中找.

  - 以下操作等于往全局中添加了一个color属性.

  - ```
    function change(obj) {
      with(obj) {
        color = 'red'
      }
    }
    var box = {
      size: '15*15'
    }
    change(box);
    console.log(color);
    ```

- 值与字符串相加是会进行拼接，字符串和字符串比较会比较ASCll的大小

- `({} + 'b' > {} + 'a') => '[object Object] + b > [object + Object]+a => true'`

- 按照CommonJS规范，在任何模块代码的作用域下内置了module exports require global 四个变量

- 如果不给cookie设置时间，cookie会在浏览器会话结束时过期。

- string的concat方法用于连接2个字符串。

- `使用Object.create({})`创建的空对象是没有原型对象的。

- 数组遍历

  - orEach(), filter(), reduce(), every() 和some()都会跳过空位。

    map()会跳过空位，但会保留这个值

    join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。

  - ES6 中都会将空位当做undefined

- 全局变量不会回收，被另一个作用域引用的变量不会回收，局部变量会被回收。

- Date `setMounth()`设置1-12月传入0-11

- 不能被冒泡的9个事件：① load和unload ② mouseenter和mouseleave ③ blur和focus ④ error ⑤ resize和abort从3个角度说可分为ui事件、鼠标移入移出事件、聚焦和失焦件，

- 字符串的match() 方法检索返回一个字符串匹配正则表达式的结果，匹配成功则返回数组，失败则返回null。

- .length 一个函数返回他的形参个数。1

- 函数的形参不能被删除

- 数组的forEach方法会跳过undefined的元素

- setTimeout 定时器中this默认指向window

- 变量重复声明不赋值的话会保持原值

  - ```javascript
    var a;
    a();
    function a() {
      console.log(a);
    }
    //输出a函数的内容,因为a声明但未赋值,所以a还是函数u.
    ```

- 严格模式

  - 匿名函数和立即执行函数的this指向undefined不指向window.
  - 变量不能重名

- 判断对象j是否存在可以使用 `this.hasOwnProperty('obj')`来判断对象是否是顶层对象的一个属性。

- 设置configurable:flase 的属性不能被删改，也不能被再次修改特性，但是可以重写。

- void是一元运算符，它出现在操作数之前，操作数可以是任意类型，操作数会照常计算，但忽略计算结果并返回undefined。由于void会忽略操作数的值，因此在操作数具有副作用的时候使用void来让程序更具语义

  - `void 1 //undefined;`
  - `void()//SyntaxError`

- `isNaN()`传入 NaN 或字符串、对象、undefined等非数字值会返回true

- AMD,CMD相关

  - RequireJS遵循AMD规范， Sea.js遵循CMD规范
  - AMD推崇依赖前置，CMD推崇依赖就近
  
- arr instanceof 在跨iframe会失效。

- 





## Css

- 一级标题到六级标题表示 HTML 标题，默认加粗

  <caption> 标签表示表格标题，标题一般被居中表格之上，但不加粗文本

  <em> 标签表示强调内容，显示为斜体，但不加粗文本

  <th> 标签表示表格的表头，默认加粗文本

- perspective(n) 改变3D元素是怎样查看透视图

- 1）link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。

  2）link可以加载CSS，Javascript；@import只能加载CSS。

  3）link加载的内容是与页面同时加载；@import需要页面网页完全载入以后加载。

- <img src="https://uploadfiles.nowcoder.com/images/20160725/6150436_1469437565689_9AB217826D523CFA52B15130EFC68A40" alt="img" style="zoom: 50%;" />

- <img src="https://uploadfiles.nowcoder.com/images/20160725/6150436_1469437584131_4CF2CABF79BAAD901F68C39E7397B719" alt="img" style="zoom: 50%;" />

- 标准盒子模型 ＝ margin + border + padding + width （width = content ）

  IE盒子模型 ＝ margin + width（width = border + padding + content ）

- 可以继承自父元素的样式

  - 颜色，文字，字体间距行高对齐方式，和列表的样式可以继承

  

- 可以在 audio 开始标签和结束标签之间放置文本内容，这样老的浏览器就可以显示出不支持该标签的信息。

- clear 指明该元素周围不可出现浮动元素。

- 字体资源文件引入会受跨域限制。

- 外部资源由 <object> 元素表示，该元素可以被视为图像、嵌套的浏览上下文或插件要处理的资源。它包括各种属性，如存档、边框、分类、代码库、代码类型等

- a :link、a:hover、a:visited、a:active定义的顺序为link、visited、hover、active。

- a标签不能嵌套a标签。

-  **:before** 是CSS3之前的**旧的伪类**

- 行内元素位于浮动元素之前时文本会识别出浮动元素并且围绕浮动元素排布，最早的文字环绕图片就是依赖这个特性。

- <img src="https://uploadfiles.nowcoder.com/images/20210909/236456543_1631168420702/C084B24F5F2338D37CFB521ADBBB9826" alt="img" style="zoom: 50%;" />

- 选择器优先级

  - !important >style>id>class=伪类=属性>标签>通配符>浏览器自定样式

## React

- `React.lazy`用于动态引入组件

- Redirect用于重定向,

  访问inbox.message/3会跳转到/message/3

  ```
  <Route path="inbox" component={Inbox}>
  
  ＜Redirect from="messages/:id" to="/messages/:id" />
  
  </Route>
  ```

- 自定义组件必须义大写字母开头：为的是和HTML内置组件进行区分

- `ReactDOM.createPortal(child, container)`函数可以将子节点渲染到存在于父组件以外的DOM节点上,且通过Portal进行事件冒泡时，从portal内部触发的事件会一直冒泡至包含React树的祖先。

  - 由于 portal 仍存在于 *React 树*， 且与 *DOM 树* 中的位置无关，那么无论其子节点是否是 portal，像 context 这样的功能特性都是不变的。

    这包含事件冒泡。一个从 portal 内部触发的事件会一直冒泡至包含 *React 树*的祖先

- `React.isValidElement(object)` 验证对象是否为React元素，返回值为true或false。

- Hook中的useDebugValue可用于在React开发者工具中显示自定义Hook的标签。

- Hook使用规则：

  1.只能在函数最外层调用 Hook，不要在循环、条件判断或者子函数中调用；

  2.只能在React的函数组件或自定义的Hook中调用 Hook，不要在其他 JavaScript 函数中调用。

  3.<span style='color:red;'>React 怎么知道哪个 state 对应哪个 `useState`？答案是 React 靠的是 Hook 调用的顺序，所以如果通过条件语句取消掉了一个useEffect，那么可能导致Hook的顺序发生变化，则产生bug。</span>

- Hook

  - State Hook useState 类似class中的this.setState()，但是它不会把新的 state 和旧的 state 进行合并。

  - Effect Hook 和 class组件中的`componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途。直接调用useEffect()等同于告诉 React 在完成对 DOM 的更改后运行你的“副作用”函数。

  - 如果你的 useEffect 返回一个函数，React 将会在执行清除操作时调用它。

  - useEffect接受第二个参数，为一个数组，传入要监听的数据，当这些数据两次渲染间没有变化则跳过effect阶段

    - ```javascript
      useEffect(() => {
        document.title = `You clicked ${count} times`;
      }, [count]); // 仅在 count 更改时更新
      ```

    - ```javascript
      useEffect(() => {
        return () => {
          unsubscribeCount()
        };
      }, [props.count]);//只有当count不一致时才取消订阅
      ```

  - 如果想执行只运行一次的 effect，则useEffect第二个参数传入一个空数组。

- 自定义Hook，必须以use开头。

- React的store不存在createStore方法，而应该使用Redux提供的createStore方法。

- React-router

  - Router： react-router 的重要组件，它能保持 UI 和 URL 的同步。

  - RoutingContext：在 context 中给定路由的 state、设置 history 对象和当前的 location，<RoutingContext> 就会去渲染组件树。

  - Link：允许用户浏览应用的主要方式，<Link> 以适当的 href 去渲染一个可访问的锚标签。

    没有内置组件DefaultLink

- 默认情况下不能在函数组件上使用 ref 属性，因为函数组件没有实例。如果要在函数组件中使用 ref，可以使用 forwardRef，或者可以将该组件转化为 class 组件。不管怎样，可以在函数组件内部使用 ref 属性，只要它指向一个 DOM 元素或 class 组件

- StrictMode组件作用跟Fragment组件一样，可以一个组件返回多个元素，并为其后代元素触发额外的检查和警告。

- 在react-router-dom中通常使用的组件有三种路由器组件: 如browserRouter和hashRouter和createMemoryHistory

  路由匹配组件: Route和Switch 组件

  导航组件: Link和NavLink 组件

- 从 DOM 中卸载组件，可以使用`ReactDOM.unmountComponentAtNode()`方法。

- 如果shouldComponentUpdate()返回值为false，则不会调用componentDidUpdate()

- React 支持 onDoubleClick

- react支持的剪贴板事件有onCopy，onCut，onPaste

- ReactDOM.render() 不会修改容器节点（只会修改容器的子节点）。可以在不覆盖现有子节点的情况下，将组件插入已有的 DOM 节点中。

- 错误边界是一种 React 组件，这种组件可以捕获并打印发生在其子组件树任何位置的JavaScript错误

- findDOMNode 只在已挂载的组件上可用（即，已经放置在 DOM 中的组件）。如果你尝试调用未挂载的组件（例如在一个还未创建的组件上调用 render() 中的 findDOMNode()）将会引发异常。

## Redux

- reducer如果不需要做任何工作，它将直接返回的当前状态。



## Dva

- 数据的改变：dispatch` 发起一个 action，如果是同步行为会直接通过 `Reducers` 改变 `State` ，如果是异步行为（副作用）会先触发 `Effects` 然后流向 `Reducers` 最终改变 `State
- *State*：State 表示 Model 的状态数据，通常表现为一个 javascript 对象（当然它可以是任何值）；操作的时候每次都要当作不可变数据（immutable data）来对待，保证每次都是全新对象，没有引用关系.
- *Action*：Action 是一个普通 javascript 对象，它是改变 State 的唯一途径。无论是从 UI 事件、网络回调，还是 WebSocket 等数据源所获得的数据，最终都会通过 dispatch 函数调用一个 action，从而改变对应的数据。
- *dispatch*：dispatch是一个函数，dispatching function 是一个用于触发 action 的函数，action 是改变 State 的唯一途径，但是它只描述了一个行为，而 dipatch 可以看作是触发这个行为的方式，而 Reducer 则是描述如何改变数据的。
- *Reducer*：Reducer（也称为 reducing function）函数接受两个参数：之前已经累积运算的结果和当前要被累积的值，返回的是一个新的累积结果。该函数把一个集合归并成一个单值。类似于JavaScript中数组的reduce方法。
- *Effect*：副作用，异步操作一般就是副作用，因为它使得我们的函数变得不纯，同样的输入不一定获得同样的输出。Dva集成了Redux-saga，使得我们可以通过同步的方式进行异步操作。从而将effects转为纯函数。
- *Subscription*：subscription 语义是订阅，用于订阅一个数据源，然后根据条件 dispatch 需要的 action。subscription订阅的数据源可以是history的路由变化，当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化等。

## 浏览器及网络协议

### 1.浏览器加载资源的过程

1. 上一次加载资源成功,返回状态码200时,将资源和请求头均缓存下来用于下次加载资源时比较.
2. 再次加载资源时,强缓存优先级最高,所以先判断当前时间与上次请求成功时的时间进行对比,如果没有超过cache-control头设置的max-age,则资源未过期,那么直接使用本地缓存的资源,对于不支持http1.1协议的浏览器则使用expries头来判断是否过期.
3. 若判断资源已过期,则强缓存没有命中,开始进行协商缓存,向服务器发送带有If-None-Math和If-Modified-Since头的请求.
4. 服务器收到请求后优先根据ETag判断请求的文件是否被修改,如果ETag一致那么则没有被修改,协商缓存命中,直接返回数据,返回状态码304.如果ETag不一致,那么则表示请求的文件被修改了,则由服务器返回最新的资源,并带上ETag,返回状态码200.
5. 如果请求中不带ETAG,那么则用If-Modified-Since和文件最后修改时间比较,一致则命中协商缓存,直接返回数据和状态码304,否则返回最新文件和最新If-Modified-Since并返回状态码200



### 2.浏览器的强缓存和协商缓存

使用强缓存策略时,如果资源缓存有效,则直接使用该资源,不用向服务器发送请求.

强缓存依赖Expries头和Cache-Control头,支持http1.1协议的浏览器可以使用Cache-Control,不支持可以依赖Expries判断.

如果强缓存没有命中,并且设置了协商缓存,那么则使用协商缓存,协商缓存适用前提,Cache-Control:max-age=过期,Cache-Control:no-store,

使用协商缓存时会先向服务器发送一个请求,如果协商缓存命中,那么返回状态码304和本地缓存的资源副本.如果资源发生了修改,则返回最新资源和状态码200,并记录最后修改时间.



### 3.三次握手

### 4.四次挥手

### 5.http和https的区别

### 6.关键头

#### Request Header

1. Expries:设置缓存的失效日期.针对HTTP1.1以下的协议
2. Cache-Control:控制浏览器是否进行缓存,针对HTTP1.1及以上的协议
   1. no-store 不缓存
   2. no-cache 会先去服务器确认文件是否修改
   3. max-age 缓存在xxx秒后失效.
3. If-None-Match: 可以携带一些值,如果服务器资源的ETag不与这些值匹配,则会返回请求的资源
4. If-Modified-Since:服务器只在所请求的资源在给定的日期时间之后对内容进行过修改的情况下才会将资源返回

