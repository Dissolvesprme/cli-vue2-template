/*
 * @FilePath: dataClass.js
 * @Author: JHui
 * @Date: 2022-10-11 10:42:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-03 10:28:11
 * @Descripttion: 数据结构类工具函数封装
 */

/**
 * @description: *过滤假值*
 * @param { Array } arr
 * @returns { Array }
 * @author: JHui
 */
export const rmFakeValue = arr => {
  return Array.prototype.filter.call(arr, Boolean);
};

// 创建一个纯净对象
/**
 * @description: * 创建一个对象*
 * @param {*} str  需要分割的字符串
 * @param {*} expectsLowerCase 是否需要小写转换
 * @returns {*}
 * 返回值是返回了一个函数，用来判断传进来的key是否在生成的map中。
 * Object.create(null)返回一个没有原型链的空对象，防止后续用来判断的key存在于原型链中。
 * @author: JHui
 */
export function makeMap(str, expectsLowerCase) {
  let map = Object.create(null);
  let list = str.split(',');
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) {
        return map[val.toLowerCase()];
      }
    : {
        function(val) {
          return map[val];
        }
      };
}

// 数组转数字
export const ArrayTONum = arr => {
  return Array.prototype.map.call(arr, Number);
};

// 计算数组平均值
export const average = arr => arr.reduce((a, b) => a + b) / arr.length;
average([1, 9, 18, 36]); //16

// 类数组转数字
export function toArray(list, start) {
  start = start || 0;
  let i = list.length - start;
  let ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

// 合并对象
export function extend(to, _from) {
  for (let key in _from) {
    to[key] = _from[key];
  }
  return to;
}

//将数组转对象
export function toObject(arr) {
  let res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}

// 统计数组成员个数
const arr = [0, 1, 1, 2, 2, 2];
export const count = arr.reduce((t, v) => {
  t[v] = t[v] ? ++t[v] : 1;
  return t;
}, {});
// count => { 0: 1, 1: 2, 2: 3 }

// 深拷贝
export function deepClone(data) {
  return JSON.parse(JSON.stringify(data));
}

// 乱序操作
export function chaotic(arr) {
  return arr.sort(() => 0.5 - Math.random());
}

// 去除数据
export function chao(str) {
  return str.replace(/\D/g, '');
}

// 精确小数
export const RoundNum = (num, decimal) =>
  Math.round(num * 10 ** decimal) / 10 ** decimal;
const num = RoundNum(1.69, 1);
// num => 1.7

// 转进制操作 用toString(2) toString(16)

// 节流函数
// export type Ithrottle = (this, fn: any, delay: number) => any;
export const throttle = function (fn, delay) {
  const that = this;
  let throttleTimer = Date.now();
  return function (...args) {
    let now = null;
    now || (now = Date.now());
    if (now - throttleTimer > delay) {
      fn.call(that, ...args);
      throttleTimer = now;
    }
  };
};

/**
 * @description: *sleep睡眠函數*
 * @param {*} time
 * @returns {*}
 * @author: JHui
 * @example
 * (async function() {
  console.log('Do some thing, ' + new Date());
  await sleep(3000);
  console.log('Do other things, ' + new Date());
  })();
 */
export function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

/**
 * @description: *获取数据的类型*
 * @param {*} obj
 * @returns {*}
 * @author: JHui
 */
export const getDataType = obj => {
  let type;
  if (obj === null) {
    return String(obj);
  }
  if (typeof obj === 'object') {
    type = Object.prototype.toString
      .call(obj)
      .replace('[object ', '')
      .replace(']', '')
      .toLowerCase();
  } else {
    type = typeof obj;
  }
  return type;
};

// 判断数据类型
export function DataType(tgt, type) {
  const dataType = Object.prototype.toString
    .call(tgt)
    .replace(/\[object (\w+)\]/, '$1')
    .toLowerCase();
  return type ? dataType === type : dataType;
}
// const flag = DataType(obj, "object") && !Object.keys(obj).length;

/**
 * @description: *扁平化数组转换成树形数组*
 * @param {* Array} data 获取数据
 * @param {* string} id id
 * @param {* string} pid 父id
 * @returns {* Array} 树形数组
 * @author: JHui
 */
export const getTreeData = (data, id = 'id', pid = 'pid') => {
  let cloneData = deepClone(data);
  return cloneData.filter(parent => {
    let branchArr = cloneData.filter(child => parent[id] == child[pid]);
    for (let i = 0; i < branchArr.length; i++) {
      branchArr.parent_nickname = parent_nickname; // 需要关联
    }
    branchArr.length > 0 ? (parent['children'] = branchArr) : '';
    return parent[pid] === null;
  });
};

// 队列
class LoopFn {
  constructor() {
    this._queue = [];
  }
  // 添加函数
  add(fn) {
    this._queue.push(fn);
  }
  // 移除函数
  remove(fn) {
    const index = this._queue.findIndex(e => e === fn);
    this._queue.splice(index, 1);
  }
  // 触发队列
  trigger() {
    this._queue.forEach(e => e());
  }
}
export default new LoopFn();

/*
 * * 反转字符串
 */
const reverse = str => str.split('').reverse().join('');
reverse('this is reverse');
// esrever si siht
