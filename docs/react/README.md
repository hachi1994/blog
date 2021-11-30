---
title: React
date: 2021-11-20
tags:
 - React
categories:
 - React
---

### 手写代码

1. 在React中使用节流与防抖
   ```
   function debounce(fn, wait, immediate) {
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
    function throttle(fn, wait) {
        let pre = 0
        return function () {
            let context = this
            let now = Date.now()
            let args = [...arguments]
            if (now - pre >= wait) {
            fn.call(context, args)
            pre = now
            }
        }
    }
   class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        count: 0
        }
        this.f = throttle(this.f, 2000)
    }
    o = () => {
        this.f()
    }
    f = () => {
        let newCount = this.state.count + 1
        this.setState({
            count: newCount
        })
    }
    render() {
        let { count } = this.state
        return (
        <div>
            {count}
            <div onClick={this.o}>add</div>
        </div>
        )
    }
    }
   ```