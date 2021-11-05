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
            fn.call(this,args)
        }, wait);
    }
} 
   ```
