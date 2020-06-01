<template>
  <div id="codespace">
    <div class="header">
      <Location></Location>
    </div>
    <div id="sub" v-show="toggle">
      <Vars></Vars>
    </div>

    <div id="main">
      <div class="main__nested"><NestedWithVmodel></NestedWithVmodel></div>
      <div class="main__ShowCode" v-show="showCode"><ShowCode></ShowCode></div>
    </div>
  </div>
</template>

<script>
// import $ from "jquery";
import Location from "./Location";
import Vars from "./Vars";
import { mapState } from "vuex";
import NestedWithVmodel from "./nested-with-vmodel";
import ShowCode from "./ShowCode";

export default {
  data() {
    return {
      clocation: ["1", "2"],
      count: 0,
      myArray: [],
    };
  },
  methods: {
    load: function () {
      this.count += 1;
    },
  },
  components: {
    Location,
    NestedWithVmodel,
    Vars,
    ShowCode,
  },
  computed: {
    ...mapState({
      toggle: (status) => status.logic.SubcodeToggle,
      showCode: (status) => status.logic.showCode,
    }),
  },
};
</script>

<style lang="scss" scoped>
#codespace {
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
}

#sub {
  flex: 0 0 auto;
  height: 30%;
}

#main {
  flex: 1 1 auto;
  display: flex;
  height: 0px;
  .main__nested {
    flex: 1 1 auto;
    display: inline-block;
    overflow: auto;
  }
  .main__ShowCode {
    flex: 0 0 auto;
    height: 100%;
    width: 55%;
    overflow: auto;
  }
}

.header {
  background-color: #f2f6fc;
  display: inline-flex;
  align-items: center;
  line-height: 30px;
  padding: 0px;
  flex: 0 0 auto;
}

.subcode {
  background-color: green;
  height: 100%;
  overflow: auto;
}

.infinite-list {
  height: 100%;
  overflow-y: scroll;
  margin: 0px;
  padding: 0px;
  text-align: right;
  li {
    border-bottom: 1px black solid;
  }
  padding: 0px;
  list-style: none;
  margin: 0px;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
