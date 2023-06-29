<template>
    <div
        class="cabinet-draggable-mirror draggable-item-row_dragenter"
        :style="styleObj">
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: ['cell'],
    data() {
        return {
            styleObj: {
                display: "block",
                height: "100px"
            }
        }
    },
});
</script>

<style lang="scss" scoped>
.cabinet-draggable-mirror {
    position: absolute;
    // pointer-events: none;
    width: 272px;

    &:hover {
        // background: red;
    }
}
</style>