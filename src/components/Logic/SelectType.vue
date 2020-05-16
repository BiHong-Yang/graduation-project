<template>
  <div class="c-SelectType">
    <!-- 显示参数 -->

    <el-select v-model="item.type" @change="ChangeType">
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

    <Content
      v-for="(it, key) in itemFilter(item)"
      :key="key"
      :contents="itemFilter(item)"
      :item="giveItem(it)"
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
    mode: {
      required: false,
      type: String,
      default: "normal",
    },
  },
  computed: {
    ...mapGetters({
      ParamTypes: "logic/ParamTypes",
      GetContracts: "logic/GetContracts",
    }),
    ...mapState({
      RevMap: (status) => status.logic.revMapForParamTypes,
    }),
  },
  methods: {
    ChangeType: function () {
      // this.item.name = JSON.parse(
      //   JSON.stringify(this.ParamTypes[this.RevMap[this.item.type]])
      // ).name;
      // this.item.elements = JSON.parse(
      //   JSON.stringify(this.ParamTypes[this.RevMap[this.item.type]])
      // ).elements;
      // this.item.contents = JSON.parse(
      //   JSON.stringify(this.ParamTypes[this.RevMap[this.item.type]])
      // ).contents;
      let rev = Object.assign({}, this.RevMap);

      let contracts = this.GetContracts;
      if (this.mode == "from") {
        delete rev.mapping;
        delete rev.array;
        for (let i = 0; i < contracts.length; i++) {
          rev[contracts[i].type] = 6 + i;
        }
      } else if (this.mode == "normal") {
        for (let i = 0; i < contracts.length; i++) {
          rev[contracts[i].type] = 8 + i;
        }
      }
      this.item.name = JSON.parse(
        JSON.stringify(this.typeFilter()[rev[this.item.type]])
      ).name;
      this.item.elements = JSON.parse(
        JSON.stringify(this.typeFilter()[rev[this.item.type]])
      ).elements;
      this.item.contents = JSON.parse(
        JSON.stringify(this.typeFilter()[rev[this.item.type]])
      ).contents;
    },
    typeFilter: function () {
      if (this.mode == "from") {
        return this.ParamTypes.filter((item) => {
          return !["mapping", "array"].includes(item.type);
        }).concat(this.GetContracts);
      } else if (this.mode == "normal") {
        return this.ParamTypes.concat(this.GetContracts);
      }
    },

    giveItem: function (item) {
      let temp = item;
      if (!this.ParamTypes.map((x) => x.type).includes(item.type)) {
        temp.temp = "contract_var";
      }
      return temp;
    },

    itemFilter: function (item) {
      let temp = {};
      console.log("item is:", item);
      if (this.mode == "normal") {
        if (!this.ParamTypes.map((x) => x.type).includes(item.type)) {
          console.log("item.type:", item.type);
          temp.value = item.contents.value;
        }
      }
      if (item.contents.categories != undefined) {
        temp.categories = item.contents.categories;
      }
      if (item.type == "mapping") {
        temp.from = item.contents.from;
        temp.to = item.contents.to;
      }
      if (item.type == "array") {
        temp.type = item.contents.type;
      }
      return temp;
    },

    // 筛选一下到底可以选那些类别
    // typeFilter: function () {
    //   let temp = {};
    //   for (let x in this.ParamTypes) {
    //     if (this.ParamTypes[x].type in this.typeExcept) {
    //       continue;
    //     }
    //     temp[x] = this.ParamTypes[x];
    //   }
    //   return temp;
    // },
  },
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
