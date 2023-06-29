<template>
    <div class="legs flex">
        <CabinetLeg class="leg" />
        <div class="flex1"></div>
        <CabinetLeg class="leg" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CabinetLeg from "./CabinetLeg.vue";


export default defineComponent({
    components: { CabinetLeg },
});
</script>

<style scoped>
.leg {
    height: 10px;
}
</style>