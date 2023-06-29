<template>
    <div class="wrapper flex vertical">
        <div class="body-wrapper">
            <div class="title-wrapper flex middle">
                <div class="gap"></div>
                <div class="title flex1">{{ title }}</div>
                <div class="gap"></div>
            </div>
            <div class="body">
                <div class="content flex1">
                    <CabinetDraggableMirror />
                    <CabinetDraggableItem v-for="cell in cellArray" :key="cell.index" :cell="cell" />
                </div>
            </div>
        </div>
        <CabinetLegs />
    </div>
</template>

<script lang="ts">
import CabinetLegs from "./CabinetLegs.vue";
import CabinetDraggableItem from "./CabinetDraggableItem.vue";
import CabinetDraggableMirror from "./CabinetDraggableMirror.vue";

export default {
    components: { CabinetLegs, CabinetDraggableItem, CabinetDraggableMirror },
    props: ["title"],
    data() {
        return {
            cellArray: [...new Array(20)].map((i, ii) => ({ index: ii }))
        };
    },
    methods: {

    },
    mounted() {
    },

};
</script>

<style scoped>
* {
    /* outline: 1px solid #f3f3f3; */
}

.wrapper {
    width: 300px;
    min-height: 500px;
}

.body-wrapper {
    padding: 10px;
    border: 2px solid white;
    border-radius: 4px;
    overflow: hidden;
    background-color: #3e4c5e;
}

.title {
    color: white;
}

.body {
    border: 2px solid #323540;
    background: #323540;
}


.content {
    width: 100%;
}


.gap {
    width: 10px;
    height: 10px;
}
</style>