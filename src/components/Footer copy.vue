<template>
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
      <p class="text-center">Copyright © {{ new Date().getFullYear() }} VAM168. All Rights Reserved.</p>
    </div>
    <br /><br /><br />
  </footer>
</template>

<script>
// import lottie from "lottie-web";
export default {
  mounted() {
    // let element = document.getElementsByClassName("x-dig");
    // lottie.loadAnimation({
    //   container: element[0], // the dom element that will contain the animation
    //   renderer: "svg",
    //   loop: true,
    //   autoplay: true,
    //   path: "animation/dig.json",
    // });
  },
};
</script>
<style lang="scss" scoped>
.x-dig {
  position: absolute;
  width: 75%;
  bottom: 0;
  right: 0;
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

      // &:nth-child(1) {
      //   background-position: 6px 4px !important;
      // }
      // &:nth-child(2) {
      //   background-position: -46px 4px !important;
      // }
      // &:nth-child(3) {
      //   background-position: -96px 4px !important;
      // }
      // &:nth-child(4) {
      //   background-position: -146px 4px !important;
      // }
      // &:nth-child(5) {
      //   background-position: 6px -44px !important;
      // }
      // &:nth-child(6) {
      //   background-position: -46px -44px !important;
      // }
      // &:nth-child(7) {
      //   background-position: -96px -44px !important;
      // }
      // &:nth-child(8) {
      //   background-position: -146px -44px !important;
      // }
      // &:nth-child(9) {
      //   background-position: 6px -92px !important;
      // }
      // &:nth-child(10) {
      //   background-position: -46px -92px !important;
      // }
      // &:nth-child(11) {
      //   background-position: -96px -92px !important;
      // }
      // &:nth-child(12) {
      //   background-position: -146px -92px !important;
      // }

      @media (max-width: 767.98px) {
        -webkit-filter: grayscale(0);
        filter: grayscale(0);
      }
    }
  }
}</style>