<template>
  <div class="justify-content-between row nested-with-vmodel">
    <div class="nested">
      <nested :list="elements" />
    </div>
    <div>
      <raw-displayer :title="'Vuex Store'" :value="elements" />
    </div>
    <div>
      <raw-displayer :title="'transformer'" :value="transformer" />
    </div>
  </div>
</template>

<script>
import Nested from "./nested/nested.vue";
import rawDisplayer from "./infra/raw-displayer.vue";
export default {
  data() {
    return {
      begin: []
    };
  },
  name: "nested-with-vmodel",
  display: "Nested (v-model & vuex)",
  order: 16,
  components: {
    Nested,
    rawDisplayer
  },
  computed: {
    elements: {
      get() {
        return this.$store.state.logic.elements;
      },
      set(value) {
        this.$store.dispatch("logic/updateElements", value);
      }
    },
    transformer() {
      return this.$store.state.logic.transformer;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.nested {
  margin: 0;
  padding: 0 0 10rem;
  border: 1px solid black;
  min-height: 100%;
  min-width: 80%;
  display: inline-block;
  flex: 0 0 auto;
}

.nested-with-vmodel {
  min-height: 100%;
  min-width: 100%;
  display: inline-flex;
}
</style>
