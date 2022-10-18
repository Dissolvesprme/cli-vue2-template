import { supZero } from "@/utils/tools/tool";
// 转换日期过滤器
const fiterDate = (value) => {
  let date = new Date(value);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return `${year}年${supZero(month)}月${supZero(day)}日`;
};

// 转换时间过滤器
const fiterTime = (value) => {
  let date = new Date(value);
  let time = date.toTimeString().slice(0, 8);
  return time;
};
export default {
  fiterTime,
  fiterDate,
};
