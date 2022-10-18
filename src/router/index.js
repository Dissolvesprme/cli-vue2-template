import Vue from 'vue';
import store from '@/store';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

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
