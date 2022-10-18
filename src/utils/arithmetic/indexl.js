/*
 * @FilePath: indexl.js
 * @Author: JHui
 * @Date: 2022-10-11 15:09:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-11 16:05:18
 * @Descripttion: 日常算法
 */

// 两数之和
/*
 */
const twoSum = function (nums, target) {
  let hash = {};
  for (let i = 0; i < nums.length; i++) {
    if (hash[target - nums[i]] !== undefined) {
      return [i, hash[target - nums[i]]];
    }
    hash[nums[i]] = i;
  }
  return [];
};

// 判断回文数
const isPalindrome = function (x) {
  return String(x) === String(x).split("").reverse().join("") ? true : false;
};

// 罗马字符转整数
const romanToInt = function (s) {
  let obj = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let num = 0;
  for (let i = 0; i < s.length; i++) {
    // 三元需要判断是否越界
    obj[s[i]] < obj[s[i + 1]]
      ? // obj[s[i]] < obj[s[i + 1]] && s[i + 1]
        (num -= obj[s[i]])
      : (num += obj[s[i]]); // 大的在右边就是 - ；左边为 +
  }
  return num;
};

// 最长公共前缀  通过过滤每个值
const longestCommonPrefix = function (strs) {
  if (strs.length) {
    var res = "";
    for (var i = 0; i < strs[0].length; i++) {
      var temp = strs[0][i];
      if (
        strs.every((el) => {
          return el.charAt(i) === temp;
        })
      ) {
        res += temp;
      } else break;
    }
    return res;
  }
  return "";
};

/**
 * @description: *有效的括号*  通过栈的出入判断
 * @param {*} s
 * @returns {*}
 * @author: JHui
 *
 */
const isValid = function (s) {
  if (s % 2 === 1) return false;
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const leftData = s[i];
    if (leftData === "(" || leftData === "{" || leftData === "[") {
      stack.push(leftData);
    } else {
      const rightData = stack[stack.length - 1];
      if (
        (rightData === "(" && leftData === ")") ||
        (rightData === "{" && leftData === "}") ||
        (rightData === "[" && leftData === "]")
      ) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
};
