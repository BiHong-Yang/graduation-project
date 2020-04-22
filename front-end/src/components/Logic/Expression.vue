<template>
  <div class="c-expression">
    <div
      v-show="!item.useEle"
      class="c-expression__header"
      @click="item.useEle = !item.useEle"
    >
      <div @click.stop>
        <el-input
          v-show="!item.useEle && item.elements.length == 0"
          v-model="item.value"
          :placeholder="placeholder"
          class="l-header__input"
        ></el-input>
      </div>

      <div
        class="l-header__item"
        v-show="!item.useEle && item.elements.length > 0"
      >
        <span>已存在表达式，单击查看</span>
      </div>

      <div class="el-icon-arrow-right l-header__button"></div>
    </div>

    <div
      v-show="item.useEle"
      class="c-expression__header"
      @click="item.useEle = !item.useEle"
    >
      <div class="l-header__item">
        <span v-show="item.useEle">请在下框中填入表达式</span>
      </div>

      <div class="el-icon-arrow-down l-header__button"></div>
    </div>

    <div v-show="item.useEle" class="c-expression__body">
      <nested class="nested" :list="item.elements" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["item", "placeholder"],
  components: {},
  computed: {
    ExpChange() {
      return String(0.7 * (this.item.value.length + 3)) + "em";
    },
  },
};
</script>

<style scoped lang="scss">
.c-expression {
  display: flex;
  flex-direction: column;
  // min-width: 13.9rem;
  width: 100%;
  border: 1px solid #dcdfe6;
  border-radius: 3px;

  .c-expression__header {
    display: flex;
    width: 100%;
    align-items: center;
    height: 100%;
    padding: 1px 4px 1px 1px;

    .l-header__input {
      flex: 1 1 auto;
    }
    .l-header__item {
      color: #c0c4cc !important;
      font: 400 13.3333px Arial;
      padding-left: 0.5rem;
      width: 100%;
      height: 100%;
      padding: 0.7rem 0;
    }
    .l-header__button {
      height: 100%;
      color: #303133;
      padding: 0.7rem 0;
      flex: 0 0 auto;
    }
  }

  .c-expression__body {
    padding: 0.1rem;
  }
}
.nested {
  margin: 0;
  min-height: 5rem;
  border: 1px solid #c0c4cc;
  border-radius: 3px;
  box-sizing: border-box;
  display: inline-block;
}
</style>
