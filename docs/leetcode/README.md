---
layout: post
title: LeetCode 每日一题
date: 2021-06-11
tags:
 - 基础
categories:
 - 基础
---
## var a = 10 ; a ^= (1<<4) - 1;

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

## 找出所有子集的异或总和再求和

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



##  [1. 两数之和](https://leetcode.cn/problems/two-sum/)

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

**示例**

输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

### 解法一:暴力循环

```
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    for(let i = 0;i< nums.length;i++){
        for(let j = i+1;j<nums.length;j++){
            if(nums[i]+nums[j]===target){
                return [i,j];
            }
        }
    }
    return resultArr;
};
```

### 解法二:暴力循环使用js的Map模拟hashMap,用空间换时间.

```
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) { 
    let m = new Map()
    for(let i = 0;i<nums.length;i++){
        if(m.has(target - nums[i])){
            return [m.get(target-nums[i]),i]
        }else {
            m.set(nums[i],i)
        }
    }
    return [];
};
```






## [2. 回文数](https://leetcode.cn/problems/palindrome-number/)

给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。

回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

例如，121 是回文，而 123 不是。

### 解法一:数组反转一起遍历

```
var isPalindrome = function(x) {
   let a1 = x.toString().split("");
   let a2 = x.toString().split("").reverse()
   let flag = true
   for(let i = 0;i<a1.length;i++){
       if(a1[i] !== a2[i]){flag = false;}
   }
   return flag
}
```

### 解法二:转字符串转数组取反在对比

```
var isPalindrome = function(x) {
   return x.toString() === x.toString().split('').reverse().join('')
}
```

## [3. 罗马数字转整数](https://leetcode.cn/problems/roman-to-integer/)

### 解法:利用map,有限匹配2个字符,否则匹配一个字符

```
var romanToInt = function(s) {
    // let m = new Map() 
    let result = 0;
    const m = {
        I : 1,
        IV: 4,
        V: 5,
        IX: 9,
        X: 10,
        XL: 40,
        L: 50,
        XC: 90,
        C: 100,
        CD: 400,
        D: 500,
        CM: 900,
        M: 1000
    };
 
    for(let i = 0;i<s.length;){
        if(i<s.length-1&&m[s.substring(i,i+2)]){
            result+= m[s.substring(i,i+2)]
            i+=2
        }else{
            result+= m[s.substring(i,i+1)]
            i++
        }
    }
    return result;
};
```

