<template>
  <div class="cabinet-draggable-mirror" :style="styleObj" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ITEM_HEIGHT } from './configs';

export default defineComponent({
  props: ['cell'],
  inject: ['RACK', 'CABINET'],
  computed: {
    styleObj() {
      const _style = {
        display: "block",
      };
      if (~this.RACK.currEnterIndex) {
        _style.top = `${this.RACK.currEnterIndex * ITEM_HEIGHT}px`;
        _style.height = `${this.RACK.currUnit.span * ITEM_HEIGHT}px`;
        _style.background = `url(/imgs/racks/${this.RACK.currUnit.img}.png) center center/cover no-repeat`;
      } else {
        _style.display = "none"
      }
      return _style
    }
  },
  data() {
    return {
    }
  },
});
</script>

<style lang="scss" scoped>
.cabinet-draggable-mirror {
  position: absolute;
  width: var(--cabinet-draggable-mirror-width);
  color: white;
  transition: .2s ease-in-out;
  pointer-events: none;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: #60D8FF 1px solid;
  background: white;
  opacity: 0.5;
  z-index: 2;
}
</style>
