/*
 * @FilePath: videoPlay.js
 * @Author: JHui
 * @Date: 2022-10-18 15:56:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-18 17:08:42
 * @Descripttion: 获取视频流
 */
// import { getVideoUrl } from '@/api/analysis';

// 注册全局视频播放指令
const VideoPlay = {
  async inserted(el, binding, vnode) {
    if (!binding.value) {
      return;
    }
    el.click();
    // 无id
    // let id = binding.value;
    // let data = await getVideoUrl({ id });
    // let url = data.code === 200 ? data.data : '';
    let id = binding.value;
    let url = binding.value;
    let video = el;
    let hls = new Hls();
    let hlssource = url;
    if (!vnode.context.hls) {
      vnode.context.hls = {};
    }
    vnode.context.hls[id] = hls;
    if (hlssource) {
      hls.loadSource(hlssource);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
        el.ondblclick = () => {
          if (video.requestFullscreen) {
            video.requestFullscreen();
          } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
          } else if (video.webkitRequestFullScreen) {
            video.webkitRequestFullScreen();
          }
        };
      });
    }
  },
  unbind(el, binding, vnode) {
    let id = binding.value;
    vnode.context.hls[id].destroy();
    el.ondblclick = null;
  }
};
export default {
  VideoPlay
};
