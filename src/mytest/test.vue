<template>
  <select :name="item.name" :id="item.id" :value="uint256" v-model="item.value">
    <option v-for="loop of 32" :key="loop" :value="'uint'+8*(loop+1)">最大2的{{(loop+1)*8}}次方</option>
  </select>
</template>

<script>
export default {};
</script>

<style>
</style>