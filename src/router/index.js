import Vue from 'vue'
import Router from 'vue-router'
import Login from "../views/login/Login.vue";
import * as shared from 'common/shared/shared.js'

Vue.use(Router)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    redirect: '/login'
  }
]

const router = new Router({ routes: routes });

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转来
  // next是一个函数，代表放行
  if (to.path === '/login') {
    return next()
  }

  // 获取token
  let token = shared.getSessionStorage('token');
  if (token) {
    return next();
  }
  next('/login');
});

export default router
