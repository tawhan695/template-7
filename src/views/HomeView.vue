<script setup>

import NewNavbar from "../components/Navbar.vue";
import Carousel from '../components/Carousel.vue';
import Banner from "../components/Banner.vue"
import { useHead } from "@vueuse/head"
import ModalPromotions from "@/components/modals/modalPromotion.vue";

// import { useOptionStore } from "@/stores/options";
// const lineLink = useOptionStore().Line.url

useHead({
  title: 'DEMO:หน้าหลัก',
  meta: [
    { name: 'title', content: 'DEMO:หน้าหลัก' },
    { property: 'og:title', content: 'DEMO:หน้าหลัก' },
    { name: 'twitter:title', content: 'DEMO:หน้าหลัก' },
  ],
})
</script>

<template>
  <!-- CAROOSEL -->

  <NewNavbar />

  <Banner />

  <Carousel />

  <!-- END CAROOSEL -->

  <div class="x-tab-index lazyloaded" data-bgset="./build/web/sa-aecasino/img/tab-index-bg.png">
    <section class="-section-wrapper-1">
      <div class="d-flex justify-content-center">
        <img src="../assets/logo.png" style="max-width:200px" class="img-fluid justify-content-center" alt="DEMO Casino รูปภาพโลโก้" />
      </div>
      <div class="container">
        <div class="row -row-wrapper">
          <div class="col-12 col-lg-7 -left-container">
            <div class="-box-wrapper">
              <br>
              <h2 class="-title text-center">DEMO</h2>
              <p class="-description">ให้บริการความสนุกไม่รู้จบ 24 ชม. ไปกับดีลเลอร์ “DEALER” สาวสวย สุดเซ็กซี่ คอยแจกไพ่ ให้คุณได้ลุ้นทุกเกมส์เดิมพัน
                สบายตา สบายใจ ด้วย สาวๆ น่ารัก สุดเซ็กซี่ มาใส่บิกินี่ แต่ละสีแต่ละวันสีสด มาแจกไพ่ ท่านจะได้รับประสบการณ์ใหม่ในการเดิมพัน</p>
            </div>
          </div>
          <div class="col-12 col-lg-5 -right-container">
            <img src="../assets/certificate.gif" class="-banner-img img-fluid" alt="DEMO Casino รูปภาพแบนเนอร์" width="" height="" />
          </div>
        </div>
      </div>
    </section>
  </div>

  <div class="container mt-4">
    <div class="notice-box wow fadeInUp">
      <div class="description text-center">
        <div class="row m-0 py-3 justify-content-center">
          <div class="col-lg-6 text-white position-relative">
            <!-- <h3 class="mb-0">DEMO</h3>  -->
            <img src="../assets/logo.png" style="max-width: 220px" alt class="img-fluid" />
            <hr class="hr-border-glow" />
            <p class="text-start" style="text-indent: 35px">
              DEMO เราเป็นเว็บที่ให้เล่นคาสิโนออนไลน์ในรูปแบบมือถือ
              และบนคอมพิวเตอร์ มี บาคาร่า เกมส์สล็อต เสือ มังกร
              มีให้เล่นมากในเกมส์ DEMO สามารถเลือกเล่นได้หลากหลายรูปแบบ
              มีระบบฝากถอน เงิน ออโต้ สามารถทำรายการไม่เกิน 1 นาที
              ไม่ต้องมารอเติมเงินให้เสียเวลา สามารถ ฝาก ถอนได้ตลอดเวลา 24
              ชั่วโมง เว็บ www.taipebet.com เล่นบาคาร่าออนไลน์
              เล่นคาสิโนออนไลน์ ผ่านเว็บง่ายๆ
              <br />
            </p>
          </div>
          <div class="col-md-6 mx-auto">
            <img loading="lazy" src="https://sand89.com/build/web/sa-aecasino/img/tab-index-banner-1-mobile.png?v=2" alt class="w-100" />
            <!-- <div class="x-dig"></div> -->
          </div>
        </div>
      </div>
      <!-- description -->
    </div>
  </div>

  <footer>

    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h2 class="text-title">สล็อตออนไลน์บนมือถือ</h2>
          <!-- <p>เว็บไซด์ยิงปลาออนไลน์ คาสิโนออนไลน์ ทดลองเล่นสล็อตฟรี แจกเครดิตฟรี ทดลองเล่นสล็อตฟรี วิธีการเล่นเกมส์ยิงปลาให้ได้เงิน วิธีหาเงินด้วยสล็อตออนไลน์ สมัครสล็อต สล็อต สล็อตปลาทอง สล็อตผลไม้ สล็อตแจีคพ็อต สล็อตแพนด้า สล็อตได้เงินจริง สล็อตออนไลน์บนมือถือ วิธีสุ่มแจ๊คพ็อตสล็อต วิธีเล่นตู้สล็อตให้ได้เงิน สูตรเล่นสล็อตปลาทอง สูตรโกงสล็อต เกมส์ slot เกมส์ยิงปลา เล่น slot ออนไลน์ slot ออนไลน์ เล่น เกมส์ บนมือถือ แจกฟรีเครดิตสล็อต เล่นเกมได้เงินจริง เซียนสล็อต สูตรเกมส์ slot แจ๊คพ็อตเกมสล็อต เทคนิคการเล่นสล็อตออนไลน์ Slot Online สล็อตออนไลน์ฟรีเครดิต แจกฟรี </p> -->
        </div>
      </div>
    </div>
    <div class="x-footer-bank-logo">
      <div class="container">
        <div class="-wrapper">
          <div class="-ic -ic-1"></div>
          <div class="-ic -ic-2"></div>
          <div class="-ic -ic-3"></div>
          <div class="-ic -ic-4"></div>
          <div class="-ic -ic-5"></div>
          <div class="-ic -ic-6"></div>
          <div class="-ic -ic-7"></div>
          <div class="-ic -ic-8"></div>
          <div class="-ic -ic-9"></div>
          <div class="-ic -ic-10"></div>
          <div class="-ic -ic-11"></div>
          <div class="-ic -ic-12"></div>
        </div>
      </div>
    </div>

    <div class="container">
      <hr class="text-title" />
      <p class="text-center">Copyright © {{ new Date().getFullYear() }} DEMO. All Rights Reserved.</p>
    </div>
    <br /><br /><br />
  </footer>


  <ModalPromotions show_in="home"></ModalPromotions>
</template>
  
<style lang="scss" scoped>
@import '@/assets/style.css';



.x-tab-index {
  background-position: 100% 100%;
  overflow: hidden;
}

.x-tab-index .-section-wrapper-1 {
  padding: 2rem 0;
}

.x-tab-index .-section-wrapper-1 .-row-wrapper {
  align-items: center;
}

.x-tab-index .-section-wrapper-1 .-left-container {
  @media (max-width: 991.98px) {
    order: 1;
    margin-top: -5rem;
  }
}

.x-tab-index .-section-wrapper-1 .-right-container {
  @media (max-width: 991.98px) {
    order: 0;
    text-align: center;
    z-index: 1;
  }
}

.x-tab-index .-section-wrapper-1 .-banner-img {
  position: relative;

  // left: -40%;
  @media (max-width: 991.98px) {
    position: inherit;
  }
}

.x-tab-index .-section-wrapper-1 .-box-wrapper {
  position: relative;
  padding: 4rem 12rem 4rem 3rem;
  background: linear-gradient(90deg, #092248 40%, #000);
  border-radius: 20px;
  border: 3px solid #ffc87f;

  @media (max-width: 1199.98px) {
    padding: 3rem 12rem 3rem 2rem;
  }

  @media (max-width: 991.98px) {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    padding: 4rem 2rem;
    text-align: center;
    background: linear-gradient(180deg, #092248 40%, #000);
  }

  @media (max-width: 767.98px) {
    width: 100%;
    padding: 4rem 1rem 3rem;
  }

  @media (max-width: 575.98px) {
    padding: 4rem 1rem 2rem;
  }
}

.x-tab-index .-section-wrapper-1 .-title {
  font-size: 2.196rem;
  font-weight: 500;
}

.x-tab-index .-section-wrapper-1 .-description {
  font-size: 1.2015rem;
  font-weight: 300;

  @media (max-width: 991.98px) {
    position: relative;
    z-index: 2;
  }

  @media (max-width: 767.98px) {
    font-size: 1.0035rem;
  }
}



footer {
  // background-image: url("../assets/img/footer-bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  p {
    font-size: 1.3rem;
  }

  .x-footer-bank-logo .-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .x-footer-bank-logo .-wrapper {
    .-ic {
      background-image: url("../assets/img/ic-bank-logo.png");
      width: 50px;
      height: 50px;
      margin: 0.25rem;
      -webkit-filter: grayscale(100%);
      filter: grayscale(100%);
      background-size: 192px !important;
      background-repeat: no-repeat !important;
      transition: all 0.2s;

      &:hover {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
        -webkit-filter: grayscale(0);
        filter: grayscale(0);
      }

      @for $i from 0 through 3 {
        &:nth-child(#{$i + 1}) {
          background-position: ($i * (-50)) + px 4px !important;
        }
      }

      @for $i from 0 through 3 {
        &:nth-child(#{$i + 5}) {
          background-position: ($i * (-50)) + px (-44) + px !important;
        }
      }

      @for $i from 0 through 3 {
        &:nth-child(#{$i + 9}) {
          background-position: ($i * (-50)) + px (-92) + px !important;
        }
      }

      @media (max-width: 767.98px) {
        -webkit-filter: grayscale(0);
        filter: grayscale(0);
      }
    }
  }
}
</style>


