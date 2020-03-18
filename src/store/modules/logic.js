const state = {
    SubcodeToggle: false,
    elements: [{
            id: 1,
            name: "Shrek",
            elements: [],
            show: true,
        },
        {
            id: 2,
            name: "Fiona",
            elements: [{
                    id: 4,
                    name: "Lord Farquad",
                    elements: [],
                    show: true,
                },
                {
                    id: 5,
                    name: "Prince Charming",
                    elements: [],
                    show: true,
                }
            ],
            show: true,
        },
        {
            id: 3,
            name: "Donkey",
            elements: [],
            show: true,
        }
    ]
}

const getters = {

}

const mutations = {
    ChangeToggle(state, value) {
        state.SubcodeToggle = value;
    },
    updateElements: (state, payload) => {
        state.elements = payload;
    },
}

const actions = {
    ChangeToggle(context, value) {
        console.log('here');
        context.commit('ChangeToggle', value)
    },
    updateElements: ({ commit }, payload) => {
        commit("updateElements", payload);
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}