<template>
  <draggable
    class="c-VarRegister"
    :list="[varItem]"
    :group="group"
    :clone="CloneItem"
    :sort="false"
  >
    <div class="c-VarRegister__name">
      {{ varItem.name }}
    </div>
    <el-popover placement="bottom" width="400" trigger="click">
      <span>类型： {{ varItem.type }} </span><br />
      <span>位置：</span>
      <i slot="reference" class="el-icon-s-opportunity c-VarRegister__icon"></i>
    </el-popover>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      group: { name: "logic", pull: "clone", put: false, revertClone: true },
    };
  },
  props: {
    varItem: {
      type: Object,
      required: false,
    },
  },
  methods: {
    CloneItem: function (item) {
      this.$store.dispatch("logic/incGlobalId", 1);
      let temp = this.CreateVar(item);
      temp.id = this.$store.state.logic.globalId;
      return temp;
    },
  },
  components: {
    draggable,
  },
  computed: {
    ...mapGetters({
      CreateVar: "logic/CreateVar",
    }),
  },
};
</script>

<style lang="scss" scoped>
.c-VarRegister {
  box-sizing: border-box;
  border: 1px solid black;
  display: flex;
  flex: 1 1 auto;
  align-items: center;

  .c-VarRegister__name {
    box-sizing: border-box;

    height: 2rem;
    width: 5rem;
    display: flex;
    align-items: center;
    flex: 1 1 auto;
  }
}
.c-VarRegister__icon {
  box-sizing: border-box;

  padding: 0.4rem;
  flex: 0 0 auto;
  &:hover {
    cursor: pointer;
  }
}
</style>
