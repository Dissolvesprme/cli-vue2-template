import Vue from 'vue';
// import store from '@/store';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

let routerMenu = require('@/config/router.json');
routerMenu = routerMenu.menu;
let menu = [];
let formatRoute = function (routerMenu, menu) {
  for (let i = 0; i < routerMenu.length; i++) {
    let temp = {
      path: routerMenu[i].path,
      name: routerMenu[i].name,
      // 用require这种方式引入的时候，会将你的component分别打包成不同的js，加载的时候也是按需加载，只用访问这个路由网址时才会加载这个js
      component: resolve => require([`@/${routerMenu[i].component}`], resolve)
    };
    menu.push(temp);
    if (routerMenu[i].children && routerMenu[i].children.length > 0) {
      formatRoute(routerMenu[i].children, menu);
    }
  }
};
formatRoute(routerMenu, menu);
// 集成页面路由

export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/view/Home/index.vue')
      }
    ],
    hidden: true
  }
];

const createRouter = () =>
  new VueRouter({
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  });

// 重置路由
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

const router = createRouter();
export default router;
