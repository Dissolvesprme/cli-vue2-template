/*
 * @FilePath: .prettierrc.js
 * @Author: JHui
 * @Date: 2022-10-18 10:29:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-18 10:29:55
 * @Descripttion:
 */
module.exports = {
  jsxSingleQuote: true,
  arrowParens: 'avoid', // 箭头函数会自动判断 是否添加圆括号
  endOfLine: 'lf', // 采用lf 换行机制
  jsxBracketSameLine: false, // jsx换行时 尖括号放后面
  printWidth: 80, // 一行的字符数，如果超过会进行换行，默认为260
  semi: true, // 尾部是否具有分号
  singleQuote: true, // 是否使用单引号
  requireConfig: true,
  bracketSpacing: true, // 对象中是否使用空格
  tabWidth: 2, // tab缩进大小,默认为2
  useTabs: false, // 是否使用tab 作为缩进
  trailingComma: 'none' // 对象字面量结尾是否使用逗号
};
