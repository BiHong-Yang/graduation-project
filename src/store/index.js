import Vue from "vue";
import Vuex from "vuex";

import logic from './modules/logic';

Vue.use(Vuex);

const state = {

}

const mutations = {

}

const actions = {

}

const modules = {
    logic,
}
export default new Vuex.Store({
    strict: true,
    state,
    mutations,
    actions,
    modules
});