<template>
  <div class="cell flex middle target-rack draggable-item-row" draggable="true">
    <div class="cell-item index">
      <div>{{ cell.index + 1 }}</div>
    </div>
    <div class="cell-item img flex1">
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  props: ['cell']
});
</script>

<style scoped>
.cell-item {
  height: 24px;
}

.index,
.img {
  text-align: center;
  border-radius: 5px 0 0 5px;
  color: aliceblue;
  font-size: 12px;
  line-height: 20px;
  cursor: pointer;
  border-top: 1px #fff3 solid;
  margin: 1px 0;
  background-color: rgb(81, 81, 81);
}

.index {
  width: 20px;
}

.img {
  border-radius: 0 5px 5px 0;
  background-color: #51515159;
}
</style>
