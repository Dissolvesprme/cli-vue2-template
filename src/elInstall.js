/*
 * @FilePath: elInstall.js
 * @Author: JHui
 * @Date: 2022-10-18 16:03:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-18 16:06:23
 * @Descripttion: ElementUI-按需导入
 */
import { Col, Row } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';

const componentsList = {
  Col,
  Row
};

Object.keys(componentsList).map(name => {
  Vue.use(componentsList[name]);
});
