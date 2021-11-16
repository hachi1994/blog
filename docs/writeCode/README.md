---
title: 手写代码系列
date: 2021-11-20
tags:
 - JavaScript
categories:
 - JavaScript
---

### 手写代码

1. 节流
    ```
    let throttle = function(fn=()=>{},wait=0){
        let per = 0
        return function(...args){
            let now = Date.now()
            if(now - per >= wait){
                fn.call(this,...args)
                per = now
            }
        }
    }
    ```
2. 防抖
   ```
   let debounce = function(fn=()=>{},wait=0,immediate =false){
    let timer = null
        return function(...args){
            if(timer) clearTimeout(timer)
            if(immediate&&!timer){
                fn.call(this,args)

            }
            timer = setTimeout(() => {
                fn.apply(this,args)
            }, wait);
        }
    } 
   ```
3. 数组扁平化
   ```
    function flatten(arr: any[]): any[] {
            return arr.reduce((result, currentvalue) => {
                return result.concat(Array.isArray(currentvalue) ? flatten(currentvalue) : currentvalue)
            }, [])
        }
        let arr = flatten([[1, 2, 3], [4, 5, [5.1, 5.2]], 6, 7])
        console.log(arr)
   ```
4. 数组去重
   ```
    let singleArr: any[] = [1, 2, 3, 3, 4, 2, 5]
    let objArr: any[] = [{ name: 'lhc', age: 20 }, { name: 'abc', age: 23 }, { name: 'cde', age: 20 }]
    let hasO:object = {}
    let newArr = objArr.reduce((result,current)=>{
        hasO[current.age]?'':hasO[current.age] = true && result.push(current)
        return result
    },[])
    console.log([...new Set(singleArr)],newArr)
   ```
5. 深拷贝 浅拷贝
   ```
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
