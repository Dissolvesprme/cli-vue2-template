/*
 * @FilePath: test.js
 * @Author: JHui
 * @Date: 2022-10-17 17:35:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-17 17:39:31
 * @Descripttion: 红绿灯逻辑
 */

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function changeColor(color, duration) {
  console.log("traffic-light", color);
  await sleep(duration);
}

async function main() {
  while (true) {
    await changeColor("red", 2000);
    await changeColor("yellow", 1000);
    await changeColor("green", 3000);
  }
}

main();
