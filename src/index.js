
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


import LoginVue from './components/Login.vue'
import MainVue from './components/Main.vue'
import IndexVue from './components/Index.vue'

// basic
import LayoutVue from './components/basic/Layout.vue'
import ColorVue from './components/basic/Color.vue'
import TypographyVue from './components/basic/Typography.vue'
import IconVue from './components/basic/Icon.vue'
import ButtonVue from './components/basic/Button.vue'


// form
import RadioVue from './components/form/Radio.vue'
import CheckboxVue from './components/form/Checkbox.vue'
import InputVue from './components/form/Input.vue'
import InputNumberVue from './components/form/InputNumber.vue'
import SelectVue from './components/form/SelectLabel.vue'


import syncTask from './components/sync-task.vue'
import editForm from './components/edit-form.vue'


export default new Router({
    routes: [
    {
      path: '/login',
      component: LoginVue,
      name: ''
    },
    {
      path: '/main',
      component: MainVue,
      name: '',
      children: [
          { path: '/', component: IndexVue},
          { path: '/index', component: IndexVue},
          { path: '/layout', component: LayoutVue, name: 'layout'},
          { path: '/color', component: ColorVue, name: 'color'},
          { path: '/typography', component: TypographyVue, name: 'typography'},
          { path: '/icon', component: IconVue, name: 'icon'},
          { path: '/button', component: ButtonVue, name: 'button'},


          { path: '/radio', component: RadioVue, name: 'radio'},
          { path: '/checkbox', component: CheckboxVue, name: 'checkbox'},
          { path: '/input', component: InputVue, name: 'input'},
          { path: '/inputNumber', component: InputNumberVue, name: 'inputNumber'},
          { path: '/select', component: SelectVue, name: 'select'},

          { path: '/syncTask', component: syncTask, name: 'syncTask'},
          { path: '/editForm', component: editForm, name: 'editForm'}
      ]
    }
  ]
})