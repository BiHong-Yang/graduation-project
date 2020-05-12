<template>
  <div class="c-GetAttibute">
    <!-- 显示参数 -->

    <el-select
      v-model="item.type"
      :placeholder="placeHolder()"
      @change="ChangeType"
    >
      <!-- 从这里开始，弄选择更改 -->

      <!-- 从这里开始，弄选择更改 -->
      <el-option
        v-for="(types, id) in typeFilter()"
        :key="types.name + id"
        :label="types.name"
        :value="types.type"
        class="c-GetAttibute-name"
      ></el-option>
    </el-select>

    <Content
      v-for="(it, key) in itemFilter(item.contents)"
      :key="key"
      :contents="itemFilter(item.contents)"
      :item="it"
      :keyWord="key"
      :type="item.type"
      :mode="'soloMode'"
    ></Content>
  </div>
</template>

// 参数样式： // { // 类型： // 内容：{ // // } // }

<script>
import { mapGetters, mapState } from "vuex";
export default {
  props: {
    item: {
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
  computed: {
    ...mapGetters({
      ParamTypes: "logic/ParamTypes",
    }),
    ...mapState({
      RevMap: (status) => status.logic.revMapForParamTypes,
    }),
  },
  methods: {
    ChangeType: function () {
      this.item.name = JSON.parse(
        JSON.stringify(this.ParamTypes[this.RevMap[this.item.type]])
      ).name;
      this.item.elements = JSON.parse(
        JSON.stringify(this.ParamTypes[this.RevMap[this.item.type]])
      ).elements;
      this.item.contents = JSON.parse(
        JSON.stringify(this.ParamTypes[this.RevMap[this.item.type]])
      ).contents;
    },
    placeHolder: function () {
      return JSON.parse(
        JSON.stringify(this.ParamTypes[this.RevMap[this.item.type]].name)
      );
    },
    itemFilter: function (contents) {
      let temp = {};
      for (let x in contents) {
        // console.log(x);
        if (contents[x].use == true) {
          temp[x] = contents[x];
        }
      }
      return temp;
    },

    // 筛选一下到底可以选那些类别
    typeFilter: function () {
      let temp = {};
      for (let x in this.ParamTypes) {
        if (this.ParamTypes[x].type in this.typeExcept) {
          continue;
        }
        temp[x] = this.ParamTypes[x];
      }
      return temp;
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
