<script setup>

import NewNavbar from "../components/NewNavbar.vue";
import NewFooter from "../components/NewFooter.vue"
import NewHeader from "../components/NewHeader.vue";
import HeaderLine from "../components/HeaderLine.vue";
import ReviewSlide from "../components/HomeComponent/ReviewSlide.vue"

import { useHead } from "@vueuse/head"

useHead({
    title: 'TAWIN65:สร้างรายได้',
    meta: [
        { name: 'title', content: 'TAWIN65:สร้างรายได้' },
        { property: 'og:title', content: 'TAWIN65:สร้างรายได้' },
        { name: 'twitter:title', content: 'TAWIN65:สร้างรายได้' },
    ],
})
</script>

<template>
    <div
        class="flex flex-col min-h-screen bg-[url(../assets/img/head-02.png)] bg-cover bg-top bg-no-repeat  bg-translation">
        <HeaderLine />
        <div class='max-w-4xl w-full mx-auto bg-gradient-to-b from-black/30 to-black relative'>

            <NewHeader />

            <NewNavbar />

            <div class="min-h-[400px] md:!min-h-[725px] lg:!min-h-[850px]">
                <img src="../assets/img/mlm/head-01.png" alt="ไม่จำเป็นต้องเล่นก่อรวยได้ เพียงกค่ชวนเพื่อน"
                    class="w-full" />
            </div>
        </div>

        <!-- children  -->

        <div class="flex-1 max-w-4xl w-full mx-auto bg-black pb-4 md:!pb-8">
            <div class="text-center ">
                <img src="../assets/img/mlm/mlm.png" alt="รีวิวคำชมจากลูกค้า" class="w-[85%] mx-auto" />
            </div>

            <!-- <div class=" relative z-30 pt-3 md:!pt-6 w-full inline-flex justify-center">
                        <a :href="linkMlm" target="_bank">
                            <img src="../assets/img/mlm/more.png" alt="ดูรายละเอียด" class="w-[90%] mx-auto hover:scale-105 duration-300" />
                        </a>
                    </div> -->

            <div class=" relative z-10 py-4 md:!py-8">
                <img src="../assets/img/mlm/review-income.png" alt="รีวิวจากผู้ใช้งานจริง รับรายได้ทุกวัน"
                    class="w-[95%] mx-auto" />
            </div>

            <ReviewSlide />
        </div>

        <!-- end children -->

        <NewFooter />
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/style.css';
</style>

