<template>
  <el-container>
    <el-aside width="40%">
      <el-menu :default-openeds="['1']">
        <el-menu-item index="1">
          <span>逻辑生成</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span>文件管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span>逻辑调试</span>
        </el-menu-item>
        <el-menu-item index="4">
          <span>公链上链</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-aside width="60%">
      <div class="col-3">
        <draggable
          class="dragArea list-group"
          :list="list1"
          :group="{ name: 'logic', pull: 'clone', put: false }"
          @change="log"
          tag="el-menu"
          :clone="CloneItem"
        >
          <el-menu-item
            class="list-group-item"
            v-for="element in list1"
            :key="element.name"
          >{{ element.name }}</el-menu-item>
        </draggable>
      </div>
    </el-aside>
  </el-container>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "clone",
  display: "Clone",
  order: 2,
  components: {
    draggable
  },
  data() {
    return {
      globalId: 10,
      list1: [
        {
          id: 1,
          name: "Shrek",
          elements: [],
          show: true
        },
        {
          id: 2,
          name: "Fiona",
          elements: [],
          show: true
        },
        {
          id: 3,
          name: "Donkey",
          elements: [],
          show: true
        },
        {
          id: 4,
          name: "Lord Farquad",
          elements: [],
          show: true
        },
        {
          id: 5,
          name: "Prince Charming",
          elements: [],
          show: true
        }
      ]
    };
  },
  methods: {
    log: function(evt) {
      window.console.log(evt);
    },
    CloneItem: function(item) {
      this.globalId++;
      return {
        id: this.globalId,
        name: item.name,
        elements: [],
        show: true
      };
    }
  }
};
</script>

<style lang='scss' scoped>
span {
  user-select: none;
}

.list-group-item {
  border: 1px solid rgb(238, 241, 246);
}
</style>