<template>
  <div v-if="place == 'createFunc'" class="c-Parameter">
    <div
      v-for="(item, index) in params"
      :key="index"
      class="c-Parameter__item l-Parameter__item"
    >
      <!-- 显示参数 -->
      <div class="c-item__header">
        <el-select
          v-if="['select'].includes(mode)"
          class="c-header__select"
          v-model="item.type"
          :placeholder="placeHolder(item)"
          @change="ChangeType(index)"
        >
          <el-option
            v-for="(types, id) in ParamTypes"
            :key="types.name + id"
            :label="types.name"
            :value="types.type"
            class="c-Parameter-name"
          ></el-option>
        </el-select>

        <!-- 处理returns的特判 -->

        <el-select
          v-if="['returns', 'param'].includes(mode)"
          class="c-header__select"
          v-model="item.type"
          @change="returnsChangeType(index)"
        >
          <el-option
            v-for="(types, id) in returnsParams()"
            :key="types.name + id"
            :label="types.name"
            :value="types.type"
            class="c-Parameter-name"
          ></el-option>
        </el-select>
        <!-- 简单模式 -->
        <div v-else-if="['modifiers', 'simple'].includes(mode)">
          <Expression
            :item="item"
            :placeholder="'请输入操作数或变量名'"
          ></Expression>
        </div>

        <!-- 返回值的处理 -->
        <!-- <el-select
          v-else-if="mode == 'returns'"
          class="c-header__select"
          v-model="item.type"
          :placeholder="placeHolder(item)"
        >
          <el-option
            v-for="(types, id) in ParamTypes"
            :key="types.name + id"
            :label="types.name"
            :value="types.type"
            class="c-Parameter-name"
          ></el-option>
        </el-select> -->

        <!-- 删除参数 -->

        <el-tooltip
          class="item c-header__delete"
          effect="dark"
          content="删除该参数"
          placement="top-start"
          :disabled="useHint"
        >
          <span class="l-icon--big" @click="deleteItem(index)">
            <i class="el-icon-circle-close"></i>
          </span>
        </el-tooltip>
      </div>
      <!-- 内容 -->
      <template v-if="mode == 'select'">
        <Content
          v-for="(it, key) in itemFilter(item.contents)"
          :key="key"
          :contents="itemFilter(item.contents)"
          :item="it"
          :keyWord="key"
          :type="item.type"
          :mode="'soloMode'"
          class="l-item__contents"
        ></Content>
      </template>
      <!-- 函数的参数，只记名字 -->
      <template v-else-if="mode == 'param'">
        <Content
          v-for="(it, key) in nameFilter(item.contents)"
          :key="key"
          :contents="nameFilter(item.contents)"
          :item="it"
          :keyWord="key"
          :type="item.type"
          :mode="'soloMode'"
          class="l-item__contents"
        ></Content>
      </template>
      <!-- 函数的参数，只记名字 -->
      <template v-else-if="mode == 'returns'">
        <Content
          v-for="(it, key) in returnsFilter(item.contents)"
          :key="key"
          :contents="returnsFilter(item.contents)"
          :item="it"
          :keyWord="key"
          :type="item.type"
          :mode="'soloMode'"
          class="l-item__contents"
        ></Content>
      </template>

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
import { mapGetters, mapState } from "vuex";
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
    mode: {
      required: false,
      type: String,
      default: "select",
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
      GetContracts: "logic/GetContracts",
    }),
    ...mapState({
      RevMap: (status) => status.logic.revMapForParamTypes,
    }),
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
        JSON.parse(JSON.stringify(this.$store.state.logic.NoneType))
      );
    },
    ChangeType: function (index) {
      this.params.splice(
        index,
        1,
        JSON.parse(
          JSON.stringify(this.ParamTypes[this.RevMap[this.params[index].type]])
        )
      );
    },
    placeHolder: function (item) {
      return JSON.parse(
        JSON.stringify(this.ParamTypes[this.RevMap[item.type]].name)
      );
    },
    itemFilter: function (contents) {
      let temp = {};
      for (let x in contents) {
        console.log(x);
        if (contents[x].show == true) {
          temp[x] = contents[x];
        }
      }
      return temp;
    },
    nameFilter: function (contents) {
      // console.log("in name");
      let temp = {};
      if (contents.categories != undefined) {
        temp.categories = contents.categories;
      }
      if (contents.name != undefined) {
        temp.name = contents.name;
      }
      return temp;
    },
    returnsFilter: function (contents) {
      // console.log("in name");
      let temp = {};
      if (contents.categories != undefined) {
        temp.categories = contents.categories;
      }
      return temp;
    },
    // **口子** 完成合约的注册和
    returnsParams: function () {
      return this.ParamTypes.filter((item) => {
        return !["mapping", "array"].includes(item.type);
      }).concat(this.GetContracts);
    },
    returnsChangeType: function (index) {
      let rev = Object.assign({}, this.RevMap);
      delete rev.mapping;
      delete rev.array;
      let contracts = this.GetContracts;
      for (let i = 0; i < contracts.length; i++) {
        rev[contracts[i].type] = 6 + i;
      }
      this.params.splice(
        index,
        1,
        JSON.parse(
          JSON.stringify(this.returnsParams()[rev[this.params[index].type]])
        )
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

<style lang="scss" scoped>
.c-Parameter {
  display: flex;
  // flex-wrap: wrap;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  padding: 3px 0;
  align-items: flex-start;
  user-select: none;
  .c-Parameter__item {
    display: flex;
    flex-direction: column;
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    padding: 2px;
    .c-item__header {
      display: flex;
      align-items: stretch;
      .c-header__select {
        flex: 1 1 auto;
      }
      .c-header__delete {
        flex: 0 0 auto;
      }
    }
  }
  .l-Parameter__item {
    margin-left: 2px;
  }
}
.l-icon {
  padding: 0 5px;
}
.l-icon--big {
  display: flex;
  align-items: center;
  padding: 0 0.2rem 0 0.3rem;
}
.l-item__contents {
}
</style>
