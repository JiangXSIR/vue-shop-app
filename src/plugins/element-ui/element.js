import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input
} from 'element-ui'
// 导入弹框提示
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$message = Message;

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
