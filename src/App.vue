<template>
  <div id="app">
    <!-- <Home></Home> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import Home from "./components/Home.vue";
export default {
  name: "app",
  components: {
    // Menu,
    // Home,
  },
  methods: {
    storeThings: function () {
      console.log("now!");
      alert("leave");
      this.stopTimer();
      localStorage.setItem(
        "code",
        JSON.stringify(this.$store.state.logic.elements)
      );
      localStorage.setItem(
        "globalId",
        JSON.stringify(this.$store.state.logic.globalId)
      );
      return "花Q!";
    },
  },
  mounted: function () {
    alert("mounted");
    this.$store.state.control.kill = false;
    if (localStorage.getItem("code") == null) {
      this.$store.state.logic.elements = [];
      this.$store.state.logic.globalId = 10;
    } else {
      this.$store.state.logic.elements = JSON.parse(
        localStorage.getItem("code")
      );
      this.$store.state.logic.globalId = JSON.parse(
        localStorage.getItem("globalId")
      );
    }
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
