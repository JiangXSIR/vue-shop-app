import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login/Login.vue'
import Layout from '../views/pages/Layout.vue'
import Home from '../views/pages/home/home.vue'
import UserList from '../views/pages/user/UserList.vue'

Vue.use(Router)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/main',
    component: Layout,
    redirect: '/home',
    children: [
      { path: '/home', component: Home },
      { path: '/users', component: UserList },
    ]
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
  let token = window.sessionStorage.getItem('token');
  if (token) {
    return next();
  }
  next('/login');
});

export default router
