<template>
  <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
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
        this.count += 2
      }
    }
  }
</script>