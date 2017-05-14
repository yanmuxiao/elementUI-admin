import Vue from 'vue'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import router from './index.js'


Vue.use(ElementUI);


router.beforeEach((to, from, next) => {

    // 使用sessionStorage保存token是网站跳转保持登录状态，存在新打开的标签页
    // 需要重新登录的问题，解决方法如下。但是该方法是网站的页面打开速度慢20毫秒
    // ，同时存储在sessionStorage的内容不能太多，否则页面打开速度会超过20毫秒
    if (!sessionStorage.length) {
      // 第一次打开页面，sessionStorage.length == 0，取反!进入该判断
      // 这个调用能触发目标事件，从而达到共享数据的目的
      localStorage.setItem('getSessionStorage', Date.now());
    };
    // 该事件是核心
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

    setTimeout(()=>{
        if (to.path == '/login') {
          sessionStorage.removeItem('user');
        }
        let user = JSON.parse(sessionStorage.getItem('user'));
        if (!user && to.path != '/login') {
          next({ path: '/login' })
        } else {
          next()
        }
    }, 30)
  
})



new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
