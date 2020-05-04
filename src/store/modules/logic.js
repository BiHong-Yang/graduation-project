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

  // 空表达式
  NoneExpression: {
    name: "",
    value: null,
    elements: [],
    useEle: false,
    show: true,
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

    // 一些基础控制逻辑
    {
      type: "control",
      name: "逻辑控制",
      group: { name: "logic", pull: "clone", put: false, revertClone: true },
      elements: [
        {
          type: "if",
          name: "如果",
          elements: [],

          contents: {
            condition: {
              name: "条件",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
          show: true,
        },
        {
          type: "else if",
          name: "否则如果",
          elements: [],

          contents: {
            condition: {
              name: "条件",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
          show: true,
        },
        {
          type: "else",
          name: "否则",
          elements: [],

          contents: {},
          show: true,
        },
        {
          type: "break",
          name: "终止循环",
          elements: [],

          contents: {},
        },
        {
          type: "continue",
          name: "进入下一次循环",
          elements: [],

          contents: {},
        },
        {
          type: "return",
          name: "函数返回",
          elements: [],

          contents: {},
        },
      ],
    },

    // 一些基础自带的属性
    {
      type: "property",
      name: "合约自带属性",
      group: { name: "logic", pull: "clone", put: false, revertClone: true },
      elements: [
        // 矿工地址
        {
          type: "block.coinbase",
          name: "矿工地址",
          elements: [],

          contents: {},
          hint: `返回记录该交易的矿工的地址<br>
          可用于给矿工小费<br>
          类型： 地址(address)<br>
          代码： block.coinbase`,
        },

        // 当前区块 gas 限额
        {
          type: "block.gaslimit",
          name: "gas 限额",
          elements: [],

          contents: {},
          hint: `返回当前区块的 gas 限额<br>
          类型： 256字节的非负整数(uint)<br>
          代码： block.gaslimit`,
        },

        // 当前区块号
        {
          type: "block.number",
          name: "区块号",
          elements: [],

          contents: {},
          hint: `返回当前区块的区块号<br>
          类型： 256字节的非负整数(uint)<br>
          代码： block.number`,
        },

        // 当前区块时间戳
        {
          type: "block.timestamp",
          name: "时间戳",
          elements: [],

          contents: {},
          hint: `自 unix epoch 起始到当前区块创建以秒计的时间戳<br>
          类型： 256字节的非负整数(uint)<br>
          代码： block.timestamp`,
        },

        // 当前区块难度
        {
          type: "gasleft()",
          name: "当前区块难度",
          elements: [],

          contents: {},
          hint: `代码进行到当前步骤剩余的gas<br>
          类型： 256字节的非负整数(uint)<br>
          代码： gasleft()`,
        },

        // 完整的 calldata
        {
          type: "msg.data",
          name: "消息调用数据",
          elements: [],

          contents: {},
          hint: `call 函数所携带的所有 data 信息<br>
          类型： 变长字节数组（bytes）<br>
          代码： msg.data`,
        },

        // 消息发送者
        {
          type: "msg.sender",
          name: "消息发送者",
          elements: [],

          contents: {},
          hint: `调用该条指令所在函数的调用者的地址<br>
          类型： 地址(address)<br>
          代码： msg.sender`,
        },

        // 消息调用前四位
        {
          type: "msg.sig",
          name: "消息函数标识符",
          elements: [],

          contents: {},
          hint: `调用信息的函数标识<br>
          类型： 长度为四字节的数组（bytes4）<br>
          代码： msg.sig`,
        },

        // 调用的费用
        {
          type: "msg.value",
          name: "消息附加费用",
          elements: [],

          contents: {},
          hint: `调用消息附带的以太币的价值<br>
          单位： wei（1 wei = 10^-18 ether, 1 ether 约等于 1500￥ ） <br>
          <span style="color:green">基于 合约自带方法：”xx调用(call/delegatecall)“</span><br>
          类型： 256字节的非负整数（uint）<br>
          代码： msg.value`,
        },

        // 交易的gas价格
        {
          type: "tx.gasprice",
          name: "交易执行价格",
          elements: [],

          contents: {},
          hint: `执行交易的gas价格<br>
          gas价格决定程序每步操作的价格<br>
          更高的gas价格可让交易更快上链<br>
          单位： wei（1 wei = 10^-18 ether, 1 ether 约等于 1500￥ ） <br>
          <span style="color:green">基于 合约自带方法：”xx调用(call/delegatecall)“</span><br>
          类型： 256字节的非负整数（uint）<br>
          代码： tx.gasprice`,
        },

        // 交易发起者
        {
          type: "tx.origin",
          name: "交易发起者",
          elements: [],

          contents: {},
          hint: `调用链的最初发起者<br>
          <span style="color:green">基于 合约自带方法：”xx调用(call/delegatecall)“</span><br>
          类型： 地址（address）<br>
          代码： tx.origin<br>
          <span style="color:red">可能产生意想不到的效果！请充分了解后谨慎使用！</span>`,
        },

        // this 指针
        {
          type: "this",
          name: "当前合约",
          elements: [],

          contents: {},
          hint: `当前合约的地址<br>
          类型： 当前合约（可被强制转换为地址类型）<br>
          代码： this`,
        },
      ],
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

        // 指定区块区块哈希
        {
          type: "blockhash",
          name: "区块哈希",
          elements: [],

          contents: {
            index: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
          hint: `只可以指定最近的256个区块`,
        },

        // 加模
        {
          type: "addmod",
          name: "加模",
          elements: [],

          contents: {
            firstOP: {
              name: "操作数x",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            secondOP: {
              name: "操作数y",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "模数k",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
          hint: `计算 (x + y) % k 的值<br>
          三个参数均为 256字节的整数<br>
          返回： 256字节的整数（uint）<br>
          代码： addmod(uint x, uint y, uint k) returns (uint)<br>
          样例：addmod(1,10,5) 该样例返回 1`,
        },

        // 乘模
        {
          type: "mulmod",
          name: "乘模",
          elements: [],

          contents: {
            firstOP: {
              name: "操作数x",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            secondOP: {
              name: "操作数y",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "模数k",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
          hint: `计算 (x + y) % k 的值<br>
          三个参数均为 256字节的整数<br>
          返回： 256字节的整数（uint）<br>
          代码： mul(uint x, uint y, uint k) returns (uint)<br>
          样例：mulmod(2,3,5) 该样例返回 1`,
        },

        // Ethereum-SHA-3 （Keccak-256）哈希
        {
          type: "keccak256",
          name: "区块哈希(Keccak-256)",
          elements: [],

          contents: {
            param: {
              name: "参数",
              value: [],
              show: true,
            },
          },
          hint: `计算紧打包内容的 Ethereum-SHA-3 （Keccak-256）哈希值<br>
          参数个数没有限制，但必须有清晰的类型<br>
          返回：32字节的字节数组<br>
          代码：keccak256(abi.encodePacked(#内容#)) returns (bytes32)<br>
          样例：keccak256(abi.encodePacked("abc",uint(123),b))<br>
          sha3与keccak256等价<br>
          <span style="color:yellow">最常用<span>`,
        },

        // sha256 哈希
        {
          type: "sha256",
          name: "区块哈希(Keccak-256)",
          elements: [],

          contents: {
            param: {
              name: "参数",
              value: [],
              show: true,
            },
          },
          hint: `计算紧打包内容的 Ethereum-SHA-3 （Keccak-256）哈希值<br>
          参数个数没有限制，但必须有清晰的类型<br>
          返回：32字节的字节数组<br>
          代码：sha256(abi.encodePacked(#内容#)) returns (bytes32)<br>
          样例：sha256(abi.encodePacked("abc",uint(123),b))<br>
          <span style="color:yellow">最常用<span>`,
        },

        //  RIPEMD-160 哈希
        {
          type: "ripemd160",
          name: "区块哈希(RIPEMD-160)",
          elements: [],

          contents: {
            param: {
              name: "参数",
              value: [],
              show: true,
            },
          },
          hint: `计算紧打包内容的 RIPEMD-160 哈希值<br>
          参数个数没有限制，但必须有清晰的类型<br>
          返回：20字节的字节数组<br>
          代码：ripemd160(abi.encodePacked(#内容#)) returns (bytes20)<br>
          样例：ripemd160(abi.encodePacked("abc",uint(123),b))<br>`,
        },

        //  椭圆曲线哈希
        {
          type: "ecrecover",
          name: "区块哈希(椭圆曲线)",
          elements: [],

          contents: {
            hash: {
              name: "签名",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            v: {
              name: "v",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            r: {
              name: "r",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            s: {
              name: "s",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
          hint: `计算 椭圆曲线(ecrecover) 哈希值<br>
          可用于验证签名<br>
          返回：20字节的字节数组<br>
          代码：ecrecover(bytes32 hash, uint8 v, bytes32 r, bytes32 s) returns (address)<br>
          <a style="color:#4089ff" href="https://ethereum.stackexchange.com/questions/15364/ecrecover-from-geth-and-web3-eth-sign">具体用法单击此处</a>`,
        },

        // 账户余额
        {
          type: "balance",
          name: "账户余额",
          elements: [],

          contents: {
            address: {
              name: "地址",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
          hint: `获取目标地址的账户余额<br>
          返回：256字节非负整数<br>
          代码：&ltaddress&gt.balance (uint256)<br>
          `,
        },

        // 转账 transfer
        {
          type: "transfer",
          name: "账户余额",
          elements: [],

          contents: {
            address: {
              name: "地址",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            amount: {
              name: "金额",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
          hint: `向目标地址账户转账指定金额<br>
          单位： wei（1 wei = 10^-18 ether, 1 ether 约等于 1500￥ ） <br>
          代码：&ltaddress&gt.transfer(uint256 amount)<br>
          <span style="color:green">失败时抛出异常,程序终止运行</span><br>
          <span style="color:yellow">更安全</span>
          `,
        },

        // 转账 send
        {
          type: "send",
          name: "账户余额",
          elements: [],

          contents: {
            address: {
              name: "地址",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            amount: {
              name: "金额",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
          hint: `向目标地址账户转账指定金额<br>
          单位： wei（1 wei = 10^-18 ether, 1 ether 约等于 1500￥ ） <br>
          代码：&ltaddress&gt.send(uint256 amount) returns (bool)<br>
          <span style="color:green">失败时返回false，程序继续运行</span><br>
          <span style="color:yellow">可以处理转账失败的后果</span>
          `,
        },

        // 外部调用 call
        {
          type: "call",
          name: "外部调用",
          elements: [],

          contents: {
            address: {
              name: "地址",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            function: {
              name: "目标函数",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            param: {
              name: "调用参数",
              value: [],
              show: true,
            },
            amount: {
              name: "附带金额",
              value: null,
              elements: [],
              useEle: false,
              show: false,
            },
            gas: {
              name: "gas上限",
              value: null,
              elements: [],
              useEle: false,
              show: false,
            },
          },
          hint: `使用指定参数调用指定地址的合约的指定函数<br>
          参数顺序与个数应与目标函数相同<br>
          代码：&ltaddress&gt.call(bytes4(keccak256(#函数样式#)),参数1，参数2，...)<br>
          样例：addr.call(bytes4(keccak256("increaseAge(string,uint256)")),"jack", 1)<br>
          样例中 目标地址：addr ，函数样式：increaseAge(string,uint256) ， 参数："jack" 和 1<br>
          <a style="color:#4089ff" href="https://www.jianshu.com/p/a5c97d0d7cae">具体用法单击此处</a><br>
          <span style="color:yellow">调用函数做出的存储区改变发生在拥有该函数的合约的存储空间</span><br>
          <span style="color:red">底层函数！请充分了解后再使用！</span>
          `,
        },

        // 外部调用 delegatecall
        {
          type: "delegatecall",
          name: "委派调用",
          elements: [],

          contents: {
            address: {
              name: "地址",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            function: {
              name: "目标函数",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            param: {
              name: "调用参数",
              value: [],
              show: true,
            },
            amount: {
              name: "附带金额",
              value: null,
              elements: [],
              useEle: false,
              show: false,
            },
            gas: {
              name: "gas上限",
              value: null,
              elements: [],
              useEle: false,
              show: false,
            },
          },
          hint: `使用指定参数调用指定地址的合约的指定函数<br>
          参数顺序与个数应与目标函数相同<br>
          代码：&ltaddress&gt.delegatecall(bytes4(keccak256(#函数样式#)),参数1，参数2，...)<br>
          样例：addr.delegatecall(bytes4(keccak256("increaseAge(string,uint256)")),"jack", 1)<br>
          样例中 目标地址：addr ，函数样式：increaseAge(string,uint256) ， 参数："jack" 和 1<br>
          <a style="color:#4089ff" href="https://www.jianshu.com/p/fd5075ff0ab9">具体用法单击此处</a><br>
          <span style="color:yellow">调用函数做出的存储区改变发生在调用该函数的合约的存储空间</span><br>
          <span style="color:red">底层函数！请充分了解后再使用！</span>
          `,
        },

        // 销毁函数
        {
          type: "selfdestruct",
          name: "销毁合约",
          elements: [],

          contents: {
            address: {
              name: "地址",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
          hint: `销毁当前合约，把余额发送到指定地址<br>
          代码：selfdestruct(address recipient)<br>
          样例：selfdestruct(addr)`,
        },
      ],
    },

    // 错误处理
    {
      type: "error",
      name: "错误处理",
      group: { name: "logic", pull: "clone", put: false, revertClone: true },
      elements: [{}],
    },
  ],
};

const getters = {
  // 可用作参数的类型
  ParamTypes: (state) => {
    return [state.NoneType].concat(state.transformer[0].elements);
  },
  OperaTypes: (state) => {
    return Array.from(state.transformer[2].elements, (x) => x.type);
  },
  ValueTypes: (state) => {
    return Array.from(state.transformer[4].elements, (x) => x.type).concat(
      Array.from(state.transformer[5].elements, (x) => x.type)
    );
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
  incGlobalId: (state) => {
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
      state.ShowsOnMove.length = 0;
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
