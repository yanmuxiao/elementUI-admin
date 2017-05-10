import Vue from 'vue'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import router from './index.js'


Vue.use(ElementUI)


router.beforeEach((to, from, next) => {
  
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
  
})



new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
