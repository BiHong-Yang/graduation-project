<template>
  <div class="options">
    <el-dropdown trigger="click" @command="handleCommand">
      <el-tooltip
        class="item"
        effect="dark"
        content="添加属性"
        placement="top-start"
        :disabled="useHint"
      >
        <span class="el-dropdown-link">
          <i class="el-icon-circle-plus"></i>
        </span>
      </el-tooltip>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item, key) in contexts"
          :key="key"
          v-bind:class="{'highlight':!item.show}"
          :command="key"
        >{{item.name}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  props: ["contexts"],
  methods: {
    handleCommand: function(key) {
      console.log(this.contexts[key].show);
      this.contexts[key].show = !this.contexts[key].show;
      console.log(this.contexts[key].show);
    }
  },
  computed: {
    useHint() {
      return !this.$store.state.control.hint;
    }
  }
};
</script>

<style lang='scss' scoped>
.el-dropdown-link {
  align-items: center;
  font-size: 150%;
}

.options {
  display: flex;
  align-items: center;
}
.el-icon-circle-plus:hover {
  cursor: pointer;
}

.highlight {
  color: #409eff !important;
}
</style>