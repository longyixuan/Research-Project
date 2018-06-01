<template>
  <div class="yxl-index">
    <div class="row">
        <div class="col s12 m6">
            <div class="card">
                <div class="card-image">
                <img src="../images/index.jpg">
                <span class="card-title">{{getUserName}}</span>
                <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
                </div>
                <div class="card-content">
                <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                </div>
            </div>
        </div>
        <div class="col s12 m6">
            <div class="card">
                <div class="card-image">
                <img src="../images/index.jpg">
                <span class="card-title">{{getTitle}}</span>
                <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
                </div>
                <div class="card-content">
                <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col s12 m6">
            <div class="card">
                <div class="card-image">
                <img src="../images/index.jpg">
                <span class="card-title">{{count}}</span>
                <a class="btn-floating halfway-fab waves-effect waves-light red" @click="add"><i class="material-icons">add</i></a>
                </div>
                <div class="card-content">
                <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                </div>
            </div>
        </div>
        <div class="col s12 m6">
            <div class="card">
                <div class="card-image">
                <img src="../images/index.jpg">
                <span class="card-title">Card Title</span>
                <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
                </div>
                <div class="card-content">
                <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'vuex',
  data () {
    return {
      msg: ''
    }
  },
  computed: {
    count(){
        return this.$store.state.count;
    },
    ...mapGetters([
      'getUserName',
      'getTitle'
    ])
  },
  methods: {
      add() {
          this.$store.commit('SETCOUNT', 10)
      }
  }
}
</script> 