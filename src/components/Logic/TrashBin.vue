<template>
  <div @click="changeKill()">
    <draggable
      class="list-group el-icon-delete"
      :class="kill ? 'dragArea--killer' : 'dragArea'"
      :group="{ name: 'logic', put: true }"
      tag="div"
    ></draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    draggable,
  },
  computed: {
    ...mapState({
      kill: (status) => status.logic.kill,
    }),
  },
  methods: {
    changeKill: function () {
      this.$store.state.logic.kill = !this.$store.state.logic.kill;
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin area {
  height: 100px;
  width: 100%;
}
.dragArea {
  background-color: gray;
  @include area;
}
.dragArea--killer {
  background-color: #cb2431;
  @include area;
}
</style>
