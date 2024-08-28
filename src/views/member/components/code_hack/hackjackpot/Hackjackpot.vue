<template>
 
  <div>
    <div class="codepro">
      <h3 @click="codeproHide()">
        
        <img src="@/assets/code_hack/hackjackpot/HACKJACKPOT.png" style="max-width:120px" alt="">
      </h3>
      <div v-show="!hideCode" class="text-center mt-2">
        <router-link to="/jackpothack" class="btn btn-hack mx-auto">โปร HACKJAKPOT</router-link>
      </div>
      <div class="timeout" @click="codeproHide()">
        <div class="text-center">
          <b style="color: white;font-size: 10pt;">
            
            <span style="color:#00ff1f;">{{countdown? "หมดอายุ "+countdown: 'หมดอายุ'}}</span>
          </b>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
// import Swal from "sweetalert2";
// import moment from "moment";
export default {
  props: ["username"],
  data() {
    return {
      code: "",
      isRequest: false,
      x: "",
      time: "",
      countdown: "",
      hideCode: true
    };
  },
  // watch: {
  //   username: function () {

  //   },
  // },
  created() {
    this.checkRedeemCode(); 
    // document.getElementById('intergramRoot').style.display = 'none';
  },
    
  beforeUnmount() {
    clearInterval(this.x);
  },
  methods: {

    codeproHide() {
      this.hideCode ? this.hideCode = false : this.hideCode = true
    },
    checkRedeemCode() {
      if (localStorage.getItem("code_max_timeout")!='null') {
        // console.log(localStorage.getItem("code_max_timeout"));
        clearInterval(this.x);
        this.x = setInterval(this.loadCountdown, 1000);
      }
    },
    loadCountdown() {
      let countDownDate = new Date(
        localStorage.getItem("code_max_timeout")
      ).getTime();
      let now = new Date().getTime();
      let distance = countDownDate - now;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.countdown =
        days + " วัน " + hours + " ชม " + minutes + " น " + seconds + " วิ ";
      if (distance < 0) {
        clearInterval(this.x);
        this.countdown = "";
      }
      // console.log(distance);
    },
  },
};
</script>

<style lang="scss" scoped>
.form-control {
  border: 1px solid #04c2ff;
  text-align: center;
}
.swal2-popup .swal2-modal .swal2-icon-success .swal2-show {
  height: 200px;
}
.progress {
  background-color: #464646;
}
.blink {
  animation: blinker 1s linear infinite;
  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
}

.codepro {
  background: linear-gradient(38deg, black, #6b0000);
  border: solid 1px #b90d06;
  max-width: 220px;
  padding: 0px 0px 5px 0px;
  border-radius: 0.5rem;
  position: fixed;
  z-index: 101;
  top: 5.1rem;
  right: 5px;
  > h3 {
    margin-bottom: 0;
    padding: 0px 5px;
    background-color: #b90d06;
    text-align: center;
    color: #fff;
    border-radius: 0.5rem 0.5rem 0rem 0rem;
    margin-top: 0px;
  }
}
.btn-hack {
    color: #00ff1f;
    background-color: #000000;
    border-color: #00ff1f;
}
</style>