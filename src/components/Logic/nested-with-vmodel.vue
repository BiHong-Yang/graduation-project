<template>
  <div class="justify-content-between row nested-with-vmodel">
    <div class="nested">
      <nested :list="elements" />
    </div>
    <!-- <div class="raw">
      <raw-displayer :title="'Vuex Store'" :value="elements" />
    </div>
    <div class="raw">
      <raw-displayer :title="'varAlready'" :value="varAlready" />
    </div>
    <div class="raw">
      <raw-displayer :title="'varPotential'" :value="varPotential" />
    </div>
    <div class="raw">
      <raw-displayer :title="'location'" :value="location" />
    </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import Nested from "./nested/nested.vue";
// import rawDisplayer from "./infra/raw-displayer.vue";
export default {
  data() {
    return {
      begin: [],
    };
  },
  name: "nested-with-vmodel",
  display: "Nested (v-model & vuex)",
  order: 16,
  components: {
    Nested,
    // rawDisplayer,
  },
  computed: {
    elements: {
      get() {
        return this.$store.state.logic.elements;
      },
      set(value) {
        this.$store.dispatch("logic/updateElements", value);
      },
    },
    ...mapState({
      transformer: (status) => status.logic.transformer,
      varAlready: (status) => status.logic.varAlready,
      varPotential: (status) => status.logic.varPotential,
      location: (status) => status.logic.location,
    }),
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.nested {
  margin: 0;
  padding: 0.25rem 0.2rem 10rem 0.25rem;
  // border: 1px solid black;
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
.raw {
  border: 1px black solid;
}
</style>
