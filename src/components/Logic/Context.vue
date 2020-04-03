<template>
  <!-- 值设定部分 -->
  <div class="c-contexts">
    <!-- uint类型 -->
    <div class="l-contexts-item l-contexts__name" v-if="mode=='groupMode'">
      <span>{{item.name}}</span>
    </div>
    <template v-if="type=='uint'">
      <!-- 类别，即大小上限 -->
      <div v-if="keyWord=='categories'" class="l-contexts-item">
        <el-select v-model="item.value" placeholder="最大2的 256 次方">
          <el-option
            v-for="id in 32"
            :key="id"
            :label="`最大2的 ${8*(33 - id)} 次方`"
            :value="`uint${8*(33 - id)}`"
          ></el-option>
        </el-select>
      </div>

      <!-- 初值 -->
      <div v-else-if="keyWord == 'value' " class="l-contexts-item">
        <el-input v-model=" item.value " placeholder="请输入一个数字"></el-input>
      </div>

      <!-- 名字 -->
      <div v-else-if="keyWord=='name'" class="l-contexts-item">
        <el-input v-model=" item.value " placeholder="请输入一串英文字符"></el-input>
      </div>
    </template>

    <!-- int类型 -->
    <template v-else-if="type=='int'">
      <!-- 类别，即大小上限 -->
      <div v-if="keyWord=='categories'" class="l-contexts-item">
        <el-select v-model="item.value" placeholder="最大2的 ±255 次方">
          <el-option
            v-for="id in 32"
            :key="id"
            :label="`最大2的 ±${8*(33 - id)-1} 次方`"
            :value="`int${8*(33 - id)-1}`"
          ></el-option>
        </el-select>
      </div>

      <!-- 初值 -->
      <div v-else-if="keyWord=='value'" class="l-contexts-item">
        <el-input v-model="item.value" placeholder="请输入一个数字"></el-input>
      </div>

      <!-- 名字 -->
      <div v-else-if="keyWord=='name'" class="l-contexts-item">
        <el-input v-model="item.value" placeholder="请输入一串英文字符"></el-input>
      </div>
    </template>

    <!-- bool类型 -->
    <template v-else-if="type=='bool'">
      <!-- 初值 -->
      <div v-if="keyWord=='value'" class="l-contexts-item">
        <el-radio-group v-model="item.value" size="medium">
          <el-radio-button :label="true"></el-radio-button>
          <el-radio-button :label="false"></el-radio-button>
        </el-radio-group>
      </div>

      <!-- 名字 -->
      <div v-else-if="keyWord=='name'" class="l-contexts-item">
        <el-input v-model="item.value" placeholder="请输入一串英文字符"></el-input>
      </div>
    </template>

    <!-- 地址类型 -->
    <template v-else-if="type=='address'">
      <Expression v-if="keyWord=='value'" :item="item" :placeholder="'请输入一个地址'"></Expression>

      <div v-else-if="keyWord=='name'" class="l-contexts-item">
        <el-input v-model="item.value" placeholder="请输入一串英文字符"></el-input>
      </div>
    </template>

    <!-- 字符数组类型，包括定长变长 -->
    <template v-else-if="type=='byteArray'">
      <!-- 初值 -->
      <div v-if="keyWord=='value'" class="l-contexts-item">
        <el-input v-model="item.value" placeholder="请输入一串字符"></el-input>
      </div>

      <!-- 类型，即长度 -->
      <div v-else-if="keyWord=='categories'" class="l-contexts-item">
        <el-select v-model="item.value" placeholder="最长 32 字节的字节数组">
          <el-option :label="`变长字节数组`" :value="`bytes`"></el-option>

          <el-option
            v-for="id in 32"
            :key="id"
            :label="`最长 ${(33-id)} 字节的字节数组`"
            :value="`byte${(33-id)}`"
          ></el-option>
        </el-select>
      </div>

      <!-- 名字 -->
      <div v-else-if="keyWord=='name'" class="l-contexts-item">
        <el-input v-model="item.value" placeholder="请输入一串英文字符"></el-input>
      </div>
    </template>

    <!-- 函数部分 -->

    <!-- 创建函数 -->
    <template v-else-if="type=='function'">
      <!-- 名字 -->
      <div v-if="keyWord=='name'" class="l-contexts-item">
        <el-input v-model="item.value" placeholder="请输入一串英文字符"></el-input>
      </div>

      <div v-else-if="keyWord=='param'" class="l-contexts-item">
        <Parameter :params="item.value"></Parameter>
      </div>

      <div v-else-if="keyWord=='returns'" class="l-contexts-item">
        <Parameter :params="item.value"></Parameter>
      </div>
    </template>
  </div>
</template>

<script>
// import nested from "./nested/nested";
import Expression from "./Expression";
import Parameter from "./Parameter";
export default {
  props: {
    contexts: {
      type: Object,
      required: false
    },
    type: {
      type: String,
      required: false
    },
    // 调用模式，分为单独调用 'soloMode' 和成组调用 'groupMode'
    mode: {
      type: String,
      required: false,
      default: "groupMode"
    },
    item: {
      type: Object,
      required: false
    },
    keyWord: {
      type: String,
      required: false
    }
  },
  methods: {
    checkShow: function(el) {
      return el.show;
    },
    doNothing: function() {}
  },
  computed: {
    element() {
      var temp = Object.assign({}, this.contexts);
      for (let x in temp) {
        if (temp[x].show == false) {
          delete temp[x];
        }
      }
      return Object.assign({}, temp);
    }
  },
  components: {
    // nested,
    Expression,
    Parameter
  }
};
</script>

<style scoped lang="scss">
.c-contexts {
  flex: 0 0 auto;
  font-family: "微软雅黑";
  font-weight: 900;
  color: #409eff;
  user-select: none;
  display: flex;
  align-items: center;
  padding: 2px 0;
  .l-contexts-item {
    padding-right: 0.3rem;
  }
  .l-contexts__name {
    word-wrap: none;
  }
}
</style>