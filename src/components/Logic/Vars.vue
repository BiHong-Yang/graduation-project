<template>
  <div class="c-Vars">
    <!-- 左半边，必然可以使用的变量 -->
    <div class="c-Vars__block">
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
@mixin test {
  border: 1px black solid;
}
.c-Vars {
  height: 100%;
  width: 100%;
  background-color: #333333;
  display: flex;
  box-sizing: border-box;

  .c-Vars__block {
    width: 50%;
    height: 100%;
    background-color: aqua;
    @include test;
    display: flex;
    flex-direction: column;
    overflow: auto;
    box-sizing: border-box;

    .c-item {
      @include test;
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
        }
        &:hover {
          cursor: pointer;
        }
      }

      .c-item__vars {
        @include test;
        box-sizing: border-box;

        display: flex;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
