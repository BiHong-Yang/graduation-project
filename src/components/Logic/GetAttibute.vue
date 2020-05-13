<template>
  <div class="c-GetAttibute">
    <!-- 显示参数 -->

    <el-select v-model="item.key">
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

    <Content
      v-for="(it, k) in item.value[item.key].contents"
      :key="k"
      :item="it"
      :keyWord="k"
      :type="item.value[item.key].type"
      :mode="'soloMode'"
    ></Content>
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
