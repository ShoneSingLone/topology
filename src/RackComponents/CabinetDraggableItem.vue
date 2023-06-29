<template>
  <div class="cabinet-draggable-item rack-target-item flex middle"
    :data-index="flavor.index"
    :style="draggableItemStyle">
    <div class="flavor-item-wrapper flex middle">
      <el-popover
        v-if="flavor.unit"
        placement="left"
        :title="flavor.unit.label"
        :width="200"
        trigger="hover"
        :content="flavor.unit.span">
        <template #reference>
          <div class="flavor-item index">
            <div>{{ flavor.index + 1 }}</div>
          </div>
        </template>
      </el-popover>
      <div class="flavor-item index" v-else>
        <div>{{ flavor.index + 1 }}</div>
      </div>

      <div class="flavor-item content-item flex1"
        :style="contentStyle"
        draggable="true"
        :data-index="flavor.index">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ITEM_HEIGHT } from './configs';

export default defineComponent({
  props: ['flavor', "id"],
  computed: {
    draggableItemStyle(): any {
      const _style = {
        top: `${this.flavor.index * (ITEM_HEIGHT)}px`,
        height: `${ITEM_HEIGHT}px`
      }
      if (this.flavor?.unit) {
        const span = Number(this.flavor?.unit?.span) || 1;
        if (span > 1) {
          _style["z-index"] = 2;
        }
      }
      return _style
    },
    contentStyle() {
      const _style = {};
      if (this.flavor?.unit) {
        _style.background = `url(/imgs/racks/${this.flavor.unit.img}.png) center center/cover no-repeat`;
        const span = Number(this.flavor?.unit?.span) || 1;
        if (span > 1) {
          _style.height = `${ITEM_HEIGHT * span}px`;
        }
      }
      return _style
    },
  }
});
</script>

<style scoped lang="scss">
.flavor-item {
  // height: 24px;
}

.cabinet-draggable-item {
  position: absolute;
  width: 100%;
  // background-color: red;
  cursor: pointer;
}

.flavor-item-wrapper {
  position: relative;
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
  position: absolute;
  top: 0;
  left: 24px;
  width: 254px;
  z-index: 1;
}
</style>
