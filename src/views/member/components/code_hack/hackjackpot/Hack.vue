<template>
  <div class="bg-hack">
    <img src="@/assets/code_hack/hackjackpot/V7IZvy.jpg" class="w-100 h-100" />
  </div>
  <div class="position-relative" style="z-index: 999">
    <!-- <nav-bar></nav-bar> -->
    <div class="container" v-show="step == 0">
      <form @submit.prevent="startLoading" class="col-md-6 col-lg-4 mx-auto">
        <div class="mb-3 mt-5">
          <div class="glitch-wrapper">
            <div class="glitch" data-glitch="glitch">โปร HACKJAKPOT</div>
          </div>
          <input v-model="code" type="text" class="form-control" placeholder="ใส่ CODE ที่นี่" required />
        </div>

        <select class="form-select" v-model="vendor" required>
          <option selected value disabled>เลือกค่ายเกม</option>
          <option v-for="(slot, index) in Games" :key="slot.key" :value="{ productCode: slot.productCode, index: index }"
            v-show="slot.active">
            {{ slot.productName }}
          </option>
        </select>
        <br />

        <button type="submit" class="btn btn-hack w-100 px-5">
          เริ่มเจาะระบบเกม
        </button>
      </form>
    </div>

    <div v-show="step == 1">
      <canvas class="bars-and-stuff"></canvas>
      <div class="output-console" style="color: #00ff00"></div>
    </div>
    <div v-show="gameList.length && step == 0">
      <div class="text-center my-3">
        <img src="@/assets/code_hack/hackjackpot/hacked.png" class="img-fluid" style="max-width: 200px" />
      </div>
      <div class="row mt-1 mx-1">
        <div class="col-lg-2 col-4 text-center mb-2 col-slot" v-for="game in gameList" :key="game.key"
          v-show="game.active && game.gameType === 'SLOT'">
          <a class="bg-shadow-h1 text-white game-icon" @click="games.gamelogin(game.gameLoginCode, game.productCode,game.gameName)">
            <div class="game-link">
              <div class="progress mb-2" style="height: 20px">
                <div class="progress-bar" role="progressbar"
                  :style="'width:' + game.percen + '%;background:' + game.color">
                  {{ game.percen }}%
                </div>
              </div>
              <figure class="img-game">
                <img alt :src="ASKMEBET_URL + game.imgUrl" />
              </figure>
              <div class="name-game">{{ game.gameName }}</div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <NavMobileMember/>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import NavMobileMember from "../../NavMobileMember.vue";
import { SLOT_LIST } from "@/mixins/data";
import { useOptionStore } from "@/stores/options";
import { useGamesStore } from "@/stores/games";
import { useUserStore } from "@/stores/user";

export default {
  setup() {
    const option = useOptionStore();
    const games = useGamesStore();
    const userStore = useUserStore();
    return {
      option,
      games,
      userStore
    };
  },
  data() {
    return {
      url: "",
      step: 0,
      code: "",
      vendor: "",
      gameList: [],
      SLOT_LIST,
    };
  },
  components: {
    NavMobileMember
  },
  created() {
    // document.getElementById('intergramRoot').style.display = 'none';
  },
  computed: {

    Games() {
      // active:true
      // gamesList:Array[57]
      // getGame:"/gamelist"
      // getLogin:"/ambgame2/login?"
      // logo:"https://s3.ap-southeast-1.amazonaws.com/cdn.ambbet.com/configs/providers/s/ambpoker.webp"
      // method:"GET"
      // order_product:60
      // productCode:"ambpoker"
      // productName:"AMB Poker"
      // recommended:true
      // success:0
      // type:"CARD"
      return this.games.SLOT;
    },
  },
  mounted() {
    this.init();

  },
  methods: {
    async init() {
      const user = { username: this.userStore.userProfile.users[1].username, password: this.userStore.userProfile.password };
      this.games.getGameAll(user);
      let distance =
        new Date(this.option.code_max_timeout).getTime() - new Date().getTime();
      if (distance > 0 && this.option.game_max_list) {
        this.gameList = this.option.game_max_list;
      }
    },
    async gameloginJavis(gameId, vendername) {
      Swal.fire({
        title: "รอสักครู่!",
        html: "กำลังโหลดเกม",
        timerProgressBar: true,
        didOpen: async () => {
          Swal.showLoading();
          let { data } = await this.getlink(vendername, gameId);
          if (data.status == "success") {
            let url = data.data.replace("http://", "https://");
            this.$router.push({
              name: "hackjavis",
              params: { url_game: url },
            });
            Swal.close();
          } else {
            Swal.fire(
              "ขออภัย",
              "ค่ายเกมส์กำลังปิดปรับปรุงอยู่ค่ะ", // data.error.message,
              data.status
            );
          }
        },
      });
    },
    startLoading() {
      this.step = 1;
      document.body.style.backgroundColor = "black";
      document.body.style.backgroundImage = "none";

      var canvasBars = document.querySelector(".bars-and-stuff"),
        ctxBars = canvasBars.getContext("2d"),
        outputConsole = document.querySelector(".output-console");

      outputConsole.style.height = (window.innerHeight / 3) * 2 + "px";
      outputConsole.style.top = window.innerHeight / 3 + "px";

      // Init graphics stuff
      var barVals = [];

      /* fake console stuff */
      var commandStart = [
        "Performing DNS Lookups for",
        "Searching ",
        "Analyzing ",
        "Estimating Approximate Location of ",
        "Compressing ",
        "Requesting Authorization From : ",
        "wget -a -t ",
        "tar -xzf ",
        "Entering Location ",
        "Compilation Started of ",
        "Downloading ",
      ],
        commandParts = [
          "Data Structure",
          "https://www.taipe24.com/login?hackdarkcode=100",
          "Texture",
          "TPS Reports",
          " .... Searching ... ",
          "https://taipe68.com/login?...",
          "https://m.taipebet.com/?timing=1ww",
        ],
        commandResponses = [
          "Authorizing ",
          "Authorized...",
          "Access Granted..",
          "Going Deeper....",
          "Compression Complete.",
          "Compilation of Data Structures Complete..",
          "Entering Security Console...",
          "Encryption Unsuccesful Attempting Retry...",
          "Waiting for response...",
          "....Searching...",
          "Calculating Space Requirements ",
        ],
        isProcessing = false,
        processTime = 0,
        lastProcess = 0;

      function render() {
        ctxBars.clearRect(0, 0, canvasBars.width, canvasBars.height);

        ctxBars.beginPath();
        var y = canvasBars.height / 6;
        ctxBars.moveTo(0, y);

        for (let i = 0; i < canvasBars.width; i++) {
          var ran = Math.random() * 20 - 10;
          if (Math.random() > 0.98) {
            ran = Math.random() * 50 - 25;
          }
          ctxBars.lineTo(i, y + ran);
        }

        ctxBars.stroke();

        for (let i = 0; i < canvasBars.width; i += 20) {
          if (!barVals[i]) {
            barVals[i] = {
              val: Math.random() * (canvasBars.height / 2),
              freq: 0.1,
              sineVal: Math.random() * 100,
            };
          }

          barVals[i].sineVal += barVals[i].freq;
          barVals[i].val += Math.sin((barVals[i].sineVal * Math.PI) / 2) * 5;
          ctxBars.fillRect(i + 5, canvasBars.height, 15, -barVals[i].val);
        }

        requestAnimationFrame(render);
      }

      function consoleOutput() {
        var textEl = document.createElement("p");

        if (isProcessing) {
          textEl = document.createElement("span");
          textEl.textContent += Math.random() + " ";
          if (Date.now() > lastProcess + processTime) {
            isProcessing = false;
          }
        } else {
          var commandType = ~~(Math.random() * 4);
          switch (commandType) {
            case 0:
              textEl.textContent =
                commandStart[~~(Math.random() * commandStart.length)] +
                commandParts[~~(Math.random() * commandParts.length)];
              break;
            case 3:
              isProcessing = true;
              processTime = ~~(Math.random() * 5000);
              lastProcess = Date.now();
              break;
            default:
              textEl.textContent =
                commandResponses[~~(Math.random() * commandResponses.length)];
              break;
          }
        }

        outputConsole.scrollTop = outputConsole.scrollHeight;
        outputConsole.appendChild(textEl);

        if (outputConsole.scrollHeight > window.innerHeight) {
          var removeNodes = outputConsole.querySelectorAll("*");
          for (var n = 0; n < ~~(removeNodes.length / 3); n++) {
            outputConsole.removeChild(removeNodes[n]);
          }
        }

        setTimeout(consoleOutput, ~~(Math.random() * 200));
      }

      setTimeout(function () {
        canvasBars.width = window.innerWidth;
        canvasBars.height = window.innerHeight / 3;

        outputConsole.style.height = (window.innerHeight / 3) * 2 + "px";
        outputConsole.style.top = window.innerHeight / 3 + "px";

        ctxBars.strokeStyle = ctxBars.fillStyle = "#00FF00";

        render();
        consoleOutput();
      }, 200);

      window.addEventListener("resize", function () {
        canvasBars.width = window.innerWidth;
        canvasBars.height = window.innerHeight / 3;

        outputConsole.style.height = (window.innerHeight / 3) * 2 + "px";
        outputConsole.style.top = window.innerHeight / 3 + "px";

        ctxBars.strokeStyle = ctxBars.fillStyle = "#00FF00";
      });

      let timeleft = Math.floor(Math.random() * (1 + 6 - 3)) + 3;

      let interval = setInterval(() => {
        if (timeleft <= 0) {
          clearInterval(interval);
          window.location.href =
            "/jackpothack/" +
            this.vendor.productCode +
            "/" +
            this.vendor.index +
            "/" +
            this.code;
        }
        timeleft -= 1;
      }, 1000);
    },
  },
};
</script>
<style lang="scss" scoped>
.glitch-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgba(34, 34, 34, 0);
}

.glitch {
  position: relative;
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
  color: #fff;
  letter-spacing: 5px;
  z-index: 1;
}

.glitch:before,
.glitch:after {
  display: block;
  content: 'โปร HACKJAKPOT';
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.8;
}

.glitch:before {
  animation: glitch-color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
  color: #00ff3d;
  z-index: -1;
}

.glitch:after {
  animation: glitch-color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
  color: #e8899e;
  z-index: -2;
}

@keyframes glitch-color {
  0% {
    transform: translate(0);
  }

  20% {
    transform: translate(-3px, 3px);
  }

  40% {
    transform: translate(-3px, -3px);
  }

  60% {
    transform: translate(3px, 3px);
  }

  80% {
    transform: translate(3px, -3px);
  }

  to {
    transform: translate(0);
  }
}

// html{
//   background: #000 !important;
// }
.bg-hack {
  top: -10px;
  position: fixed;
  opacity: 1;
  z-index: 10;
  width: 100%;
  height: 100%;
}

.banner {
  background-image: url("@/assets/code_hack/hackjackpot/hacked.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 100px;
  width: 100%;
  // z-index: 2;
  pointer-events: none;
}

iframe {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.btn-hack {
  background: linear-gradient(to right, #008f18, #00ec14, #008f18);
  color: #fff;

  border-color: transparent;
  background-size: 110% auto;

  &:hover {
    background-size: 150% auto;
    border-color: #ff0000;
  }
}

.game-link {
  display: block;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  text-align: center;

  &:hover img {
    transform: scale(1.05);
  }

  .img-game {
    padding-top: 100%;
    position: relative;
    border-radius: 1rem;
    overflow: hidden;
    margin-bottom: 0.4rem;
    border: 2px solid #e7e7e7;
    background-color: #2e2e2e;

    @media (max-width: 375px) {
      border-radius: 0.5rem;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      -o-object-fit: fill;
      object-fit: fill;
      transition: transform 0.2s ease;
      transform: scale(1.1);
      // background: url("../../assets/img/loading.svg") no-repeat 50%;
      background-size: 3rem auto;
      z-index: 1;
      color: transparent;
    }

    &:hover img {
      transform: scale(1.15);
    }
  }
}

input,
input:focus,
.form-select {
  background-color: #000;
  color: #00ff1f;
  border: 1px solid #00ff1f;
}

::placeholder {
  color: #00ff1f;
}

option:disabled {
  color: #00ff1f;
}

.progress {
  border: 2px solid #ffffff;
  background-color: #212529;

  .progress-bar-animated {
    animation: 1s linear infinite progress-bar-stripes reverse;
  }
}

//
// NEW
//

@font-face {
  font-family: "Source Code Pro";
  font-style: normal;
  font-weight: 400;
  src: local("Source Code Pro"), local("SourceCodePro-Regular"),
    url(https://themes.googleusercontent.com/static/fonts/sourcecodepro/v4/mrl8jkM18OlOQN8JLgasDxM0YzuT7MdOe03otPbuUS0.woff) format("woff");
}

body {
  font-family: Source Code Pro;
  background: #000;
  color: #00ff00;
  margin: 0;
  font-size: 13px;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
}

// .bars-and-stuff {
//   left: 66.6%;
// }

.output-console {
  position: fixed;
  overflow: hidden;
}

p {
  margin: 0;
}
</style>
