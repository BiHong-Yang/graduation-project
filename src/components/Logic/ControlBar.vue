<template>
  <div class="c-ControlBar">
    <div @click="changeKill()">
      <draggable
        @add="refreshVars"
        class="o-TrashBin"
        :class="kill ? 'dragArea--killer' : 'dragArea'"
        :group="{ name: 'logic', put: true }"
        tag="div"
        ><i class="el-icon-delete"></i>
      </draggable>
    </div>
    <!-- 
      展示代码
     -->
    <div class="togglebox">
      <el-switch
        @change="changeShowCode()"
        v-model="showCode"
        active-text="代码展示"
      ></el-switch>
    </div>

    <!-- 开关变量抽屉 -->
    <div class="togglebox">
      <el-switch
        @change="changeHint"
        v-model="hint"
        active-text="提示气泡"
      ></el-switch>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { mapState } from "vuex";
export default {
  data() {
    return {
      showCode: this.$store.state.logic.showCode,
      hint: this.$store.state.control.hint,
    };
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
    refreshVars: function () {
      this.$store.dispatch("logic/refreshVars");
    },
    changeShowCode: function () {
      this.$store.state.logic.showCode = this.showCode;
    },
    changeHint: function () {
      this.$store.state.control.hint = !this.$store.state.control.hint;
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin area {
  height: 160px;
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
.el-icon-delete {
  font-size: 130%;
  align-content: center;
  justify-content: center;
}
.o-TrashBin {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 0.5rem;
  box-sizing: border-box;
}
.togglebox {
  width: 160px;
  flex: 0 0 auto;
  position: relative;
  float: right;
  font-weight: 500;
  color: #4089ff;
  user-select: none;
  padding: 0.5rem;
  box-sizing: border-box;
}
.c-ControlBar {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
</style>
