<template>
  <div class="full">
    <el-container style="height: 100%; border: 1px solid #eee;">
      <el-aside
        width="400px"
        style="background-color: rgb(238, 241, 246);"
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
export default {
  data() {
    return {
      showwitch: 1,
    };
  },
  components: {
    Logic,
    CodeSpace,
  },
  methods: {},
  mounted() {
    // 加关窗口事件
    console.log(this.$store.state.logic.locationId);
    window.onbeforeunload = () => {
      localStorage.setItem(
        "code",
        JSON.stringify(this.$store.state.logic.elements)
      );
      localStorage.setItem(
        "globalId",
        JSON.stringify(this.$store.state.logic.globalId)
      );
      localStorage.setItem(
        "location",
        JSON.stringify(this.$store.state.logic.location)
      );
    };

    // 恢复状态
    this.$store.state.control.kill = false;
    if (localStorage.getItem("code") == null) {
      console.log("new one");
      this.$store.state.logic.elements = [];
      this.$store.state.logic.globalId = 10;
      this.$store.state.logic.location = [0];
    } else {
      this.$store.state.logic.elements = JSON.parse(
        localStorage.getItem("code")
      );
      this.$store.state.logic.globalId = JSON.parse(
        localStorage.getItem("globalId")
      );
      this.$store.state.logic.location = JSON.parse(
        localStorage.getItem("location")
      );
    }
    console.log("going to refresh");
    // 刷新变量
    this.$store.dispatch("logic/refreshVars");
    console.log("after refresh");
  },
  beforeDestroy() {
    window.onbeforeunload = null;
  },
};
</script>
