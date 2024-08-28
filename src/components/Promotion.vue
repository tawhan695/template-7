<template>
    <br />
    <h3 class="text-title py-0">โปรโมชั่น</h3>
    <br />
    <div class="container">
        <div class="row">
            <!-- <div class="col-md-6 my-2">
                <a data-bs-toggle="collapse" href="#collapsevip7">
                    <img src="../assets/img/promotion/header-vip7.jpg" class="img-fluid" />
                </a>
                <div class="collapse" id="collapsevip7">
                    <Splide>
                        <SplideSlide>
                            <img src="../assets/img/promotion/vip7-1.jpg" class="img-fluid" />
                        </SplideSlide>
                        <SplideSlide>
                            <img src="../assets/img/promotion/vip7-2.jpg" class="img-fluid" />
                        </SplideSlide>
                        <SplideSlide>
                            <img src="../assets/img/promotion/vip7-3.jpg" class="img-fluid" />
                        </SplideSlide>
                        <SplideSlide>
                            <img src="../assets/img/promotion/vip7-4.jpg" class="img-fluid" />
                        </SplideSlide>
                        <SplideSlide>
                            <img src="../assets/img/promotion/vip7-5.jpg" class="img-fluid" />
                        </SplideSlide>
                    </Splide>
                </div>
            </div> -->
            <div class="col-md-6 my-2" v-for="(list, index) in promotionList.data" :key="list.key">
                <a data-bs-toggle="collapse" :href="'#collapse' + index">
                    <img :src="promotionList.host + list.img" class="img-fluid" />
                </a>
                <div class="collapse" :id="'collapse' + index">
                    <img :src="promotionList.host + list.imgdesc" class="img-fluid" />
                </div>
            </div>
        </div>
    </div>
</template>


<script>
// import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { useOptionStore } from "@/stores/options";

export default {
    setup() {
        const option = useOptionStore();
        return {
            option
        }
    },
    data() {
        return {};
    },
    computed: {
        promotionList() {
            return this.option.getPromotions;
        },
    },
    components: {
        // Splide,
        // SplideSlide,
    },
    mounted() {
        this.option.getPromotion();
    },
}
</script>

<style>
.text-title {
    font-weight: 900;
    font-size: 2rem;
    text-align: center;

    background: linear-gradient(0deg,
            rgba(224, 169, 83, 1) 0%,
            rgba(251, 212, 109, 1) 53%,
            rgba(224, 169, 83, 1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-transform: uppercase;
}
</style>
