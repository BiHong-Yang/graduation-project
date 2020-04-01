const state = {

    // 副代码区是否显示
    SubcodeToggle: false,

    // 用于保证元素id不冲突
    globalId: 10,

    // 空类型
    NoneType: {
        type: 'none',
        name: '请选择类型',
        contexts: {}
    },

    // ParamTypes 的反向表，不用每次find
    revMapForParamTypes: {
        none: 0,
        uint: 1,
        int: 2,
        bool: 3,
        address: 4,
        byteArray: 5,
    },

    // 测试用数据
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


    // 待转换的逻辑
    transformer: [

        // 创建变量
        {
            name: '创建变量',
            group: { name: 'logic', pull: 'clone', put: false, revertClone: true },
            elements: [


                // uint类型
                {

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

                // int类型
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

                // bool类型
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


                // 地址类型
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

                // 字符数组类型，包括定长变长
                {
                    type: 'byteArray',
                    name: '字符数组',
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
                        categories: {
                            name: '上限',
                            value: 'byte32',
                            show: false,
                        },
                    },

                },



            ]
        },

        // 创建函数与合约相关的内容
        {
            name: '创建函数与合约',
            group: { name: 'logic', pull: 'clone', put: false, revertClone: true },
            elements: [

                // 创建函数
                {
                    type: 'function',
                    name: '创建函数',
                    elements: [],

                    contexts: {

                        name: {
                            name: '名字',
                            value: '',
                            show: true
                        },

                        param: {
                            name: '参数',
                            value: [],
                            show: true
                        },

                        // 参数样式：
                        // {
                        //     类型：
                        //     名字：
                        //     默认值：（可选）
                        // }

                    },
                }


            ]

        }

    ]
}

const getters = {
    // 可用作参数的类型
    ParamTypes: state => {
        return state.NoneType.concat(state.transformer[0].elements);
    }

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