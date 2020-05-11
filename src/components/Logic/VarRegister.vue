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

      // 如果是结构体构建器
      if (item.type == "struct_creator") {
        let temp = {
          type: "struct",
          name: "创建 " + item.name,
          elements: [],
          contents: {
            name: {
              name: "名字",
              value: "",
              show: true,
              use: false,
            },
            value: {
              name: "初值",
              value: {},
              elements: [],
              show: true,
            },
          },
          id: this.$store.state.logic.globalId,
        };
        let attrs = this.GetItem(item.location);
        console.log("here1");
        for (let i = 0; i < attrs.elements.length; i++) {
          temp.contents.value.value[attrs.elements[i].contents.name.value] = {
            name: attrs.elements[i].contents.name.value,
            value: null,
            elements: [],
            useEle: false,
            show: true,
            type: attrs.elements[i].type,
            // use: true,
          };
          if (attrs.elements[i].type == "struct") {
            temp.contents.value.value[
              attrs.elements[i].contents.name.value
            ].value = attrs.elements[i].contents.value.value;
          }
        }
        console.log("here2");
        return JSON.parse(JSON.stringify(temp));
      }
      // 其他情况
      else {
        let temp = {
          type: "var",
          name: item.name,
          elements: [],
          contents: {},
          value: {
            type: item.type,
            name: item.name,
          },
          id: this.$store.state.logic.globalId,
        };

        return JSON.parse(JSON.stringify(temp));
      }
    },
  },
  components: {
    draggable,
  },
  computed: {
    ...mapGetters({
      GetItem: "logic/GetItem",
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
