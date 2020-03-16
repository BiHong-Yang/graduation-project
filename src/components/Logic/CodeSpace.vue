<template>
  <div id="codespace">
    <div class="header">
      <Location :location="clocation"></Location>
    </div>
    <div id="sub" v-show="toggle">
      <div class="subcode"></div>
    </div>

    <div id="main">
      <div class="maincode">
        <draggable v-model="myArray">
          <transition-group>
            <div v-for="element in myArray" :key="element.id">{{element.name}}</div>
          </transition-group>
        </draggable>
        <button @click="showmyArray">showmyArray</button>
        <draggable v-model="myArray">
          <transition-group></transition-group>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script >
import draggable from "vuedraggable";
import $ from "jquery";
import Location from "./Location";
import { mapState } from "vuex";

export default {
  data() {
    return {
      clocation: ["1", "2"],
      count: 0,
      myArray: [
        { name: "abc", id: 1 },
        { name: "qwe", id: 2 },
        { name: "asd", id: 3 },
        { name: "zxc", id: 4 },
        { name: "yui", id: 5 }
      ]
    };
  },
  methods: {
    changefold: function(msg) {
      this.unfold = msg;
      if (msg) {
        $("#sub").height("55%");
      } else {
        $("#sub").height("30px");
      }
    },
    load: function() {
      this.count += 1;
    },
    showmyArray: function() {
      console.log(this.myArray);
    }
  },
  components: {
    Location,
    draggable
  },
  computed: {
    ...mapState({
      toggle: status => status.logic.SubcodeToggle
    })
  }
};
</script>

<style lang='scss' scoped>
#codespace {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#sub {
  flex: 0 0 auto;
  transform: height 1s;
  height: 55%;
}

#main {
  flex: 1 1 auto;
  height: 45%;
}

.header {
  background-color: #f2f6fc;
  display: inline-flex;
  align-items: center;
  line-height: 30px;
  padding: 0px;
}

.subcode {
  background-color: green;
  height: 100%;
}

.maincode {
  /* background-color: red; */
  height: 100%;
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
