<script setup>
import Carousel from "../components/carousel.vue";
</script>

<template>
  <section class="x-index-top-container">
    <div class="x-wrapper-right-container">
      <div class="x-contact-us-gift"></div>
    </div>

    <div class="container -container-wrapper">
      <div class="row -top-row-wrapper" style="display: flex;
                margin-right: -15px;
                margin-left: -15px;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-around;">
        <div class="col-12 col-lg-6 col-xl-5 -top-row-right-wrapper">
          <img src="../assets/logo.png" class="-logo-img" alt="DEMO Casino รูปภาพโลโก้" width="340" height="112" />
          <h1 class="-title " style="font-size:20pt;">
            <span style="font-size:16pt">ถอนสูงสุด 2,000,000฿/วัน </span> <br>
            ถอนได้ทุกยอดไม่มีประวัติโกง <br>
            <span style="font-size:16pt">ถอนไม่จำกัดครั้ง</span>
          </h1>

          <div class="d-flex x-anon-container-v2 justify-content-center" style="margin: 5%;">
            <button type="button" class="-login-btn" data-target="#loginModal" style="margin-right: 10px;">
              <router-link to="/login" class="-text-btn">เข้าสู่ระบบ</router-link>
            </button>
            <button type="button" class="-login-btn">
              <router-link to="/register" class="-text-btn">สมัครสมาชิก</router-link>
            </button>
          </div>
        </div>
      </div>
      <Carousel class="d-sm-none" style="border: solid 3px #fbba15"></Carousel>
      <div class="row -bottom-row-wrapper">
        <div class="col-12 -col-wrapper">
          <div class="x-service-wrapper -index">
            <div class="row -service-inner-wrapper animated fadeInUp" data-animatable="fadeInUp" data-delay="600">
              <div class="col-11 col-sm-9 col-md-4 col-lg-3 text-center -box d-flex align-items-start d-md-block -box">
                <div class="-fake-bg"></div>


                <div class="-ic-wrapper">
                  <img data-src="../assets/wallet.jpeg" alt="service icon" class="-ic-register lazyloaded" width="100" height="100"
                    style="    border-radius: 1rem;    margin-bottom: .25rem;" src="../assets/wallet.jpeg" />
                </div>



                <div class="text-left text-md-center">
                  <h2 class="-title-h2">วอเล็ตก็เล่นได้</h2>
                  <hr class="x-hr-border-glow" />

                  <span class="d-none d-lg-block text-muted-lighter f-5">
                    เว็บเดียวในไทย ที่รองรับระบบ Wallet
                  </span>
                  <span class="d-block d-lg-none text-muted-lighter f-5"> เว็บเดียวในไทย ที่รองรับระบบ Wallet</span>
                </div>
              </div>

              <div class="col-11 col-sm-9 col-md-4 col-lg-3 text-center -box d-flex align-items-start d-md-block -box">
                <div class="-fake-bg"></div>
                <div class="-ic-wrapper">
                  <img data-src="../assets/black-gold/img/ic-pay-high.png" alt="service icon" class="-ic-otp lazyloaded" width="100" height="100"
                    src="../assets/icon-2.png" />
                </div>
                <div class="text-left text-md-center">
                  <h2 class="-title-h2">แถมทุกยอดเติมเงิน</h2>
                  <hr class="x-hr-border-glow" />

                  <span class="d-none d-lg-block text-muted-lighter f-5">
                    200 แถม 100P <br />600 แถม 300P
                  </span>
                  <span class="d-block d-lg-none text-muted-lighter f-5"> 200 แถม 100P <br />600 แถม 300P </span>
                </div>
              </div>

              <div class="col-11 col-sm-9 col-md-4 col-lg-3 text-center -box d-flex align-items-start d-md-block -box">
                <div class="-fake-bg"></div>
                <div class="-ic-wrapper">
                  <img data-src="../assets/black-gold/img/ic-consistency.png" alt="service icon" class="-ic-bank lazyloaded" width="100" height="100"
                    src="../assets/black-gold/img/ic-consistency.png" />
                </div>
                <div class="text-left text-md-center">
                  <h2 class="-title-h2">คืนยอดเสียทุกวัน</h2>
                  <hr class="x-hr-border-glow" />

                  <span class="d-none d-lg-block text-muted-lighter f-5">
                    แจ้งรับยอดเสียที่แอดมิน <br /> ในช่วงเวลา 18.00น. - 21.00น.
                  </span>
                  <span class="d-block d-lg-none text-muted-lighter f-5"> แจ้งรับยอดเสียที่แอดมิน <br /> ในช่วงเวลา
                    18.00น. - 21.00น.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
a {
  color: #fff;
}

.x-index-top-container {
  position: relative;
  padding: 7rem 0 2rem;
  background-image: url("../assets/black-gold/index-top-bg.png");
  background-position: top;
  background-repeat: repeat-x;
  background-size: 102% 100%;
  animation: x-bg-pan-left 8s infinite alternate;

  @media (max-width: 991.98px) {
    background-size: cover;
    animation: x-bg-pan-left 80s infinite alternate;
  }

  @media only screen and (max-width: 580px) {
    padding: 0rem 0 2rem;
  }
}

.x-wrapper-right-container {
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: flex-end;
  position: fixed;
  right: 0;
  z-index: 11;

  @media (min-width: 992px) {
    top: 30%;
  }
}

.x-index-top-container .-top-row-right-wrapper {
  text-align: center;
}

.x-index-top-container .-top-row-wrapper .-logo-img {
  width: 300px;
  height: auto;
  margin-top: 2rem;
}

.x-index-top-container .-top-row-wrapper .-title {
  // margin-top: 1rem;
  margin-bottom: 0;
  font-size: 1.2015rem;
  font-weight: 500;
  line-height: 1.5;
}

.x-anon-container-v2 .-login-btn {
  border-radius: 30px;
  min-width: 160px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;
  /* background-image: linear-gradient(1turn, #7c0047, #a7146a 45.97%, #d8a3ec 120%), linear-gradient(90deg, #faf1a1 7.14%, #cea359 54.32%, #fef6af); */
  background: linear-gradient(0.25turn, #000a13, #000a13 45.97%, #000a13 120%),
    linear-gradient(90deg, #fae0a3 7.14%, #cea359 54.32%, #fef6af);
  background-origin: border-box;
  background-clip: content-box, border-box;
  padding: 0;
  position: relative;
}

.x-anon-container-v2 .-login-btn .-text-btn {
  color: #fff;
  margin-top: 0;
  font-size: 15pt;
}

.x-service-wrapper.-index .-service-inner-wrapper {
  justify-content: space-evenly;
}

.x-service-wrapper.-index .-box {
  padding: 0;
  border-radius: 10px;
  border: 2px solid transparent;
  background-origin: border-box;
  background-clip: content-box, border-box;

  @media (max-width: 767.98px) {
    max-width: unset;
    margin-bottom: 1rem;
    background-image: linear-gradient(270deg, #001940 60%, rgba(0, 0, 0, 0.1) 90%),
      linear-gradient(270deg, #fdf6ae 0, rgba(0, 0, 0, 0.1) 80%);
  }
}

.x-service-wrapper.-index .-box .-ic-wrapper {
  margin-top: -3.5rem;

  @media (max-width: 767.98px) {
    margin: 1rem;
  }
}

.x-service-wrapper .-box .-fake-bg {
  display: none;
}

.x-service-wrapper .-box .-ic-wrapper {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.x-index-top-container .-bottom-row-wrapper {
  margin-top: 5rem;

  @media (min-width: 992px) and (max-width: 1199.98px) {
    margin-top: 8rem;
  }

  @media (max-width: 991.98px) {
    margin-top: 7rem;
  }

  @media (max-width: 767.98px) {
    margin-top: 1rem;
  }
}

@keyframes x-bg-pan-left {
  0% {
    background-position: 100% 50%;
  }

  to {
    background-position: 0 50%;
  }
}
</style>