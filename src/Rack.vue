<template>
  <section class="el-container flex" ref="container_draggable" :style="rackStyle">
    <aside class="el-aside el-card">
      <el-tree
        ref="treeRef"
        :data="data"
        :props="defaultProps"
        default-expand-all
        :default-checked-keys="defaultCheckedKeys"
        @check="handleNodeChange"
        show-checkbox
        node-key="label"
        highlight-current />
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
    <main class="el-main el-card " id="sroller-container" ref="srollerContainer">
      <div id="sroller-content" ref="srollerContent" class="sroller-content">
        <div class="cabinet-wrapper flex vertical" v-for="spe in allSpecification" :key="spe.label">
          <div class="flex1"></div>
          <Cabinet :configs="spe" />
        </div>
      </div>
    </main>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Cabinet from "./RackComponents/Cabinet.vue"
import $ from "jquery";
import throttle from "lodash/throttle"
import { CABINET_WIDTH } from "./RackComponents/configs";
import { initScroller } from "./RackComponents/scroller/initScroller";

export default defineComponent({
  provide() {
    const vm = this;
    return {
      RACK: vm,
      currEnterTitle: computed(() => vm.currEnterTitle),
      currEnterIndex: computed(() => vm.currEnterIndex)
    }
  },
  mounted() {
    this.init()
    // initScroller(this.$refs.srollerContainer, this.$refs.srollerContent);
    this.handleNodeChange();
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
    handleNodeChange() {
      const nodes = this.$refs.treeRef.getCheckedNodes(false, false);
      this.allSpecification = nodes.filter(i => i.label != "全部");
    },
    getCheckedNodes() {
      return this.$refs.treeRef.getCheckedNodes(false, false)
    },
    init() {
      const nodes = this.getCheckedNodes();
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

      $container.on("dragstart", ".rack-target-item", (event: any) => {
        const index = event.currentTarget.dataset.index;
        const title = event.currentTarget.dataset.title;
        const { specification } = vm.$refs.treeRef.getNode(title)?.data;
        const unit = specification[index].unit;
        vm.currDragRack = specification[index];
        if (unit.label !== vm.currUnitDomLabel) {
          vm.currUnitDomLabel = unit.label;
        }
      });

      $container.on("drop", (event: any) => {
        const $target = $(event.target)
        const $rackTargetItem = $target.parents(".rack-target-item");
        if ($rackTargetItem.length > 0) {
          const index = $rackTargetItem[0].dataset.index;
          const title = $rackTargetItem[0].dataset.title;
          const { specification } = vm.$refs.treeRef.getNode(title)?.data;
          specification[index].unit = this.currUnit;
          vm.currDragRack.unit = null;
        }
        event.preventDefault();
        vm.setCurrEnterIndex()
      });
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
        vm.currEnterTitle = ""
        return;
      }

      if (event.stopPropagation) {
        event.stopPropagation();
      }

      if (event.currentTarget.classList?.contains("rack-target-item")) {
        vm.currEnterTitle = event.currentTarget.dataset.title;
        console.log("vm.currEnterTitle", vm.currEnterTitle);
        if (vm.currEnterIndex != event.currentTarget.dataset.index) {
          vm.currEnterIndex = Number(event.currentTarget.dataset.index);
        }
      }
    }, 200)
    return {
      defaultCheckedKeys: ["one"],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      /* 抓起来 source*/
      currUnitDomLabel: "",
      /* 放下去 target */
      currEnterIndex: -1,
      currEnterTitle: "",
      /*  */
      allSpecification: [],
      data: [{
        label: '全部',
        children: [
          { label: 'one', specification: [...new Array(20)].map((i, ii) => ({ index: ii, unit: null })) },
          { label: 'Level', specification: [...new Array(10)].map((i, ii) => ({ index: ii, unit: null })) }
        ]
      }],
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
  overflow: hidden;
}

.sroller-content {
  // float: left;
  display: flex;

  .cabinet-wrapper {
    // height: 100%;
  }
}
</style>