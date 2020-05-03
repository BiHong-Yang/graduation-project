<template>
  <div>
    <draggable
      class="dragArea list-group el-icon-delete"
      :group="{ name: 'logic', put: true }"
      tag="div"
    ></draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  data() {
    return {};
  },
  components: {
    draggable,
  },
};
</script>

<style lang="scss" scoped>
.dragArea {
  background-color: gray;
  height: 100px;
  width: 100%;
}
</style>
