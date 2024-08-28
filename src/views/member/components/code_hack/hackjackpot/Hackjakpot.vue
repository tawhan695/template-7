<template>
  <div> 
    <div class="container-fluid">
      <div class="d-flex justify-content-center">
        <div class="hackload">
          <div class="semi_arc e6">
            <div class="semi_arc_3 e5_1">
              <div class="semi_arc_3 e5_2">
                <div class="semi_arc_3 e5_3">
                  <div class="semi_arc_3 e5_4"></div>
                </div>
              </div>
            </div>
            <span class="percen" id="percen">{{ percen }}%</span>
            <div class="d-loader" id="cont" data-pct="100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
                class="loader"
                version="1.1"
              >
                <circle
                  :stroke="``+Color_+``"
                  :stroke-dashoffset="``+100-percen+``"
                  class="progress"
                  fill="none"
                  cx="20"
                  cy="20"
                  r="16.915494309"
                />
              </svg>
            </div>
            <div class="body-code">
              <div class="col-12 code">
                <span>{{ shuffle_str.substring(0, 18) }}</span>
              </div>
              <div class="col-12 progressbarWrapper">
                <span id="greenBar" :style="`width:` + percen + `%;background:` + Color_"></span>
              </div>
            </div>
          </div>
          <div class="timereset">
            <p>
              TIME RESET:
              <span id="time" class="text-white"></span>
            </p>
          </div>
          <div class="logo-vision-code">
            <img id="img-visioncode" src="@/assets/code_hack/hackjackpot/HACKJACKPOT.png" />
            <img id="img-visioncode2" src="@/assets/code_hack/hackjackpot/HACKJACKPOT.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <iframe :src="url_game" v-show="url_game" id="game_iframe" scrolling="yes"></iframe>
    </div>
  </div>
</template>

<script>
// var audio = new Audio('https://dunung.online/assets_user/Jarvis/sound/robot.mp3');
export default {
  props: ["url_game"],

  data() {
    return {
      percen: 20,
      loadNumber2: 0,
      Color_: "#FF2A00",
      shuffle_str: "",
      seconds: "",
      // url_game:
      //   "https://m.pgjazz.com/mask-carnival/index.html?language=th&bet_type=1&operator_token=C913702D-6F86-4B4E-90A1-D08A8A16FD66&operator_player_session=30512284-3305-4626-8465-470f149533c8&__refer=m.pgjksjk.com&__sv=0",
    };
  },
  created() {},

  mounted() {
    document.getElementById('intergramRoot').style.display = 'none';
    setInterval(() => {
      const shuffle = (str) =>
        [...str].sort(() => Math.random() - 0.5).join("");
      this.shuffle_str = shuffle(
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      );
    }, 100);

    setInterval(() => {
      var random = Math.floor(Math.random() * 90) + 10;

      this.percen = random;

      if (this.percen > 80) this.Color_ = "#1BFF00";
      else if (this.percen > 64) this.Color_ = "#9EFF00";
      else if (this.percen > 48) this.Color_ = "#FFFF00";
      else if (this.percen > 32) this.Color_ = "#FFBD00";
      else if (this.percen > 16) this.Color_ = "#FF7400";
      else this.Color_ = "#FF0000";

      // baseColor = this.Color_
    }, 4000);

    var fiveMinutes = 3,
      display = document.querySelector("#time");

    this.startTimer(fiveMinutes, display);
  },

  methods: {
    startTimer(duration, display) {
      var timer = duration,
        minutes,
        seconds;
      setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? +minutes : minutes;
        seconds = seconds < 10 ? +seconds : seconds;

        display.textContent = seconds;

        if (--timer < 0) {
          timer = duration;
          // reset();
          // audio.play();
        }
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
/* 
กำหนดธีมสี ตัวโหลด @BaseColor
*/
// $baseColor: #0bcbce;
$baseColor: #d68910;
$baseColor: #d4ac0d;
$baseColor: #1f618d;
$baseColor: #27ae60;
$baseColor: #00f7ff;

// load progress
.percen {
  position: absolute;
  font-weight: bold;
  margin-top: 10px;
  left: 42px;
}
.d-loader {
  margin-top: 7px;
  margin-left: 2px;
}
.loader {
  width: 70px;
  left: 50%;
  top: 50%;
}
.progress {
  transition: stroke-dashoffset 0.5s linear;
  stroke-width: 0.4em;
  stroke-dasharray: 100;
  border: 8px solid;
  transform-origin: center;
  transform: rotate(-90deg);
  opacity: 0.8;
}

//end
.container-fluid {
  background: linear-gradient(0deg, transparent, #000);
}
.logo-vision-code {
  margin-left: 6rem;
  #img-visioncode2 {
    margin-top: 11px;
    margin-left: 5rem;
    width: 10rem;
    position: absolute;
    top: 0;
    animation: posi 1.5s infinite;
    filter: brightness(1);
    filter: hue-sepia(100%);
  }
  #img-visioncode {
    margin-top: 11px;
    margin-left: 4.5rem;
    position: absolute;
    top: 0;
    width: 11rem;

    animation: glitch 0.6s infinite;
    filter: invert(100%);
    filter: opacity(10%);
    filter: blur(100px);
    opacity: 0.4;
  }
  @keyframes posi {
    10% {
      margin-top: 10px;
    }
    50% {
      margin-left: 4.95rem;
    }
    100% {
      margin-left: 5.01rem;
    }
  }
  @keyframes glitch {
    0% {
      filter: saturate(3);
      filter: invert(1%);
    }
    10% {
      filter: invert(10%);
    }
    20% {
      filter: invert(20%);
    }
    30% {
      filter: invert(30%);
    }
    40% {
      filter: invert(40%);
    }
    50% {
      filter: invert(50%);
    }
    60% {
      filter: invert(60%);
    }
    70% {
      filter: invert(70%);
    }
    70% {
      filter: invert(75%);
    }
  }
}
.timereset {
  position: absolute;
  color: $baseColor;
  left: 50%;
  top: 45px;
}
.body-code {
  position: absolute;
  top: 23px;
  left: 110px;
  .progressbarWrapper {
    height: 12px;
    width: 170px;
    display: block;
    margin: auto;
    border: 1px solid $baseColor;
    // opacity: 0.7;
    margin-top: -38px;
    position: relative;
    // background: #555;
    padding: 2px;
    // box-shadow: inset 0 -1px 1px rgba(255,255,255,0.3);
  }
  #greenBar {
    display: block;
    height: 100%;
    //   width:10%;
    // background: $baseColor;
    box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3),
      inset 0 -2px 6px rgba(0, 0, 0, 0.4);
    position: relative;
    overflow: hidden;
    font-size: 15px;
    text-align: center;
    // color: red;
  }
  .code {
    opacity: 0.7;
    left: -60px;
    color: $baseColor;
    font-weight: bold;
    font-size: 0.8rem;
  }
  #greenBar:hover {
    box-shadow: 0px 0px 30px $baseColor;
    transition: 0.3s;
  }
  .progressbarWrapper:hover {
    box-shadow: 0px 0px 30px $baseColor;
    transition: 0.3s;
  }
  code:hover {
    box-shadow: 0px 0px 30px $baseColor;
    transition: 0.3s;
  }
  .body-code:hover {
    box-shadow: 0px 0px 30px $baseColor;
    transition: 0.3s;
  }
}

iframe {
  width: 80%;
  height: 580px;
  @media only screen and (min-width: 580px) {
    width: 100%;
    height: 720px;
  }
}
.hackload {
  margin-left: -13rem;
}

.tag {
  margin: 2px 0 0 2px;
  width: 0;
  height: 0;
  // border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
  border-left: 110px solid #f39c12;
  // border-left: 110px solid transparent;
  border-bottom: 118px solid transparent;
  position: absolute;
  margin-left: -10px;
  // left: 0px;

  .tag-msg {
    color: #fff;
    padding-left: 10px;
    position: absolute;
    transform: rotate(-47deg);
    left: 0;
    margin-top: 20px;
    margin-left: -110px;
  }
  .tag-msg2 {
    color: #fff;
    position: absolute;
    transform: rotate(-47deg);
    left: 0;
    margin-top: 34px;
    margin-left: -104px;
  }
}
.core {
  // background: #021d2e25;
  background: $baseColor;

  width: 100px;
  height: 100px;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  border: 10px $baseColor solid;
  /* animation: flicker 0.2s infinite; */
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
}
.core11 {
  /* background: #021d2e00; */
  width: 100px;
  height: 100px;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  border: 10px $baseColor solid;
  animation: flicker 0.2s infinite;
  margin-left: auto;
  margin-right: auto;
  margin-top: 37px;
}
.core2 {
  background: #0a192236;
  width: 70px;
  height: 70px;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  border: 10px $baseColor solid;
  animation: flicker 0s infinite;
  margin-left: auto;
  margin-right: auto;
  margin-top: 21px;
  span {
    position: absolute;
    left: 40%;
    top: 5px;
  }
}

.big_core {
  background: #cedce0;
  width: 200px;
  height: 200px;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  border: 10px rgba(2, 255, 255, 0.15) solid;
  animation: big_flicker 0.2s infinite;
}

.c_ease {
  animation: colour_ease 3s infinite ease-in-out;
}

.counterspin5 {
  animation: rotate_anti 5s linear infinite;
}

.counterspin4 {
  animation: rotate_anti 4s linear infinite;
}

.semi_arc {
  width: 100px;
  height: 100px;
  border: 3px solid $baseColor;
  background: $baseColor;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  transform: rotateZ(0deg);
  transition: box-shadow 3s ease;
  text-align: center;
  line-height: 100px;
}

.semi_arc:hover {
  box-shadow: 0px 0px 30px $baseColor;
  transition: 0.3s;
}

.semi_arc_2 {
  content: "";
  position: absolute;
  width: 94%;
  height: 94%;
  left: 3%;
  top: 3%;
  border: 5px solid $baseColor;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  animation: rotate 4s linear infinite;
  text-align: center;
  line-height: 129px;
}

.semi_arc_2:after {
  content: "";
  position: absolute;
  width: 94%;
  height: 94%;
  left: 3%;
  top: 3%;
  border: 4px solid $baseColor;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  animation: rotate_anti 2s linear infinite;
}

.semi_arc_3 {
  content: "";
  position: absolute;
  width: 94%;
  height: 94%;
  left: 3%;
  top: 3%;
  border: 5px solid $baseColor;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  animation: rotate 4s linear infinite;
  text-align: center;
  line-height: 129px;
}

.arc {
  width: 100px;
  height: 100px;
  border: 6px solid #02feff;
  background: rgba(2, 254, 255, 0.2);
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  -moz-transform: rotateY(-30deg) translateZ(-200px);
  -ms-transform: rotateY(-30deg) translateZ(-200px);
  -webkit-transform: rotateY(-30deg) translateZ(-200px);
  transform: rotateY(-30deg) translateZ(-200px);
  transform: rotateZ(0deg);
  transition: box-shadow 3s ease;
  text-align: center;
  line-height: 100px;
}

.arc:hover {
  box-shadow: 0px 0px 30px $baseColor;
  transition: 0.3s;
}

.arc:after {
  content: "";
  position: absolute;
  width: 94%;
  height: 94%;
  left: 3%;
  top: 3%;
  border: 4px solid $baseColor;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  animation: rotate 4s linear infinite;
}

.e1:after {
  border-color: rgba(2, 255, 255, 0.6);
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
}

.e2:after {
  border-color: rgba(2, 255, 255, 0.6);
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid transparent;
}

.e3 {
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  animation: rotate 5s linear infinite;
}

.e3:after {
  border-color: rgba(2, 255, 255, 0.6);
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}

.e4 {
  width: 150px;
  height: 150px;
}

.e4_1 {
  border-color: rgba(2, 255, 255, 0.3);
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
}

.e4_1:after {
  border-color: rgba(2, 255, 255, 0.6);
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
}

.e5 {
  width: 200px;
  height: 200px;
}
.e55 {
  width: 30px;
  height: 30px;
}

.e5_1 {
  color: $baseColor;
  border: 2px solid;
  border-left: 2px solid transparent;
  animation: rotate 5s linear infinite;
}

.e5_2 {
  color: $baseColor;
  border: 4px solid;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  animation: rotate_anti 4s linear infinite;
}

.e5_3 {
  color: $baseColor;
  border: 2px solid;
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
  animation: rotate 3s linear infinite;
}

.e5_4 {
  color: rgba(30, 44, 44, 0.15);
  border: 4px solid;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid transparent;
  animation: rotate_anti 2s linear infinite;
}

.e6 {
  border-color: transparent;
  background: rgba(255, 255, 255, 0);
  width: 120px;
  height: 120px;
  margin-left: 3.5rem;
}
.e66 {
  border-color: transparent;
  background: rgba(255, 255, 255, 0);
  width: 180px;
  height: 180px;
}
.e6mini {
  border-color: transparent;
  background: rgba(255, 255, 255, 0);
  width: 30px;
  height: 30px;
}

@keyframes rotate {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
@keyframes rotate_anti {
  0% {
    transform: rotateZ(360deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}
@keyframes colour_ease {
  0% {
    border-color: #02feff;
  }
  50% {
    border-color: rgba(2, 254, 255, 0.5);
  }
  100% {
    border-color: #02feff;
  }
}
@keyframes flicker {
  0% {
    box-shadow: 0px 0px 16px 8px rgba(150, 255, 255, 0.5),
      inset 0px 1px 4px 2px rgba(21, 211, 233, 0.3);
  }
  40% {
    box-shadow: 0px 0px 16px 8px rgba(150, 255, 255, 0.5),
      inset 0px 1px 4px 2px rgba(21, 211, 233, 0.3);
  }
  50% {
    box-shadow: 0px 0px 16px 6px rgba(150, 255, 255, 0.5),
      inset 0px 1px 100px 2px rgba(21, 211, 233, 0.3);
  }
  60% {
    box-shadow: 0px 0px 16px 8px rgba(150, 255, 255, 0.5),
      inset 0px 1px 4px 2px rgba(21, 211, 233, 0.3);
  }
  100% {
    box-shadow: 0px 0px 16px 8px rgba(150, 255, 255, 0.5),
      inset 0px 1px 4px 2px rgba(21, 211, 233, 0.3);
  }
}
@keyframes flicker2 {
  0% {
    box-shadow: 0px 0px 60px 25px rgba(150, 255, 255, 0.5),
      inset 0px 1px 4px 2px rgba(21, 211, 233, 0.3);
  }
  40% {
    box-shadow: 0px 0px 60px 25px rgba(150, 255, 255, 0.5),
      inset 0px 1px 4px 2px rgba(21, 211, 233, 0.3);
  }
  50% {
    box-shadow: 0px 0px 50px 17px rgba(150, 255, 255, 0.5),
      inset 0px 1px 100px 2px rgba(21, 211, 233, 0.3);
  }
  60% {
    box-shadow: 0px 0px 60px 25px rgba(150, 255, 255, 0.5),
      inset 0px 1px 4px 2px rgba(21, 211, 233, 0.3);
  }
  100% {
    box-shadow: 0px 0px 60px 25px rgba(150, 255, 255, 0.5),
      inset 0px 1px 4px 2px rgba(21, 211, 233, 0.3);
  }
}
@keyframes big_flicker {
  0% {
    box-shadow: 0px 0px 40px 20px rgba(150, 255, 255, 0.5),
      inset 0px 1px 30px 15px rgba(21, 211, 233, 0.3);
  }
  40% {
    box-shadow: 0px 0px 40px 20px rgba(150, 255, 255, 0.5),
      inset 0px 1px 30px 15px rgba(21, 211, 233, 0.3);
  }
  50% {
    box-shadow: 0px 0px 35px 17px rgba(150, 255, 255, 0.5),
      inset 0px 1px 50px 40px rgba(21, 211, 233, 0.3);
  }
  60% {
    box-shadow: 0px 0px 40px 20px rgba(150, 255, 255, 0.5),
      inset 0px 1px 30px 15px rgba(21, 211, 233, 0.3);
  }
  100% {
    box-shadow: 0px 0px 40px 20px rgba(150, 255, 255, 0.5),
      inset 0px 1px 30px 15px rgba(21, 211, 233, 0.3);
  }
}
</style>
