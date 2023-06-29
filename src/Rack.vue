<template>
  <section class="el-container flex" ref="container_draggable">
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
          class="el-tree-node draggable-item-row">
          <div class="el-tree-node__content">
            <span class="el-tree-node__label">{{ sub.label }}</span>
          </div>
        </div>
      </div>
    </aside>
    <main class="el-main flex middle flex1 center">
      <div style="position:absolute;top:10px">
        <div class="item">{{ unitInfo }}</div>
        <div class="item">{{ unitInfo?.span }}</div>
      </div>
      <Cabinet :title="currentNode.label" />
    </main>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cabinet from "./RackComponents/Cabinet.vue"
import $ from "jquery";

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

    $container.on("dragstart", ".draggable-item-row", event => {
      if ($(event.currentTarget).hasClass("target-rack")) {
        event.preventDefault();
      } else {
        vm.currUnit = event.currentTarget;
      }
    });
    $container.on("dragend", ".draggable-item-row", event => {
      vm.currUnit = null;
    });
    $container.on("dragstart", ".target-rack", event => {
      event.preventDefault();
    });
    $container.on("dragenter", ".draggable-item-row", event => {
      vm.toggleCurrentEnterRow($(event.currentTarget))
    });
    $container.on("dragover", ".draggable-item-row", event => {
      event.preventDefault();
      vm.toggleCurrentEnterRow($(event.currentTarget));
    });
    $container.on("dragleave", ".draggable-item-row", event => {
      vm.removeClass()
    });
    $container.on("drop", event => {
      event.preventDefault();
      vm.removeClass()
    });
  },
  beforeUnmount() {
    this.$container.off("dragstart");
    this.$container.off("dragend");
    this.$container.off("dragstart");
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
    removeClass() {
      this.currEnter$ele = null
    },
    toggleCurrentEnterRow($ele) {
      this.removeClass();
      if ($ele.hasClass("target-rack")) {
        this.currEnter$ele = $ele;
      }
    }
  },
  computed: {
    /* drag 的unit信息，根据某个能确定唯一性的属性从array中获取 */
    unitInfo() {
      const vm = this;
      if (vm.currUnit) {
        const $dragged = $(vm.currUnit);
        const label = $dragged.attr("data-label");
        const info = vm.unitOptions.find(i => i.label === label)
        return info
      }
      return { span: 0 }
    },
    currEnter() {
      if (this.currEnter$ele) {
        const index = this.currEnter$ele.attr("data-index");
        return {
          index
        }
      } else {
        return {}
      }
    }
  },
  data() {
    return {
      /* drag source*/
      currUnit: null,
      /* drop target */
      currEnter$ele: null,
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      currentNode: { label: 'Level one 1', },
      data: [{ label: 'Level one 1', }, { label: 'Level one 2', }],
      unitOptions: [
        { label: 'span 1', span: 1 },
        { label: 'span 2', span: 2 },
        { label: 'span 3', span: 3 }
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