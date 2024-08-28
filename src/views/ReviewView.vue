<script setup>
import NewNavbar from "../components/NewNavbar.vue";
import NewFooter from "../components/NewFooter.vue"
import NewHeader from "../components/NewHeader.vue";
import HeaderLine from "../components/HeaderLine.vue";
import ReviewSlide from "../components/HomeComponent/ReviewSlide.vue"
import { useHead } from "@vueuse/head"

useHead({
    title: 'TAWIN65:รีวิว',
    meta: [
        { name: 'title', content: 'TAWIN65:รีวิว' },
        { property: 'og:title', content: 'TAWIN65:รีวิว' },
        { name: 'twitter:title', content: 'TAWIN65:รีวิว' },
    ],
})
</script>

<template>
    <div class="flex flex-col min-h-screen bg-[url(../assets/img/head-02.png)] bg-cover bg-top bg-no-repeat  bg-translation" >
        <HeaderLine />
        <div class='max-w-4xl w-full mx-auto bg-gradient-to-b from-black/30 to-black relative'>

            <NewHeader />

            <NewNavbar />

            <div class="pt-3 md:!pt-10 min-h-[340px] md:!min-h-[625px] lg:!min-h-[725px] ">
                <img src="../assets/img/review/header.png" alt="รีวิวคำชมลูกค้า" class="w-[95%] mx-auto " />
            </div>

        </div>

        <!-- children  -->


        <div class="flex-1 max-w-4xl w-full mx-auto bg-black pt-2 md:!pt-6 ">

            <div>
                <img src="../assets/img/review/title.png" class="w-[90%] mx-auto" alt="รีวิวยอดถอนหลักล้านก็จ่าย" />
            </div>

            <h1 class="py-2 md:!py-10 text-center text-2xl md:!text-5xl font-[500] 
                        text-transparent bg-clip-text bg-gradient-to-b from-[#a1a3a5] via-[#ffffff] to-[#9b9c9e]">
                เล่นได้ถอนได้
                แจกจริงจ่ายจริง</h1>

            <div class="grid grid-cols-2 md:!grid-cols-3  gap-6  px-2 md:!px-8">

                <img src="../assets/img/review/review-01.png" alt="review-01" />

                <img src="../assets/img/new-update/review-01.jpg" alt="review-02" />

                <img src="../assets/img/new-update/review-02.jpg" alt="review-03" />

                <img src="../assets/img/new-update/review-03.jpg" alt="review-04" />

                <img src="../assets/img/new-update/review-04.jpg" alt="review-05" />

                <img src="../assets/img/new-update/review-05.jpg" alt="review-06" />

                <img src="../assets/img/new-update/review-06.jpg" alt="review-07" />

                <img src="../assets/img/new-update/review-07.jpg" alt="review-08" />

                <img src="../assets/img/new-update/review-08.jpg" alt="review-09" />

                <img src="../assets/img/new-update/review-09.jpg" alt="review-10" />

                <img src="../assets/img/new-update/review-10.jpg" alt="review-11" />

                <img src="../assets/img/new-update/review-11.jpg" alt="review-12" />

                <img src="../assets/img/new-update/review-12.jpg" alt="review-13" />

            </div>

            <div class="py-2 md:!py-12">
                <img src="../assets/img/review/review-header.png" alt="รีวิว จากลูกค้า" class="w-[95%] mx-auto" />
            </div>

            <ReviewSlide />
        </div>

        <!-- end children -->

        <NewFooter />
    </div>
</template>

<script>
export default {
    data() {
        return {
            // dataReview: [
            //     {
            //         url: "src/assets/img/review/review-01.png",
            //         alt: "review-01"
            //     }, {
            //         url: "src/assets/img/review/review-02.png",
            //         alt: "review-02"
            //     }, {
            //         url: "src/assets/img/review/review-03.png",
            //         alt: "review-03"
            //     }, {
            //         url: "src/assets/img/review/review-04.png",
            //         alt: "review-04"
            //     }, {
            //         url: "src/assets/img/review/review-05.png",
            //         alt: "review-05"
            //     }, {
            //         url: "src/assets/img/review/review-06.png",
            //         alt: "review-06"
            //     }, {
            //         url: "src/assets/img/review/review-07.png",
            //         alt: "review-07"
            //     }, {
            //         url: "src/assets/img/review/review-08.png",
            //         alt: "review-08"
            //     }, {
            //         url: "src/assets/img/review/review-09.png",
            //         alt: "review-09"
            //     }, {
            //         url: "src/assets/img/review/review-10.png",
            //         alt: "review-10"
            //     }, {
            //         url: "src/assets/img/review/review-11.png",
            //         alt: "review-11"
            //     }, {
            //         url: "src/assets/img/review/review-12.png",
            //         alt: "review-12"
            //     }, {
            //         url: "src/assets/img/review/review-13.png",
            //         alt: "review-13"
            //     }, {
            //         url: "src/assets/img/review/review-14.png",
            //         alt: "review-14"
            //     }, {
            //         url: "src/assets/img/review/review-15.png",
            //         alt: "review-15"
            //     }
            // ]
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.css';
</style>