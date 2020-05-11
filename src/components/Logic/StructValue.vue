<template>
  <div class="c-StructValue">
    <!-- 显示参数 -->
    <Content
      class="c-StructValue__item"
      v-for="(it, key) in value"
      :key="key"
      :item="it"
      :keyWord="'value'"
      :type="it.type"
      :mode="'soloMode'"
    ></Content>
  </div>
</template>

// 参数样式： // { // 类型： // 内容：{ // // } // }

<script>
export default {
  props: {
    value: {
      required: false,
      type: Object,
      default: null,
    },
    typeExcept: {
      required: false,
      type: Object,
      default: function () {
        return {};
      },
    },
  },
};
</script>
<style lang="scss" scoped>
// .c-StructValue {
//   border: 1px solid #dcdfe6;
//   border-radius: 3px;
//   padding: 2px;
// }
.c-StructValue {
  display: flex;
  flex-direction: column;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  padding: 3px;
  align-items: stretch;
  user-select: none;
  .c-StructValue__item {
    display: flex;
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    padding: 2px;
    align-items: center;
    .l-StructValue__item__name {
      color: #c0c4cc !important;
      font-size: 70%;
      word-wrap: none;
      padding-right: 0.3rem;
    }
  }
  .l-StructValue__item {
    margin-left: 2px;
  }
}
</style>
