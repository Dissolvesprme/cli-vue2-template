/*
 * @FilePath: tool.js
 * @Author: JHui
 * @Date: 2022-09-09 15:41:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-05 16:26:17
 * @Descripttion: 工具类函数
 */

// 多行注释 ctrl + shift + /
/**
 * * dsad
 * ! dsas
 * ? 蓝
 * todo  dna
 * @param mg thedadjksjadh
 */

/**
 * * 判断是否为生产环境
 */
export const isProd = () => {
  return process.env.NODE_ENV === 'production';
};

/**
 * * 日期时间补0
 */
export const supZero = value => {
  return Number(value) < 10 ? '0' + value : value;
};
//

/**
 *!涉及String类型的函数处理
 */

/**
 * * 补双零 （扩展自定义几个零）
 */
export function padZero(str, inp = '0', num = 1, position = 'start') {
  return position === 'start'
    ? str.toString().padStart(num, inp)
    : str.toString().padEnd(num, inp);
}
// 补双零
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

/**
 * * 格式化金钱
 */
export const formatMoney = money => {
  return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * * 生成随机ID
 * id => "jg7zpgiqva" const id = RandomId(10);
 */
export const RandomId = len => Math.random().toString(36).substr(3, len);
/**
 * * 生成星级评分
 *  start => "★★★"
 *  const start = StartScore(3);
 */
export const StartScore = rate => '★★★★★☆☆☆☆☆'.slice(5 - rate, 10 - rate);

/**
 * * 操作URL查询参数
 */
const params = new URLSearchParams(location.search.replace(/\?/gi, '')); // location.search = "?name=young&sex=male"
params.has('young'); // true
params.get('sex'); // "male"

/**
 * * 创建时间戳
 * 出参格式 xxxx-xx-xx 　xx:xx:xx
 */
export const formatDateTime = value => {
  let date = new Date(value);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d = date.getDate();
  d = d < 10 ? '0' + d : d;
  let h = date.getHours();
  h = h < 10 ? '0' + h : h;
  let minute = date.getMinutes();
  let second = date.getSeconds();
  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;
  return y + '-' + m + '-' + d + ' ' + '　' + h + ':' + minute + ':' + second;
};

/**
 * @description: *将时间戳转换为指定格式的日期；入参可以是秒级时间戳、毫秒级时间戳；*
 * @param {*} date 传入的时间戳  Date | Number
 * @param {* string} formatStr
 * @returns {*} 返回格式化后的秒级时间戳 - Number
 * @author: JHui
 * @example
 * formatDate(1658320372161) // 2022-07-20 20:32
 * format(1658320372, 'yyyy-MM-dd HH:mm') // 1970-01-20 12:38
 * formatDate(1658320372) // 2022-07-20 20:32
 * formatDate(new Date()) //  2022-07-21 11:28
 * formatDate(1658320372000, 'yyyy/MM/dd HH:mm:ss') // 2022/07/20 20:32:52
 */
export const formaData = (date, formatStr = 'yyyy-MM-dd HH:mm') => {
  if (typeof date === 'number' && date.toString().length === 10) {
    return format(date * 1000, formatStr);
  } else {
    return format(date, formatStr);
  }
};
/**
 * * 日期自定义规格化
 *!入参格式(注意大小写) yyyy-MM-dd hh:mm:ss
 */
export const format = (date, fmt) => {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
};

/**
 * * 预览富文本中的图片
 */
export const addRandomAndGetPreviewImageUrlsFromRichText = html => {
  // 如果没有值的话，直接返回
  if (!html) {
    return html;
  }

  let randomIndex = 0;
  let imgUrls = [];
  // 先匹配到 img 标签，放到 match 里
  html = html.replace(/<img[^>]*>/gim, function (match) {
    randomIndex++;
    match = match
      .replace(/src="[^"]+"/gim, function (match) {
        // 再匹配到 src 标签 '"'
        let src = match.slice(5, -1) + '?random=' + randomIndex; // 取到 src 里面的 url
        imgUrls.push(src);
        return 'src="' + src + '"';
      })
      .replace(/src='[^']+'/gim, function (match) {
        // 再匹配到 src 标签 "'"
        let src = match.slice(5, -1) + '?random=' + randomIndex;
        return "src='" + src + "'";
      });

    return match;
  });
  return [html, imgUrls];
};

/**
 * * 身份证号脱敏
 */
export const getcard = card => {
  return card.replace(card.substring(4, 15), '*******');
};

/**
 * * 是否为移动端
 */
export const isMobile = () => {
  // const ua = navigator.userAgent.toLowerCase();
  // const isWXWork = ua.match(/wxwork/i) === 'wxwork';
  // const isWeixin = !isWXWork && ua.match(/micromessenger/i) === 'micromessenger';
  let isMobile = false;
  // let isDesktop = false;
  if (
    navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|IEMobile)/i
    )
  ) {
    isMobile = true;
  }
  return isMobile;
  // return isMobile;
};

/**
 * * 表情转码
 * @param {string} str  需要转码的表情
 * @return {string} 转码后的字符串
 */
export function utf16toEntities(str) {
  const patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
  str = str.replace(patt, char => {
    let H, L, code, s;
    if (char.length === 2) {
      H = char.charCodeAt(0); // 取出高位
      L = char.charCodeAt(1); // 取出低位
      code = (H - 0xd800) * 0x400 + 0x10000 + L - 0xdc00; // 转换算法
      s = `&#${code};`;
    } else {
      s = char;
    }
    return s;
  });
  return str;
}
/**
 * * 表情解码
 * @param {string} str  需要解码的字符串
 * @return {string} 转码后的表情
 */
export function entitiestoUtf16(strObj) {
  const patt = /&#\d+;/g;
  const arr = strObj.match(patt) || [];
  let H, L, code;
  for (let i = 0; i < arr.length; i += 1) {
    code = arr[i];
    code = code.replace('&#', '').replace(';', '');
    // 高位
    H = Math.floor((code - 0x10000) / 0x400) + 0xd800;
    // 低位
    L = ((code - 0x10000) % 0x400) + 0xdc00;
    code = `&#${code};`;
    const s = String.fromCharCode(H, L);
    strObj = strObj.replace(code, s);
  }
  return strObj;
}

/**
 * ! 代码简化
 */
// 当某个值于多个值进行|| 对比时
// [undefined, 10, 15, null].includes(a)

// parent && parent.child && parent.child.child1 && parent.child.child1.child2
// 等价于
// parent?.child?.child1?.child2

// 可用空值合并运算符
// a ?? fn();

// 数字取整
// parseInt() Math.floor() ~~
//  + 转数字
// 代替正数的Math.floor()，代替负数的Math.ceil()
// const num1 = ~~ 1.69;
// const num2 = 1.69 | 0;
// const num3 = 1.69 >> 0;
// num1 num2 num3 => 1 1 1

// 判断空对象
// Object.keys(obj).length === 0
// const flag = Array.isArray(arr) && !arr.length;

// 查找数组最后一个
// arr.at(-1)

// 转布尔值  乘方Math.pow()
// ！！      4 ** 3 = 64

// 注意 parseInt('18') === parseInt('18 years old') 是为true的
