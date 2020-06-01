<template>
  <!-- 值设定部分 -->
  <div class="c-contents">
    <!-- uint类型 -->
    <div
      class="l-contents-item l-contents__name"
      :class="{ 'l-contents__name--sub': mode == 'soloMode' }"
    >
      <span>{{ item.name }}</span>
    </div>
    <template v-if="type == 'uint'">
      <!-- 类别，即大小上限 -->

      <Selector
        v-if="keyWord == 'categories'"
        class="l-contents-item"
        :mode="'uint'"
        :item="item"
      ></Selector>
      <!-- 初值 -->
      <Expression
        v-if="keyWord == 'value'"
        :item="item"
        :placeholder="'请输入一个数字'"
      ></Expression>
      <!-- 名字 -->
      <div v-else-if="keyWord == 'name'" class="l-contents-item">
        <el-input
          v-model="item.value"
          @change="refreshVars()"
          placeholder="请输入一串英文字符"
        ></el-input>
      </div>

      <Selector
        v-else-if="keyWord == 'store'"
        class="l-contents-item"
        :mode="'store'"
        :item="item"
      ></Selector>

      <Selector
        v-else-if="keyWord == 'visibility'"
        class="l-contents-item"
        :mode="'visibility-var'"
        :item="item"
      ></Selector>
    </template>

    <!-- int类型 -->
    <template v-else-if="type == 'int'">
      <!-- 类别，即大小上限 -->
      <Selector
        v-if="keyWord == 'categories'"
        class="l-contents-item"
        :mode="'int'"
        :item="item"
      ></Selector>

      <!-- 初值 -->
      <Expression
        v-if="keyWord == 'value'"
        :item="item"
        :placeholder="'请输入一个数字'"
      ></Expression>

      <!-- 名字 -->
      <div v-else-if="keyWord == 'name'" class="l-contents-item">
        <el-input
          v-model="item.value"
          @change="refreshVars()"
          placeholder="请输入一串英文字符"
        ></el-input>
      </div>

      <!-- 存储位置 -->
      <Selector
        v-else-if="keyWord == 'store'"
        class="l-contents-item"
        :mode="'store'"
        :item="item"
      ></Selector>

      <Selector
        v-else-if="keyWord == 'visibility'"
        class="l-contents-item"
        :mode="'visibility-var'"
        :item="item"
      ></Selector>
    </template>

    <!-- bool类型 -->
    <template v-else-if="type == 'bool'">
      <!-- 初值 -->
      <div v-if="keyWord == 'value'" class="l-contents-item">
        <el-radio-group v-model="item.value" size="medium">
          <el-radio-button :label="true"></el-radio-button>
          <el-radio-button :label="false"></el-radio-button>
        </el-radio-group>
      </div>

      <!-- 名字 -->
      <div v-else-if="keyWord == 'name'" class="l-contents-item">
        <el-input
          v-model="item.value"
          @change="refreshVars()"
          placeholder="请输入一串英文字符"
        ></el-input>
      </div>

      <!-- 存储位置 -->
      <Selector
        v-else-if="keyWord == 'store'"
        class="l-contents-item"
        :mode="'store'"
        :item="item"
      ></Selector>

      <Selector
        v-else-if="keyWord == 'visibility'"
        class="l-contents-item"
        :mode="'visibility-var'"
        :item="item"
      ></Selector>
    </template>

    <!-- 地址类型 -->
    <template v-else-if="type == 'address'">
      <Expression
        v-if="keyWord == 'value'"
        :item="item"
        :placeholder="'请输入一个地址'"
      ></Expression>

      <div v-else-if="keyWord == 'name'" class="l-contents-item">
        <el-input
          v-model="item.value"
          @change="refreshVars()"
          placeholder="请输入一串英文字符"
        ></el-input>
      </div>

      <!-- 存储位置 -->
      <Selector
        v-else-if="keyWord == 'store'"
        class="l-contents-item"
        :mode="'store'"
        :item="item"
      ></Selector>

      <Selector
        v-else-if="keyWord == 'visibility'"
        class="l-contents-item"
        :mode="'visibility-var'"
        :item="item"
      ></Selector>
    </template>

    <!-- 字符数组类型，包括定长变长 -->
    <template v-else-if="type == 'byteArray'">
      <!-- 初值 -->
      <Expression
        v-if="keyWord == 'value'"
        :item="item"
        :placeholder="'请输入一个字符串'"
      ></Expression>
      <!-- 类型，即长度 -->
      <Selector
        v-if="keyWord == 'categories'"
        class="l-contents-item"
        :mode="'byteArray'"
        :item="item"
      ></Selector>

      <!-- 名字 -->
      <div v-else-if="keyWord == 'name'" class="l-contents-item">
        <el-input
          @change="refreshVars()"
          v-model="item.value"
          placeholder="请输入一串英文字符"
        ></el-input>
      </div>

      <!-- 存储位置 -->
      <Selector
        v-else-if="keyWord == 'store'"
        class="l-contents-item"
        :mode="'store'"
        :item="item"
      ></Selector>

      <Selector
        v-else-if="keyWord == 'visibility'"
        class="l-contents-item"
        :mode="'visibility-var'"
        :item="item"
      ></Selector>
    </template>

    <!-- 映射类型 -->

    <template v-else-if="type == 'mapping'">
      <!-- 初值 -->
      <div v-if="keyWord == 'from'" class="l-contents-item">
        <SelectType :item="item.value" :mode="'from'"></SelectType>
      </div>

      <div v-else-if="keyWord == 'to'" class="l-contents-item">
        <SelectType :item="item.value"></SelectType>
      </div>

      <Expression
        v-else-if="keyWord == 'value'"
        :item="item"
        :placeholder="'请输入一个映射'"
      ></Expression>

      <!-- 名字 -->
      <div v-else-if="keyWord == 'name'" class="l-contents-item">
        <el-input
          @change="refreshVars()"
          v-model="item.value"
          placeholder="请输入一串英文字符"
        ></el-input>
      </div>

      <Selector
        v-else-if="keyWord == 'visibility'"
        class="l-contents-item"
        :mode="'visibility-var'"
        :item="item"
      ></Selector>
    </template>

    <!-- 结构体 -->

    <template v-else-if="['struct', 'contract'].includes(type)">
      <!-- 初值 -->
      <div v-if="keyWord == 'name'" class="l-contents-item">
        <el-input
          @change="refreshVars()"
          v-model="item.value"
          placeholder="请输入一串英文字符"
        ></el-input>
      </div>
      <!-- <Parameter :params="item.value"></Parameter> -->
      <!-- <SelectType :mode="'struct'" :item="item.value"></SelectType> -->
      <!-- <Expression
          :item="item"
          :placeholder="'请输入操作数或变量名'"
        ></Expression> -->
      <StructValue
        v-else-if="keyWord == 'value'"
        class="l-contents-item"
        :value="item.value"
      ></StructValue>

      <!-- 存储位置 -->
      <Selector
        v-else-if="keyWord == 'store'"
        class="l-contents-item"
        :mode="'store'"
        :item="item"
      ></Selector>
    </template>

    <!-- 合约 与结构体类似 -->
    <template v-else-if="type == 'contract'">
      <!-- 初值 -->
      <div v-if="keyWord == 'name'" class="l-contents-item">
        <el-input
          @change="refreshVars()"
          v-model="item.value"
          placeholder="请输入一串英文字符"
        ></el-input>
      </div>
      <!-- <Parameter :params="item.value"></Parameter> -->
      <!-- <SelectType :mode="'struct'" :item="item.value"></SelectType> -->
      <!-- <Expression
          :item="item"
          :placeholder="'请输入操作数或变量名'"
        ></Expression> -->
      <StructValue
        v-else-if="keyWord == 'value'"
        class="l-contents-item"
        :value="item.value"
      ></StructValue>

      <Selector
        v-else-if="keyWord == 'visibility'"
        class="l-contents-item"
        :mode="'visibility-var'"
        :item="item"
      ></Selector>
    </template>

    <!-- 数组 -->
    <template v-else-if="type == 'array'">
      <!-- 初值 -->
      <div v-if="keyWord == 'type'" class="l-contents-item">
        <SelectType :item="item.value"></SelectType>
      </div>

      <!-- 名字 -->
      <div v-else-if="keyWord == 'name'" class="l-contents-item">
        <el-input
          @change="refreshVars()"
          v-model="item.value"
          placeholder="请输入一串英文字符"
        ></el-input>
      </div>

      <Expression
        v-else-if="keyWord == 'value'"
        :item="item"
        :placeholder="'请输入一个字符串'"
      ></Expression>
      <!-- 长度 -->
      <div v-else-if="keyWord == 'len'" class="l-contents-item">
        <el-input
          @change="refreshVars()"
          v-model="item.value"
          placeholder="不填写默认为变长数组"
        ></el-input>
      </div>

      <!-- 存储位置 -->
      <Selector
        v-else-if="keyWord == 'store'"
        class="l-contents-item"
        :mode="'store'"
        :item="item"
      ></Selector>
    </template>

    <!-- 函数部分 -->

    <!-- 创建函数 -->
    <template v-else-if="type == 'function_creator'">
      <!-- 名字 -->
      <div v-if="keyWord == 'name'" class="l-contents-item">
        <el-input
          @change="refreshVars()"
          v-model="item.value"
          placeholder="请输入一串英文字符"
        ></el-input>
      </div>

      <div v-else-if="keyWord == 'param'" class="l-contents-item">
        <Parameter :mode="'param'" :params="item.value"></Parameter>
      </div>

      <div v-else-if="keyWord == 'modifiers'" class="l-contents-item">
        <Parameter :mode="'modifiers'" :params="item.value"></Parameter>
      </div>

      <div v-else-if="keyWord == 'returns'" class="l-contents-item">
        <Parameter :mode="'returns'" :params="item.value"></Parameter>
      </div>

      <!-- 可见性 -->
      <Selector
        v-if="keyWord == 'type'"
        class="l-contents-item"
        :mode="'visibility'"
        :item="item"
      ></Selector>

      <!-- 调用行为 -->
      <Selector
        v-if="keyWord == 'behavior'"
        class="l-contents-item"
        :mode="'behavior'"
        :item="item"
      ></Selector>
    </template>

    <!-- 创建装饰器 -->

    <template v-else-if="type == 'modifier'">
      <div>
        <div v-if="keyWord == 'name'" class="l-contents-item">
          <el-input
            @change="refreshVars()"
            v-model="item.value"
            placeholder="请输入一串英文字符"
          ></el-input>
        </div>

        <div v-else-if="keyWord == 'param'" class="l-contents-item">
          <Parameter :mode="'param'" :params="item.value"></Parameter>
        </div>

        <div v-else-if="keyWord == 'returns'" class="l-contents-item">
          <Parameter :params="item.value"></Parameter>
        </div>
      </div>
    </template>

    <!-- 创建合约 -->

    <template v-else-if="type == 'contract_creator'">
      <div>
        <div v-if="keyWord == 'name'" class="l-contents-item">
          <el-input
            @change="refreshVars()"
            v-model="item.value"
            placeholder="请输入一串英文字符"
          ></el-input>
        </div>
      </div>
    </template>

    <!-- 创建结构体 -->
    <template v-else-if="type == 'struct_creator'">
      <!-- 名字 -->
      <div v-if="keyWord == 'name'" class="l-contents-item">
        <el-input
          @change="refreshVars()"
          v-model="item.value"
          placeholder="请输入一串英文字符"
        ></el-input>
      </div>
    </template>

    <template v-else-if="type == 'constructor'">
      <!-- 名字 -->

      <div v-if="keyWord == 'param'" class="l-contents-item">
        <Parameter :mode="'param'" :params="item.value"></Parameter>
      </div>

      <Selector
        v-if="keyWord == 'type'"
        class="l-contents-item"
        :mode="'visibility-simple'"
        :item="item"
      ></Selector>

      <!-- 调用行为 -->
      <Selector
        v-if="keyWord == 'behavior'"
        class="l-contents-item"
        :mode="'behavior-simple'"
        :item="item"
      ></Selector>

      <div v-else-if="keyWord == 'modifiers'" class="l-contents-item">
        <Parameter :mode="'modifiers'" :params="item.value"></Parameter>
      </div>
    </template>

    <!-- 运算符 -->
    <template
      v-else-if="
        [
          ' = ',
          ' + ',
          ' - ',
          ' * ',
          ' / ',
          ' % ',
          ' ** ',
          ' < ',
          ' > ',
          ' <= ',
          ' >= ',
          ' == ',
          ' != ',
          ' && ',
          ' || ',
          ' ! ',
          ' -',
          ' << ',
          ' >> ',
        ].includes(type)
      "
    >
      <Expression
        :item="item"
        :placeholder="'请输入操作数或变量名'"
      ></Expression>
    </template>

    <template v-else-if="type == 'conversion'">
      <div>
        <div v-if="keyWord == 'item'" class="l-contents-item">
          <Expression
            :item="item"
            :placeholder="'请输入操作数或变量名'"
          ></Expression>
        </div>

        <div v-else-if="keyWord == 'target'" class="l-contents-item">
          <SelectType :item="item.value" :mode="'from'"></SelectType>
        </div>
      </div>
    </template>

    <!-- if条件 -->
    <template v-else-if="type == 'if'">
      <div>
        <div v-if="keyWord == 'condition'" class="l-contents-item">
          <Expression
            :item="item"
            :placeholder="'请输入操作数或变量名'"
          ></Expression>
        </div>
      </div>
    </template>

    <!-- else if 判断 -->
    <template v-else-if="type == 'else if'">
      <div>
        <div v-if="keyWord == 'condition'" class="l-contents-item">
          <Expression
            :item="item"
            :placeholder="'请输入操作数或变量名'"
          ></Expression>
        </div>
      </div>
    </template>

    <!-- else if 判断 -->
    <template v-else-if="type == 'for'">
      <div>
        <div class="l-contents-item">
          <Expression :item="item" :placeholder="'请输入表达式'"></Expression>
        </div>
      </div>
    </template>

    <!-- 区块哈希 -->
    <template v-else-if="type == 'blockhash'">
      <Expression :item="item" :placeholder="'请输入区块id 0~255'"></Expression>
    </template>

    <!-- 大模运算 -->
    <template v-else-if="['addmod', 'mulmod'].includes(type)">
      <div class="l-contents-item">
        <Expression
          :item="item"
          :placeholder="'请输入操作数或变量名'"
        ></Expression>
      </div>
    </template>

    <!-- 哈希们 -->
    <template v-else-if="['keccak256', 'ripemd160', 'sha256'].includes(type)">
      <div v-if="keyWord == 'param'" class="l-contents-item">
        <Parameter :mode="'simple'" :params="item.value"></Parameter>
      </div>
    </template>

    <!-- 椭圆曲线哈希 -->
    <template v-else-if="['ecrecover'].includes(type)">
      <div class="l-contents-item">
        <Expression
          :item="item"
          :placeholder="'请输入操作数或变量名'"
        ></Expression>
      </div>
    </template>

    <!-- 地址相关函数 -->
    <template
      v-else-if="['balance', 'transfer', 'send', 'selfdestruct'].includes(type)"
    >
      <div class="l-contents-item">
        <Expression
          :item="item"
          :placeholder="'请输入操作数或变量名'"
        ></Expression>
      </div>
    </template>

    <!-- 两种 call -->
    <template v-else-if="['call', 'delegatecall'].includes(type)">
      <div v-if="keyWord == 'param'" class="l-contents-item">
        <Parameter :mode="'simple'" :params="item.value"></Parameter>
      </div>

      <div v-else class="l-contents-item">
        <!-- <Parameter :params="item.value"></Parameter> -->

        <Expression
          :item="item"
          :placeholder="'请输入操作数或变量名'"
        ></Expression>
      </div>
    </template>

    <!-- 错误处理 -->
    <template
      v-else-if="['require', 'assert', 'revert', 'selfdestruct'].includes(type)"
    >
      <div class="l-contents-item">
        <Expression
          :item="item"
          :placeholder="'请输入操作数或变量名'"
        ></Expression>
      </div>
    </template>

    <template
      v-else-if="['require', 'assert', 'revert', 'selfdestruct'].includes(type)"
    >
      <div class="l-contents-item">
        <Expression
          :item="item"
          :placeholder="'请输入操作数或变量名'"
        ></Expression>
      </div>
    </template>

    <!-- 对变量们的处理 -->

    <!-- 函数 -->
    <template v-else-if="['function'].includes(type)">
      <!-- 参数 -->
      <StructValue
        v-if="keyWord == 'param'"
        class="l-contents-item"
        :value="item.value"
      ></StructValue>
      <!-- 属性 -->
      <GetAttibute
        :mode="'return'"
        v-else-if="keyWord == 'value'"
        class="l-contents-item"
        :item="item"
      ></GetAttibute>
    </template>

    <!-- 装饰器 -->
    <template v-else-if="['modifier_var'].includes(type)">
      <!-- 参数 -->
      <StructValue
        v-if="keyWord == 'param'"
        class="l-contents-item"
        :value="item.value"
      ></StructValue>
    </template>

    <!-- 合约变量和结构体变量 -->
    <template v-else-if="['contract_var', 'struct_var'].includes(type)">
      <GetAttibute
        v-if="keyWord == 'value'"
        class="l-contents-item"
        :item="item"
      ></GetAttibute>
    </template>

    <!-- 映射类型 -->
    <template v-else-if="['mapping_var'].includes(type)">
      <GetAttibute
        :mode="'key'"
        v-if="keyWord == 'value'"
        class="l-contents-item"
        :item="item"
      ></GetAttibute>
    </template>

    <!-- 映射类型 -->
    <template v-else-if="['byteArray_var', 'array_var'].includes(type)">
      <GetAttibute
        :mode="'key'"
        v-if="keyWord == 'value'"
        class="l-contents-item"
        :item="item"
      ></GetAttibute>
    </template>

    <!-- 返回值 -->
    <template v-else-if="['return'].includes(type)">
      <div v-if="keyWord == 'value'" class="l-contents-item">
        <Parameter :mode="'modifiers'" :params="item.value"></Parameter>
      </div>
    </template>
    <!-- 对新注册的东西 -->
    <template v-else>
      <div v-if="keyWord == 'name'" class="l-contents-item">
        <el-input
          v-model="item.value"
          @change="refreshVars()"
          placeholder="请输入一串英文字符"
        ></el-input>
      </div>
      <GetAttibute
        v-else-if="keyWord == 'value'"
        class="l-contents-item"
        :item="item"
      ></GetAttibute>
    </template>
  </div>
</template>

<script>
// import nested from "./nested/nested";
import SelectType from "./SelectType";
import Expression from "./Expression";
import Parameter from "./Parameter";
import StructValue from "./StructValue";
import GetAttibute from "./GetAttibute";
import Selector from "./Selector";
export default {
  props: {
    contents: {
      type: Object,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    // 调用模式，分为单独调用 'soloMode' 和成组调用 'groupMode'
    mode: {
      type: String,
      required: false,
      default: "groupMode",
    },
    item: {
      type: Object,
      required: false,
    },
    keyWord: {
      type: String,
      required: false,
    },
  },
  methods: {
    checkShow: function (el) {
      return el.show;
    },
    doNothing: function () {
      console.log("here");
    },
    refreshVars: function () {
      this.$store.dispatch("logic/refreshVars");
    },
  },
  computed: {
    element() {
      var temp = Object.assign({}, this.contents);
      for (let x in temp) {
        if (temp[x].show == false) {
          delete temp[x];
        }
      }
      return Object.assign({}, temp);
    },
  },
  components: {
    // nested,
    Expression,
    Parameter,
    SelectType,
    StructValue,
    GetAttibute,
    Selector,
  },
};
</script>

<style scoped lang="scss">
.c-contents {
  flex: 0 0 auto;
  font-family: "微软雅黑";
  font-weight: 900;
  color: #409eff;
  user-select: none;
  display: flex;
  align-items: center;
  padding: 2px 0;
  .l-contents-item {
    padding-right: 0.3rem;
  }
  .l-contents-item--else {
    margin: 0 0 0 1rem !important;
  }
  .l-contents__name {
    white-space: nowrap;
  }
  .l-contents__name--sub {
    color: #c0c4cc !important;
    font-size: 70%;
  }
}
.el-icon-question {
  font-size: 120%;
}
.l-option-label {
  flex: 1 1 auto;
}
.el-select-dropdown__item {
  display: flex;
  align-items: center;
}
</style>
