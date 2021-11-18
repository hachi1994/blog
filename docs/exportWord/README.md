---
title: 前端文件流导出为Word
date: 2021-11-20
tags:
 - JavaScript
categories:
 - JavaScript
---

### 前端将后台返回的文件流导出为Word文件
```
    fetch('/api/pressure_test/get_word_report_stream',{
        method: "GET",
        headers: {
            'Content-Type': "application/octet-stream;charset=UTF-8",
        },
        responseType: 'blob', //blob获取二进制流
    }).then(response => {
        return response.blob()
    }).then(res => {
        const a = document.createElement('a');
        const body = document.querySelector('body');
        let bl = new Blob([res], {type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"}); 
        a.download = 'name.doc';
        a.href = window.URL.createObjectURL(bl);
        a.style.display = 'none';
        body.appendChild(a)
        a.click()
        body.removeChild(a);
        window.URL.revokeObjectURL(a.href);
    })
```