<template>
  <div v-if="place == 'createFunc'" class="c-Parameter">
    <div
      v-for="(item, index) in params"
      :key="index"
      class="c-Parameter__item l-Parameter__item"
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

      <el-select
        v-model="item.type"
        :placeholder="placeHolder(item)"
        @change="ChangeType(index)"
      >
        <!-- 从这里开始，弄选择更改 -->

        <!-- 从这里开始，弄选择更改 -->
        <el-option
          v-for="(types, id) in ParamTypes"
          :key="types.name + id"
          :label="types.name"
          :value="types.type"
          class="c-Parameter-name"
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
        class="l-item__contexts"
      ></Context>

      <!-- <Context :contexts="item.contexts" :type="item.type" :mode="'soloMode'"></Context> -->
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
      default: "createFunc"
    },
    params: {
      required: false,
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    ...mapGetters({
      ParamTypes: "logic/ParamTypes"
    }),
    ...mapState({
      RevMap: status => status.logic.revMapForParamTypes
    }),
    useHint() {
      return !this.$store.state.control.hint;
    }
  },
  methods: {
    deleteItem: function(index) {
      this.params.splice(index, 1);
    },
    addParam: function() {
      this.params.push(
        JSON.parse(JSON.stringify(this.$store.state.logic.NoneType))
      );
    },
    ChangeType: function(index) {
      console.log("in Change function:", index);
      this.params.splice(
        index,
        1,
        JSON.parse(
          JSON.stringify(this.ParamTypes[this.RevMap[this.params[index].type]])
        )
      );
    },
    placeHolder: function(item) {
      return JSON.parse(
        JSON.stringify(this.ParamTypes[this.RevMap[item.type]].name)
      );
    },
    itemFilter: function(contexts) {
      let temp = {};
      for (let x in contexts) {
        console.log(x);
        if (contexts[x].show == true) {
          temp[x] = contexts[x];
        }
      }
      return temp;
    }
  }
  // mounted: function() {
  //   console.log("monuted:", this.params);
  // },
  // beforeUpdate: function() {
  //   console.log("beforeUpdate:", this.params);
  // }
};
</script>

<style lang="scss">
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
  }
  .l-Parameter__item {
    margin-left: 2px;
  }
}
</style>
