const state = {
  // 记录移动时的show情况
  ShowsOnMove: [],

  // 记录目标list
  MovedList: [],

  // 副代码区是否显示
  SubcodeToggle: false,

  // 用于保证元素id不冲突
  globalId: 10,

  // 空类型
  NoneType: {
    type: "none",
    name: "请选择类型",
    elements: [],
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
    mapping: 6
  },

  // 测试用数据
  elements: [
    {
      type: "function",
      name: "创建函数",
      elements: [],
      contexts: {
        name: {
          name: "名字",
          value: "",
          show: true
        },
        param: {
          name: "参数",
          value: [],
          show: true
        },
        returns: {
          name: "返回值",
          value: [],
          show: true
        }
      },
      show: true,
      id: 2
    },
    {
      type: "function",
      name: "创建函数",
      elements: [],
      contexts: {
        name: {
          name: "名字",
          value: "",
          show: true
        },
        param: {
          name: "参数",
          value: [],
          show: true
        },
        returns: {
          name: "返回值",
          value: [],
          show: true
        }
      },
      show: true,
      id: 3
    },
    {
      type: "function",
      name: "创建函数",
      elements: [],
      contexts: {
        name: {
          name: "名字",
          value: "",
          show: true
        },
        param: {
          name: "参数",
          value: [],
          show: true
        },
        returns: {
          name: "返回值",
          value: [],
          show: true
        }
      },
      show: true,
      id: 4
    }

    // {
    //     id: 1,
    //     name: "Shrek",
    //     elements: [],
    //     show: true,
    // },
    // {
    //     id: 2,
    //     name: "Fiona",
    //     elements: [{
    //             id: 4,
    //             name: "Lord Farquad",
    //             elements: [],
    //             show: true,
    //         },
    //         {
    //             id: 5,
    //             name: "Prince Charming",
    //             elements: [],
    //             show: true,
    //         }
    //     ],
    //     show: true,
    // },
    // {
    //     id: 3,
    //     name: "Donkey",
    //     elements: [],
    // }
  ],

  // 待转换的逻辑
  transformer: [
    // 创建变量
    {
      name: "创建变量",
      group: { name: "logic", pull: "clone", put: false, revertClone: true },
      elements: [
        // uint类型
        {
          type: "uint",
          name: "自然数",
          elements: [],

          contexts: {
            name: {
              name: "名字",
              value: "",
              show: true,
              use: true
            },

            value: {
              name: "初值",
              value: null,
              show: true
            },
            categories: {
              name: "上限",
              value: "uint",
              show: false,
              use: true
            }
          }
        },

        // int类型
        {
          type: "int",
          name: "整数",
          elements: [],

          contexts: {
            name: {
              name: "名字",
              value: "",
              show: true,
              use: true
            },

            value: {
              name: "初值",
              value: null,
              show: true
            },
            categories: {
              name: "上限",
              value: "int",
              show: false,
              use: true
            }
          }
        },

        // bool类型
        {
          type: "bool",
          name: "真假值",
          elements: [],

          contexts: {
            name: {
              name: "名字",
              value: "",
              show: true,
              use: true
            },
            value: {
              name: "初值",
              value: false,
              show: true
            }
          }
        },

        // 地址类型
        {
          type: "address",
          name: "地址",
          elements: [],

          contexts: {
            name: {
              name: "名字",
              value: "",
              show: true,
              use: true
            },
            value: {
              name: "初值",
              value: 0x0,
              elements: [],
              useEle: false,
              show: true
            }
          }
        },

        // 字符数组类型，包括定长变长
        {
          type: "byteArray",
          name: "字符数组",
          elements: [],

          contexts: {
            name: {
              name: "名字",
              value: "",
              show: true,
              use: true
            },
            value: {
              name: "初值",
              value: "",
              show: true
            },
            categories: {
              name: "上限",
              value: "byte32",
              show: false,
              use: true
            }
          }
        },

        // 映射类型

        {
          type: "mapping",
          name: "映射",
          elements: [],

          contexts: {
            name: {
              name: "名字",
              value: "",
              show: true,
              use: true
            },
            from: {
              name: "映射自",
              value: {
                type: "none",
                name: "请选择类型",
                elements: [],
                contexts: {}
              },
              elements: [],
              show: true,
              use: true
            },
            to: {
              name: "映射到",
              value: {
                type: "none",
                name: "请选择类型",
                elements: [],
                contexts: {}
              },
              elements: [],
              show: true,
              use: true
            }
          }
        }
      ]
    },

    // 创建函数与合约相关的内容
    {
      name: "创建函数与合约",
      group: { name: "logic", pull: "clone", put: false, revertClone: true },
      elements: [
        // 创建函数
        {
          type: "function",
          name: "创建函数",
          elements: [],

          contexts: {
            name: {
              name: "名字",
              value: "",
              show: true
            },

            param: {
              name: "参数",
              value: [],
              show: true
            },

            // 参数样式：
            // {
            //     类型：
            //     内容：{
            //
            //      }
            //
            // }
            returns: {
              name: "返回值",
              value: [],
              show: true
            }
          },

          show: true
        },

        // 创建装饰器
        {
          type: "modifier",
          name: "创建装饰器",
          // 函数位置
          elements: [
            {
              type: "modifier__inner",
              name: "函数位置",
              elements: []
            }
          ],

          contexts: {
            name: {
              name: "名字",
              value: "",
              show: true
            },

            param: {
              name: "参数",
              value: [],
              show: true
            }

            // 参数样式：
            // {
            //     类型：
            //     名字：
            //     默认值：（可选）
            // }
          },

          show: true
        }
      ]
    }
  ]
};

const getters = {
  // 可用作参数的类型
  ParamTypes: state => {
    return [state.NoneType].concat(state.transformer[0].elements);
  }
};

const mutations = {
  // 副代码区开关
  ChangeToggle(state, value) {
    state.SubcodeToggle = value;
  },

  // 更新代码
  updateElements: (state, payload) => {
    state.elements = payload;
  },

  // 改变全局id
  incGlobalId: state => {
    state.globalId++;
  },

  // 开始移动
  // 将所有附带元素全部设为不可见，减小移动的组件的体积
  nestedStart: (state, item) => {
    if (item.show != undefined) {
      state.ShowsOnMove.push(item.show);
      item.show = false;
    }

    for (let x in item.contexts) {
      state.ShowsOnMove.push(item.contexts[x].show);
      item.contexts[x].show = false;
    }
  },

  // 结束移动
  // 恢复移动的组件之前的可见值，恢复之前样式
  nestedEnd: (state, { item, index }) => {
    if (state.MovedList == null) {
      console.log("delete!");
      return;
    }
    if (state.MovedList.length == 0) {
      if (item.show != undefined) {
        item.show = state.ShowsOnMove.shift();
      }
      for (let x in item.contexts) {
        item.contexts[x].show = state.ShowsOnMove.shift();
      }
    } else {
      if (state.MovedList[index].show != undefined) {
        state.MovedList[index].show = state.ShowsOnMove.shift();
      }
      for (let x in state.MovedList[index].contexts) {
        state.MovedList[index].contexts[x].show = state.ShowsOnMove.shift();
      }
      state.MovedList = [];
    }
  },

  // 移动中
  // 记录目标地点
  nestedMove: (state, element) => {
    state.MovedList = element;
  }
};

const actions = {
  // 副代码区开关
  ChangeToggle(context, value) {
    context.commit("ChangeToggle", value);
  },

  // 更新代码
  updateElements: ({ commit }, payload) => {
    commit("updateElements", payload);
  },

  // 改变全局id
  incGlobalId: ({ commit }) => {
    commit("incGlobalId");
  },

  // 开始移动
  nestedStart: ({ commit }, item) => {
    commit("nestedStart", item);
  },

  // 结束移动
  nestedEnd: ({ commit }, payload) => {
    commit("nestedEnd", payload);
  },

  // 移动中
  nestedMove: ({ commit }, element) => {
    commit("nestedMove", element);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
