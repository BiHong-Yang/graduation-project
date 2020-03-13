<template>
  <div id="codespace">
    <div id="sub">
      <el-container class="in">
        <el-header height="30px">
          <Location :location="clocation" @subtoggle="changefold"></Location>
        </el-header>
        <el-main v-show="unfold">
          <div class="subcode">
            <el-container class="in">
              <el-aside width="40px">
                <ul id="for-sub" class="infinite-list" v-infinite-scroll="load">
                  <li v-for="(i, index) in count" :key="index" class="infinite-list-item">{{ i }}</li>
                </ul>
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
                <ul id="for-main" class="infinite-list" v-infinite-scroll="load">
                  <li v-for="(i, index) in count" :key="index" class="infinite-list-item">{{ i }}</li>
                </ul>
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
import $ from "jquery";
import Location from "./Location";
// import Linenum from "./Linenum";

export default {
  data() {
    return {
      clocation: ["1", "2"],
      unfold: false,
      count: 0
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
    load() {
      this.count += 1;
    }
  },
  components: {
    Location
    // Linenum
  }
};
</script>

<style lang='scss'>
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

.in {
  .el-header {
    align-items: center;
    line-height: 30px;
    background-color: #f2f6fc;
    padding: 0px;
  }
  .el-aside {
    height: 100%;
  }
  .el-main {
    height: 100%;
    padding: 0px;
  }
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
