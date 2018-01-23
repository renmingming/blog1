// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as Filters from './filters/index.js'
import store from './store/index.js'
// 引入ueditor富文本编辑器
import '../static/ueditor/ueditor.config.js'
import '../static/ueditor/ueditor.all.min.js'
import '../static/ueditor/lang/zh-cn/zh-cn.js'
import '../static/ueditor/ueditor.parse.min.js'

/* import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css' */
import './css/reset.css'
// Vue.use(ElementUI)

Vue.config.productionTip = false
Object.keys(Filters).forEach(k => Vue.filter(k, Filters[k]))
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
