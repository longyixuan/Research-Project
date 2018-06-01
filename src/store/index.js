import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

const state = {
    userName: '',
    count: 0,
    isloading: false
}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});

export default store;