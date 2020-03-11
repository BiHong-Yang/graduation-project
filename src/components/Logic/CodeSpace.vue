<template>
  <div id="codespace">
    <div id="sub">
      <el-container class="in">
        <el-header height="30px">
          <Location :location="clocation" @subtoggle="changefold"></Location>
        </el-header>
        <el-main v-show="unfold">
          <div class="subcode">
            <el-container>
              <el-aside width="20px">
                <Linenum></Linenum>
              </el-aside>
              <el-main></el-main>
            </el-container>
          </div>
        </el-main>
      </el-container>
    </div>
    <div id="main">
      <el-container class="in">
        <el-main>
          <div class="maincode">
            <el-container>
              <el-aside width="20px">
                <Linenum></Linenum>
              </el-aside>
              <el-main></el-main>
            </el-container>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
// import VueResizable from "vue-resizable";
import $ from "jquery";
import Location from "./Location";
import Linenum from "./Linenum";

export default {
  data() {
    return {
      clocation: ["1", "2"],
      unfold: false
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
    }
  },
  components: {
    Location,
    Linenum
  }
};
</script>

<style>
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
}

#main {
  flex: 1 1 auto;
  height: 45%;
}
.bread {
  margin: 10px;
}

.el-container {
  height: 100%;
}

.in .el-header {
  align-items: center;
  line-height: 30px;
  background-color: #f2f6fc;
  padding: 0px;
}

.in .el-main {
  height: 100%;
  padding: 0px;
}

.full {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.subcode {
  background-color: green;
  height: 100%;
}

.maincode {
  background-color: red;
  height: 100%;
}
</style>
