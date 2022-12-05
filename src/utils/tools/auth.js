/*
 * @FilePath: auth.js
 * @Author: JHui
 * @Date: 2022-10-18 15:52:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-05 14:30:32
 * @Descripttion: 用户权限相关工具函数
 */

import store from '@/store';
import { throttle } from './tool';
import { MessageBox, Message } from 'element-ui';
// 获取权限
export function getToken() {
  // 获取缓存中的token数据，如果存在则读取
  if (sessionStorage.token) {
    setToken(sessionStorage.token);
    sessionStorage.removeItem('token');
  }
  return store.state.user.token || '';
}

// 设置权限
export function setToken(token) {
  store.dispatch('setKey', token).then(() => {
    // 当页面刷新的时候 将token放入webStorage中
    window.addEventListener(
      'beforeunload',
      () => {
        sessionStorage.setItem('token', store.state.user.token);
      },
      {
        once: true
      }
    );
  });
}
// 去除权限
export function removeToken() {
  // 去除token 刷新浏览器
  store.dispatch('setKey', '').then(() => {
    window.location.reload(true);
  });
}

// 用户过期处理
function overdue(code) {
  if (code === 401) {
    MessageBox.confirm('当前用户过期！，点击确认重新登陆！', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        removeToken();
      })
      .catch(() => {
        Message({
          type: 'info',
          message: '已取消'
        });
      });
    return true;
  }
  return false;
}
export const throttleOverdue = throttle(overdue, 1000);
