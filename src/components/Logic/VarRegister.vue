<template>
  <draggable
    class="c-VarRegister"
    :list="[varItem]"
    :group="group"
    :clone="CloneItem"
    :sort="false"
  >
    <div class="c-VarRegister__name" :style="{ color: useColor(varItem.type) }">
      {{ varItem.name }}
    </div>
    <el-popover placement="bottom" width="400" trigger="click">
      <span>类型： {{ typeRev[varItem.type] }}：{{ varItem.type }} </span><br />
      <span v-html="getLocation()"></span>
      <i slot="reference" class="el-icon-s-opportunity c-VarRegister__icon"></i>
    </el-popover>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import { mapGetters, mapState } from "vuex";
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
    useColor: function (type) {
      // 变量用浅绿 创建和使用
      if (this.TypeGroups(0).concat(["contract", "struct"]).includes(type)) {
        return "#4EC9B0";
      }
      // 合约 函数用黄
      else if (this.TypeGroups(1).concat(["constructor"]).includes(type)) {
        return "#FFB742";
      }
      // 运算用浅蓝
      else if (this.TypeGroups(2).includes(type)) {
        return "#9CDCF0";
      }
      // 逻辑用浅紫
      else if (this.TypeGroups(3).includes(type)) {
        return "#C586C0";
      }
      // 合约属性用深绿 带装饰器的函数位置
      else if (this.TypeGroups(4).concat(["modifier__inner"]).includes(type)) {
        return "#006699";
      }
      // 合约方法用橙色 带构造函数
      else if (this.TypeGroups(5).includes(type)) {
        return "#CE8349";
      }
      // 错误处理用粉红
      else if (this.TypeGroups(6).includes(type)) {
        return "#FF5842";
      }
      // 对变量
      else {
        return;
      }
    },
    getLocation: function () {
      let temp = `位置： `;

      return (temp += this.varItem.locationName.join(
        `<i class="el-icon-caret-right"></i>`
      ));
    },
  },
  components: {
    draggable,
  },
  computed: {
    ...mapGetters({
      CreateVar: "logic/CreateVar",
      TypeGroups: "logic/TypeGroups",
    }),
    ...mapState({
      typeRev: (status) => status.logic.typeRev,
    }),
  },
};
</script>

<style lang="scss" scoped>
.c-VarRegister {
  box-sizing: border-box;
  border: 1px solid black;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  border-radius: 3px;
  margin: 0.1rem;

  .c-VarRegister__name {
    box-sizing: border-box;
    padding: 0.5rem;
    height: 2rem;
    width: 5rem;
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    font-weight: 600;
    user-select: none;
  }
}
.c-VarRegister__icon {
  box-sizing: border-box;
  color: #909399;
  padding: 0.4rem;
  flex: 0 0 auto;
  &:hover {
    cursor: pointer;
  }
}
</style>
