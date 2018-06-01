import Vue from 'vue'
import Layout from './components/layout.vue';
import router from './router'
import Vuex from 'vuex'
import store from './store'
import './styles/materialize.scss'
import './styles/mystyle.scss'
import VueWechatTitle from 'vue-wechat-title'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueWechatTitle)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Layout)
})
