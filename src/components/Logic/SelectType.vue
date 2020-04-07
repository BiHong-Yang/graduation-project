<template>
  <div class="c-SelectType">
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
        class="c-SelectType-name"
      ></el-option>
    </el-select>

    <Context
      v-for="(it, key) in itemFilter(item.contexts)"
      :key="key"
      :contexts="itemFilter(item.contexts)"
      :item="it"
      :keyWord="key"
      :type="item.type"
      :mode="'soloMode'"
    ></Context>
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
      default: null
    },
    typeExcept: {
      required: false,
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  computed: {
    ...mapGetters({
      ParamTypes: "logic/ParamTypes"
    }),
    ...mapState({
      RevMap: status => status.logic.revMapForParamTypes
    })
  },
  methods: {
    ChangeType: function() {
      console.log("in Change function:");
      console.log(this.item.type);
      console.log(this.RevMap[this.item.type]);
      console.log(this.ParamTypes[this.RevMap[this.item.type]]);
      this.item.name = JSON.parse(
        JSON.stringify(this.ParamTypes[this.RevMap[this.item.type]])
      ).name;
      console.log("elements");
      this.item.elements = JSON.parse(
        JSON.stringify(this.ParamTypes[this.RevMap[this.item.type]])
      ).elements;
      console.log("contexts");
      this.item.contexts = JSON.parse(
        JSON.stringify(this.ParamTypes[this.RevMap[this.item.type]])
      ).contexts;
    },
    placeHolder: function() {
      return JSON.parse(
        JSON.stringify(this.ParamTypes[this.RevMap[this.item.type]].name)
      );
    },
    itemFilter: function(contexts) {
      let temp = {};
      for (let x in contexts) {
        console.log(x);
        if (contexts[x].use == true) {
          temp[x] = contexts[x];
        }
      }
      return temp;
    },

    // 筛选一下到底可以选那些类别
    typeFilter: function() {
      let temp = {};
      console.log(this.ParamTypes);
      console.log("except type: ", this.typeExcept);
      for (let x in this.ParamTypes) {
        console.log("x is ", x);
        console.log("type is: ", this.ParamTypes[x].type);
        if (this.ParamTypes[x].type in this.typeExcept) {
          console.log("except: ", x);
          continue;
        }
        temp[x] = this.ParamTypes[x];
      }
      return temp;
    }
  }
};
</script>
<style lang="scss" scoped>
// .c-SelectType {
//   border: 1px solid #dcdfe6;
//   border-radius: 3px;
//   padding: 2px;
// }
.c-SelectType {
  display: flex;
  flex-direction: column;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  padding: 3px;
  align-items: stretch;
  user-select: none;
  .c-SelectType__item {
    display: flex;
    flex-direction: column;
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    padding: 2px;
  }
  .l-SelectType__item {
    margin-left: 2px;
  }
}
</style>
