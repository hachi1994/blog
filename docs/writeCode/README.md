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
    ```javascript
    function throttle(fn,wait){
        let pre = 0
        return function(){
            let context = this
            let now = Date.now()
            let args = [...arguments]
            debugger
            if(now - pre >= wait){
                fn.call(context,args)
                pre = now
            }
        }
    }
    ```
2. 防抖
   ```
   function debounce (fn, wait, immediate) {
        let timer = null
        return function () {
            let args = [...arguments]
            if (timer) clearTimeout(timer)
            if (!timer && immediate) {
                fn.call(this, args)
            }
            timer = setTimeout(() => {
                fn.apply(this, arguments)
            }, wait);
        }
    }
   ```
3. 数组扁平化
   ```javascript
    function flatten(arr: any[]): any[] {
            return arr.reduce((result, currentvalue) => {
                return result.concat(Array.isArray(currentvalue) ? flatten(currentvalue) : currentvalue)
            }, [])
        }
        let arr = flatten([[1, 2, 3], [4, 5, [5.1, 5.2]], 6, 7])
        console.log(arr)
   ```
4. 数组去重
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
5. 深拷贝 浅拷贝
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

   6. 怎么取消Promise 
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

