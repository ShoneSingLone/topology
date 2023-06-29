<template>
  <div class="cabinet-draggable-item rack-target-item flex middle" :data-index="cell.index"
    :style="draggableItemStyle">
    <div class="cell-item-wrapper flex middle">
      <div class="cell-item index">
        <div>{{ cell.index + 1 }}</div>
      </div>
      <div class="cell-item content-item flex1" :style="contentStyle">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ITEM_HEIGHT } from './configs';

export default defineComponent({
  props: ['cell'],
  computed: {
    draggableItemStyle(): any {
      return {
        top: `${this.cell.index * (ITEM_HEIGHT)}px`,
        height: `${ITEM_HEIGHT}px`
      }
    },
    contentStyle() {
      return {

      }
    },
  }
});
</script>

<style scoped lang="scss">
.cell-item {
  // height: 24px;
}

.cabinet-draggable-item {
  position: absolute;
  width: 100%;
  // background-color: red;
  cursor: pointer;
}

.cell-item-wrapper {
  // background-color: greenyellow;
  width: 100%;
}

.index,
.content-item {
  text-align: center;
  color: aliceblue;
  font-size: 12px;
  line-height: 20px;
  height: 22px;
  background-color: rgb(81, 81, 81);
  border: 1px #fff3 solid;
}

.index {
  border-radius: 5px 0 0 5px;
  width: 20px;
}

.content-item {
  border-radius: 0 5px 5px 0;
  background-color: #51515159;
}
</style>
