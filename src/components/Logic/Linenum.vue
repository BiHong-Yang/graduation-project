<template>
  <ul class="infinite-list" v-infinite-scroll="load" >
    <li v-for="(i, index) in count" :key="index" class="infinite-list-item">{{ i }}</li>
  </ul>
</template>

<script>
  export default {
    data () {
      return {
        count: 0
      }
    },
    methods: {
      load () {
        this.count += 1
      }
    }
  }
</script>

<style>
.infinite-list{
  height: 100%;
  overflow-y:scroll;
  margin: 0px;
}
ul
{
  list-style: none;
}
</style>