<template>
  <div class="location">
    <div class="out">
      <div class="front"></div>
      <div class="numbox" v-for="(item, index) in location" :key="index">
        <div class="num">
          <span>{{item}}</span>
        </div>
        <div class="icon">
          <i class="el-icon-caret-right"></i>
        </div>
      </div>
    </div>
    <button class="togglebox" @click="changeHint"></button>
    <div class="togglebox">
      <el-switch @change="subtoggle" v-model="toggle" active-text="副代码区开关"></el-switch>
    </div>
  </div>
</template>

<script>
export default {
  props: ["location"],
  data() {
    return {
      toggle: this.$store.state.logic.SubcodeToggle
    };
  },
  methods: {
    subtoggle: function() {
      this.$store.dispatch("logic/ChangeToggle", this.toggle);
    },
    changeHint: function() {
      this.$store.state.control.hint = !this.$store.state.control.hint;
    }
  },
  computed: {}
};
</script>

<style lang='scss' scoped>
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