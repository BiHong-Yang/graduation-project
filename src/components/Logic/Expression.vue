<template>
  <div class="c-expression">
    <div
      v-show="!item.useEle"
      class="c-expression__header"
      @click="item.useEle = !item.useEle"
    >
      <div @click.stop>
        <el-input
          @change="refreshVars()"
          v-show="!item.useEle && item.elements.length == 0"
          v-model="item[type]"
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

    <!-- <div
      v-show="item.useEle"
      class="c-expression__header"
      @click="item.useEle = !item.useEle"
    >
      <div class="l-header__item">
        <span v-show="item.useEle">请在下框中填入表达式</span>
      </div>

      <div class="el-icon-arrow-down l-header__button"></div>
    </div> -->

    <div v-show="item.useEle" class="c-expression__body">
      <div class="o-body__block">
        <div class="o-block__mask" v-show="item.elements.length == 0">
          <span> 请填入表达式</span>
        </div>
        <nested class="nested" :list="item.elements" />
      </div>
      <div class="o-body__icon" @click="item.useEle = !item.useEle">
        <div class="el-icon-arrow-down l-header__button"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
      default: "value",
    },
  },
  components: {},
  computed: {
    ExpChange() {
      return String(0.7 * (this.item[this.type].length + 3)) + "em";
    },
  },
  methods: {
    refreshVars: function () {
      this.$store.dispatch("logic/refreshVars");
    },
  },
};
</script>

<style scoped lang="scss">
.c-expression {
  display: flex;
  flex-direction: column;
  min-width: 13.9rem;
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
      flex: 0 0 auto;

      color: #303133;
    }
  }

  .c-expression__body {
    display: flex;
    align-items: stretch;
    .o-body__block {
      height: 100%;
      width: 100%;
      position: relative;
      .o-block__mask {
        margin: 0;
        min-height: 3.3rem;
        border-radius: 3px;
        box-sizing: border-box;
        display: inline-block;
        z-index: 1;
        position: absolute;
        width: calc(100% - 1.25rem);
        align-items: center;
        justify-content: center;
        color: #c0c4cc;
        font-weight: 100;
        font-size: 90%;
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        display: flex;
      }

      .nested {
        min-height: 3rem;
        margin: 3px 0 0 3px;
        border: 1px solid #dcdfe6;
        border-radius: 3px;
        box-sizing: border-box;
        display: inline-block;
        background-color: transparent;
        z-index: 100;
        min-width: calc(100% - 1px) !important;
      }
    }

    .o-body__icon {
      .l-header__button {
        height: 100%;
        color: #303133;
        padding: 0.7rem 0.4rem;
        flex: 0 0 auto;
      }
    }
  }
}
</style>
