<template>
  <router-link to="/member" class="text-center justify-content-center">
    <div class="-glow-container mx-auto">
      JACKPOT ที่กำลังออกตอนนี้
      <span style="color: red">‼️</span>
      <br /> 
      <vue-odometer class="iOdometer" :value="num" />฿
      <div class="-jewel-jewel"></div>
      <div class="-flash-jewel"></div>
    </div>
  </router-link>
</template>

<script > 
import lottie from "lottie-web"; 
import VueOdometer from './MyOdometer.vue'
import "odometer/themes/odometer-theme-default.css"; 
export default {
  components: {
    "vue-odometer": VueOdometer
  },
  methods: {
    loop() {
      setInterval(() => {
        let random_plusminus = Math.floor(Math.random() * 2);
        let random_position = Math.floor(Math.random() * 2);
        let n10 = Math.floor(Math.random() * 5) + 1000;
        let n100 = Math.floor(Math.random() * 10) + 4000;
        let new_n;

        if (random_position == 0) new_n = n10;
        else new_n = n100;

        if (random_plusminus == 0) this.num = this.num + new_n;
        else this.num = this.num - new_n;
      }, 5000);
    },
  },
  data() {
    return {
      num: null,
    };
  },
  mounted() {
    this.num = Math.floor(Math.random() * 10000000) + 10000;
    this.loop(); 
    lottie.loadAnimation({
      container: document.getElementsByClassName("-jewel-jewel")[0], // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "animation/jewel-jewel.json",
    });
    lottie.loadAnimation({
      container: document.getElementsByClassName("-flash-jewel")[0], // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "animation/jewel-flash.json",
    });
  },
};
</script>

<style lang="scss" scoped>
@charset "utf-8";

.bg-w {
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 1.5rem;
  width: 100%;
  max-width: 260px;
  color: #000;
}
.iOdometer {
  font-size: 2em;
  margin: 0;
  color: #000;
}

.-glow-container {
  display: inline-block;
  border-radius: 10px;
  animation: x-neon-register 1.5s ease-in-out infinite alternate;
  position: relative;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 1.5rem;
  width: 100%;
  max-width: 260px;
  color: #000;

  .-flash-jewel {
    position: absolute;
    top: 0;
    left: -40px;
    width: 70px;
    z-index: 1;
    @media (max-width: 767.98px) {
      left: -30px;
      width: 60px;
    }
  }
  .-jewel-jewel {
    position: absolute;
    top: -5px;
    right: -55px;
    width: 90px;
    z-index: 1;
  }
}

@keyframes x-neon-register {
  0% {
    box-shadow: 0 0 5px #fff7, 0 0 8px #fff7, 0 0 10px #fff7, 0 0 13px #dea85f;
  }

  to {
    box-shadow: 0 0 2px #fff7, 0 0 5px #fff7, 0 0 8px #fff7, 0 0 20px #dea85f;
  }
}
</style>




 
