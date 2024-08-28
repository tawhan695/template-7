<template>
  <div class="card-bonus">
    <Transition name="fade">
      <div v-show="des">
        <p @click="des = !des">
          <img class="icon" src="./img/icons8_back_to_96px.png" alt="" width="40" height="40" />
          ย้อนกลับ
        </p>
        <div class="row" style="overflow-y: auto; height: 100%">
          <div v-for="card_ in card" :key="card_" class="col-6 col-sm-4 col-lg-4 d-flex justify-content-end card-wrap">
            <img class="w-100 card-bonus-img_after" :src="card_" />
          </div>
        </div>
      </div>
    </Transition>
    <Transition name="fade">
      <div v-show="!des">
        <p class="text-center" @click="des = !des">
          รายละเอียด
          <img class="icon" src="./img/icons8_info_96px.png" width="40" height="40" />
        </p>

        <p class="text-center h4">จำนวนเพชร: {{ formatNumber(creditBonus) }} <i class="fa fa-diamond"
            aria-hidden="true"></i></p>
        <div class="row" style="position: relative;">
          <div class="col-6 d-flex justify-content-end card-wrap" @click="show_card('card1')">
            <img class="w-100 card-bonus-img card-bonus-img_after" :src="card1" id="card1" />
          </div>
          <div class="col-6 d-flex justify-content-start card-wrap" @click="show_card('card2')">
            <img class="w-100 card-bonus-img card-bonus-img_after" :src="card2" id="card2" />
          </div>
          <div class="col-6 d-flex justify-content-end card-wrap" @click="show_card('card3')">
            <img class="w-100 card-bonus-img card-bonus-img_after" :src="card3" id="card3" />
          </div>
          <div class="col-6 d-flex justify-content-start card-wrap" @click="show_card('card4')">
            <img class="w-100 card-bonus-img card-bonus-img_after" :src="card4" id="card4" />
          </div>
          <button @click="getBonus__()" class="getBonus text-center btn btn-base" v-show="getBonus">
            ปิด
          </button>
          <button @click="clearCard()" class="reset reset text-center btn btn-base" v-show="isStarted">
            เริ่มใหม่
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script>
import $ from "jquery";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
export default {
  setup() {
    return {
    };
  },
  data() {
    return {
      isStarted: false,
      creditBonus: 0,
      getresult: null,
      des: false,
      card1: null,
      card2: null,
      card3: null,
      card4: null,
      Bonus: null,
      is_show: false,
      getBonus: false,
      reward: {
        1: { card: "card-k-1000", },
        2: { card: "card-k-1", },
        3: { card: "card-k-300", },
        4: { card: "card-k-20", },
        5: { card: "card-k-100", },
        6: { card: "card-k-100", },
        7: { card: "card-p-50", },
        8: { card: "card-k-500", },
        9: { card: "card-0", },
      },
      card_back: new URL("./img/back2.png", import.meta.url).href,
      card: {
        "card-k-1": new URL("./img/credit/1-min.png", import.meta.url).href,
        "card-k-5": new URL("./img/credit/5-min.png", import.meta.url).href,
        "card-k-10": new URL("./img/credit/10-min.png", import.meta.url).href,
        "card-k-20": new URL("./img/credit/20-min.png", import.meta.url).href,
        "card-k-50": new URL("./img/credit/50-min.png", import.meta.url).href,
        "card-k-100": new URL("./img/credit/100-min.png", import.meta.url).href,
        "card-k-300": new URL("./img/credit/300-min.png", import.meta.url).href,
        "card-k-500": new URL("./img/credit/500-min.png", import.meta.url).href,
        "card-k-1000": new URL("./img/credit/1000-min.png", import.meta.url).href,
        "card-p-10": new URL("./img/point/10-min.png", import.meta.url).href,
        "card-p-20": new URL("./img/point/20-min.png", import.meta.url).href,
        "card-p-30": new URL("./img/point/30-min.png", import.meta.url).href,
        "card-p-50": new URL("./img/point/50-min.png", import.meta.url).href,
        "card-p-60": new URL("./img/point/60-min.png", import.meta.url).href,
        "card-p-70": new URL("./img/point/70-min.png", import.meta.url).href,
        "card-p-80": new URL("./img/point/80-min.png", import.meta.url).href,
        "card-p-90": new URL("./img/point/90-min.png", import.meta.url).href,
        "card-p-100": new URL("./img/point/100-min.png", import.meta.url).href,
        "card-0": new URL("./img/0-min.png", import.meta.url).href,
      },
    };
  },
  mounted() {
    this.init();
  },
  created() {
    this.card1 = this.card_back;
    this.card2 = this.card_back;
    this.card3 = this.card_back;
    this.card4 = this.card_back;
  },
  methods: {
    init() {
      const config = {
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
        errorHandle: false,
      };
      axios.get(import.meta.env.VITE_API_URL_2 + `/gamePoint/card`, config)
        .then(({ data }) => {
          if (data.isActive) {
            this.creditBonus = data.creditBonus | 0;
          } else { alert(data.message); this.$router.go(-1) }


        });
    },
    async Bonus__() {
      // id: 1, msg: 'เสียใจด้วยคุณไม่ได้รับ เคดิต
      try {
        const config = {
          headers: {
            Authorization: Cookies.get("accessToken"),
          },
        };
        const data_ = {
          action: "getresult",
          creditBonus: this.creditBonus,
        };
        const { data } = await axios.post(
          import.meta.env.VITE_API_URL_2 + "/gamePoint/card",
          data_,
          config
        );
        if (data.status == "success") {
          //console.log(data);
          return this.reward[data.data.id].card;
        } else {
          Swal.fire({
            icon: "warning",
            title: data.message,
          });
        }
      } catch (error) {
        alert(error);
        return null;
      }

    },
    getBonus__() {
      // w-100 mt-4 card-bonus-img card-bonus-img_after
      // w-100 mt-4 card-bonus-img
      $("#card1").removeClass("animationshowfont_big ");
      $("#card2").removeClass("animationshowfont_big ");
      $("#card3").removeClass("animationshowfont_big ");
      $("#card4").removeClass("animationshowfont_big ");

      // $("#card1").removeClass("animationshowfont");
      // $("#card2").removeClass("animationshowfont");
      // $("#card3").removeClass("animationshowfont");
      // $("#card4").removeClass("animationshowfont");
      $(".card-bonus-img").removeClass("filter-blur");

      this.isStarted = true;
      this.getBonus = false;
      this.is_show = false;
      this.init();
    },
    clearCard() {
      this.isStarted = false;
      this.card1 = this.card_back;
      this.card2 = this.card_back;
      this.card3 = this.card_back;
      this.card4 = this.card_back;
    },
    getRandomCard() {
      const keys = Object.keys(this.card);
      return keys[Math.floor(Math.random() * (keys.length - 1))];
    },
    async show_card(idcard) {
      if (!this.is_show) {
        this.Bonus = await this.Bonus__();
        // this.Bonus = "card-0";
        if (this.Bonus == null) return;
        this.is_show = !this.is_show;
        // //console.log('this.Bonus__()',this.Bonus);
        // //console.log(idcard);
        $("#" + idcard).addClass("animationshowfont");
        $("#" + idcard).removeClass("card-bonus-img_after");
        setTimeout(() => {
          if (idcard == "card1") {
            this.card1 = this.card[this.Bonus];
            setTimeout(() => {
              this.card2 = this.card[this.getRandomCard()];
              this.card3 = this.card[this.getRandomCard()];
              this.card4 = this.card[this.getRandomCard()];
              $("#card2").addClass("animationshowfont");
              $("#card3").addClass("animationshowfont");
              $("#card4").addClass("animationshowfont");
              setTimeout(() => {
                $("#" + idcard).addClass("animationshowfont_big ");
                $(".card-bonus-img").addClass("filter-blur");
                this.getBonus = true;
                // setTimeout(() => {
                // }, 1000);
              }, 1000);
              setTimeout(() => {
                $("#card2").addClass("animationshowfont");
              }, 1000);
            }, 1000);
          } else if (idcard == "card2") {
            this.card2 = this.card[this.Bonus];
            setTimeout(() => {
              this.card1 = this.card[this.getRandomCard()];
              this.card3 = this.card[this.getRandomCard()];
              this.card4 = this.card[this.getRandomCard()];
              $("#card1").addClass("animationshowfont");
              $("#card3").addClass("animationshowfont");
              $("#card4").addClass("animationshowfont");
              setTimeout(() => {
                $("#" + idcard).addClass("animationshowfont_big ");
                $(".card-bonus-img").addClass("filter-blur");
                setTimeout(() => {
                  this.getBonus = true;
                }, 1000);
              }, 1000);
            }, 1000);
          } else if (idcard == "card3") {
            this.card3 = this.card[this.Bonus];
            setTimeout(() => {
              this.card2 = this.card[this.getRandomCard()];
              this.card4 = this.card[this.getRandomCard()];
              this.card1 = this.card[this.getRandomCard()];
              $("#card2").addClass("animationshowfont");
              $("#card1").addClass("animationshowfont");
              $("#card4").addClass("animationshowfont");
              setTimeout(() => {
                $("#" + idcard).addClass("animationshowfont_big ");
                $(".card-bonus-img").addClass("filter-blur");
                setTimeout(() => {
                  this.getBonus = true;
                }, 1000);
              }, 1000);
            }, 1000);
          } else if (idcard == "card4") {
            this.card4 = this.card[this.Bonus];
            setTimeout(() => {
              this.card2 = this.card[this.getRandomCard()];
              this.card3 = this.card[this.getRandomCard()];
              this.card1 = this.card[this.getRandomCard()];
              $("#card2").addClass("animationshowfont");
              $("#card3").addClass("animationshowfont");
              $("#card1").addClass("animationshowfont");
              setTimeout(() => {
                $("#" + idcard).addClass("animationshowfont_big ");
                $(".card-bonus-img").addClass("filter-blur");
                setTimeout(() => {
                  this.getBonus = true;
                }, 1000);
              }, 1000);
            }, 1000);
          }
          $("#" + idcard).removeClass("animationshowfont");
        }, 200);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.card-bonus {
  margin: auto;
  margin-top: 10px;
  width: 100%;
  max-width: 520px;
  background: #00000000 !important;
  padding: 10px;

  .filter-blur {
    filter: blur(2px);
  }

  .col-6 {
    padding: 5px;
    margin: 0 !important;
  }

  .card-bonus-img {
    border-radius: 5px;
    max-width: 220px;
    transform: perspective(800px);
    transform-style: preserve-3d;
    cursor: pointer;
    transform: 4s;
    box-shadow: rgba(17, 12, 46, 0.034) 0px 48px 100px 0px;
  }

  .card-bonus-img_after {
    &:hover {
      transform: rotateY(10deg) rotateX(0deg);
    }

    &:active {
      transform: scale(0.9);
    }
  }


  .getBonus {
    height: 52px;
    width: 140px;

    position: absolute;
    left: 0;
    right: 0;
    bottom: -450px;
    top: 0;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
    margin-bottom: auto;

    border-radius: 10px;
    z-index: 9999;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  }

  .btn-base {
    color: aliceblue !important;
    border-radius: 2rem !important;
    border: #e0a953 2px solid !important;
    background: radial-gradient(circle,
        rgba(163, 26, 29, 1) 2%,
        rgba(46, 0, 0, 1) 100%);
  }

  .animationshowfont_big {
    z-index: 99;
    padding: 20px;
    position: absolute;
    animation: showbig 0.3s linear;
    display: flex;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1.8);
    filter: blur(0px);
  }

  @keyframes showbig {
    0% {
      z-index: 99;
      padding: 20px;
      position: absolute;
      display: flex;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.9);
      filter: blur(0px);
    }

    100% {
      z-index: 99;
      padding: 20px;
      position: absolute;
      display: flex;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%) scale(1.8);
      filter: blur(0px);
    }
  }
}

$hoverEasing: cubic-bezier(0.23, 1, 0.32, 1);
$returnEasing: cubic-bezier(0.445, 0.05, 0.55, 0.95);

.modal:nth-of-type(even) {
  z-index: 1062 !important;
}

.modal-backdrop.show:nth-of-type(even) {
  z-index: 1061 !important;
}

.card-bonus {
  .btn-close {
    box-sizing: content-box;
    /* width: 1em; */
    /* height: 1em; */
    /* padding: 0.25em 0.25em; */
    color: #000;
    background: transparent;
    border: 0;
    /* border-radius: 0.25rem; */
    opacity: 0.8;

    &:hover,
    :active {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  background: rgba(0, 0, 0, 0.397);

  .getBonus {
    height: 52px;
    width: 140px;

    position: absolute;
    left: 0;
    right: 0;
    bottom: -450px;
    top: 0;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
    margin-bottom: auto;

    border-radius: 10px;
    z-index: 9999;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  }

  .reset {
    height: 52px;
    width: 140px;
    position: absolute;
    // display: flex;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
    margin-bottom: auto;
    border-radius: 10px;
    z-index: 9999;
    box-shadow: #000000 0px 0px 200px 100px;

    &:hover {
      border: #e0a953 2px solid !important;
      background: radial-gradient(circle, #aa0407 2%, #490000 100%);
    }

  }
}

:root {
  --card-height: 65vh;
  --card-width: calc(65vh / 1.5);
}

@keyframes spin {
  0% {
    --rotate: 0deg;
  }

  100% {
    --rotate: 360deg;
  }
}

.animationshowfont {
  animation: showfont 0.6s;
  // transform: rotateY(90deg);
}

@keyframes showfont {
  0% {
    transform: scale(0.9);
    transform: rotateY(0deg);
  }

  100% {
    transform: scale(1);
    transform: rotateY(100deg);
  }
}

.animationshowfont2 {
  // animation: showfont2 0.6s;
  transform: rotateY(180deg);
}

@keyframes showfont2 {
  0% {
    transform: scale(0.9);
    transform: rotateY(0deg);
  }

  100% {
    transform: scale(1);
    transform: rotateY(90deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0);
}

.icon:hover {
  transform: scale(1.1);
}
</style>
