import Vue from 'vue'
import App from './App'
import router from './router'
// 导入element组件
import './plugins/element-ui/element.js'
// 导入全局样式
import  './assets/css/global.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
