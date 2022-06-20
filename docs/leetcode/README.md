---
tlayout: post
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
   ```javascript
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



##  [1. 两数之和(Map)](https://leetcode.cn/problems/two-sum/)

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

**示例**

输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

### 解法一:暴力循环

```javascript
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

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) { 
    //声明一个map
    let m = new Map()
    //遍历数组
    for(let i = 0;i<nums.length;i++){
        //如果map中存在以 要求的和-当前元素的值 为key的元素,则返回这两个元素的index,否则把当前元素作为key,索引作为值加入map
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

```javascript
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

```javascript
var isPalindrome = function(x) {
   return x.toString() === x.toString().split('').reverse().join('')
}
```

## [3. 罗马数字转整数(Map)](https://leetcode.cn/problems/roman-to-integer/)

### 解法:利用map,有限匹配2个字符,否则匹配一个字符

```javascript
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
        //匹配两个字符的,否则匹配一个字符的.
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

## [4. 有效的括号(栈 Map)](https://leetcode.cn/problems/valid-parentheses/)

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。

思路:将字符串从头到尾进行遍历,如果字符串满足条件,那么必然左侧括号会有一个右侧符号进行对应,可以利用栈的后进先出原则,若没匹配到则将该符号进栈,若匹配到则出栈,最后栈的长度若为0,则满足条件.

<img src='./4_1.png'></img>

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    //字符串长度不为偶数或为空字符串,则直接返回
    if (s.length % 2 !== 0 || !s) return false
    //声明符号匹配map,因为是用栈,所以是符号后半部分来匹配前半部分
    let m = {
        ')': '(',
        '}': '{',
        ']': '['
    }
    //声明栈
    let stack = []
    //声明当前匹配的字符
    let current = null
    //声明栈顶元素
    let top = stack[0]
    //从头遍历字符串
    for (let i = 0; i < s.length; i++) {
        //当前元素
        current = s[i]
        //栈顶元素若不存在则为null
        top = stack[stack.length - 1] || null
        //若栈顶元素能和当前元素在m中的对应元素匹配,则将栈顶元素出栈,否则入栈.
        if (m(current) === top) {
            stack.pop()
        } else {
            stack.push(current)
        }
    }
    return stack.length === 0
}
```



## [5. 删除有序数组中的重复项(快指针,慢指针)](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/)

给你一个 升序排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。元素的 相对顺序 应该保持 一致 。

由于在某些语言中不能改变数组的长度，所以必须将结果放在数组nums的第一部分。更规范地说，如果在删除重复项之后有 k 个元素，那么 nums 的前 k 个元素应该保存最终结果。

将最终结果插入 nums 的前 k 个位置后返回 k 。

不要使用额外的空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。



输入：nums = [0,0,1,1,1,2,2,3,3,4]
输出：5, nums = [0,1,2,3,4]
解释：函数应该返回新的长度 5 ， 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4 。不需要考虑数组中超出新长度后面的元素。

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    //声明一个慢指针
    let i = 0
    //用快指针j遍历数组
    for(let j =1;j<nums.length;j++){
        //比较快指针和慢指针对应的数组值,如果快指针和慢指针对应的值不相等,慢指针+1,用快指针的值替换
        if(nums[i]!==nums[j]){
            i++
            nums[i] = nums[j]
        }
    }
    //只返回项目不重复部分的长度
    return i+1

};
```

## [6. 删除数组重复项(双指针,splice)](https://leetcode.cn/problems/remove-element/)



给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。

不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。

元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。



输入：nums = [0,1,2,2,3,0,4,2], val = 2
输出：5, nums = [0,1,4,0,3]
解释：函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。注意这五个元素可为任意顺序。你不需要考虑数组中超出新长度后面的元素。

### 解法1:遍历数组通过splice删除重复项,要对当前索引进行操作

```javascript
var removeElement = function(nums, val) {
    for(let i = 0;i<nums.length;){
        if(nums[i]==val){
       		//删除一个元素同时指针向前移避免遗漏元素
            nums.splice(i,1)
            i--;
        }else {
        	//正常递增
            i++
        }
    }
    return nums.length
};

```

### 解法2:删除指定元素,直到数组中不在存在该元素

```javascript
var removeElement = function(nums, val) {
	//声明指针
    let index;
    while(true){
    	//获取指定元素在数组中的位置
        index = nums.indexOf(val)
        //不存在则跳出循环
        if(index===-1)break
        //存在则删除指定项
        nums.splice(index,1)
    }
    return nums.length
};
```

## [7. 分隔链表](https://leetcode.cn/problems/partition-list/)

给你一个链表的头节点 head 和一个特定值 x ，请你对链表进行分隔，使得所有 小于 x 的节点都出现在 大于或等于 x 的节点之前。

你应当 保留 两个分区中每个节点的初始相对位置。

```
输入：head = [1,4,3,2,5,2], x = 3
输出：[1,2,2,4,3,5]
输入：head = [2,1], x = 2
输出：[1,2]
```

**提示：**

- 链表中节点的数目在范围 `[0, 200]` 内
- `-100 <= Node.val <= 100`
- `-200 <= x <= 200`



### 解法:双指针配合虚拟头节点.

```typescript
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function partition(head: ListNode | null, x: number): ListNode | null {
    //声明两个虚拟头节点
    let r1:ListNode = new ListNode(-1);
    let r2:ListNode = new ListNode(-1);
    //定义两个结果链表的指针
    let p1:ListNode = r1;
    let p2:ListNode = r2;
    //从给定链表的头节点开始遍历
    let h = head;
    while(h!==null){
        //如果给定链表当前节点值小于特定值,则把该节点接到r1中同时p1指针后移,反之接到r2中,p2指针后移
        if(h.val < x){
            p1.next = h;
            p1 = p1.next;
        }else {
            p2.next = h;
            p2 = p2.next;
        }
        //原链表进行断链.
        let temp:ListNode = h.next;
        h.next = null;
        h = temp;
    }
    //对两个结果链表进行连接,p1代表结果链表1的尾,r2代表结果链表2的头.
    p1.next = r2.next;
    return r1.next;
};
```

## [8. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/)

将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

```
输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]
输入：l1 = [], l2 = []
输出：[]
输入：l1 = [], l2 = [0]
输出：[0]
```

### 解法:虚拟头节点生成新链表

```typescript
    /**
     * Definition for singly-linked list.
     * class ListNode {
     *     val: number
     *     next: ListNode | null
     *     constructor(val?: number, next?: ListNode | null) {
     *         this.val = (val===undefined ? 0 : val)
     *         this.next = (next===undefined ? null : next)
     *     }
     * }
     */

    function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
        //声明结果链表的虚拟头节点
        let result: ListNode = new ListNode(-1);
        //声明结果链表的指针
        let r1: ListNode = result;
        //声明两个升序链表的指针
        let p1: ListNode = list1;
        let p2: ListNode = list2;
        //如果两个指针均不为null,则对两个节点的值进行比较,将小的那个节点接到新链表上.
        while (p1 && p2) {
            if (p1.val <= p2.val) {
                r1.next = p1;
                p1 = p1.next;
            } else {
                r1.next = p2;
                p2 = p2.next;
            }
            r1 = r1.next;
        }
        //当任一一指针为null,则表示有一个链表已经到头,则直接将另一个链表接到结果链表中.
        if (p1 === null) {
            r1.next = p2;
        }
        if (p2 === null) {
            r1.next = p1;
        }
        //返回结果链表,不要返回虚拟的头节点.
        return result.next;
    };
```

