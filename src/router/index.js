import Vue from 'vue'
import Router from 'vue-router'

const routes = [
  {
    path: '/guide',
    meta: {
      title: 'guide',
      name: 'guide'
    },
    component: (resolve) => require(['../components/guide'], resolve)
  },
  {
    path: '/',
    meta: {
      title: 'index',
      name: 'index'
    },
    component: (resolve) => require(['../views/index'], resolve)
  },
  {
    path: '/photo',
    meta: {
      title: 'photo',
      name: 'photo'
    },
    component: (resolve) => require(['../views/photo'], resolve)
  },
  {
    path: '/axios',
    meta: {
      title: 'axios',
      name: 'axios'
    },
    component: (resolve) => require(['../views/axios'], resolve)
  },
  {
    path: '/vuex',
    meta: {
      title: 'vuex',
      name: 'vuex'
    },
    component: (resolve) => require(['../views/vuex'], resolve)
  },
  {
    path: '/vueRouter',
    meta: {
      title: 'vueRouter',
      name: 'vueRouter'
    },
    component: (resolve) => require(['../views/vueRouter'], resolve),
    children: [
      {
        path: '',
        props: (route) => ({ query: new Date() }),
        component: (resolve) => require(['../views/childRoute'], resolve)
      },
      {
        path: 'childRoute',
        props: (route) => ({ query: new Date() }),
        component: (resolve) => require(['../views/childRoute'], resolve)
      },
      {
        path: 'childRoute1',
        component: (resolve) => require(['../views/childRoute1'], resolve)
      }
    ]
  }
]
Vue.use(Router)
export default new Router({
  routes: routes
})
