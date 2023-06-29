<template>
  <div class="cabinet-wrapper flex vertical">
    <div class="cabinet-body-wrapper flex vertical">
      <div class="title-wrapper flex middle center">
        <div class="title">{{ title }}</div>
      </div>
      <div class="cabinet-content" :style="contentStyle">
        <CabinetDraggableMirror />
        <CabinetDraggableItem v-for="unit in specification" :key="unit.index" :flavor="unit" />
      </div>
    </div>
    <!--  -->
    <CabinetLegs />
  </div>
</template>

<script lang="ts">
import CabinetLegs from "./CabinetLegs.vue";
import CabinetDraggableItem from "./CabinetDraggableItem.vue";
import CabinetDraggableMirror from "./CabinetDraggableMirror.vue";
import { ITEM_HEIGHT } from "./configs";

export default {
  components: { CabinetLegs, CabinetDraggableItem, CabinetDraggableMirror },
  props: ["configs"],
  provide() {
    const vm = this;
    return {
      CABINET: vm
    }
  },
  data() {
    return {};
  },
  computed: {
    title() {
      return this.configs.label;
    },
    specification() {
      return this.configs.specification
    },
    contentStyle() {
      return { height: `${this.specification.length * (ITEM_HEIGHT)}px` }
    }
  },
  methods: {},
  mounted() {
  },

};
</script>

<style scoped>
* {
  /* outline: 1px solid #f3f3f3; */
}

.cabinet-wrapper {
  width: 300px;
}

.cabinet-body-wrapper {
  padding: 10px;
  border: 2px solid white;
  border-radius: 4px;
  overflow: hidden;
  background-color: #3e4c5e;
}

.title {
  color: white;
}

.cabinet-content {
  border: 2px solid #323540;
  /* 减去border  4px */
  width: var(--cabinet-draggable-mirror-width);
  background: #323540;
  position: relative;
  overflow: hidden;
}
</style>
