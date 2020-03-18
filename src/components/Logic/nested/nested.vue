<style lang='scss' scoped>
.item-container {
  min-width: calc(100% - 1rem);
  margin: 0;
  box-sizing: border-box;
}

.item {
  padding: 1rem;
  border: solid black 1px;
  background-color: #fefefe;
  display: inline-flex;
  align-self: start;
  box-sizing: border-box;
}
.item-sub {
  margin: 0 0 1rem 1rem;
  border: 1px solid black;
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
  >
    <div class="item-group" :key="index" v-for="(el,index) in realValue">
      <div class="item">
        <div
          class="line-num"
          @click="el.show=!el.show"
          :class="{'hight-light':el.elements.length>0}"
        >
          <span>{{ index + 1 }}</span>
        </div>
        {{ el.name }}
        ---
      </div>
      <nested class="item-sub" :list="el.elements" v-show="el.show" />
    </div>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "nested",
  methods: {
    emitter(value) {
      this.$emit("input", value);
    },
    ChangeShow() {}
  },
  components: {
    draggable
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "logic",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    // this.value when input = v-model
    // this.list  when input != v-model
    realValue() {
      return this.value ? this.value : this.list;
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
    }
  }
};
</script>

