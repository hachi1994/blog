---
title: TypeScript学习
date: 2021-11-04
tags:
 - TypeScript
categories:
 - TypeScript
---

### 1. TypeScript

1. 基础类型
   1. 布尔
   ```
    let isUse: boolean = true
   ```
   2. 数值
   ```
    let age: number = 20
   ```
   3. 字符串
   ```
    let name: string = 'lhc'
   ```
   4. 数组 
   ```
    //元素类型后加上[]
    let colors: string[] = ['red','green']
    //数组泛型
    let colors: Array<string> = ['red','green']
   ```
   5. 元组 元组类型允许表示一个已知元素数量和类型的数组,各元素的类型不必相同
   ```
    let a: [string, number]
    a = ['abc', 20]
    console.log(a[0])//'abc'
    //访问越界的元素,会使用联合类型来替代
    a[10] = true //错误,因为true是boolean,并不是(string|number)类型
    a[9] = 10 //正确,因为10是number属于(string|number)类型
   ``` 
   6. 枚举 为一组数值赋予友好的名称
   ```
    enum Color {Red, Green, Yellow}
    console.log(Color.Red) // 0
    console.log(Color[0]) // Red

    //指定某几个元素的编号
    enum Color {Red = 4, Green, Yellow}
    console.log(Color.Red) //4
    console.log(Color.Green) //5

    //所有元素下标均手动赋值
    enum Color {Red = 4, Green = 7, Yellow = 10}
    console.log(Color.Red) //4
    console.log(Color.Green) //7
   ```
   7. any 可以用于移除类型检查
   ```
    let list: any[] = [1, 'abc', true]
    list[1] = 20//正确
   ```
   8. void 无任何类型
   ```
    //void类型只能被赋值为null和undefined
    let v: void = null
    let v1:void = undefined
    function alertMsg(msg: string): void {
        alert(msg)
    }

   ```
   9. undefined和null
undefined和null是所有类型的子类型,所以可以把null和undefined赋值给任意类型,但是不建议这么做,建议使用时配合联合类型使用(string|null|undefined).
   ```
   let n: null = null
   let u :undefined = undefined

   ```
   10. never 
    表示永远无法达到的类型,例如函数抛出错误,never是任何类型的子类型可以赋值给任意类型,但是任何类型不可赋值给never类型.
    ```
     function foo(message: string): never {
         throw new Error(message)
     }
     function foo_1(): never {
         while(true){

         }
     }
     function foo_2(): never {
         return new Error('error')
     }
    ```
    11. object
     表示除number,string,boolean,symbol,null或undefined之外的类型,使用object类型,就可以更好的表示像Object.create这样的API
     ```
     declare function create(o: object | null): void
     create({ name: 'lhc' })
     ```
     12. 类型断言
     当开发者更加清楚某个实现具有的类型时,可以进行类型的转换.两种使用方法一种是尖括号包含类型,一种是as,在TypeScript中使用JSX只支持as形式
     ```
        let str: any = 'i am lhc'
        let strLength: number = (str as string).length // 8 
        let strLength_1: number = (<string>str).length // 8
     ```
### 2. 变量声明

1. let 和 const 应用场景
   所有变量除了你计划去修改的都应该使用const. 基本原则就是如果一个变量不需要对它写入,那么其它使用这些代码的人也不能够写入它们,并且要思考为什么会需要对这些变量重新赋值. 使用 const也可以让我们更容易的推测数据的流动.
2. 解构
   1. 数组解构
   ```
    let arr = [1,2,3]
    let [a, b, c] = arr
    let [d, ...rest] = [1,2,3]
    let [,e,,f] = [4,5,6,7,8]
    //a:1, b:2, c:3, rest:[2,3], e:5, f:7

    //用于函数
    function foo([a,b]:[number,number])
    foo([2,3])


   ```
   2. 解构对象
   ```
    let o = {
        a: 'foo',
        b: 12,
        c: 'bar'
    };
    let { a, b } = o;
    let {b, ...rest} = o
    console.log(rest)// {b:12, c:'bar}
   ```
   3. 属性重命名
   ```
    let {a:aa, b:bb} : {a:number, b:string} = {a:123, b:'123'}
    console.log(aa, bb) // 123,'123'
   ```
   4. 函数声明
   ```
    
    function foc({ a, b = 0 }= { a: '123' }): void {

    }
    foo() //ok
    foo({a:1})//ok
    foo({}) // 必须有a参数

    //复杂情况,既有默认值又有类型限制
    function foc({ a, b = 0 }: { a: number, b: number } = { a: 0}): void {

    }
   ```
   5. 展开
   展开对象时只包含其可枚举属性,会丢失其自身的方法
   ```
   //数组,展开操作符为数组创建了一份浅拷贝
   let a = [1,2,3]
   let b = [2,3,4]
   let c = [...a,...b]

   //对象,展开对象,后出现的同名属性会覆盖前面的属性
   let o1 = {name:'lhc',age:20,print(){console.log(1)}}
   let o2 = {name:'abc',male:'male'}
   let o3 = {...o1,...o2}
   o3//{name:'abc',age:20,male:'male'}
   o3.print()//error!
   ```

### 3.接口
    接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约
   
   1. 编译器只会检测接口中定义的必须传递的参数
   ```
        interface Person {
            name:string,
            age:number
        }
        let p: Person = {
            age:20,
            car:'benz'
        }
        //error, 类型 "{ age: number; name: string }" 中缺少属性 "name",但类型 "Person" 中需要该属性
   ```
   2. 可选属性
   属性名加问号可以定义一个可选属性
   ```
    interface Person {
        car?: string,
        name: string,
        age: number
    }
    let p: Person = {
        name: 'lhc',
        age: 20
    }
   ```
   3. 只读属性
   只读属性只能在对象刚创建时修改其值,使用readonly指定只读属性.
   ```
    interface Person {
        readonly father: string
    }
    let p: Person  = {
        father:'father'
    }
    p.father = 'abc' // error
   ```
   TypeScript具有<span style='color:red;font-weight:900'>ReadonlyArray</span>类型,可以用来定义一个创建之后再也不能修改的数组.

   ```
    let a: number[] = [1,2,3]
    let b: ReadonlyArray<number> = a
    a[1] = 1//ok
    //b[1] = 1//error 类型“readonly number[]”中的索引签名仅允许读取
    //b.push(1)//error 类型“readonly number[]”上不存在属性“push”. 其所有可变方法都被去掉了
    //b.length = 1//error 无法分配到 "length" ,因为它是只读属性.
    //a  = b //error 类型 "readonly number[]" 为 "readonly",不能分配给可变类型 "number[]".
   ```

   想把一个ReadonlyArray赋值到一个普通数组的方法是使用类型断言重写
   
   ```
        a = (b as number[])//ok
   ```
   4. 额外的属性检查
   通过索引签名‘propName’,可以传入任意的额外属性,只要不是name,其他的都可以
   ```
    interface Person {
        name:string;
        [propName:string]:any;
    }
    function foo(p:Person):void{

    }
    //foo({naem:'123'})//error 类型“{ naem: string; }”的参数不能赋给类型“Person”的参数.类型“{ naem: string; }”缺少类型“Person”中的以下属性: name, age
    foo({age:20,name:'123'})//error 类型“{ age: number; }”的参数不能赋给类型“Person”的参数.类型 "{ age: number; }" 中缺少属性 "name",但类型 "Person" 中需要该属性.
    foo({age:20} as Person) // ok
   ```
   5. 函数类型
   为了使用接口表示函数类型,我们需要给接口定义一个调用签名. 它就像是一个只有参数列表和返回值类型的函数定义.参数列表里的每个参数都需要名字和类型.

   6. 可索引类型
   可索引类型是a[0],p['name']这种,可索引类型包含一个索引签名,描述了对象索引的类型,还有相应索引的返回值类型
   ```
   interface numberArr {
        [a:number]:number;
    }
    let arr: numberArr = [1,2,3]
    console.log(arr[0]);//1
   ```
   TypeScript支持两种类型的索引签名：字符串和数值,可以同时使用两种类型的索引,但是数字索引的返回值必须是字符串索引返回值类型的子类型. 这是因为当使用 number来索引时,JavaScript会将它转换成string然后再去索引对象. 
   ```
        class Animal {
            name:string
        }
        class Dog extends Animal {
            color:string
        }
        interface example {
            [x:number]:Animal;//Error!“number”索引类型“Animal”不能分配给“string”索引类型“Dog”.
            [x:number]:Dog;//OK
            [x:string]:Dog
        }
        let d: Dog  = {
            color:'1',
            name:'1'
        }
        let e: example = {
            a:d
        }
        console.log(e['a'],e.a)// { color: '1', name: '1' }

   ```
   可以设置索引签名为只读,可以避免给索引赋值

 ```
 interface example {
     [x:number]:Dog;
     readonly [x:string]:Dog
 }
 let d: Dog  = {
     color:'1',
     name:'1'
 }
 let e: example = {
     a:d
 }
 e.b = d//error! 类型“example”中的索引签名仅允许读取.
 ```
 7. 类和接口
   1.类实现接口
   ```
    interface nameInfo {
        firstName: string;
        lastName: string,
        setName(firstName: string, lastName: string): any
    }
    class Person implements nameInfo {
        firstName: string;
        lastName: string;
        setName(f: string, l: string): any {
            this.firstName = f
            this.lastName = l
        }
        constructor(f:string,l:string){
            this.firstName = f
            this.lastName = l
        }
    }
    let p:Person = new Person('l','hc')
    console.log(p);//Person { firstName: 'l', lastName: 'hc' }
    p.setName('wade','dwyane')
    console.log(p); // Person { firstName: 'wade', lastName: 'dwyane' }
   ```
   2. 接口继承接口
   ```
    interface Cat {
        color: string
    }
    interface HomeCat {
        home: string
    }
    interface ShorFurCat extends Cat , HomeCat {
        name: string
    }
    let c = <ShorFurCat>{}
    c.name = 'nico'
    c.color = 'gray'
    c.home = 'cat-house'
    console.log(c);//{ name: 'nico', color: 'gray' , home: 'cat-house'}
   ```
   3. 混合类型
   一个对象可以同时具有上面提到的多种类型.比如一个对象可以同时作为函数和对象使用,下面代码,使得p既是一个函数也是一个对象.
   ```
    interface Person {
        (msg: string): void;
        myName: string;
        age: number;
    }
    function getPerson(): Person {
        let p = <Person>function (msg: string) {
            console.log(msg)
        }
        p.myName = 'lhc'
        p.age = 20
        return p
    }
    let p = getPerson()
    p('i am a function')//i am a function 
    console.log(p,p.myName,p.age);//[Function: p] { myName: 'lhc', age: 20 } lhc 20
   ```
   4. 接口继承类
   接口继承类之后,接口同样会继承private和protected的成员,但是这个<span style='color:red;font-weight:900'>接口只能被这被继承的类或这个被继承的类的子类实现.</span>.
   ```
    class A {
        private spell:string
    }

    interface Word extends A {
        show():void
    }

    //Ok！ 且Bb的实例都具继承有私有属性spell,因为它们都继承自基类A
    class Bb extends A implements Word {
        show(){

        }
    }

    //Ok! 且Cc的实例都具继承有私有属性spell,因为它们都继承自基类A
    class Cc extends A {
        
    }

    //Error! 虽然Dd实现了Word,并且Word继承了类A,但是因为Dd不是直接继承了基类A,所以会报错:类“Dd”错误实现接口“Word”.
    属性“spell”在类型“Word”中是私有属性,但在类型“Dd”中不是.如果不声明spell属性就会报错：类型 "Dd" 中缺少属性 "spell",但类型 "Word" 中需要该属性.
    class Dd implements Word {
        show(){

        }
        spell:string
    }
   ```
   上面代码,Dd并不是Aa类的子类,所以即使它实现了继承了A类的接口Word,也不能访问私有属性spell,只有Aa的子类Bb,Cc可以访问到私有属性spell.
   所以包含了私有和被保护属性或方法的类如果被某个接口继承了,那么只有这个类的子类,才能去实现继承了这个接口.



### 4.类

1. 修饰符(public,private,protected,readonly)
   1. 类的成员默认均是public的.
   2. private声明的成员不能在类的外部被访问,包括子类(派生类).
   3. protected声明的成员可以被子类访问到.
      1. 如果构造函数被声明为protected,那么这个类则不能在包含这个构造函数的类外面进行实例化,但是是可以被继承的.
   4. readonly关键字将属性设置为只读的, 只读属性必须在声明时或构造函数里被初始化.
   ```
        class People {
            public name: string
            protected age: number
            private cardPass: number
            readonly male: string
            say() {
                console.log(this.name);
            }
            getMyCarPassword() {
                console.log(this.cardPass);

            }
            protected constructor(name: string, age: number, cardPass: number, male: string) {
                this.name = name
                this.age = age
                this.cardPass = cardPass
                this.male = male
            }
        }
        class Women extends People {
            constructor(name: string, age: number, cardPass: number, male: string) {
                super(name, age, cardPass, male)
            }
            getMyCarPassword() {
                super.getMyCarPassword()
                //console.log(this.cardPass);//Error 属性“cardPass”为私有属性，只能在类“People”中访问

            }
            say() {
                console.log(this.age);
                super.say()
            }
        }
        //let p = new People('wade',20,123456) //Error 类“People”的构造函数是受保护的，仅可在类声明中访问。
        let aWomen = new Women('lhc', 20, 123456,'female')
        //aWomen.male = 'male' //Error 无法分配到 "male" ，因为它是只读属性
        aWomen.say()
   ```
2. 参数属性
   参数属性可以使我们在一个地方定义的同时并初始化一个成员，当使用修饰符在构造函数中声明时，可以认为声明并初始化了一个该成员。
   上面的People类可以写成下面这种形式，缩减了代码量
   ```
    class People {
            say() {
                console.log(this.name);
            }
            getMyCarPassword() {
                console.log(this.cardPass);

            }
            //该构造函数等同于用前面的修饰符声明并初始化了name,age,cardPass,male,四个变量
            constructor(public name:string,protected age:number,private cardPass:number, readonly male:string){}
    }
   ```
3. 存取器getters,setters
   1. 通过存取器来截取对对象成员的访问，可以有效的控制对对象成员的访问。
   2. 使用存取器需要将ts编译器设置为es5或更高.
      1. 编译指令 tsc xxxx.ts -t es5
   3. 若只设置了get而没设置set,则该属性则会被默认设置为readonly.
   ```
    class People {
        private _name: string
        get name(): string {
            return this._name
        }
        set name(name: string) {
            console.log('正在设置name')
            this._name = name
        }
    }
    let p = new People()
    p.name = '2314'
   ```

4. 静态属性
   1. 静态属性存在于类本身而不是实例上，访问静态属性可以用类名访问。
   ```
    class People {
        static legCount:number = 2
    }
    console.log(People.legCount);//2
   ```
5. 抽象类
   1. 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 不同于接口，抽象类可以包含成员的实现细节。 abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。
   2. 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方法的语法与接口方法相似。 两者都是定义方法签名但不包含方法体。 然而，抽象方法必须包含 abstract关键字并且可以包含访问修饰符。
   3. 抽象方法只能存在于抽象类中，等同于只要类中有抽象方法，那么类必须用abstract来修饰。
   ```
    abstract class People {
            abstract move():void
            foo(){
                console.log('foo')
            }
            constructor(public name:string){}
    }
     class Man extends People {
         constructor(name:string){
             super(name)
         }
         move(){
             console.log('move')
         }
         say(){
             console.log('say');
             
         }
     }
     let p:People //ok 允许创建一个对抽象类型的引用
     p = new Man('lhc')
     p.name//lhc
     p.move()//ok    
     p.foo()//ok
     //p.say() // error 方法在声明的抽象类中不存在
     //p = new People()//Error  无法创建抽象类的实例。 
   ```

6. 把类当做接口使用
   ```
    class People {
        constructor(public name:string,public age:number){}
    }
    interface Man extends People{
        male:string
    }
    let m:Man = {male:'man',name:'lhc',age:20}
   ```

### 5. 函数
1. 函数声明完整形式
   ```
    function foc(x:number,y:number):number {
        return x+y;
    }
   ```
2. 匿名函数完整形式
   ```
     let foo: (x: number, y: number) => number = function (a: number, b: number): number {
         return a + b;
     }
   ```
3. 推断类型
   如果在函数表达式一边指定了返回类型，另一半没有指定，则TypeScript编译器会自动识别类型
   ```
    let foo: (x: number, y: number) => number = function (a, b) {
         return a + b;
     }
4. 可选和默认参数
   在参数的函数名旁加一个?可以实现可选参数,可选参数必须跟在必须参数后面。
   如果有默认值的参数出现在必须参数的前面，必须传入undefined来获取默认值。
   ```  
    function add(c:number = 1,a?:number, b?: number) {
            return a + b?b:0 + c?c:0
    }
    add()
    function add1(c=1,a?:number, b?: number) {
        return a + b?b:0 + c?c:0
    }
    console.log(add1(undefined))//1
    console.log(add1()) // 1
   ```
5. 剩余参数
   在TypeScript中可以使用省略号将剩余变量收集到一个变量中
   ```
    function foa(a:number,b:number,...c: number[]){
            console.log(a,b,c)
    }
    foa(1,2,4,5,6,7) // 1,2,[4,5,6,7]
    foa(1,2) // 1,2,[]
    let ff:(a:number,b:number,...r:number[]) => void  = foa
    ff(1,2,3,4,5)
   ```
tips:
1. 不同文件的变量如果发生冲突,使用namespace将ts文件的代码包裹起来,可以避免冲突.
   ```
    //index.ts
    namespace classDemo1 {
        class People {
            name:string
            say(){
                console.log(this.name);
            }
            constructor(name:string){
                this.name = name
            }
        }
        let p = new People('lhc')
        p.say()
    }   

   ```