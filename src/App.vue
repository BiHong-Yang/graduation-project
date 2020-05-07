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
  methods: {},
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
