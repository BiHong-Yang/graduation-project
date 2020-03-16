const state = {
    SubcodeToggle: false
}

const getters = {

}

const mutations = {
    ChangeToggle(state, value) {
        state.SubcodeToggle = value;
    }
}

const actions = {
    ChangeToggle(context, value) {
        console.log('here');
        context.commit('ChangeToggle', value)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}