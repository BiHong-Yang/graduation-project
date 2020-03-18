import Vue from "vue";
import Vuex from "vuex";

import logic from './modules/logic';
// import nested from './modules/nested'
Vue.use(Vuex);

const state = {

}

const mutations = {

}

const actions = {

}

const modules = {
    logic,
    // nested
}
export default new Vuex.Store({
    // strict: true,
    state,
    mutations,
    actions,
    modules
});