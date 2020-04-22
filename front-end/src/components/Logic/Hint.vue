<template>
  <el-tooltip
    class="item"
    effect="dark"
    :content="content"
    placement="top-start"
    :open-delay="0"
    :disabled="useHint"
  >
    <i class="c-hint-icon" :class="icon"></i>
  </el-tooltip>
</template>

<script>
export default {
  computed: {
    useHint() {
      return !this.$store.state.control.hint;
    },
  },
  props: {
    content: {
      type: String,
      default: null,
      required: false,
    },
    icon: {
      type: String,
      default: "el-icon-question",
      required: false,
    },
  },
};
</script>

<style scoped lang="scss">
.c-hint-icon {
  font-size: 120%;
}
</style>
