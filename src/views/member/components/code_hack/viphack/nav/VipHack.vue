<template>
  <div>
    <div @click="hack" class="codepro">
      <img src="@/assets/code_hack/vip_hack/img/ui-card2.png" />

      <div class="timeout">
        <div class="text-center">
          <p style="color: #eee">VIP HACK SLOT</p>
          <b style="color: white; font-size:7pt">
            <span style="color: #eee">
              {{
              countdown ? "หมดอายุ " + countdown : "เปิดใช้งาน"
              }}
            </span>
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
import { useOptionStore } from "@/stores/options";

 

export default {
  setup() {
    const option = useOptionStore();
    return { 
      option,
    };
  }, 
  data() {
    return {
      code: "",
      isRequest: false,
      x: "",
      time: "",
      countdown: "",
      hideCode: true,
    };
  }, 
  // watch: {
  //   username: function () {

  //   },
  // },
  async created() {
    await this.checkRedeemCode();
  },
  beforeUnmount() {
    clearInterval(this.x);
  },
  methods: {
    hack() {
      if (this.countdown != "") {
        this.$router.push({ name: "hack.viphackslot.hackgamelist" });
      } else {
        this.$router.push({ name: "hack.viphackslot" });
      }
    },
    codeproHide() {
      this.hideCode ? (this.hideCode = false) : (this.hideCode = true);
    },
    checkRedeemCode() {
      if ( this.option.code_max_timeout != null) {
        // console.log(localStorage.getItem("code_max_timeout"));
        clearInterval(this.x);
        this.x = setInterval(this.loadCountdown, 1000);
      }
    },
    loadCountdown() {
      let countDownDate = new Date(
        this.option.code_max_timeout
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
// viphack
.codepro {
  img {
    width: 100%;
    height: 100%;
    max-width: 150px;
  }
}
// end viphack

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
  animation: animate 2s linear infinite;
  filter: drop-shadow(0 0 0.5em #60d5f5);
  position: fixed;
  z-index: 101;
  top: 5rem;
  right: 5px;
  cursor: pointer;
  .timeout {
    p {
      position: absolute;
      top: 13px;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
    }
    span {
      position: absolute;
      bottom: 8px;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
    }
  }
}
@keyframes animate {
  from {
    filter: drop-shadow(0 0 0.5em #60d5f5);
  }
  to {
    filter: drop-shadow(0 0 0.5em #025977);
  }
}
</style>
