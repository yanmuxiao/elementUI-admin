
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


import MainVue from './components/Main.vue'
import LayoutVue from './components/Layout.vue'
import ColorVue from './components/Color.vue'
import TypographyVue from './components/Typography.vue'

import syncTask from './components/sync-task.vue'
import editForm from './components/edit-form.vue'


export default new Router({
  routes: [
    {
      path: '/',
      component: MainVue,
      name: '',
      children: [
          { path: '/layout', component: LayoutVue, name: 'layout'},
          { path: '/color', component: ColorVue, name: 'color'},
          { path: '/typography', component: TypographyVue, name: 'typography'}
      ]
    }
  ]
})
