# 项目搭建

## 创建项目

### 使用脚手架vue-cli创建项目

```shell
$ npm install -g vue-cli
$ vue init webpack my-project
$ cd my-project
$ npm install
$ npm run dev
```

### 项目的目录结构如下

├── build/ # webpack配置文件 
│ └── … 
├── config/ 
│ ├── index.js # 主要项目配置 
│ └── … 
├── src/ 
│ ├── main.js # 应用入口文件 
│ ├── App.vue # 主应用程序组件 
│ ├── components/ # ui组件 
│ │ └── … 
│ └── assets/ # 模块资源（由webpack处理） 
│ └── … 
├── static/ # 纯静态资源（直接复制） 
├── test/ 
│ └── unit/ # 单元测试 
│ │ ├── specs/ # 测试spec文件 
│ │ ├── index.js # 测试构建条目文件 
│ │ └── karma.conf.js # 测试跑步者配置文件 
│ └── e2e/ # e2e测试 
│ │ ├── specs/ # 测试spec文件 
│ │ ├── custom-assertions/ # e2e测试的自定义断言 
│ │ ├── runner.js # 测试跑步脚本 
│ │ └── nightwatch.conf.js # 测试跑步者配置文件 
├── .babelrc # babel 配置 
├── .postcssrc.js # postcss 配置 
├── .eslintrc.js # eslint 配置 
├── .editorconfig # editor 配置 
├── index.html # index.html模板 
└── package.json # 构建脚本和依赖关系

### 调整后src目录结构如下

├── src/ 
│ ├── main.js # 应用入口文件 
│ ├── api/ # 异步请求方法集合
│ ├── filter/ # vue过滤器
│ ├── images/ # 图片
│ ├── lib/ # 第三方插件
│ ├── router/ # u路由
│ ├── store/ # 状态管理器
│ ├── style/ # 样式单
│ ├── views/ # 页面
│ └── … 

## 开始开发

### 主入口文件配置

```javascript
import Vue from 'vue'
import Layout from './components/layout.vue'; 
import router from './router' //路由配置
import Vuex from 'vuex'
import store from './store' //状态管理
import './styles/materialize.scss'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Layout)
})
```

###  layout入口配置

```vue
<template>
    <div class="yxl-layout" id="app">
        <yxl-header></yxl-header>
        <div class="yxl-main">
            <router-view/>
        </div>
    </div>
</template>
<script>
    import yxlHeader from './header'
    export default {
        name: 'Layout',
        components: {
            yxlHeader
        }
    }
</script>
```

### header组件配置

```vue
<template>
    <header class="yxl-header">
        <nav>
            <div class="nav-wrapper">
            <a href="#" class="brand-logo"><i class="material-icons" style="font-size: 46px;">local_library</i>VUE课题研究</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><router-link to="/">index</router-link></li>
                <li><router-link to="/photo">photo</router-link></li>
                <li><router-link to="/vueRouter">vue-route</router-link></li>
                <li><router-link to="/vuex">vuex</router-link></li>
                <li><router-link to="/axios">axios</router-link></li>
                <li>{{username}}</li>
            </ul>
            </div>
        </nav>
    </header>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'yxlheader',
  computed: mapState({
      username: state => state.userName
  })
}
</script>
```

这里用到了路由，我们来说下什么是路由，以及vue-router如何使用

#### 路由的作用是什么？

用一句话来概括：路由是根据不同的 url 地址展示不同的内容或页面。

#### 前端路由

前端路由是通过hash来实现的，web服务器并不会解析hash，换句话说就是web服务器会自动忽略#后的内容，例如：

```
http://localhost:8080/#/vueRouter
http://localhost:8080/#/vuex
```

html5中可以使用history，来操作浏览器的 session history，我们的路径就可以显示的和之前后端的路径一样了，不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 `http://oursite.com/user/id` 就会返回 404，这就不好看了。

```
http://localhost:8080/vueRouter
http://localhost:8080/vuex
```

#### 前端路由优缺点

- 优点：

> 1.从性能和用户体验的层面来比较的话，后端路由每次访问一个新页面的时候都要向服务器发送请求，然后服务器再响应请求，这个过程肯定会有延迟。而前端路由在访问一个新页面的时候仅仅是变换了一下路径而已，没有了网络延迟，对于用户体验来说会有相当大的提升。
> 2.在某些场合中，用ajax请求，可以让页面无刷新，页面变了但Url没有变化，用户就不能复制到想要的地址，用前端路由做单页面网页就很好的解决了这个问题

- 缺点：

> 使用浏览器的前进，后退键的时候会重新发送请求，没有合理地利用缓存

#### 前端路由的应用场景

前端路由更多用在单页应用上, 也就是SPA, 因为单页应用, 基本上都是前后端分离的, 后端自然也就不会给前端提供路由。

### vue路由配置

```javascript
import Vue from 'vue'
import Router from 'vue-router'

const routes = [
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
        path: 'childRoute',
        mode: 'history',
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
  //mode: 'history',
  routes: routes
})
```

#### 常规写法

```javascript
var routers = [
  {
    path: '/photo',
    meta: {
      title: 'photo',
      name: 'photo'
    },
    component: (resolve) => require(['../views/photo'], resolve)
  }
]
```

####  动态匹配

```javascript
var routers = [
  {
    path: '/photo/:id',
    meta: {
      title: 'photo',
      name: 'photo'
    },
    component: (resolve) => require(['../views/photo'], resolve)
  }
]
```

你可以在一个路由中设置多段『路径参数』，对应的值都会设置到 `$route.params` 中。例如：

| 模式                            | 匹配路径                | $route.params                        |
| ----------------------------- | ------------------- | ------------------------------------ |
| /user/:username               | /user/evan          | `{ username: 'evan' }`               |
| /user/:username/post/:post_id | /user/evan/post/123 | `{ username: 'evan', post_id: 123 }` |

#### 嵌套路由

实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件，例如：

```
/vueRouter/childRoute                     /vueRouter/childRoute1
+------------------+                  +-----------------+
| vueRouter        |                  | vueRouter       |
| +--------------+ |                  | +-------------+ |
| | childRoute   | |  +------------>  | | childRoute1 | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

```javascript
var routers = [
  {
      path: '/vueRouter',
      meta: {
        title: 'vueRouter',
        name: 'vueRouter'
      },
      component: (resolve) => require(['../views/vueRouter'], resolve),
      children: [
        {
          path: 'childRoute',
          mode: 'history',
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
```

`要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。`

#### 编程式的导航

除了使用 `<router-link>` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。

```javascript
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

`注意：如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。`

#### 重定向和别名

我们用两段代码来说明

```javascript
var routers = [
    { path: '/a', redirect: '/b' },
    { path: '/a', redirect: { name: 'foo' }}
]
```

#### 路由组件传参

在组件中使用 `$route` 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。

使用 `props` 将组件和路由解耦

```javascript
const router = new VueRouter({
  routes: [
    { path: '/promotion/from-newsletter', component: Promotion, props: { newsletterPopup: false } }
  ]
})
```

#### HTML5 History 模式

`vue-router` 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

如果不想要很丑的 hash，我们可以用路由的 **history 模式**，这种模式充分利用 `history.pushState` API 来完成 URL 跳转而无须重新加载页面。

```javascript
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

当你使用 history 模式时，URL 就像正常的 url，例如 `http://yoursite.com/user/id`，也好看！

不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 `http://oursite.com/user/id` 就会返回 404，这就不好看了。

所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 `index.html` 页面，这个页面就是你 app 依赖的页面。

### 请求接口配置

```javascript
import axios from 'axios'

const ajaxUrl = 'http://rap2api.taobao.org/app/mock/8160/';
let fetch = axios.create({
    header: { 'Content-Type': 'application/json' },
    baseURL: ajaxUrl,
    timeout: 5000
})
export function getUserName() {
    return fetch({
        url: 'getUserName',
        method: 'get'
    });
}
```

#### axios介绍

基于 Promise 的 HTTP 请求客户端，可同时在浏览器和 node.js 中使用

##### 功能特性

- 在浏览器中发送 [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) 请求
- 在 node.js 中发送 [http](http://nodejs.org/api/http.html)请求
- 支持 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
- 拦截请求和响应
- 转换请求和响应数据
- 自动转换 JSON 数据
- 客户端支持保护安全免受 [XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery) 攻击

##### 实例

```javascript
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (response) {
    console.log(response);
  });
```

### 状态管理器store的配置

用于管理vue组件的公共状态。

#### index.js入口

```javascript
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

const state = {
    userName: '用户名',
    count: 0
}
const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});
export default store;
```

#### mutations

所有的state必须通过它来改变

```javascript
//mutations_types.js代码------------------
export const SETUSERNAME = 'SETUSERNAME';// 设置用户名
export const SETCOUNT = 'SETCOUNT';//计数
//----------------------------------------
import * as type from './mutations_types.js';

export default {
    [type.SETUSERNAME](states, userName) {
        states.userName = userName;
    },
    [type.SETCOUNT](states, n) {
        states.count += n;
    }
}
```

#### actions

异步请求

```javascript
import { getUserName } from '../api/axios.js';
export default {
    setUserName: ({ commit }) => {
        getUserName().then((res) => {
            commit('SETUSERNAME', res.data.userName) 
        });
    }
}
```
`getUserName()`，在异步请求菜单中已经定义
#### getters

辅助方法

```javascript
export default {
    getUserName (states) {
        return states.userName;
    },
    getTitle: (states, getters) => {
        return "标题：" + getters.getUserName;
    }
}
```