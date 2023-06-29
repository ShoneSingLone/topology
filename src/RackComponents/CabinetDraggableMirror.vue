<template>
  <div
    class="cabinet-draggable-mirror draggable-item-row_dragenter"
    :style="styleObj">
    {{ RACK.currEnter }}
    {{ RACK.currEnter?.index }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['cell'],
  inject: ['RACK'],
  data() {
    return {
      styleObj: {
        display: "block",
        height: "100px"
      }
    }
  },
});
</script>

<style lang="scss" scoped>
.cabinet-draggable-mirror {
  position: absolute;
  pointer-events: none;
  width: 272px;
  color: white;

  &:hover {
    // background: red;
  }
}
</style>
