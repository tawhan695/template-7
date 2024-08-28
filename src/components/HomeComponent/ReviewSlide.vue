<template>
  <div class=" w-[80%] md:!w-[70%] relative mx-auto">
    <Swiper ref="swiper" :modules="modules" :slides-per-view="2" :slidesPerGroup="2" :breakpoints="{
      '769': {
        slidesPerView: 3,
        slidesPerGroup: 3,
        grid: {
          fill: column,
          rows: 2,
        }
      },
    }" :grid="{
  fill: column,
  rows: 2,
}" :autoplay="{
  delay: 5000,
  disableOnInteraction: false,
}" :navigation="{ nextEl: '.swiper-button-prev', prevEl: '.swiper-button-next' }" :spaceBetween="10" class="mySwiper ">
      <swiper-slide>
        <div class="aspect-square ">
          <img src="../../assets/img/review/1.jpg" alt="review-1" class="w-full h-full object-fill" />
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="aspect-square ">
          <img src="../../assets/img/review/2.jpg" alt="review-2" class="w-full h-full object-fill" />
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="aspect-square ">
          <img src="../../assets/img/review/4.jpg" alt="review-4" class="w-full h-full object-fill" />
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="aspect-square ">
          <img src="../../assets/img/review/5.jpg" alt="review-5" class="w-full h-full object-fill" />
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="aspect-square ">
          <img src="../../assets/img/review/6.jpg" alt="review-6" class="w-full h-full object-fill" />
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="aspect-square ">
          <img src="../../assets/img/review/7.jpg" alt="review-7" class="w-full h-full object-fill" />
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="aspect-square ">
          <img src="../../assets/img/review/8.jpg" alt="review-8" class="w-full h-full object-fill" />
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="aspect-square ">
          <img src="../../assets/img/review/9.jpg" alt="review-9" class="w-full h-full object-fill" />
        </div>
      </swiper-slide>
    </Swiper>

    <!-- <div class="swiper-button-prev !-left-8 md:!-left-12 text-white" @click="$refs.swiper.swiperInstance.slidePrev()"></div>
    <div class="swiper-button-next !-right-8 md:!-right-12 text-white" @click="$refs.swiper.swiperInstance.slideNext()"></div> -->

  </div>
</template>

<script>
import { Grid, Autoplay, Pagination } from 'swiper';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

// Import Swiper styles
import 'swiper/css';
import "swiper/css/zoom";
import 'swiper/css/grid';
import 'swiper/css/navigation';

export default {
  components: {
    Swiper,
    SwiperSlide, 
  },
  setup() {
  
    return {
      modules: [Grid, Autoplay, Pagination], 
    };
  },
 

  data() {
    return {
      column: null
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/style.css' ;
.swiper-button-next::after {
  font-size: 25px;
  font-weight: bold;
}

.swiper-button-prev:after {
  font-size: 25px;
  font-weight: bold;
}
</style>