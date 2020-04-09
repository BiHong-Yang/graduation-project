<template>
  <div id="codespace">
    <div class="header">
      <Location :location="clocation"></Location>
    </div>
    <div id="sub" v-show="toggle">
      <div class="subcode"></div>
    </div>

    <div id="main">
      <NestedWithVmodel></NestedWithVmodel>
    </div>
  </div>
</template>

<script>
// import $ from "jquery";
import Location from "./Location";
import { mapState } from "vuex";
import NestedWithVmodel from "./nested-with-vmodel";

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
  },
  computed: {
    ...mapState({
      toggle: status => status.logic.SubcodeToggle,
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
  height: 50%;
}

#main {
  flex: 1 1 auto;
  display: inline-block;
  overflow: auto;
  height: 0px;
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
