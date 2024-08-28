<template>
  <div id="hackgame" class="text-white">
    <div class="box">
      <div id="hack">
        <div class="load-4">
          <div class="ring-1" v-show="load_4"></div>
          <div id="load" v-show="load">
            <div>G</div>
            <div>N</div>
            <div>I</div>
            <div>D</div>
            <div>A</div>
            <div>O</div>
            <div>L</div>
          </div>
          <div v-show="future">
            <div class="future-text">
              <span v-show="GameFuture">FUTURE:{{ FUTURE_per }}%</span>
              <span v-show="GameNotFuture">JACTPOT:{{ jackpot_per }}%</span>
            </div>
            <div class="jackpot-text">
              <span v-show="NotdetectGame"
                >HACK JACTPOT: {{ formatPrice(jackpot_per) }}</span
              >
            </div>
          </div>
          <div v-show="turbo">
            <img
              class="turbo"
              src="@/assets/code_hack/vip_hack/img/icons8_lightning_bolt_24px_1.png"
            />
            <div class="turbo-text">
              <span>{{ isTurbo }}</span>
            </div>
          </div>
          <div v-show="bet">
            <img
              class="bet_"
              src="@/assets/code_hack/vip_hack/img/icons8_cheap_2_24px.png"
            />
            <div class="bet_text">
              <span>฿{{ ran_bet }}</span>
            </div>
          </div>
          <transition name="bounce">
            <div v-show="alert" class="alert">{{ mgs }}</div>
          </transition>
        </div>
      </div>
      <iframe :src="url" />
      <!-- <iframe src="https://static.dsslot.xyz/h5/v3/3052/?oper=520c7eb3&lang=th_th&token=eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDg4NjYzMzQsInQiOiI2MjQ3YjJmMjY2NWNjMmU0Mzg0MmRlMjEifQ.b98-Zgr9yQRp6TzDrykWPVPHHOxgkoppRwXlzQOOzrGZegFPVnK0DGHtvsLoVTatzDce_xw6RTnYO_x3FuncQg&host=https://game.dsslot.xyz/3052&lang=th_th&oper=520c7eb3" /> -->
      <!-- <iframe src="https://game-snd.fafafa3388.com/static/games/kungfumonkey/index.112.html?lang=thTH&token=eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDg4NjYyMDAsInNpdGVfaWQiOjU3NDIsImdhbWVfaWQiOjQ1LCJwbGF5ZXJfaWQiOjU0ODEyLCJhY2NvdW50X25hbWUiOiJ0c2IwMDE4NiIsInNlc3Npb25pZCI6IiJ9.YbiVyvJ_6GTz3CydZfieiRVYFGKZ7zoo9d3ZZVnO_wM&wt=sw" /> -->
      <!-- <iframe src="https://m.pg-demo.com/97/index.html?language=th&bet_type=1&operator_token=fd8e66ef36cbe310501481de441cd557&operator_player_session=073e3c3f-02df-46e2-be07-c67df7cbc846&__refer=m.pg-redirect.net" /> -->
      <!-- <iframe src="https://m.pg-demo.com/73/index.html?language=th&bet_type=1&operator_token=fd8e66ef36cbe310501481de441cd557&operator_player_session=33045bbd-a44e-4ca5-98d8-aa63b5910e5d&__refer=m.pg-redirect.net" /> -->
    </div>
  </div>
</template>

<script>

// Butterfly Blossom https://m.pgjazz.com/125 bet 1 ,2 ,3, 4 ,5,10,30,50,100,200,250,500,1000,2000
// Destiny of Sun & Moon https://m.pgjazz.com/121 bet 4 8 12 20 40 120 200 400 1000 2000
// Garuda Gems https://m.pgjazz.com/122 bet 1 ,2 ,3, 4 ,5,10,30,50,100,200,250,500,1000,2000
// Fortune Tiger https://m.pgjazz.com/126 bet 1 ,2 ,3,5,10,30,50,100,500,1000,2500,5000
// Oriental Prosperity https://m.pgjazz.com/112 bet 1 ,2 ,3, 4 ,5,10,30,,40,50,100,200,400
// Mask Carnival https://m.pgjazz.com/118/  bet 1 ,2 ,3, 4 ,5,10,30,,40,50,100,200,400
// Cocktail Nights  https://m.pgjazz.com/117/ bet 1 ,2 ,3, 4 ,5,10,30,,40,50,100,200,400 , future : 75 :max 100
// https://m.pgjazz.com/114/ bet 4,8,12,20,40,120,200,400,2000,4000
// import datajson from "@/assets/vip_hack/data_slot/data.json";
import { useConfigStore } from "@/stores/config";
import { useAuthStore } from "@/stores/auth";
import { useOptionStore } from "@/stores/options";
export default {
  setup() {
    const auth = useAuthStore();
    const config = useConfigStore();
    const option = useOptionStore();
    return {
      auth,
      config,
      option,
    };
  },
  name: "HackGame",
  data() {
    return {
      url: null,
      balance: null,
      data_Game: null,
      load: true,
      load_4: false,
      turbo: false,
      bet: false,
      future: false,
      alert: false,
      sleep_sl: 1000,
      sleep_future: 1000,
      sleep_turbo: 10000,
      isTurbo: "NO",
      turbo_NOOFF: false,
      FUTURE_per: 0,
      ran_bet: 1,
      dataGame: null,
      dataGame_: null,
      GameFuture: false,
      GameNotFuture: false,
      NotdetectGame: false,
      jackpot_per: 0,
      mgs: "",
      slot: this.option.vipgamelist,
      url_: null,
      balance_: 0,
    };
  },

  methods: {
    async getdomain(game) {
      // console.log(url);
      // let newText = url.replace("https://", "");
      // let domain = newText.split("/");
      this.dataGame = await this.findGame(game);
      // console.log(this.dataGame);
      if (this.dataGame == "undefined") {
        this.NotdetectGame = true;
      } else if (this.dataGame == "GameNotFuture") {
        this.GameNotFuture = true;
      } else if (this.dataGame == "GameFuture") {
        this.GameFuture = true;
      }
    },
    sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    },
    findGame(game) {
      // console.log(game);
      // // console.log(game[0]['productCode']);
      // console.log("game.gameId",game);
      // console.log("game.gameId",game.gameCode);
      // console.log("game.gameId",game.gameId);
      // console.log("game.productCode",game.productCode);
      // alert(game.gameId)

      if (typeof this.slot[game.productCode] == "undefined") {
        // console.log(typeof this.slot[game.productCode]);
        return "undefined";
      } else if (
        typeof this.slot[game.productCode][game.gameId] == "undefined"
      ) {
        // console.log("undefined");
        // console.log(typeof this.slot[game.productCode][game.gameId]);
        return "undefined";
      } else if (this.slot[game.productCode][game.gameId]["future"] == false) {
        this.dataGame_ = this.slot[game.productCode][game.gameId];
        return "GameNotFuture";
      } else {
        // console.log(typeof this.slot[domain][name]);
        this.dataGame_ = this.slot[game.productCode][game.gameId];
        return "GameFuture";
      }
    },

    Fbet() {
      // console.log("sleep_sl ", this.sleep_sl / 1000 + "วิ");
      //console.log(this.dataGame.bet);
      this.ran_bet = this.dataGame_.bet[Math.floor(Math.random() * 5)];
      //console.log(ran);
      if (this.balance > 50000) {
        this.ran_bet = this.dataGame_.bet[Math.floor(Math.random() * 15)];
      } else if (this.balance > 1000) {
        this.ran_bet = this.dataGame_.bet[Math.floor(Math.random() * 10)];
      } else if (this.balance > 500) {
        this.ran_bet = this.dataGame_.bet[Math.floor(Math.random() * 8)];
      } else if (this.balance < 300) {
        this.ran_bet = this.dataGame_.bet[Math.floor(Math.random() * 5)];
      }
      // $(".bet_text").text("฿" +  this.ran_bet);
      this.mgs = `แจ้งเตือน\rเปลี่ยนเงินเดิมพัน \rBET:฿` + this.ran_bet;
      this.alert = true;
    },
    async Ffuture() {
      // console.log(this.FUTURE_per);
      if (this.FUTURE_per >= 100) {
        this.mgs = `แจ้งเตือน\r ชื้อฟี้เจอร์ รางวันก้อนโตมาแล้ว\r`;
        this.alert = true;
      } else {
        let rann = Math.floor(Math.random() * this.FUTURE_per) + 20;
        if (rann >= 100) {
          this.FUTURE_per = 100;
        } else {
          this.FUTURE_per = rann;
        }
      }
    },
    Fturbo() {
      let NF = [false, true];
      this.turbo_NOOFF = NF[Math.floor(Math.random() * NF.length)];
      if (this.turbo_NOOFF == true) {
        this.isTurbo = "ON";
        this.mgs = `แจ้งเตือน\r เปิดการหมุน Turbo`;
        this.alert = true;
      } else {
        this.isTurbo = "OFF";
        this.mgs = `แจ้งเตือน\r ปิดการหมุน Turbo`;
        this.alert = true;
      }
    },
    formatPrice(value) {
      // let val = (value).replace(',')
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },

  mounted() {
    document.getElementById('intergramRoot').style.display = 'none';
    const __data = this.option.Setviphackedgames
    //     this.$store.getters.getviphackedgames;
    this.url = __data.url;
    // console.log(this.url);
    // console.log(__data);
    this.balance = __data.balance;
    this.data_Game = __data.data_Game;
    if (typeof this.url != "undefined") {
      this.url_ = this.url;
      this.balance_ = this.balance;
      // console.log(this.url);
    } else {
      this.$router.push({ name: "hackgamelist" });
    }
    this.getdomain(JSON.parse(this.data_Game)).then(async () => {
      if (this.balance != "0") {
        if (this.GameFuture == true) {
          this.isTurbo = "OFF";
          this.FUTURE_per = Math.floor(Math.random() * 15);
          // $(".future-text").text("FUTURE:" +  this.FUTURE_per + "%");
          this.ran_bet = this.dataGame_.bet[0];
          await this.sleep(10000);
          this.load = false;
          this.load_4 = true;
          this.turbo = true;
          this.bet = true;
          this.future = true;
          setInterval(async () => {
            await this.Ffuture().then(async () => {
              if (this.FUTURE_per >= 100) {
                await this.sleep(4000)
                  .then(async () => {
                    this.alert = false;
                  })
                  .then(async () => {
                    await this.sleep(8000).then(async () => {
                      this.FUTURE_per = 1;
                    });
                  });
              }
            });
          }, 10000);
          setInterval(async () => {
            await this.Fturbo();
            await this.sleep(4000).then(async () => {
              this.alert = false;
            });
          }, 30000);
          setInterval(async () => {
            await this.Fbet();
            await this.sleep(4000).then(async () => {
              this.alert = false;
            });
          }, 50000);
        } else if (this.GameNotFuture == true) {
          // console.log('GameNotFuture');
          this.isTurbo = "OFF";
          this.jackpot_per = Math.floor(Math.random() * 15);
          // $(".future-text").text("FUTURE:" +  this.FUTURE_per + "%");
          this.ran_bet = this.dataGame_.bet[0];
          await this.sleep(10000);
          this.load = false;
          this.load_4 = true;
          this.turbo = true;
          this.bet = true;
          this.future = true;
          // this.jackpot_per = true;
          setInterval(async () => {
            let rann = Math.floor(Math.random() * this.jackpot_per) + 30;
            if (rann >= 100) {
              this.jackpot_per = 100;
            } else {
              this.jackpot_per = rann;
            }
          }, 50000);
          setInterval(async () => {
            await this.Fturbo();
            await this.sleep(4000).then(async () => {
              this.alert = false;
            });
          }, 30000);
          setInterval(async () => {
            await this.Fbet();
            await this.sleep(4000).then(async () => {
              this.alert = false;
            });
          }, 50000);
        } else if (this.NotdetectGame == true) {
          // console.log('GameNotFuture');
          this.isTurbo = "OFF";
          this.jackpot_per = Math.floor(Math.random() * 1000000) + 100000;
          // $(".future-text").text("FUTURE:" +  this.FUTURE_per + "%");
          let maxjackpot = this.jackpot_per;
          await this.sleep(10000);
          this.load = false;
          this.load_4 = true;
          this.future = true;
          // this.turbo = true;
          // this.bet = true;
          // this.jackpot_per = true;
          setInterval(async () => {
            this.jackpot_per =
              Math.floor(Math.random() * (this.jackpot_per + maxjackpot / 3)) +
              100000;
          }, 5000);
          // setInterval(async () => {
          //   await this.Fturbo();
          //   await this.sleep(4000).then(async () => {
          //     this.alert = false;
          //   });
          // }, 30000);
          // setInterval(async () => {
          //   await this.Fbet();
          //   await this.sleep(4000).then(async () => {
          //     this.alert = false;
          //   });
          // }, 50000);
        }
      } else {
        alert("เครดิตไม่เพียงพอ");
      }
    });
  },
};
</script>

<style scoped>
body {
  height: 100% !important;
  color:#fff;
}
div{
  color:#fff;
}
.box-per {
  position: absolute;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  left: 51px;
  right: -73px;
  width: 286px;
  height: 20px;
  top: 26px;
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto;
  /* background: #5aa9e6; */
  column-gap: 1px;
}
.box-per div {
  /* position: absolute; */

  width: 20px;
  height: 18px;
  background: #5aa9e6;
  z-index: 999;
  /* border: #4b9cdb 2px solid; */
  border-radius: 4px 0px 4px 0px;
}
html {
  background: #212121 !important;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
.alert {
  border: #4b9cdb 2px solid;
  padding: 2px;
  border-radius: 10px;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  width: 250px;
  height: 100px;
  top: 17%;
  z-index: 1000;
  background-color: #65656548;
  transform: 2s;
  color: #fff;
  filter: drop-shadow(0 0 0.5em #88e0f8);
  font-size: 1.2rem !important;
  font-weight: 600;
  /* font-family: "Goldman", monospace; */
  text-align: center;
  pointer-events: none;
}
.bet_ {
  border: #4b9cdb 3px solid;
  padding: 2px;
  border-radius: 50%;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 173px;
  right: 0;
  top: 25px;
}
.bet_text {
  /* border:#4b9cdb 3px solid ; */
  padding: 2px;
  padding-top: 7px;
  /* border-radius: 50%; */
  position: absolute;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  left: 260px;
  right: 0;
  top: 28px;
  font-weight: 700;
}
.future-text {
  /* border:#4b9cdb 3px solid ; */
  padding: 2px;
  padding-top: 7px;
  /* border-radius: 50%; */
  position: absolute;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  left: -144px;
  right: 0;
  top: 28px;
  font-weight: 700;
}
.jackpot-text {
  /* border:#4b9cdb 3px solid ; */
  padding: 2px;
  padding-top: 7px;
  /* border-radius: 50%; */
  position: absolute;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  left: -60px;
  right: 0;
  top: 25px;
  font-weight: 700;
}
.turbo {
  border: #4b9cdb 3px solid;
  padding: 2px;
  /* padding-top: 7px; */
  border-radius: 50%;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 13px;
  right: 0;
  top: 25px;
}
.turbo-text {
  /* border:#4b9cdb 3px solid ; */
  padding: 2px;
  padding-top: 7px;
  /* border-radius: 50%; */
  position: absolute;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  left: 93px;
  right: 0;
  top: 28px;
  font-weight: 700;
}
#hackgame {
  width: 100%;
  height: 100vh;
  position: relative;
  background: #000b19 !important;
  color: #4b9cdb;
}
.box {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  /* border: #60D1F1 2px solid; */
  box-shadow: 2px 2px 2px #00000080, 10px 1px 12px #00000080,
    2px 2px 10px #00000080, 2px 2px 3px #00000080, inset 2px 2px 10px #00000080,
    inset 2px 2px 10px #00000080, inset 2px 2px 10px #00000080,
    inset 2px 2px 10px #00000080;
  filter: drop-shadow(0 0 0.5em #88e0f8);
  animation: animate 2s linear infinite;
}
@keyframes animate {
  from {
    filter: drop-shadow(0 0 0.5em #88e0f8);
  }
  to {
    filter: drop-shadow(0 0 0.5em #286ff6);
  }
}
iframe {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  height: 80%;
  width: 100%;
  max-width: 800px;
  /* max-width: 336px; */
  animation: 3s showf;
  border-radius: 10px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
iframe:-webkit-scrollbar {
  display: none;
}
@keyframes showf {
  form {
    transform: calc(0);
  }
  to {
    transform: calc(0);
  }
}
#hack {
  height: 11%;
  /* border: #4b9cdb 3px solid; */
}
.ring-1 {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: -288px;
  right: 0;
  width: 15px;
  height: 15px;
  margin: 0 auto;
  padding: 10px;
  border: 7px dashed #4b9cdb;
  border-radius: 100%;
  top: 25px;

  /* left: 0; */
}
.load-4 .ring-1 {
  animation: loadingD 1.5s 0.3s cubic-bezier(0.17, 0.37, 0.43, 0.67) infinite;
}
@keyframes loadingD {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
#load {
  position: absolute;
  width: 600px;
  height: 36px;
  /* left: 50%; */
  top: 25px;
  margin-left: -300px;
  overflow: visible;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
}

#load div {
  position: absolute;
  width: 20px;
  height: 36px;
  opacity: 0;
  font-family: Helvetica, Arial, sans-serif;
  animation: move 2s linear infinite;
  -o-animation: move 2s linear infinite;
  -moz-animation: move 2s linear infinite;
  -webkit-animation: move 2s linear infinite;
  transform: rotate(180deg);
  -o-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  color: #35c4f0;
}

#load div:nth-child(2) {
  animation-delay: 0.2s;
  -o-animation-delay: 0.2s;
  -moz-animation-delay: 0.2s;
  -webkit-animation-delay: 0.2s;
}
#load div:nth-child(3) {
  animation-delay: 0.4s;
  -o-animation-delay: 0.4s;
  -webkit-animation-delay: 0.4s;
  -webkit-animation-delay: 0.4s;
}
#load div:nth-child(4) {
  animation-delay: 0.6s;
  -o-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  -webkit-animation-delay: 0.6s;
}
#load div:nth-child(5) {
  animation-delay: 0.8s;
  -o-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  -webkit-animation-delay: 0.8s;
}
#load div:nth-child(6) {
  animation-delay: 1s;
  -o-animation-delay: 1s;
  -moz-animation-delay: 1s;
  -webkit-animation-delay: 1s;
}
#load div:nth-child(7) {
  animation-delay: 1.2s;
  -o-animation-delay: 1.2s;
  -moz-animation-delay: 1.2s;
  -webkit-animation-delay: 1.2s;
}

@keyframes move {
  0% {
    left: 0;
    opacity: 0;
  }
  35% {
    left: 41%;
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }
  65% {
    left: 59%;
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }
  100% {
    left: 100%;
    -moz-transform: rotate(-180deg);
    -webkit-transform: rotate(-180deg);
    -o-transform: rotate(-180deg);
    transform: rotate(-180deg);
    opacity: 0;
  }
}

@-moz-keyframes move {
  0% {
    left: 0;
    opacity: 0;
  }
  35% {
    left: 41%;
    -moz-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }
  65% {
    left: 59%;
    -moz-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }
  100% {
    left: 100%;
    -moz-transform: rotate(-180deg);
    transform: rotate(-180deg);
    opacity: 0;
  }
}

@-webkit-keyframes move {
  0% {
    left: 0;
    opacity: 0;
  }
  35% {
    left: 41%;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }
  65% {
    left: 59%;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }
  100% {
    left: 100%;
    -webkit-transform: rotate(-180deg);
    transform: rotate(-180deg);
    opacity: 0;
  }
}

@-o-keyframes move {
  0% {
    left: 0;
    opacity: 0;
  }
  35% {
    left: 41%;
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }
  65% {
    left: 59%;
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }
  100% {
    left: 100%;
    -o-transform: rotate(-180deg);
    transform: rotate(-180deg);
    opacity: 0;
  }
}
</style>
