const state = {
    SubcodeToggle: false,
    globalId: 10,
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
    ],
    transformer: [{
            name: '创建变量',
            group: { name: 'logic', pull: 'clone', put: false, revertClone: true },
            elements: [{
                    type: 'uint',
                    name: '自然数',
                    elements: [],

                    contexts: {
                        name: {
                            name: '名字',
                            value: '',
                            show: true
                        },

                        value: {
                            name: '初值',
                            value: 0,
                            show: true
                        },
                        categories: {
                            name: '上限',
                            value: 'uint',
                            show: false,
                        },
                    },
                },

                {
                    type: 'int',
                    name: '整数',
                    elements: [],

                    contexts: {
                        name: {
                            name: '名字',
                            value: '',
                            show: true
                        },

                        value: {
                            name: '初值',
                            value: 0,
                            show: true
                        },
                        categories: {
                            name: '上限',
                            value: 'int',
                            show: false,
                        },
                    },

                },

                {
                    type: 'bool',
                    name: '真假值',
                    elements: [],

                    contexts: {
                        name: {
                            name: '名字',
                            value: '',
                            show: true
                        },
                        value: {
                            name: '初值',
                            value: false,
                            show: true
                        },
                    },

                },

                {
                    type: 'array',
                    name: '数组',
                    elements: [],

                    contexts: {
                        name: {
                            name: '名字',
                            value: '',
                            show: true
                        },
                        value: {
                            name: '初值',
                            value: '',
                            show: true
                        },
                    },

                },

                {
                    type: 'address',
                    name: '地址',
                    elements: [],

                    contexts: {
                        name: {
                            name: '名字',
                            value: '',
                            show: true
                        },
                        value: {
                            name: '初值',
                            value: 0x0,
                            elements: [],
                            useEle: false,
                            show: true
                        },
                    },

                },



            ]
        },

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
    incGlobalId: (state) => {
        state.globalId++;
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
    incGlobalId: ({ commit }) => {
        commit("incGlobalId");
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}