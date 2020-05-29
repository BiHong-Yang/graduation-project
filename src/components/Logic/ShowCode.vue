<template>
  <div class="c-ShowCode">
    <pre v-highlightjs="code" class="c-ShowCode__inner"><code class="solidity">

    {{ code }}

    </code></pre>
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
  font-family: sans-serif;
  .c-ShowCode__inner {
    width: 100%;
    height: 100%;
    margin: 0;
    // background-color: red;
  }
}
.hljs {
  width: 100%;
  height: 100%;
  padding: 0 0.5rem;
  overflow: auto;
  font-family: sans-serif;
  font-size: medium;
  font-weight: 600;
  box-sizing: border-box;
}
</style>
