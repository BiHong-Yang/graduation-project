<template>
  <div class="options">
    <el-dropdown trigger="click" @command="handleCommand">
      <el-tooltip
        class="item"
        effect="dark"
        content="更多属性"
        placement="top-start"
        :disabled="useHint"
      >
        <span class="el-dropdown-link l-icon">
          <i class="el-icon-more"></i>
        </span>
      </el-tooltip>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item, key) in contents"
          :key="key"
          v-bind:class="{ highlight: !item.show }"
          :command="key"
          >{{ item.name }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  props: ["contents"],
  methods: {
    handleCommand: function (key) {
      // console.log(this.contents[key].show);
      this.contents[key].show = !this.contents[key].show;
      // console.log(this.contents[key].show);
    }
  },
  computed: {
    useHint() {
      return !this.$store.state.control.hint;
    }
  }
};
</script>

<style lang="scss" scoped>
.options {
  display: flex;
  align-items: center;
}

.highlight {
  color: #409eff !important;
}
</style>
