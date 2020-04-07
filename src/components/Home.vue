<template>
  <div class="full">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="100px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']">
          <el-menu-item index="1" @click="showwitch = 1">
            <span>逻辑生成</span>
          </el-menu-item>
          <el-menu-item index="2" @click="showwitch = 2">
            <span>文件管理</span>
          </el-menu-item>
          <el-menu-item index="3" @click="showwitch = 3">
            <span>逻辑调试</span>
          </el-menu-item>
          <el-menu-item index="4" @click="showwitch = 4">
            <span>公链上链</span>
          </el-menu-item>
        </el-menu>
        <TrashBin></TrashBin>
      </el-aside>

      <el-aside
        width="400px"
        style="background-color: rgb(238, 241, 246)"
        v-show="showwitch == 1"
      >
        <Logic v-show="showwitch == 1"></Logic>
      </el-aside>

      <el-main>
        <CodeSpace v-if="showwitch == 1"></CodeSpace>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.el-menu-item {
  user-select: none;
}

.el-main {
  height: 100%;
  // overflow: hidden;
  padding: 0px;
  // border: 2px solid lightgray;
}
.full {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

<script>
import Logic from "./Logic/Logic.vue";
import CodeSpace from "./Logic/CodeSpace.vue";
import TrashBin from "./Logic/TrashBin";

export default {
  data() {
    return {
      showwitch: 1
    };
  },
  components: {
    Logic,
    CodeSpace,
    TrashBin
  },
  methods: {}
};
</script>
