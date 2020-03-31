<style lang='scss' scoped>
.item-container {
  min-width: calc(100% - 1rem);
  margin: 0;
  box-sizing: border-box;
  display: inline-flex;
}

.item {
  padding: 0.5rem;
  flex: 0 0 auto;
  border: solid black 1px;
  background-color: #fefefe;
  display: inline-flex;
  align-self: start;
  box-sizing: border-box;
  align-items: center;
  // height: 4rem;
  border-radius: 5px;
  // overflow: visible;
}
.item-sub {
  margin: 0 0 1rem 1rem;
  border: 1px solid black;
  display: inline-flex;
  flex-direction: column;
  min-height: 10rem;
  box-sizing: border-box;
  padding: 0.5rem;
}
.item-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
}

.hight-light {
  background-color: #d2e8ff;
  //  #dcdfe6;
}
div {
  &.name {
    flex: 0 0 auto;
    font-family: "微软雅黑";
    font-weight: 900;
    font-size: 140%;
    color: #e6a23c;
    // padding: 0 1em;
    user-select: none;
    display: inline-flex;
    padding-right: 0.5em;
    &:hover {
      cursor: pointer;
    }
  }
}

.line-num {
  min-width: 30px;
  height: 1.5rem;
  font-family: "微软雅黑";
  font-weight: 900;
  color: #4089ff;
  border-radius: 5px;
  align-items: center;
  &:hover {
    background-color: #97cdff;
    cursor: pointer;
  }
}
</style>
<template>
  <draggable
    v-bind="dragOptions"
    tag="div"
    class="item-container"
    :list="list"
    :value="value"
    @input="emitter"
    handle=".name"
  >
    <div class="item-group" :key="index" v-for="(el,index) in realValue">
      <div class="item">
        <div
          class="line-num"
          @click="el.show=!el.show"
          :class="{'hight-light':(el.elements.length>0)}"
        >
          <el-tooltip :disabled="useHint" effect="dark" content="单击展开收起内容" placement="top">
            <div>
              <span>{{ index + 1 }}</span>
            </div>
          </el-tooltip>
        </div>

        <el-tooltip :disabled="useHint" effect="dark" content="按住拖动" placement="top">
          <div class="name">{{el.name}}</div>
        </el-tooltip>

        <Context :contexts="el.contexts" :type="el.type"></Context>
      </div>
      <nested class="item-sub" :list="el.elements" v-show="el.show" />
    </div>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import Context from "../Context";
export default {
  name: "nested",
  methods: {
    emitter(value) {
      this.$emit("input", value);
    },
    ChangeShow() {}
  },
  components: {
    draggable,
    Context
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: this.group,
        disabled: false,
        ghostClass: "ghost"
      };
    },
    // this.value when input = v-model
    // this.list  when input != v-model
    realValue() {
      return this.value ? this.value : this.list;
    },
    useHint() {
      return !this.$store.state.control.hint;
    }
  },
  props: {
    value: {
      required: false,
      type: Array,
      default: null
    },
    list: {
      required: false,
      type: Array,
      default: null
    },
    group: {
      required: false,
      type: String,
      default: "logic"
    }
  }
};
</script>

