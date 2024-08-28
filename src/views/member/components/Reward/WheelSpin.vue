<template>
  <div>
    <div class="row justify-content-center">
      <div class="text-center my-3" v-show="isRequest">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div class="">
        <h3 class="my-4 text-center" v-show="!isRequest">
          จำนวนเพชร: {{ formatNumber(UserStore.userProfile.diamond) }} <i class="fa fa-diamond" aria-hidden="true"></i>
        </h3>

        <div class="the_wheel" v-show="!isRequest">
          <img class="wheel_out" alt="หมุนโชควงล้อ" src="@/assets/spin2/cover-min.png" />
          <!-- <img class="wheel_logo" alt="หมุนโชควงล้อ" src="../../../assets/img/winwhell//spin/wheel_logo.png"> -->
          <!-- <canvas id="canvas" width="500" height="500" data-responsiveminwidth="260" data-responsivescaleheight="true" data-responsivemargin="0"> -->
          <canvas id="canvas" width="540" height="540" data-responsiveminwidth="260" data-responsivescaleheight="true"
            data-responsivemargin="0" :class="animateWheel ? 'animate' : ''">
            <p style="color: white" align="center">
              Sorry, your browser doesn't support canvas. Please try Google
              Chrome.
            </p>
          </canvas>

          <div class="text-center btn_spinn mt-4" v-show="!isRequest">
            <div v-if="isRequestGetResult" class="text-center my-3">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <button v-else class="btn -submit px-4" @click="SendSpin()">
              หมุนวงล้อ
            </button>
          </div>
        </div>

      </div>


    </div>
    <br />
    <br />

  </div>
</template>

<script>
import * as Winwheel from "vue-winwheel/Winwheel";
import { useSpinStore } from "@/stores/rewards/spin";
import Swal from "sweetalert2";
import { Howl } from 'howler';
// import audio from "@/assets/sound/tick.mp3";
// import audio1 from "@/assets/sound/magic.mp3";
import img from "@/assets/spin2/content-min.png";
import { useUserStore } from "@/stores/user";
export default {
  setup() {
    const spin = useSpinStore();
    const UserStore = useUserStore();

    // sound
    const audioSfx = new Howl({ src: [new URL("@/assets/sound/tick.mp3", import.meta.url).href] })
    const audioSfx2 = new Howl({ src: [new URL("@/assets/sound/magic.mp3", import.meta.url).href] })
    return {
      spin,
      audioSfx,
      audioSfx2,
      UserStore,
    };
  },
  data() {
    return {
      animateWheel: true,
      OnFinish: false,
      img,
      creditBonus: 0,
      isRequest: false,
      isRequestGetResult: false,
      loadingPrize: false,
      theWheel: null,
      // modalPrize: false,
      wheelPower: 5,
      wheelSpinning: false,
      prizeName: "",
      segments: [],
      WinWheelOptions: {
        drawMode: "image",
        animation: {
          type: "spinToStop",
          duration: 4,
          callbackFinished: this.onFinishSpin,
          spins: this.wheelPower,
          callbackSound: this.playSound,
          soundTrigger: "segment",
        },
        responsive: true,
      },
      creditSpin: 10,
    };
  },
  created() {
    this.Start();
  },
  methods: {
    async Start() {
      this.isRequest = true;
      await this.spin.getSpinStart().then((data) => {
        if (this.spin.spinActive) {
          this.segments = data;
          this.resetWheel();
          this.creditBonus = this.UserStore.userProfile.diamond;
          this.isRequest = false;
        } else  { alert("วงล้อไม่พร้อมใช้งาน"); this.$router.go(-1)}
      });
    },
    async SendSpin() {
      if (!this.wheelSpinning) {
        this.OnFinish = true;
        this.isRequestGetResult = true;
        let fixedID = await this.spin.setSpinStart();
        if (fixedID) this.startSpin(fixedID);
        this.isRequestGetResult = false;
      }
    },
    async startSpin(id) {
      this.animateWheel = false;
      this.audioSfx.play();
      if (this.creditSpin > 0) {
        if (this.wheelSpinning === false) {
          this.creditSpin--;
          // console.log(this.creditSpin);
          this.resetWheel();
          this.wheelSpinning = true;
          let prizeNumber = id | null;
          let stopAt =
            (360 / this.segments.length) * prizeNumber -
            360 / this.segments.length / 2; // center pin
          this.theWheel.animation.stopAngle = stopAt;
          this.theWheel.startAnimation();
        }
      } else console.log("credit = 0");
    },
    resetWheel() {
      this.theWheel = new Winwheel.Winwheel({
        ...this.WinWheelOptions,
        numSegments: this.segments.length,
        segments: this.segments,
      });

      // Create new image object in memory.
      let loadedImg = new Image();

      this.wheelSpinning ? this.theWheel.stopAnimation(false) : "";

      this.theWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.

      // Create callback to execute once the image has finished loading.
      loadedImg.src = this.img;

      let theWheel = this.theWheel;
      loadedImg.onload = function () {
        theWheel.wheelImage = loadedImg; // Make wheelImage equal the loaded image object.
        theWheel.draw(); // Also call draw function to render the wheel.
      };

      this.wheelSpinning = false; // Reset to false to power buttons and spin can be clicked again.
    },
    async onFinishSpin(indicatedSegment) {
      if (this.OnFinish) {
        this.wheelSpinning = false;
        this.prizeName = indicatedSegment.text;
        this.audioSfx2.play();
        Swal.fire({
          title: "ยินดีด้วย!!",
          text: `${this.spin.messageSuccess}`,
          confirmButtonText: "ตกลง",
          customClass:{
            popup: "swall-cashback",
            confirmButton: 'btn -submit mx-1',
            cancelButton: 'btn -cancel mx-1',
          }
        }).then(() => {
          this.OnFinish = false;
          this.spin.getSpinStart().then((data) => {
            if (this.spin.spinActive) {
              this.segments = data;
              this.resetWheel();
              this.creditBonus = this.UserStore.userProfile.diamond;
              this.isRequest = false;
            } else { alert("วงล้อไม่พร้อมใช้งาน"); this.$router.go(-1)}
          });

          setTimeout(() => {
            this.animateWheel = true;
          }, 5000);
        });

      }
    },
  },
};
</script>

<style lang="scss" scoped>
.the_wheel {
  position: relative;
  z-index: 9;
  width: 100%;
  max-width: 500px;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
}


#canvas {
  width: 100%;
  max-width: -webkit-fill-available;
  position: relative;
  margin-top: 4%;
}

.animate {
  animation: 50s linear infinite circlerotate;
}

.wheel_out {
  width: 100%;
  position: absolute;
  z-index: 9;
  left: 0;
  padding-top: -3rem;
}

.wheel_logo {
  width: 100%;
  position: absolute;
  z-index: 9;
  left: 0;
  top: 0;
}

@keyframes circlerotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }


}
</style>
