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
  margin: 0 0 1rem 1rem;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  min-height: 10rem;
  box-sizing: border-box;
  padding: 0.5rem;
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
  color: #e6a23c;
  // padding: 0 1em;
  user-select: none;
  display: inline-flex;
  padding-right: 0.5em;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
}
.l-item__name--operations {
  box-sizing: content-box;
  padding: 0 0.5rem;
  width: 1rem;
  height: 1rem;
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
    @end="nestedEnd"
    @change="nestChange"
    :move="nestedMove"
  >
    <div
      class="c-nested__item-group"
      :key="index"
      v-for="(el, index) in realValue"
    >
      <div class="c-nested__item" v-if="!OperaTypes.includes(el.type)">
        <div
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
          <div class="o-item__name">{{ el.name }}</div>
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
          <Options :contents="el.contents"></Options>
        </div>
      </div>

      <!-- 对运算另外处理 -->
      <div v-else class="c-nested__item">
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
          <div class="o-item__name l-item__name--operations">{{ el.type }}</div>
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
      this.$store.dispatch("logic/nestedStart", this.list[evt.oldIndex]);
    },
    nestedEnd: function (evt) {
      this.$store.dispatch("logic/nestedEnd", {
        item: this.list[evt.newIndex],
        index: evt.newIndex,
      });
    },
    nestedMove: function (evt) {
      this.$store.dispatch("logic/nestedMove", evt.relatedContext.list);
    },
    nestChange: function () {
      localStorage.setItem(
        "code",
        JSON.stringify(this.$store.state.logic.elements)
      );
      // console.log("change");
    },
  },
  components: {
    draggable,
    Options,
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: this.group,
        disabled: false,
        ghostClass: "ghost",
      };
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
