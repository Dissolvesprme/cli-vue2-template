/*
 * @FilePath: drag.js
 * @Author: JHui
 * @Date: 2022-10-18 15:56:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-18 17:08:59
 * @Descripttion:  拖拽
 */
// 监听全局指令
const drag = {
  inserted: function (el, binding, vnode) {
    // 父元素DOM
    // let odiv = el.parentNode;
    let odiv = el;
    odiv.onmousedown = function (eve) {
      eve = eve || window.event;
      // 鼠标在边框中离浏览器x轴坐标
      let clientX = eve.clientX;
      // 鼠标在边框中离浏览器y轴坐标
      let clientY = eve.clientY;
      // 所在边框的x轴距离
      let odivX = odiv.offsetLeft;
      console.log(odivX);
      // 所在边框的y轴距离
      let odivY = odiv.offsetTop;
      // 当前选中左边框离浏览器左边距离
      let odivLeft = clientX - odivX;
      // 当前选中上边框离浏览器顶部距离
      let odivTop = clientY - odivY;
      // 获取浏览器的视口宽度
      let clientWidth = document.documentElement.clientWidth;
      // 获取父元素的视口宽度
      let oWidth = odiv.clientWidth;
      // 可以移动的最大距离x
      let odivRight = clientWidth - oWidth;
      let clientHeight = document.documentElement.clientHeight;
      let oHeight = odiv.clientHeight;
      // 可以移动的最大距离y
      let odivBottom = clientHeight - oHeight;
      document.onmousemove = function (e) {
        e.preventDefault();
        // 声明移动的距离
        let left = e.clientX - odivLeft;
        // 选中框的距离浏览的距离大于鼠标移动的距离,置零
        if (left < 0) {
          left = 0;
        }
        // 选中框的移动距离大于可移动最大距离
        if (left > odivRight) {
          left = odivRight;
        }
        let Top = e.clientY - odivTop;
        if (Top < 0) {
          Top = 0;
        }
        if (Top > odivBottom + document.documentElement.scrollTop) {
          Top = odivBottom + document.documentElement.scrollTop;
        }
        odiv.style.left = left + 'px';
        odiv.style.top = Top + 'px';
      };
      document.onmouseup = function () {
        document.onmouseup = '';
        document.onmousemove = '';
      };
    };
  }
};

export default { drag };
