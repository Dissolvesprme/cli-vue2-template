/*
 * @FilePath: echarts.js
 * @Author: JHui
 * @Date: 2022-10-18 17:45:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-18 17:45:43
 * @Descripttion: echarts初始化
 */
import { EleResize } from '@/utils/tools/esresize.js';
// echarts 混入
export const EchatsMixin = {
  data() {
    return {
      echartsTimer: null,
      index: -1
    };
  },
  methods: {
    // 自适应echarts
    resizeEcharts() {
      let dom = this.$refs['echarts']; // 获取当前 Echarts DOm
      let myChart = this.$echarts.init(dom); // 初始化 DOM
      let resizeDiv = dom;
      let listener = () => {
        myChart.resize();
      };
      EleResize.on(resizeDiv, listener);
      return myChart; // 将初始化的 DOM 返回
    },
    // 动画效果
    animation(myChart, length, time) {
      this.echartsTimer = setInterval(() => {
        let dataLen = length;
        // 取消之前高亮的图形
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: this.index
        });
        this.index = (this.index + 1) % dataLen;
        // 高亮当前图形
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: this.index
        });
        // 显示 tooltip
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: this.index
        });
      }, time);
    },
    // echarts 自动选择效果
    autoMatic(myChart, length, time = 2000) {
      if (this.echartsTimer) {
        clearInterval(this.echartsTimer);
      }
      this.$refs['echarts'].onmouseover = () => {
        if (this.echartsTimer) {
          clearInterval(this.echartsTimer);
        }
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: this.index
        });
      };

      this.$refs['echarts'].onmouseout = () => {
        this.animation(myChart, length, time);
      };

      myChart.on('mouseover', a => {
        let { dataIndex } = a;
        this.index = dataIndex - 1;
      });

      this.animation(myChart, length, time);
    }
  },
  beforeDestroy() {
    if (this.echartsTimer) {
      clearInterval(this.echartsTimer);
    }
    if (this.$refs['echarts'].onmouseover) {
      this.$refs['echarts'].onmouseover = null;
    }
    if (this.$refs['echarts'].onmouseout) {
      this.$refs['echarts'].onmouseout = null;
    }
  }
};
