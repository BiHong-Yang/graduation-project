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
    contents: {},
  },

  // ParamTypes 的反向表，不用每次find
  revMapForParamTypes: {
    none: 0,
    uint: 1,
    int: 2,
    bool: 3,
    address: 4,
    byteArray: 5,
    mapping: 6,
    struct: 7,
    array: 8,
  },

  // 测试用数据
  elements: [
    {
      type: "function",
      name: "创建函数",
      elements: [],
      contents: {
        name: {
          name: "名字",
          value: "",
          show: true,
        },
        param: {
          name: "参数",
          value: [],
          show: true,
        },
        returns: {
          name: "返回值",
          value: [],
          show: true,
        },
      },
      show: true,
      id: 2,
    },
    {
      type: "function",
      name: "创建函数",
      elements: [],
      contents: {
        name: {
          name: "名字",
          value: "",
          show: true,
        },
        param: {
          name: "参数",
          value: [],
          show: true,
        },
        returns: {
          name: "返回值",
          value: [],
          show: true,
        },
      },
      show: true,
      id: 3,
    },
    {
      type: "function",
      name: "创建函数",
      elements: [],
      contents: {
        name: {
          name: "名字",
          value: "",
          show: true,
        },
        param: {
          name: "参数",
          value: [],
          show: true,
        },
        returns: {
          name: "返回值",
          value: [],
          show: true,
        },
      },
      show: true,
      id: 4,
    },

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
    // 创建变量
    // 创建变量
    // 创建变量
    // 创建变量
    // 创建变量
    {
      type: "variable",
      name: "创建变量",
      group: { name: "logic", pull: "clone", put: false, revertClone: true },
      elements: [
        // uint类型
        {
          type: "uint",
          name: "自然数",
          elements: [],

          contents: {
            name: {
              name: "名字",
              value: "",
              show: true,
              use: false,
            },

            value: {
              name: "初值",
              value: null,
              show: true,
            },
            categories: {
              name: "上限",
              value: "uint256",
              show: false,
              use: true,
            },
          },
        },

        // int类型
        {
          type: "int",
          name: "整数",
          elements: [],

          contents: {
            name: {
              name: "名字",
              value: "",
              show: true,
              use: false,
            },

            value: {
              name: "初值",
              value: null,
              show: true,
            },
            categories: {
              name: "上限",
              value: "int256",
              show: false,
              use: true,
            },
          },
        },

        // bool类型
        {
          type: "bool",
          name: "真假值",
          elements: [],

          contents: {
            name: {
              name: "名字",
              value: "",
              show: true,
              use: false,
            },
            value: {
              name: "初值",
              value: false,
              show: true,
            },
          },
        },

        // 地址类型
        {
          type: "address",
          name: "地址",
          elements: [],

          contents: {
            name: {
              name: "名字",
              value: "",
              show: true,
              use: false,
            },
            value: {
              name: "初值",
              value: 0x0,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },

        // 字符数组类型，包括定长变长
        {
          type: "byteArray",
          name: "字符数组",
          elements: [],

          contents: {
            name: {
              name: "名字",
              value: "",
              show: true,
              use: false,
            },
            value: {
              name: "初值",
              value: "",
              show: true,
            },
            categories: {
              name: "上限",
              value: "byte32",
              show: false,
              use: true,
            },
          },
        },

        // 映射类型

        {
          type: "mapping",
          name: "映射",
          elements: [],

          contents: {
            name: {
              name: "名字",
              value: "",
              show: true,
              use: false,
            },
            from: {
              name: "映射自",
              value: {
                type: "none",
                name: "请选择类型",
                elements: [],
                contents: {},
              },
              elements: [],
              show: true,
              use: true,
            },
            to: {
              name: "映射到",
              value: {
                type: "none",
                name: "请选择类型",
                elements: [],
                contents: {},
              },
              elements: [],
              show: true,
              use: true,
            },
          },
        },

        {
          type: "struct",
          name: "结构体",
          elements: [],

          contents: {
            name: {
              name: "名字",
              value: "",
              show: true,
              use: true,
            },
          },
          show: true,
        },

        {
          type: "array",
          name: "数组",
          elements: [],

          contents: {
            name: {
              name: "名字",
              value: "",
              show: true,
              use: false,
            },
            type: {
              name: "基本元素",
              value: {
                type: "none",
                name: "请选择类型",
                elements: [],
                contents: {},
              },
              elements: [],
              show: true,
              use: true,
            },
          },
        },
      ],
    },

    // 创建函数与合约相关的内容
    // 创建函数与合约相关的内容
    // 创建函数与合约相关的内容
    // 创建函数与合约相关的内容
    // 创建函数与合约相关的内容
    // 创建函数与合约相关的内容
    {
      type: "container",
      name: "创建函数与合约",
      group: { name: "logic", pull: "clone", put: false, revertClone: true },
      elements: [
        // 创建函数
        {
          type: "function",
          name: "创建函数",
          elements: [],

          contents: {
            name: {
              name: "名字",
              value: "",
              show: true,
            },

            param: {
              name: "参数",
              value: [],
              show: true,
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
              show: true,
            },

            // 外部可见性 internal 还是 external
            type: {
              name: "函数类型",
              value: "internal",
              show: false,
            },

            behavior: {
              name: "调用行为",
              value: "",
              show: false,
            },
          },

          show: true,
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
              elements: [],
            },
          ],

          contents: {
            name: {
              name: "名字",
              value: "",
              show: true,
            },

            param: {
              name: "参数",
              value: [],
              show: true,
            },

            // 参数样式：
            // {
            //     类型：
            //     名字：
            //     默认值：（可选）
            // }
          },

          show: true,
        },

        // 创建合约
        {
          type: "contract",
          name: "创建合约",
          // 函数位置
          elements: [
            {
              type: "constructor",
              name: "构造函数",
              elements: [],
              contents: {
                param: {
                  name: "参数",
                  value: [],
                  show: false,
                },
                // 外部可见性
                type: {
                  name: "函数类型",
                  value: "public",
                  show: false,
                },

                behavior: {
                  name: "调用行为",
                  value: "",
                  show: false,
                },
              },
              show: true,
            },
          ],

          contents: {
            name: {
              name: "名字",
              value: "",
              show: true,
            },
          },

          show: true,
        },
      ],
    },

    // 运算操作
    // 运算操作
    // 运算操作
    // 运算操作
    // 运算操作
    // 运算操作

    {
      type: "operation",
      name: "运算",
      group: { name: "logic", pull: "clone", put: false, revertClone: true },
      elements: [
        // 加法
        {
          type: " + ",
          name: "加法 + ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 减法
        {
          type: " - ",
          name: "减法 - ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 乘法
        {
          type: " * ",
          name: "乘法 * ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 除法
        {
          type: " / ",
          name: "除法 / ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 取余数
        {
          type: " % ",
          name: "取余数 % ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 幂
        {
          type: " ** ",
          name: "幂 ** ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 取负
        {
          type: " -",
          name: "取负 - ",
          elements: [],

          contents: {
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },

        // 大于
        {
          type: " > ",
          name: "大于 > ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 小于
        {
          type: " < ",
          name: "小于 < ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 大于等于
        {
          type: " >= ",
          name: "大于等于 >= ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 小于等于
        {
          type: " <= ",
          name: "小于等于 <= ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 相等
        {
          type: " == ",
          name: "相等 == ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 不相等
        {
          type: " != ",
          name: "不相等 != ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 同真
        {
          type: " && ",
          name: "同真 && ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 存真
        {
          type: " || ",
          name: "存真 || ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 否定
        {
          type: " ! ",
          name: "否定 ! ",
          elements: [],

          contents: {
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 左移位
        {
          type: " << ",
          name: "左移位 << ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 右移位
        {
          type: " >> ",
          name: "右移位 >> ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
      ],
    },

    // 一些基础自带的属性
    {
      type: "property",
      name: "合约自带属性",
      group: { name: "logic", pull: "clone", put: false, revertClone: true },
      elements: [],
    },

    // 一些基础自带的方法
    {
      type: "method",
      name: "合约自带方法",
      group: { name: "logic", pull: "clone", put: false, revertClone: true },
      elements: [
        // 强制类型转换
        {
          type: "conversion",
          name: "转换类型",
          elements: [],

          contents: {
            item: {
              name: "转换对象",
              value: "",
              elements: [],
              useEle: false,
              show: true,
            },
            target: {
              name: "目标类型",
              value: {
                type: "none",
                name: "请选择类型",
                elements: [],
                contents: {},
              },
              elements: [],
              show: true,
              use: true,
            },
          },
        },
      ],
    },
  ],
};

const getters = {
  // 可用作参数的类型
  ParamTypes: state => {
    return [state.NoneType].concat(state.transformer[0].elements);
  },
  OperaTypes: state => {
    return Array.from(state.transformer[2].elements, x => x.type);
  },
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

    for (let x in item.contents) {
      state.ShowsOnMove.push(item.contents[x].show);
      item.contents[x].show = false;
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
      for (let x in item.contents) {
        item.contents[x].show = state.ShowsOnMove.shift();
      }
    } else {
      if (state.MovedList[index].show != undefined) {
        state.MovedList[index].show = state.ShowsOnMove.shift();
      }
      for (let x in state.MovedList[index].contents) {
        state.MovedList[index].contents[x].show = state.ShowsOnMove.shift();
      }
      state.MovedList = [];
    }
  },

  // 移动中
  // 记录目标地点
  nestedMove: (state, element) => {
    state.MovedList = element;
  },
};

const actions = {
  // 副代码区开关
  ChangeToggle(content, value) {
    content.commit("ChangeToggle", value);
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
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
