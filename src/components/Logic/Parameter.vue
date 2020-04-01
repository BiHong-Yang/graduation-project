<template>
  <div v-if="place=='createFunc'" class="c-Parameter">
    <div v-for="(item, index) in params" :key="index">
      <!-- 删除参数 -->

      <el-tooltip
        class="item"
        effect="dark"
        content="删除该参数"
        placement="top-start"
        :disabled="useHint"
      >
        <span class="l-icon--small u-align-self-fstart" @click="deleteItem(item)">
          <i class="el-icon-close"></i>
        </span>
      </el-tooltip>

      <!-- 显示参数 -->

      <el-select
        v-model="item.type"
        :placeholder="ParamTypes[RevMap[item.type]].name "
        @change="ChangeType"
      >
        <!-- 从这里开始，弄选择更改 -->
        <!-- 从这里开始，弄选择更改 -->
        <!-- 从这里开始，弄选择更改 -->
        <!-- 从这里开始，弄选择更改 -->
        <el-option v-for="(types, id) in ParamTypes" :key="id" :label="typs.name" :value="types"></el-option>
      </el-select>
      <Context :contexts="el.contexts" :type="el.type"></Context>
    </div>

    <!-- 添加参数 -->

    <el-tooltip class="item" effect="dark" content="添加参数" placement="top-start" :disabled="useHint">
      <span class="l-icon" @click="addParam">
        <i class="el-icon-circle-plus"></i>
      </span>
    </el-tooltip>
  </div>
</template>

// 参数样式：
// {
//     类型：
//     内容：{
// 
//      }
// }

<script>
export default {
  props: {
    place: {
      required: false,
      type: String,
      default: "createFunc"
    },
    params: {
      required: true,
      type: Array
    }
  },
  methods: {
    deleteItem: function(item) {
      delete item;
    },
    addParam: function() {
      this.params = this.params.concat(this.$store.state.logic.NoneType);
    },
    ChangeType: function(type) {}
  },
  computed: {
    ParamTypes() {
      return this.$store.getters.logic.ParamTypes;
    },
    RevMap() {
      return this.$store.state.logic.revMapForParamTypes;
    }
  }
};
</script>

<style>
.c-Parameter {
  display: flex;
  flex-wrap: wrap;
}
</style>