# vue-router

## 介绍路由

### 什么是路由？

路由是根据不同的 url 地址展示不同的内容或页面。

### 前端路由

前端的路由和后端的路由在实现技术上不一样，但是原理都是一样的。在 HTML5 的 history API 出现之前，前端的路由都是通过 hash 来实现的，hash 能兼容低版本的浏览器。如果我们把上面例子中提到的 3 个页面用 hash 来实现的话，它的 URI 规则中需要带上 #。

```
http://10.0.0.1/
http://10.0.0.1/#/about
http://10.0.0.1/#/concat
```

Web 服务并不会解析 hash，也就是说 # 后的内容 Web 服务都会自动忽略，但是 JavaScript 是可以通过 window.location.hash 读取到的，读取到路径加以解析之后就可以响应不同路径的逻辑处理。
history 是 HTML5 才有的新 API，可以用来操作浏览器的 session history。基于 history 来实现的路由可以和最初的例子中提到的路径规则一样。

```
http://10.0.0.1/
http://10.0.0.1/about
http://10.0.0.1/concat
```

### 前端路由的应用场景

前端路由更多用在单页应用上, 也就是SPA, 因为单页应用, 基本上都是前后端分离的, 后端自然也就不会给前端提供路由。

### 前端路由优缺点

- 优点：

> 1.从性能和用户体验的层面来比较的话，后端路由每次访问一个新页面的时候都要向服务器发送请求，然后服务器再响应请求，这个过程肯定会有延迟。而前端路由在访问一个新页面的时候仅仅是变换了一下路径而已，没有了网络延迟，对于用户体验来说会有相当大的提升。
> 2.在某些场合中，用ajax请求，可以让页面无刷新，页面变了但Url没有变化，用户就不能复制到想要的地址，用前端路由做单页面网页就很好的解决了这个问题

- 缺点：

> 使用浏览器的前进，后退键的时候会重新发送请求，没有合理地利用缓存

## 在vue中如何使用

### 安装

```shell
cnpm install vue-router
```

### 配置

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
  }
]
Vue.use(Router)
export default new Router({
  routes: routes
})
```

### 使用

```vue

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
            </ul>
            </div>
        </nav>
    </header>
    <router-view/>
```

### 说明

####  动态路由匹配

我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 `User` 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 `vue-router` 的路由路径中使用『动态路径参数』（dynamic segment）来达到这个效果

| 模式                            | 匹配路径                | $route.params                        |
| ----------------------------- | ------------------- | ------------------------------------ |
| /user/:username               | /user/evan          | `{ username: 'evan' }`               |
| /user/:username/post/:post_id | /user/evan/post/123 | `{ username: 'evan', post_id: 123 }` |

复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch（监测变化） `$route` 对象

```javascript
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

#### 嵌套路由

实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件,以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。

```javascript
const routes = [
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

#### 编程式的导航

除了使用`<router-link>`创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。

```javascript
// 字符串
router.push('home')
// 对象
router.push({ path: 'home' })
// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})
// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
//如果提供了 path，params 会被忽略,query 并不属于这种情况
```

#### 重定向

重定向也是通过 `routes` 配置来完成，下面例子是从 `/a` 重定向到 `/b`,例如访问不到的页面直接跳转首页。

```javascript
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/' }
  ]
})
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