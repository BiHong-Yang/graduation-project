<template>
  <div class="c-Vars">
    <!-- 左半边，必然可以使用的变量 -->
    <div class="c-Vars__block">
      <div class="o-block__title">
        <span class="o-title">
          可选变量
        </span>
      </div>
      <div class="c-item" v-for="(item, index) in varAlready" :key="index">
        <!-- 位置 -->
        <div class="c-item__location" @click="changeLocation(index)">
          <span class="o-location__name">
            {{ locationName[index] }}
          </span>
        </div>

        <!-- 变量们 -->
        <div class="c-item__vars">
          <VarRegister
            v-for="(v, idx) in item"
            :key="idx"
            :varItem="v"
          ></VarRegister>
        </div>
      </div>
    </div>

    <!-- 右半边，潜在变量 -->
    <div class="c-Vars__block">
      <div class="o-block__title">
        <span class="o-title">
          潜在变量
        </span>
      </div>

      <div class="c-item" v-for="(item, index) in varPotential" :key="index">
        <!-- 位置 -->
        <div class="c-item__location" @click="addLocation(index)">
          <span class="o-location__name">
            {{ item.name }}
          </span>
        </div>

        <!-- 变量们 -->
        <div class="c-item__vars">
          <VarRegister
            v-for="(v, idx) in item.vars"
            :key="idx"
            :varItem="v"
          ></VarRegister>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VarRegister from "./VarRegister";
export default {
  //   ...mapGetters({
  //     ParamTypes: "logic/ParamTypes",
  //   }),
  computed: {
    ...mapState({
      location: (status) => status.logic.location,
      locationName: (status) => status.logic.locationName,
      varAlready: (status) => status.logic.varAlready,
      varPotential: (status) => status.logic.varPotential,
    }),
  },
  methods: {
    addLocation: function (index) {
      this.location.push(index);
      this.$store.dispatch("logic/refreshVars");
    },
    changeLocation: function (index) {
      this.location.splice(index + 1);
      this.$store.dispatch("logic/refreshVars");
    },
  },
  components: {
    VarRegister,
  },
};
</script>

<style lang="scss" scoped>
$color: black;
@mixin test {
  border: 1px $color solid;
}
.c-Vars {
  height: 100%;
  width: 100%;
  // background-color: #333333;
  display: flex;
  box-sizing: border-box;

  .c-Vars__block {
    width: 50%;
    height: 100%;
    // background-color: aqua;
    @include test;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow: auto;
    box-sizing: border-box;

    .o-block__title {
      height: 3rem;
      background-color: #c0c4cc;
      display: flex;
      align-items: center;
      justify-content: center;
      .o-title {
        font-weight: 600;
        font-size: x-large;
        font-family: fantasy;
        color: #409eff;
        user-select: none;
      }
    }

    .c-item {
      border-top: 1px solid $color;
      border-bottom: 1px solid $color;
      min-height: 2.5rem;
      display: flex;
      align-items: stretch;
      box-sizing: border-box;

      .c-item__location {
        width: 5rem;
        justify-content: center;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        flex: 0 0 auto;
        .o-location__name {
          box-sizing: border-box;
          font-weight: 100;
          font-size: larger;
          font-family: fantasy;
          color: #409eff;
          user-select: none;
        }
        &:hover {
          cursor: pointer;
        }
      }

      .c-item__vars {
        border-left: 1px solid $color;
        box-sizing: content-box;
        height: 100%;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
