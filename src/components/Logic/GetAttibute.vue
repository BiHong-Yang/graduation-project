<template>
  <div class="c-GetAttibute">
    <!-- 显示参数 -->

    <el-select v-if="mode != 'return'" v-model="item.key" @change="change()">
      <!-- 从这里开始，弄选择更改 -->

      <!-- 从这里开始，弄选择更改 -->
      <el-option
        v-for="(v, k) in item.value"
        :key="k"
        :label="v.name"
        :value="k"
        class="c-GetAttibute-name"
      ></el-option>
    </el-select>
    <!-- 对返回使用的特判 -->
    <el-select
      v-else-if="mode == 'return'"
      v-model="item.key"
      @change="change()"
    >
      <!-- 从这里开始，弄选择更改 -->

      <!-- 从这里开始，弄选择更改 -->
      <el-option
        v-for="(v, k) in returnValue()"
        :key="k"
        :label="v.name"
        :value="k"
        class="c-GetAttibute-name"
      ></el-option>
    </el-select>

    <template v-if="mode == 'value'">
      <Content
        v-for="(it, k) in item.value[item.key].contents"
        :key="k"
        :item="it"
        :keyWord="k"
        :type="item.value[item.key].type"
        :mode="'soloMode'"
      ></Content>
    </template>
    <!-- 对返回值类型特判 -->
    <template v-else-if="mode == 'return'">
      <Expression
        v-for="(it, id) in item.value[item.key].value"
        :key="id"
        :item="it"
        :placeholder="'请放入一个可被赋值的变量'"
      ></Expression>
    </template>
    <!-- 对映射类型特判 -->
    <template v-else-if="mode == 'from'">
      <Expression
        v-if="item.key == 'from'"
        :item="doNothing(item.value[item.key])"
        :placeholder="'请输入待选元素键'"
      ></Expression>
    </template>
    <!-- 对数组类型特判 -->
    <template v-else-if="mode == 'key'">
      <Expression
        :item="doNothing(item.value[item.key])"
        :placeholder="'请输入待选元素数字坐标'"
      ></Expression>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      required: false,
      type: Object,
      default: null,
    },
    mode: {
      required: false,
      type: String,
      default: "value",
    },
  },
  methods: {
    doNothing: function (item) {
      console.log("do nothing");
      return item;
    },
    change: function () {
      console.log("mode is :", this.mode);
      console.log("changing key");
    },
    returnValue: function () {
      let temp = this.item;
      if (this.item.value.returns.value.length > 1) {
        delete temp.value.use;
      }
      return temp.value;
    },
  },
};
</script>
<style lang="scss" scoped>
// .c-GetAttibute {
//   border: 1px solid #dcdfe6;
//   border-radius: 3px;
//   padding: 2px;
// }
.c-GetAttibute {
  display: flex;
  flex-direction: column;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  padding: 3px;
  align-items: stretch;
  user-select: none;
  .c-GetAttibute__item {
    display: flex;
    flex-direction: column;
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    padding: 2px;
  }
  .l-GetAttibute__item {
    margin-left: 2px;
  }
}
</style>
