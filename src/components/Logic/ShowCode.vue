<template>
  <div class="c-ShowCode">
    <pre class="c-ShowCode__inner">
    {{ code }}
  </pre
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      code: (status) => status.logic.code,
    }),
  },
};
</script>

<style scoped lang="scss">
.c-ShowCode {
  text-align: start !important;
  white-space: unset;
  width: 100%;
  height: 100%;
  .c-ShowCode__inner {
    // background-color: red;
  }
}
</style>
