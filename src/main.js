import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import router from './index.js'

import store from './vuex/store'
import Vuex from 'vuex'


import Lodash from 'lodash'


Vue.use(ElementUI);
Vue.use(Vuex)

router.beforeEach((to, from, next) => {

      if (to.path == '/login') {
        sessionStorage.removeItem('user');
      }
      // 使用sessionStorage保存token是网站跳转保持登录状态，存在新打开的标签页
      // 需要重新登录的问题，解决方法如下。但是该方法是网站的页面打开速度慢200毫秒
      // ，同时存储在sessionStorage的内容不能太多，否则页面打开速度会超过200毫秒
      if (!sessionStorage.length) {
        // 第一次打开页面，sessionStorage.length == 0，取反!进入该判断
        // 这个调用能触发目标事件，从而达到共享数据的目的
        localStorage.setItem('getSessionStorage', Date.now());
      };

      // 该事件是核心 ==> DOM事件是异步的，这个事件只有在新标签页打开前就已经存在了一个标签页
      window.addEventListener('storage', function(event) {
          if (event.key == 'getSessionStorage') {
            // 已存在的标签页会收到这个事件
            localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
            localStorage.removeItem('sessionStorage');
          } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
            // 新开启的标签页会收到这个事件
            var data = JSON.parse(event.newValue);
            for (let key in data) {
              sessionStorage.setItem(key, data[key]);
            }
          }
      });
      // 因为DOM事件是异步的，必须等storage事件执行完成后再执行这一段，所以这一段也必须异步
      setTimeout(()=>{
          let user = JSON.parse(sessionStorage.getItem('user'));
          if (!user && to.path != '/login') {
            next({ path: '/login' })
          } else {
            next()
          }
      }, 200)
      
    
  
})



new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
