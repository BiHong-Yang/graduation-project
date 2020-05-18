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
      <div v-if="keyWord == 'categories'" class="l-contents-item">
        <el-select v-model="item.value" placeholder="256字节">
          <el-option
            v-for="id in 32"
            :key="id"
            :label="`${8 * (33 - id)}字节`"
            :value="`uint${8 * (33 - id)}`"
          ></el-option>
        </el-select>
      </div>

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
    </template>

    <!-- int类型 -->
    <template v-else-if="type == 'int'">
      <!-- 类别，即大小上限 -->
      <div v-if="keyWord == 'categories'" class="l-contents-item">
        <el-select v-model="item.value" placeholder="256字节">
          <el-option
            v-for="id in 32"
            :key="id"
            :label="`${8 * (33 - id)}字节`"
            :value="`int${8 * (33 - id)}`"
          ></el-option>
        </el-select>
      </div>

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
      <div v-else-if="keyWord == 'categories'" class="l-contents-item">
        <el-select v-model="item.value" placeholder="最长 32 字节的字节数组">
          <el-option :label="`变长字节数组`" :value="`bytes`"></el-option>

          <el-option
            v-for="id in 32"
            :key="id"
            :label="`最长 ${33 - id} 字节的字节数组`"
            :value="`byte${33 - id}`"
          ></el-option>
        </el-select>
      </div>

      <!-- 名字 -->
      <div v-else-if="keyWord == 'name'" class="l-contents-item">
        <el-input
          @change="refreshVars()"
          v-model="item.value"
          placeholder="请输入一串英文字符"
        ></el-input>
      </div>
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

      <!-- 名字 -->
      <div v-else-if="keyWord == 'name'" class="l-contents-item">
        <el-input
          @change="refreshVars()"
          v-model="item.value"
          placeholder="请输入一串英文字符"
        ></el-input>
      </div>
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
    </template>

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
      <!-- 长度 -->
      <div v-else-if="keyWord == 'len'" class="l-contents-item">
        <el-input
          v-model="item.value"
          placeholder="不填写默认为变长数组"
        ></el-input>
      </div>
    </template>

    <!-- 对变量的处理 -->

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
      <!-- 长度 -->
      <div v-else-if="keyWord == 'len'" class="l-contents-item">
        <el-input v-model="item.value" placeholder="请输入一个数字"></el-input>
      </div>
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

      <div v-else-if="keyWord == 'type'" class="l-contents-item">
        <el-select v-model="item.value" placeholder="内部函数">
          <el-option :label="'内部函数'" :value="`internal`">
            <span class="l-option-label">内部函数</span>
            <Hint content="只可以该合约或该合约的子合约内部调用"> </Hint>
          </el-option>
          <el-option :label="`外部函数`" :value="`external`">
            <span class="l-option-label">外部函数</span>
            <Hint content="用于在该合约外调用"> </Hint>
          </el-option>
          <el-option :label="`公共函数`" :value="`public`">
            <span class="l-option-label">公共函数</span>
            <Hint content="任何用户或者合约都能调用和访问"> </Hint>
          </el-option>
          <el-option :label="`私有函数`" :value="`privite`">
            <span class="l-option-label">私有函数</span>
            <Hint
              content="只能在其所在的合约中调用和访问，即使是其子合约也没有权限访问"
            >
            </Hint>
          </el-option>
        </el-select>
      </div>

      <div v-else-if="keyWord == 'behavior'" class="l-contents-item">
        <el-select v-model="item.value" placeholder="默认模式">
          <el-option :label="'默认模式'" :value="``">
            <span class="l-option-label">默认模式</span>
            <Hint content="不可支付，但可读取/修改合约存储"> </Hint>
          </el-option>
          <el-option :label="`可支付`" :value="`payable`">
            <span class="l-option-label">可支付</span>
            <Hint content="可支付、读取/修改合约存储"> </Hint>
          </el-option>
          <el-option :label="`仅查看`" :value="`view`">
            <span class="l-option-label">仅查看</span>
            <Hint
              content="不可支付、修改合约存储，可读取合约存储（调用开销小于默认模式）"
            >
            </Hint>
          </el-option>
          <el-option :label="`纯调用`" :value="`pure`">
            <span class="l-option-label">纯调用</span>
            <Hint
              content="不可支付、不可读取/修改合约存储（调用开销小于查看模式）"
            >
            </Hint>
          </el-option>
        </el-select>
      </div>
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
        <Parameter :params="item.value"></Parameter>
      </div>

      <div v-else-if="keyWord == 'type'" class="l-contents-item">
        <el-select v-model="item.value" placeholder="公共函数">
          <el-option :label="'内部函数'" :value="`internal`">
            <span class="l-option-label">内部函数</span>
            <Hint content="只可以该合约或该合约的子合约内部调用"> </Hint>
          </el-option>
          <el-option :label="`公共函数`" :value="`public`">
            <span class="l-option-label">公共函数</span>
            <Hint content="任何用户或者合约都能调用和访问"> </Hint>
          </el-option>
        </el-select>
      </div>

      <div v-else-if="keyWord == 'behavior'" class="l-contents-item">
        <el-select v-model="item.value" placeholder="默认模式">
          <el-option :label="'默认模式'" :value="``">
            <span class="l-option-label">默认模式</span>
            <Hint content="不可支付，但可读取/修改合约存储"> </Hint>
          </el-option>
          <el-option :label="`可支付`" :value="`payable`">
            <span class="l-option-label">可支付</span>
            <Hint content="可支付、读取/修改合约存储"> </Hint>
          </el-option>
        </el-select>
      </div>

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
        :mode="'from'"
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
import Hint from "./Hint";
import StructValue from "./StructValue";
import GetAttibute from "./GetAttibute";
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
    Hint,
    StructValue,
    GetAttibute,
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
