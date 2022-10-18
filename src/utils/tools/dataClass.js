/*
 * @FilePath: dataClass.js
 * @Author: JHui
 * @Date: 2022-10-11 10:42:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-18 17:55:52
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

// 数组转数字
export const ArrayTONum = arr => {
  return Array.prototype.map.call(arr, Number);
};

// 深拷贝
export function deepClone(data) {
  return JSON.parse(JSON.stringify(data));
}

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
