---
title: js的六种继承方式
date: 2021-11-26
tags:
 - JavaScirpt
categories:
 - JavaScirpt
---

1. 原型链继承
   ```
    function Person(name){
        this.name = name
        this.say(){
            console.log(this.name)
        }
    }
    function Man_prototype_extend(age){
        this.age =age
    }
    Man.prototype = new Person('lhc')
    let man_1 = new Man_prototype_extend(20)
    man_1.age //20
    man_1.name //lhc
    man_1.say()//ok
   ```
   1. 重点：让新实例的原型等于父类的实例。、
   2. 特点：
      1. 实例可继承的属性有：实例的构造函数的属性，父类构造函数属性，父类原型的属性。（新实例不会继承父类实例的属性！）
   3. 缺点：
      1. 新实例无法向父类构造函数传参。
      2. 继承单一。
      3. 所有新实例都会共享父类实例的属性。（原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改！）

================================================

2. 借用构造函数式继承
   ```
    function Person(name){
        this.name = name
    }
    function Man(age,name){
        Person.call(this,name)
        //Person.apply(this,[name])
        this.age = age
    }
    let man_1 = new Man(20,'lhc')
    let man_2 = new Man(30,'wade')
    man_1.age //20
    man_1.name // lhc
    man_2.age // 30
    man_2.name //wade
    //为父类的原型的属性赋值，但是子类的实例不能访问到父类原型的属性
    Person.prototype.home = 'earth'
    man_1.home //undefined
    man_2.home //undefined
   ```
   1. 重点：用.call()和.apply()将父类构造函数引入子类函数（在子类函数中做了父类函数的自执行（复制））
      1. 特点：
         1. 只继承了父类构造函数的属性，没有继承父类原型的属性。
         2. 解决了原型链继承缺点1、2、3。
         3. 可以继承多个构造函数属性（call多个）。
         4. 在子实例中可向父实例传参。
      2. 缺点：
         1. 只能继承父类构造函数的属性。
         2. 无法实现构造函数的复用。（每次用每次都要重新调用）
         3. 每个新实例都有父类构造函数的副本，臃肿。

================================================
3. 组合继承（组合原型链继承和借用构造函数继承）（常用）
   ```
    function Person(name){
        this.name = name
    }
    function Man(age,name){
        Person.call(this,name)
        this.age = age
    }
    Man.prototype = new Person()
    let man_1 = new Man(20,'lhc')
    man_1.age //20
    man_1.name // lhc
    //为父类的原型的属性赋值，子类可以访问到父类原型的属性了
    Person.prototype.home = 'earth'
    man_1.home // earth
   ``` 
   1. 重点：结合了两种模式的优点，传参和复用
      1. 特点：
         1. 可以继承父类原型上的属性，可以传参，可复用。
         2. 每个新实例引入的构造函数属性是私有的。
      2. 缺点：
         1. 调用了两次父类构造函数（耗内存），子类的构造函数会代替原型上的那个父类构造函数。


================================================

4. 原型式继承 
   ```
    function Person(name){

        this.name = name
    }
    function content(obj){
        let F = function(){}
        F.prototype = obj
        return new F()
    }
    let man_1 = new Person('lhc')
    let man_2 = content(man_1)
    man_2.name//lhc
   ```
   1. 重点：用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象。object.create()就是这个原理。
   2. 特点：类似于复制一个对象，用函数来包装。
   3. 缺点：
      1. 所有实例都会继承原型上的属性。
      2. 无法实现复用。（新实例属性都是后面添加的）
        
================================================
5. 寄生式继承
   ```
   function Person(name){

        this.name = name
    }
    function content(obj){
        let F = function(){}
        F.prototype = obj
        return new F()
    }
    //给原型式继承套一个壳子，可以传参
    function subObject(obj){
        let sub = content(obj)
        sub.car = 'benz'
    }
    let man_1 = new Person('lhc')
    let man_2 = subObject(man_1)
    man_1.car//'benz'
   ```
   1. 重点：就是给原型式继承外面套了个壳子。
   2. 特点：没有创建自定义类型，因为只是套了个壳子返回对象（这个），这个函数顺理成章就成了创建的新对象。
   3. 缺点：没用到原型，无法复用。

================================================

6. 寄生组合式继承（常用）
   寄生：在函数内返回对象然后调用
　 组合：1、函数的原型等于另一个实例。2、在函数中用apply或者call引入另一个构造函数，可传参　
   ```  
   function Person(name){
       this.name = name
   }
   function content(obj){
        let F = function(){}
        F.prototype = obj
        return new F()
    }
    function Sub(name){
        Person.call(this,..args)
    }
    let man_1 = content(Person.prototype)
    Sub.prototype = man_1
    man_1.constructor = Sub
    Person.prototype.haha = 1
    let man_2 = new Sub('lhc')
    man_2.name //lhc
    man_2.haha //1

    

   ```
   1. 重点：修复了组合继承的问题
