<script setup>

import NewNavbar from "../components/NewNavbar.vue";
import NewFooter from "../components/NewFooter.vue"
import NewHeader from "../components/NewHeader.vue";
import HeaderLine from "../components/HeaderLine.vue";
import Promotion from "../components/Promotion.vue";
import { useHead } from "@vueuse/head"

useHead({
    title: 'TAWIN65:โปรโมชั่น',
    meta: [
        { name: 'title', content: 'TAWIN65:โปรโมชั่น' },
        { property: 'og:title', content: 'TAWIN65:โปรโมชั่น' },
        { name: 'twitter:title', content: 'TAWIN65:โปรโมชั่น' },
    ],
})
</script>


<template>
    <div class="flex flex-col min-h-screen bg-[url(../assets/img/head-02.png)] bg-cover bg-top bg-no-repeat bg-translation" >
        <HeaderLine />
        <div class='max-w-4xl w-full mx-auto bg-gradient-to-b from-black/30 to-black relative'>
            <NewHeader />

            <NewNavbar />
            <!-- <div
                class="overflow-hidden lg:!overflow-visible min-h-[230px] md:!min-h-[420px] lg:!min-h-[485px] pt-2 md:!pt-4">
                <img src="../assets/img/new-update/head-01-1.jpg" alt="กิจกรรมรับขวัญถุง" class="w-[90%] mx-auto h-auto" />
            </div> -->
        </div>

        <div class="max-w-4xl w-full mx-auto bg-gradient-to-b" style="background-color: black;">
            <Promotion />
        </div>
        <NewFooter />
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.css';
</style>