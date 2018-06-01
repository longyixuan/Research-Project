<style lang="scss" scoped>
.nav-wrapper {
    padding: 0 20px;
}
nav ul .router-link-exact-active {
    background-color: rgba(0, 0, 0, 0.1);
}
</style>

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
                <li>
                    <template v-if="username==''">
                        <span @click="setName" style="cursor: pointer">登录</span>
                    </template>
                    {{username}}
                </li>
            </ul>
            </div>
        </nav>
    </header>
</template>
<script>
// 当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。
// 为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性
// mapState 函数返回的是一个对象。我们如何将它与局部计算属性混合使用呢？...mapState
import { mapState, mapActions } from 'vuex'
export default {
  name: 'yxlheader',
  data () {
      return {
          
      }
  },
  computed: mapState({
      username: state => state.userName
  }),
  methods: {
      ...mapActions([
          'setUserName'
      ]),
      setName () {
          this.setUserName();
      }
  }
}
</script>

