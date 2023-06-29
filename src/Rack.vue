<template>
  <section class="el-container flex" ref="container_draggable" :style="rackStyle">
    <aside class="el-aside el-card">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
    </aside>
    <aside class="el-aside el-card">
      <el-select></el-select>
      <div class="el-tree">
        <div v-for="sub in unitOptions"
          :key="sub.label"
          :data-label="sub.label"
          :draggable="true"
          class="el-tree-node rack-source-unit">
          <div class="el-tree-node__content">
            <span class="el-tree-node__label">{{ sub.label }}</span>
          </div>
        </div>
      </div>
    </aside>
    <main class="el-main flex middle flex1 center">
      <div style="position:absolute;top:10px">
        <div class="item">{{ currUnit }}</div>
        <div class="item">{{ currUnit?.span }}</div>
      </div>
      <Cabinet :title="currentNode.label" :flavor="flavor" />
    </main>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cabinet from "./RackComponents/Cabinet.vue"
import $ from "jquery";
import throttle from "lodash/throttle"
import { CABINET_WIDTH } from "./RackComponents/configs";

export default defineComponent({
  provide() {
    const vm = this;
    return {
      RACK: vm
    }
  },
  mounted() {
    const vm = this;
    const $container = $(this.$refs.container_draggable);
    this.$container = $container;

    $container.on("dragstart", ".rack-source-unit", (event: any) => {
      const currUnitDomLabel = event.currentTarget.dataset.label;
      if (currUnitDomLabel !== vm.currUnitDomLabel) {
        vm.currUnitDomLabel = currUnitDomLabel;
      }
    });
    $container.on("dragend", (event: any) => {
      event.preventDefault();
      vm.currUnitDomLabel = "";
    });
    $container.on("dragenter", ".cabinet-content .rack-target-item", (event: any) => {
      event.preventDefault();
      vm.setCurrEnterIndex(event)
    });
    $container.on("dragover", ".cabinet-content .rack-target-item", (event: any) => {
      event.preventDefault();
      vm.setCurrEnterIndex(event);
    });
    $container.on("dragleave", ".cabinet-content", (event: any) => {
      event.preventDefault();
      vm.setCurrEnterIndex()
    });
    $container.on("drop", (event: any) => {
      event.preventDefault();
      vm.setCurrEnterIndex()
    });
  },
  beforeUnmount() {
    this.$container.off("dragstart");
    this.$container.off("dragend");
    this.$container.off("dragenter");
    this.$container.off("dragleave");
    this.$container.off("dragover");
    this.$container.off("drop");
    this.$container = null;
  },
  components: { Cabinet },
  methods: {
    handleNodeClick(currentNode: any) {
      this.currentNode = currentNode;
    },
  },
  computed: {
    rackStyle() {
      return {
        "--cabinet-draggable-mirror-width": `${CABINET_WIDTH}px`,
      }
    },
    /* drag 的unit信息，根据某个能确定唯一性的属性从array中获取 */
    currUnit(): any {
      if (this.currUnitDomLabel) {
        const unit = this.unitOptions.find(i => i.label === this.currUnitDomLabel)
        if (unit) {
          return unit
        }
      }
      return { span: 0 }
    },
  },
  data() {
    const vm = this;
    vm.setCurrEnterIndex = throttle(function (event: any = false) {
      if (!event) {
        vm.currEnterIndex = -1;
        return;
      }

      if (event.stopPropagation) {
        event.stopPropagation();
      }

      if (event.currentTarget.classList?.contains("rack-target-item")) {
        if (vm.currEnterIndex != event.currentTarget.dataset.index) {
          vm.currEnterIndex = Number(event.currentTarget.dataset.index);
        }
      }
    }, 200)
    return {
      flavor: {
        total: 20
      },
      /* 抓起来 source*/
      currUnitDomLabel: "",
      /* 放下去 target */
      currEnterIndex: -1,
      /*  */
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      currentNode: { label: 'Level one 1', },
      data: [{ label: 'Level one 1', }, { label: 'Level one 2', }],
      unitOptions: [
        { label: 'span 1', span: 1, img: "2" },
        { label: 'span 2', span: 2, img: "2" },
        { label: 'span 3', span: 3, img: "3" }
      ],
    }
  },
})

</script>


<style scoped lang="scss">
.el-container {
  height: 100%;
  padding: 10px;
}

.el-aside {
  width: 200px;
  margin-right: 10px;
  padding: 10px;
}

.el-tree-node__content {
  padding-left: 10px;
}

.el-main {
  width: 100%;
}
</style>
./RackComponents/Cabinet.vue