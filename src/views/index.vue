<template>
    <div class="yxl-index">
        <div class="card">
            <div class="card-content">
                <vue-markdown class="k-article">{{msg}}</vue-markdown>
            </div>
        </div>
    </div>
</template>
<script>
import VueMarkdown from 'vue-markdown'
import axiosMd from '../markdown/vue+vuex+router+axios.md'
export default {
  name: 'index',
  components: {
      VueMarkdown
  },
  data () {
    return {
      msg: axiosMd
    }
  }
}
</script>