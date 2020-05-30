<template>
  <div class="location">
    <div class="out">
      <div class="front"></div>
      <div class="numbox" v-for="(item, index) in locationName" :key="index">
        <div class="num" @click="changeLocation(index)">
          <span>{{ item }}</span>
        </div>
        <div class="icon">
          <i class="el-icon-caret-right"></i>
        </div>
      </div>
    </div>
    <!-- 开关变量抽屉 -->
    <div class="togglebox">
      <el-switch
        @change="subtoggle"
        v-model="toggle"
        active-text="变量抽屉"
      ></el-switch>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      toggle: this.$store.state.logic.SubcodeToggle,
    };
  },
  methods: {
    changeLocation: function (index) {
      this.location.splice(index + 1);
      this.$store.dispatch("logic/refreshVars");
    },
    changeShowCode: function () {
      this.$store.state.logic.showCode = this.showCode;
    },
    subtoggle: function () {
      console.log("this toggle:", this.toggle);
      console.log("store toggle:", this.$store.state.logic.SubcodeToggle);
      this.$store.dispatch("logic/ChangeToggle", this.toggle);
    },
  },
  computed: {
    ...mapState({
      location: (status) => status.logic.location,
      locationName: (status) => status.logic.locationName,
    }),
  },
};
</script>

<style lang="scss" scoped>
.num {
  min-width: 30px;
  font-family: "微软雅黑";
  font-weight: 900;
  color: #4089ff;
  border-radius: 2px;
}
.num:hover {
  font-family: "微软雅黑";
  font-weight: 900;
  color: #4089ff;
  border-radius: 5px;
  background-color: #dcdfe6;
  cursor: pointer;
}
.el-icon-caret-right {
  color: #409eff;
}
.out {
  display: inline-flex;
  width: 100%;
  height: 100%;
  flex: 1 1 auto;
  user-select: none;
}
.numbox {
  display: inline-flex;
}
.front {
  width: 20px;
  background-color: #c0c4cc;
}
.togglebox {
  width: 160px;
  flex: 0 0 auto;
  position: relative;
  float: right;
  font-weight: 500;
  color: #4089ff;
  user-select: none;
}
.icon {
  padding: 1px 0px;
}
.location {
  width: 100%;
  height: 100%;
  display: inline-flex;
}
</style>
