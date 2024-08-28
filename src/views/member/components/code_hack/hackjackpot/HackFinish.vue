<template>
  <div class="bg-hack">
    <img src="@/assets/code_hack/hackjackpot/V7IZvy.jpg" class="w-100 h-100" />
  </div>
  <div class="position-relative" style="z-index: 999">
    <!-- <nav-bar></nav-bar> -->
    <br />
    <br />
    <br />
    <div class="container mt-5">
      <div class="row mt-1 mx-1">
        <div class="text-center my-3" v-show="isRequest">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div class="text-center my-3" v-show="!isRequest">
          <img src="@/assets/code_hack/hackjackpot/hacked.png" class="img-fluid" style="max-width: 200px" />
        </div>
        <div class="col-lg-2 col-4 text-center mb-2 col-slot" v-for="game in Games" :key="game.key"
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
    <NavMobileMember />
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import NavMobileMember from "../../NavMobileMember.vue";
import { useConfigStore } from "@/stores/config";
import { useAuthStore } from "@/stores/auth";
import { useOptionStore } from "@/stores/options";
import { useGamesStore } from "@/stores/games";
import { useUserStore } from "@/stores/user";
export default {
  setup() {
    const auth = useAuthStore();
    const config = useConfigStore();
    const option = useOptionStore();
    const games = useGamesStore();
    const userStore = useUserStore();
    return {
      auth,
      config,
      option,
      games,
      userStore,
    };
  },
  data() {
    return {
      usersData: {
        deposit: { bank: {}, wallet: {} },
      },
      isRequest: false,
      gameList: [],
      code: "",
      vendor: "",
      ifgmae: false,
    };
  },
  components: {
    NavMobileMember
  },
  async created() {
    
    this.code = this.$route.params.code;
    this.vendor = this.$route.params.vendor;
    this.isRequest = true;
    let distance =
      new Date(this.option.code_max_timeout).getTime() - new Date().getTime();
    if (distance > 0 && this.option.game_max_list && !this.code) {
      this.gameList = this.option.game_max_list;
    } else await this.post();

    this.isRequest = false;
    this.games.getGameAll();
  },
  computed: {
    Games() {
      try {
        let game = this.games.SLOT[this.$route.params.index].gamesList.map(
          (v) => {
            let datagame = v;
            let percen = Math.floor(Math.random() * (100 - 50)) + 50;
            datagame.percen = percen;
            let color = "red";
            if (percen > 80) color = "#2AFF00";
            else if (percen > 75) color = "#9BFF00";
            else if (percen > 70) color = "#F0FF00";
            else if (percen > 60) color = "#FFC500";
            else color = "#FF2A00";
            datagame.color = color;
            datagame.vendor = this.vendor;
            return datagame;
          }
        );
        this.setOptionGameMaxList(game)
        return game;
      } catch (error) {
        return [];
      }
    },
  },
  methods: {
    setOptionGameMaxList(game) {
      this.option.game_max_list = game;
    },
    /*
    async gameloginJavis(gameId, vendername) {
      Swal.fire({
        title: "รอสักครู่!",
        html: "กำลังโหลดเกม",
        timerProgressBar: true,
        didOpen: async () => {
          Swal.showLoading();
          let { data } = await this.games.getlink(vendername, gameId);

          if (data.status == "success") {
            // window.location.href = (data.data)
            // console.log(data.data);
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
    */
    async post() {
      let formData = new FormData();
      formData.append("code", this.code + "".trim().replace(" ", ""));
      formData.append("type", "visioncode");
      formData.append(
        "user",
        this.userStore.userProfile.phoneNo +
        " : " +
        this.userStore.users.amb.username
      );

      await axios
        .post(import.meta.env.VITE_CODEHACK_API + "/api/vip", formData, {
          headers: { "x-api-key": import.meta.env.VITE_CODEHACK_KEY },
        })
        .then(async ({ data }) => {
          if (data.status == "success") {
            this.option.code_max_timeout = data.timeout;
            this.option.game_max_listthis = this.gameList;
            Swal.fire({
              title: "JACKPOT HACKED",
              html:
                data.message +
                moment(this.option.code_max_timeout)
                  .locale("th")
                  .format("H:mmน. Do MMM YYYY"),
              icon: data.status,
            }).then(() => {
              this.ifgmae = true;
            });
            $(".progress-bar.progress-bar-animated").animate({ width: "100%" }, 1500);
            this.loadCountdown();
          } else
            Swal.fire({
              title: "" + data.status,
              html: data.message,
              icon: data.status,
            }).then(() => {
              this.$router.push("/jackpothack");
            });
        })
        .catch(function (error) {
          Swal.fire({
            title: "" + error.name,
            text: error.message,
            icon: "error",
          }).then(() => {
            window.location.href = "/jackpothack";
          });
        })
        .finally(() => {
          // this.checkRedeemCode();
        });
    },
    loadCountdown() {
      let countDownDate = new Date(this.option.code_max_timeout).getTime();
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
    checkRedeemCode() {
      if (this.option.code_max_timeout != null) {
        clearInterval(this.x);
        this.x = setInterval(this.loadCountdown, 1000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-hack {
  top: -10px;
  position: fixed;
  opacity: 1;
  z-index: 10;
  width: 100%;
  height: 100%;
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

.progress-bar-animated {
  animation: 1s linear infinite progress-bar-stripes reverse;
}

.progress {
  border: 2px solid #fff;
  background-color: #212529;
}
</style>
