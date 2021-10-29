---
layout: post
title: LeetCode 每日一题
date: 2021-06-11
tags:
 - 基础
categories:
 - 基础
---
## 1️⃣ var a = 10 ; a ^= (1<<4) - 1;

1. js进行进制之间的转换。
```
  //将十进制的数字2转换成2进制，并转换成字符串, 
  parseInt(2,10).toString(2) // '10'
  parseInt('10',2).toString(10) // '2'
  //将十进制的数字转成2进制的字符串
  let num = 10
  num.toString(2) // '1010'  
```
2. 位运算符
<table border="1">
  <tr>
    <th>运算符</th>
    <th>名称</th>
    <th>描述</th>
    <th>操作</th>
    <th>结果</th>
    <th>等同于</th>
    <th>结果</th>
  </tr>
  <tr>
    <td>&</td>
    <td>AND</td>
    <td>如果两位均为1，则设置每位均为1</td>
    <td>1&5</td>
    <td>1</td>
    <td>0001 & 0101</td>
    <td>0001</td>
  </tr>
  <tr>
    <td>|</td>
    <td>OR</td>
    <td>如果有一位为1，则设置每位均为1</td>
    <td>1|5</td>
    <td>1</td>
    <td>0001 | 0101</td>
    <td>5</td>
  </tr>
  <tr>
    <td>^</td>
    <td>XOR</td>
    <td>如果两位只有一位为1，则设置每位为1</td>
    <td>1^5</td>
    <td>4</td>
    <td>0001 | 0101</td>
    <td>0100</td>
  </tr>
  <tr>
    <td>~</td>
    <td>NOT</td>
    <td>反转所有位数</td>
    <td>~5</td>
    <td>10</td>
    <td>~0101</td>
    <td>1010</td>
  </tr>
  <tr>
    <td><<</td>
    <td>零填充左移</td>
    <td>通过从右推入零向左位移，并使最左边的位脱落。
    </td>
    <td>5 << 1 </td>
    <td>10</td>
    <td>0101 << 1 </td>
    <td>1010</td>
  </tr>
  <tr>
    <td>>></td>
    <td>有符号右移</td>
    <td>通过从左推入最左位的拷贝来向右位移，并使最右边的位脱落。
    </td>
    <td>5 >> 1 </td>
    <td>2</td>
    <td>0101 >> 1 </td>
    <td>0010</td>
  </tr>
  <tr>
    <td>>>></td>
    <td>零填充右移</td>
    <td>通过从左推入零来向右位移，并使最右边的位脱落。
    </td>
    <td>5 >>> 1 </td>
    <td>2</td>
    <td>0101 >> 1 </td>
    <td>0010</td>
  </tr>
</table>

3. 解答： 1 << 4 => 1* Math.pow(2,4) = 16 => 16-1 = 5; 10 ^ 15 => 1111 ^ 1010 = 0101 = 5

## 2️⃣ 找出所有子集的异或总和再求和

一个数组的 异或总和 定义为数组中所有元素按位 XOR 的结果；如果数组为 空 ，则异或总和为 0 。

例如，数组 [2,5,6] 的 异或总和 为 2 XOR 5 XOR 6 = 1 。
给你一个数组 nums ，请你求出 nums 中每个 子集 的 异或总和 ，计算并返回这些值相加之 和 。

注意：在本题中，元素 相同 的不同子集应 多次 计数。

数组 a 是数组 b 的一个 子集 的前提条件是：从 b 删除几个（也可能不删除）元素能够得到 a 。

1. 利用二进制求子集，一直一个数组的子集数量必然是2的n次方。
2. 采用二进制的思路，全0对应空集，全1对应全集
3. 根据数组长度决定二进制位数
4. 遍历二进制各值，使用按位与操作符，生成数组的子集
   ```
    var subsetXORSum = function(nums) {
            let sum = 0;
            len = nums.length;
            for (let i = 0; i < (1 << len); i++) {
                let arr = [];
                for (let j = 0; j < len; j++) {
                    if (i & (1 << j)) arr.push(nums[j]);
                }
                if(arr.length==0){sum += 0}else {
                    sum += arr.reduce((n,p)=> n^p)
                }
                // res.push(arr);
            }
            // return res;
            return sum;
        
    };
   ```