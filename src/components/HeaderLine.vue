<template>
    <a class="bg-[#00c300] h-12 w-full" :href="optionStore.Line.url" target="_blank">
        <div class="flex-row-default h-full">
            <img src="../assets/img/icon/LINE_Brand_icon.png" alt="line-icon" class="w-14 h-14" />
            <p class='text-white text-2xl font-semibold '>@TAWIN</p>
        </div>
    </a>
</template>

<script >
import { useOptionStore } from "../stores/options";

export default {
    setup() {
        const optionStore = useOptionStore()
        return ({
            optionStore
        })
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.css';
</style>