<style lang="scss" scoped>
.card-content table{
    margin-bottom: 20px;
}
</style>

<template>
  <div class="yxl-index">
    <div class="row">
        <div class="col s12 m12">
            <div class="card">
                <div class="card-content">
                    <span class="card-title">动态路由匹配</span>
                    <p>我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。
                        例如，我们有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。
                        那么，我们可以在 vue-router 的路由路径中使用『动态路径参数』（dynamic segment）来达到这个效果</p>
                    <table>
                        <thead>
                            <tr>
                                <th>模式</th>
                                <th>匹配路径</th>
                                <th>$route.params</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>/user/:username</td>
                                <td>/user/evan</td>
                                <td>{ username: 'evan' }</td>
                            </tr>
                            <tr>
                                <td>/user/:username/post/:post_id</td>
                                <td>/user/evan/post/123</td>
                                <td>{ username: 'evan', post_id: 123 }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card">
                <div class="card-content">
                    <span class="card-title">嵌套路由</span>
                    <p>实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件</p>
                </div>
                <div class="card-tabs">
                    <ul class="tabs tabs-fixed-width">
                        <li class="tab"><router-link to="/vueRouter/childRoute">子路由</router-link></li>
                        <li class="tab"><router-link to="/vueRouter/childRoute1">子路由1</router-link></li>
                    </ul>
                </div>
                <div class="card-content grey lighten-4">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'vueRouter',
  data () {
    return {
      msg: ''
    }
  },
  watch: {
      '$route' (to, from) {
          console.log(to.path)
      }
  }
}
</script> 