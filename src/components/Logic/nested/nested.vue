<style lang="scss" scoped>
.c-nested {
  min-width: calc(100% - 1rem);
  margin: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.c-nested__item {
  margin: 0 0 0.5rem 0;
  padding: 0.5rem;
  flex: 0 0 auto;
  border: solid black 1px;
  background-color: #fefefe;
  display: flex;
  align-self: start;
  box-sizing: border-box;
  align-items: center;
  // height: 4rem;
  border-radius: 5px;
  // overflow: visible;
}
.c-nested__item-sub {
  margin: -0.5rem 0 1rem 1rem;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  min-height: 10rem;
  box-sizing: border-box;
  padding: 0.5rem;
  border-radius: 0 0 5px 5px;
}
.c-nested__item-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
}

.hight-light {
  background-color: #d2e8ff;
  //  #dcdfe6;
}
.o-item__name {
  flex: 0 0 auto;
  font-family: "微软雅黑";
  font-weight: 900;
  font-size: 140%;
  // color: #e6a23c;
  user-select: none;
  display: inline-flex;
  // padding-right: 0.5em;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
}
.l-item__name--common {
  padding-right: 0.5em;
}
.l-item__name--operations {
  box-sizing: content-box;
  padding: 0 0.5rem;
  width: 1rem;
  height: 2.5rem;
}
.line-num {
  min-width: 30px;
  height: 1.5rem;
  font-family: "微软雅黑";
  font-weight: 900;
  color: #4089ff;
  border-radius: 5px;
  align-items: center;
  user-select: none;
  &:hover {
    background-color: #97cdff;
    cursor: pointer;
  }
}

.c-content__container {
  display: flex;
  flex-wrap: wrap;
}
</style>
<template>
  <draggable
    v-bind="dragOptions"
    tag="div"
    class="c-nested"
    :list="list"
    :value="value"
    @input="emitter"
    handle=".o-item__name"
    @start="nestedStart"
    @add="nestedEnd"
    @end="nestedEnd"
    @unchoose="nestDelete"
    @change="nestChange"
    :clone="CloneItem"
    :move="nestedMove"
  >
    <div
      class="c-nested__item-group"
      :key="index"
      v-for="(el, index) in realValue"
    >
      <div
        class="c-nested__item"
        :style="{ color: useColor(el.type) }"
        v-if="!OperaTypes.includes(el.type)"
      >
        <div
          v-if="!ValueTypes.concat(['modifier_var']).includes(el.type)"
          class="line-num"
          @click="el.show = !el.show"
          :class="{ 'hight-light': el.elements.length > 0 }"
        >
          <el-tooltip
            :disabled="useHint"
            effect="dark"
            content="单击展开收起内容"
            placement="top"
          >
            <div>
              <span>{{ index + 1 }}</span>
            </div>
          </el-tooltip>
        </div>

        <el-tooltip
          :disabled="useHint"
          effect="dark"
          content="按住拖动"
          placement="top"
        >
          <div
            class="o-item__name"
            :class="{
              'l-item__name--common':
                !ValueTypes.includes(el.type) ||
                Object.keys(el.contents).length > 0,
            }"
            @dblclick="toLocation(el)"
          >
            {{ el.name }}
          </div>
        </el-tooltip>

        <div class="c-content__container">
          <Content
            v-for="(item, key) in el.contents"
            :key="key"
            :contents="el.contents"
            :item="item"
            :keyWord="key"
            :type="el.type"
            v-show="item.show"
          ></Content>
          <Options
            v-if="JSON.stringify(el.contents) != '{}'"
            :contents="el.contents"
          ></Options>
        </div>
      </div>

      <!-- 对运算另外处理 -->
      <div v-else class="c-nested__item" :style="{ color: useColor(el.type) }">
        <div
          v-if="el.type == ' = '"
          class="line-num"
          @click="el.show = !el.show"
          :class="{ 'hight-light': el.elements.length > 0 }"
        >
          <el-tooltip
            :disabled="useHint"
            effect="dark"
            content="单击展开收起内容"
            placement="top"
          >
            <div>
              <span>{{ index + 1 }}</span>
            </div>
          </el-tooltip>
        </div>

        <Content
          v-if="el.contents.firstOP != undefined"
          :contents="el.contents"
          :item="el.contents.firstOP"
          :keyWord="'firstOP'"
          :type="el.type"
          v-show="el.contents.firstOP.show"
        ></Content>

        <el-tooltip
          :disabled="useHint"
          effect="dark"
          content="按住拖动"
          placement="top"
        >
          <div class="o-item__name l-item__name--operations">
            {{ el.type }}
          </div>
        </el-tooltip>

        <Content
          :contents="el.contents"
          :item="el.contents.lastOP"
          :keyWord="'lastOP'"
          :type="el.type"
          v-show="el.contents.lastOP.show"
        ></Content>
      </div>
      <nested class="c-nested__item-sub" :list="el.elements" v-show="el.show" />
    </div>
  </draggable>
</template>

<script>
import Options from "../Options";
import draggable from "vuedraggable";
import { mapGetters } from "vuex";
export default {
  name: "nested",
  methods: {
    emitter(value) {
      this.$emit("input", value);
    },
    ChangeShow() {},
    nestedStart: function (evt) {
      console.log("start");
      this.$store.dispatch("logic/nestedStart", this.list[evt.oldIndex]);
    },
    nestedEnd: function (evt) {
      console.log("end");
      this.$store.dispatch("logic/nestedEnd", {
        item: this.list[evt.newIndex],
        index: evt.newIndex,
      });
    },
    nestedMove: function (evt) {
      this.$store.dispatch("logic/nestedMove", evt.relatedContext.list);
    },
    nestChange: function () {
      // 为回退留的地方
      // console.log("change");
    },
    nestDelete: function (evt) {
      if (this.$store.state.logic.kill) {
        this.$store.dispatch("logic/nestDelete", {
          list: this.list,
          index: evt.oldIndex,
        });
      }
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
        return "#555555";
      }
    },
    toLocation: function (item) {
      console.log("in to ", item);
      this.$store.dispatch("logic/toLocation", item.id);
    },
    CloneItem: function (item) {
      console.log("cloneing");
      this.$store.dispatch("logic/incGlobalId", 1);
      let temp = JSON.parse(JSON.stringify(item));
      temp.id = this.$store.state.logic.globalId;
      return temp;
    },
  },
  components: {
    draggable,
    Options,
  },

  data() {
    return {
      clone: this.$store.state.logic.clone,
    };
  },
  computed: {
    dragOptions() {
      // console.log("options");
      // let temp = this.clone
      //   ? {
      //       group: {
      //         name: "logic",
      //         pull: "clone",
      //         revertClone: true,
      //       },
      //       disabled: false,
      //       ghostClass: "ghost",
      //       swapThreshold: 0.29,
      //       invertSwap: true,
      //       animation: 150,
      //       direction: "vertical",
      //     }
      //   : {
      //       group: this.group,
      //       disabled: false,
      //       ghostClass: "ghost",
      //       swapThreshold: 0.29,
      //       invertSwap: true,
      //       animation: 150,
      //       direction: "vertical",
      //     };
      let temp = {
        group: this.group,
        disabled: false,
        ghostClass: "ghost",
        swapThreshold: 0.29,
        invertSwap: true,
        animation: 150,
        direction: "vertical",
      };
      // console.log("temp is", temp);
      return temp;
    },
    // this.value when input = v-model
    // this.list  when input != v-model
    realValue() {
      return this.value ? this.value : this.list;
    },
    useHint() {
      return !this.$store.state.control.hint;
    },
    ...mapGetters({
      OperaTypes: "logic/OperaTypes",
      ValueTypes: "logic/ValueTypes",
      TypeGroups: "logic/TypeGroups",
    }),
  },

  props: {
    value: {
      required: false,
      type: Array,
      default: null,
    },
    list: {
      required: false,
      type: Array,
      default: null,
    },
    group: {
      required: false,
      type: String,
      default: "logic",
    },
  },
};
</script>
