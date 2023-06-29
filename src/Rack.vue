<template>
  <section class="el-container flex" ref="container_draggable">
    <aside class="el-aside el-card">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
    </aside>
    <aside class="el-aside el-card">
      <el-select></el-select>
      <div class="el-tree">
        <div v-for="sub in dataSub"
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
      <Cabinet :title="currentNode.label" />
    </main>
  </section>
</template>

<script  lang="ts">
import { defineComponent } from "vue";
import Cabinet from "./components/Cabinet.vue"
import $ from "jquery";

export default defineComponent({
  provider() {
    const vm = this;
    return {}
  },
  mounted() {
    const vm = this;

    let dragged = null;

    function getUInfo() {
      if (dragged) {
        const $dragged = $(dragged);
        const label = $dragged.attr("data-label");
        const info = vm.dataSub.find(i => i.label === label)
        return info
      }
      return { span: 1 }
    }


    function addClass($ele) {
      removeClass();
      if ($ele.hasClass("target-rack")) {
        $ele.addClass("draggable-item-row_dragenter");
        const info = getUInfo();
        let span = info?.span - 1 || 0;
        while (span--) {
          $ele = $ele.next()
          $ele.addClass("draggable-item-row_dragenter");
        }
      }
    }
    function removeClass() {
      $(".draggable-item-row_dragenter").removeClass("draggable-item-row_dragenter")
    }

    $(this.$refs.container_draggable).on("dragstart", ".draggable-item-row", event => {
      if ($(event.currentTarget).hasClass("target-rack")) {
        event.preventDefault();
      } else {
        dragged = event.currentTarget;
      }
    });
    $(this.$refs.container_draggable).on("dragend", ".draggable-item-row", event => {
      dragged = null;
    });
    $(this.$refs.container_draggable).on("dragstart", ".target-rack", event => {
      event.preventDefault();
    });
    $(this.$refs.container_draggable).on("dragenter", ".draggable-item-row", event => {
      addClass($(event.currentTarget))
    });
    $(this.$refs.container_draggable).on("dragleave", ".draggable-item-row", event => {
      removeClass()
    });
    $(this.$refs.container_draggable).on("dragover", ".draggable-item-row", event => {
      event.preventDefault();
      const $rack = $(event.currentTarget);
      addClass($rack);
    });
    $(this.$refs.container_draggable).on("drop", event => {
      event.preventDefault();
      removeClass()
      if ($(event.currentTarget).hasClass("target-rack")) {
      }
    });
  },
  components: { Cabinet },
  methods: {
    handleNodeClick(currentNode: any) {
      this.currentNode = currentNode;
    },
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      currentNode: { label: 'Level one 1', },
      data: [{ label: 'Level one 1', }, { label: 'Level one 2', }],
      dataSub: [
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
