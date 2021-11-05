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
   5. 元组 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
   ```
    let a: [string, number]
    a = ['abc', 20]
    console.log(a[0])//'abc'
    //访问越界的元素，会使用联合类型来替代
    a[10] = true //错误，因为true是boolean，并不是(string|number)类型
    a[9] = 10 //正确，因为10是number属于(string|number)类型
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
undefined和null是所有类型的子类型，所以可以把null和undefined赋值给任意类型，但是不建议这么做，建议使用时配合联合类型使用(string|null|undefined)。
   ```
   let n: null = null
   let u :undefined = undefined

   ```
   10. never 
    表示永远无法达到的类型，例如函数抛出错误，never是任何类型的子类型可以赋值给任意类型，但是任何类型不可赋值给never类型。
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
     表示除number，string，boolean，symbol，null或undefined之外的类型，使用object类型，就可以更好的表示像Object.create这样的API
     ```
     declare function create(o: object | null): void
     create({ name: 'lhc' })
     ```
     12. 类型断言
     当开发者更加清楚某个实现具有的类型时，可以进行类型的转换。两种使用方法一种是尖括号包含类型，一种是as，在TypeScript中使用JSX只支持as形式
     ```
        let str: any = 'i am lhc'
        let strLength: number = (str as string).length // 8 
        let strLength_1: number = (<string>str).length // 8
     ```
### 2. 变量声明
