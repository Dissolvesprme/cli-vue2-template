import Vue from 'vue';
import { upperFirst, camelCase } from 'lodash';
import { getDataType } from '@/utils/tools/dataClass.js';
import * as echarts from 'echarts';

// let globle = {
//   req: process.env.VUE_APP_BASE_API,
//   url: ''
// };

// 添加echarts
Vue.prototype.$echarts = echarts;

// event bus
export const EventBus = new Vue();
// var bus = new Vue();
// Vue.prototype.$EventBus = bus;
// Vue.prototype.bus = bus;

// 注册全局组件
const files = require.context(
  // 查询组件目录路径
  '@/components',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /\/index\.vue$/
);

const filesPath = files.keys();
filesPath.map(file => {
  const component = files(file).default;
  if (component && component.name) {
    Vue.component(component.name, component);
  }
});

// 过滤数据
// Object.keys(globle).forEach(item => {
//   let type = getDataType(globle[item]);

//   if (type === 'object' || type === 'array') {
//     window[item] = JSON.parse(JSON.stringify(globle[item]));
//   } else {
//     window[item] = globle[item];
//   }
// });
