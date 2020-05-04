<template>
  <div v-if="place == 'createFunc'" class="c-VariableParam">
    <div
      v-for="(item, index) in params"
      :key="index"
      class="c-VariableParam__item l-VariableParam__item"
    >
      <!-- 删除参数 -->

      <el-tooltip
        class="item"
        effect="dark"
        content="删除该参数"
        placement="top-start"
        :disabled="useHint"
      >
        <span
          class="l-icon--small u-align-self-fstart"
          @click="deleteItem(index)"
        >
          <i class="el-icon-close"></i>
        </span>
      </el-tooltip>

      <!-- 显示参数 -->
      <div>
        <Expression
          :item="item"
          :placeholder="'请输入操作数或变量名'"
        ></Expression>
      </div>
      <!-- <Content :contents="item.contents" :type="item.type" :mode="'soloMode'"></Content> -->
    </div>

    <!-- 添加参数 -->

    <el-tooltip
      class="item"
      effect="dark"
      content="添加参数"
      placement="top-start"
      :disabled="useHint"
    >
      <span class="l-icon" @click="addParam">
        <i class="el-icon-circle-plus"></i>
      </span>
    </el-tooltip>
  </div>
</template>

<script>
// 参数样式：
// {
//   类型：
//   内容：{
//
//      }
// }
export default {
  props: {
    place: {
      required: false,
      type: String,
      default: "createFunc",
    },
    params: {
      required: false,
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    useHint() {
      return !this.$store.state.control.hint;
    },
  },
  methods: {
    deleteItem: function (index) {
      this.params.splice(index, 1);
    },
    addParam: function () {
      this.params.push(
        JSON.parse(JSON.stringify(this.$store.state.logic.NoneExpression))
      );
    },
  },
  // mounted: function() {
  //   console.log("monuted:", this.params);
  // },
  // beforeUpdate: function() {
  //   console.log("beforeUpdate:", this.params);
  // }
};
</script>

<style lang="scss">
.c-VariableParam {
  display: flex;
  // flex-wrap: wrap;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  padding: 3px 0;
  align-items: flex-start;
  user-select: none;
  .c-VariableParam__item {
    display: flex;
    flex-direction: column;
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    padding: 2px;
  }
  .l-VariableParam__item {
    margin-left: 2px;
  }
}
</style>
