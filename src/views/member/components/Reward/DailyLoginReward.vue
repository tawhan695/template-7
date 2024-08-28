<template>
  <!-- Modal -->
  <!-- data-bs-backdrop="static"
    data-bs-keyboard="false" -->
  <div class="modal fade" id="ModalRewards" ref="ModalRewards" tabindex="-1" aria-labelledby="ModalRewardsLabel">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="absolute inset-0 flex flex-col justify-center items-center">
          <div class="w-full max-w-lg">
            <div class="border-none p-4">
              <div class="flex flex-col space-y-4">
                <div class="flex">
                  <div class="flex-1">
                    <h2 class="v-title">เช็คอินรับรางวัลฟรีทุกวัน</h2>
                  </div>
                </div>
                <div class="dailyreward-content">
                  <div class="rewardbox" v-for="reward in getReward" :key="reward.day"
                    :class="[reward.claim ? 'is-active' : 'rewardbox_' + reward.day]"
                    @click="clam(daily.RewardTotol === reward.day && reward.claim == false ? reward.day : false, reward)">
                    <div class="front">
                      <div class="rewardbox-text">วันที่{{ reward.day }}</div>
                      <div class="rewardbox-imagecontainer is-coin">
                        <div class="rewardbox-image">
                          <div class="dropshadow-base max-w-xs floatingimage text-center">
                            <img v-if="reward.bonustype == 'credit'" src="@/assets/rewards/credit-min.png"
                              class="img-point" />
                            <img v-else src="@/assets/rewards/coin-min.png" class="img-point" />
                          </div>

                          <div class="text-capitalize text-warning">
                            {{ reward.bonus }} <span v-html="toTextBonusType(reward.bonustype)"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="back">
                      <div class="rewardbox-text">วันที่{{ reward.day }}</div>
                      <div class="rewardbox-image">
                        <div class="dropshadow-base max-w-xs text-center">
                          <img v-if="reward.bonustype == 'credit'" src="@/assets/rewards/credit-min.png"
                            class="img-point" />
                          <img v-else src="@/assets/rewards/coin-min.png" class="img-point" />
                        </div>
                        <div class="text-capitalize text-warning">
                          {{ reward.bonus }} <span v-html="toTextBonusType(reward.bonustype)"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <br />
          <button class="btn btn-base text-center" style="max-width: 100px; border-radius: 5rem !important" type="button"
            data-bs-dismiss="modal" aria-label="Close">
            ปิด
          </button>
          <br />
          <br />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from "bootstrap";
import Cookies from "js-cookie";
import $ from "jquery";
import axios from "axios";
import { useConfigStore } from "../../../../stores/config";
import { useDailyRewardStore } from "../../../../stores/Rewards/Daily";
import { useUserStore } from "../../../../stores/user";
import Swal from "sweetalert2";
export default {
  name: "ModalRewards",
  components: {},
  setup() {
    const daily = useDailyRewardStore();
    const config = useConfigStore();
    const UserStore = useUserStore();
    return {
      daily,
      config,
      UserStore
    };
  },
  data() {
    return {
      rewards: {},
      active_el: 0,
      bonustype: ""
    };
  },
  methods: {
    Showfirst() {
      if (!this.daily.REWORDS_SHOW_FRIST) {
        // โชว์ครั้งเดียว
        setTimeout(async () => {
          await this.daily.getBonus()
          this.daily.modelRewards.show();
          this.daily.REWORDS_SHOW_FRIST = true;
        }, 2500);
      }
    },
    clam(el, reward) {
      if (el !== false) {
        axios({
          method: "post",
          url: import.meta.env.VITE_API_URL_2 + "/member/loginBonus",
          headers: {
            Authorization: Cookies.get("accessToken"),
          },
          data: {
            username: this.UserStore.users.amb.username, //รหัสลูกค้า
            dayLogin: reward.day, //วันที่จะกด login เข้ามา
            dayTotal: this.daily.RewardTotol, //จำนวน login รวม ให้บวกเพิ่มจากที่ get ไป 1
            bonustype: reward.bonustype, //"ประเภท ของโปรนัส credit,point
            bonus: reward.bonus, //จำนวนของรางวัล
          },
        }).then((response) => {
          /*----------------------------*/
          /* data response 
                message: "สำเร็จ."
                status: "success"
          /*----------------------------*/

          if (response.data.status == "success") {
            let This = this;
            $(".rewardbox_" + el).addClass("is-active");
            Swal.fire({
              title: "ยินดีด้วย!!",
              text: `คุณได้รับรางวัล ` + reward.bonus + ` ` + reward.bonustype,
              confirmButtonText: "ตกลง", customClass: {
                popup: "swall-cashback",
                confirmButton: 'btn -submit mx-1',
                cancelButton: 'btn -cancel mx-1',
              },
              preConfirm: () => {
                This.daily.modelRewards.hide();
              },
            });
            const expires = new Date().getTime() + (1 * 24 * 60 * 60 * 1000)
            Cookies.set("dailyReward", true, { expires, secure: true, sameSite: 'strict' })

          } else {
            Swal.fire({
              icon: "warning",
              title: "แจ้งเตือน!",
              text: response.data.message,
              confirmButtonText: "ตกลง",
              customClass: {
                popup: "swall-cashback",
                confirmButton: 'btn -submit mx-1',
                cancelButton: 'btn -cancel mx-1',
              }
            });
          }
        });
      }
    },

    toTextBonusType(text) {
      let html = "";
      switch (text) {
        case "diamond": html = '<i class="fa fa-diamond " aria-hidden="true"></i>';
          break;
        case "credit": html = ` ฿`;
          break;

        default: html = text;
          break;
      }
      return html;
    }
  },
  computed: {
    getReward() {
      return this.daily.Rewards ? this.daily.Rewards.listdays : [];
    },
  },

  mounted() {
    this.daily.modelRewards = new Modal(
      document.getElementById("ModalRewards")
    );
    this.Showfirst()
  },
};
</script>
<style lang="scss" scoped>
/*----------------------------*/
/* GENERAL */
/*----------------------------*/
.img-point {
  max-width: 64px;
}

.v-title {
  font-weight: 900;
  background: linear-gradient(0deg,
      rgba(224, 169, 83, 1) 0%,
      rgba(251, 212, 109, 1) 53%,
      rgba(224, 169, 83, 1) 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  --color-token: rgb(152, 117, 209);
  --color-coin: rgb(251, 192, 45);
}

.btn-base {
  background: rgb(251, 192, 45);
  color: #ffff;

  &:hover {
    background: rgb(250, 206, 95);
  }
}

.color-white {
  color: white;
}

/*----------------------------*/
/* G LOADER */
/*----------------------------*/

.text-capitalize {
  text-align-last: center;
  align-content: center;
  text-align: -webkit-center;

}

.gloader2 {
  //animation: heartbeat 1.5s ease-in-out infinite both;
  position: relative;
  -webkit-mask-image: url(https://res.cloudinary.com/gloot/image/upload/v1635235169/Marketing/202109_gloot2/Vector.svg);
  mask-image: url(https://res.cloudinary.com/gloot/image/upload/v1635235169/Marketing/202109_gloot2/Vector.svg);

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url(https://res.cloudinary.com/gloot/image/upload/v1635241683/Marketing/202109_gloot2/Vector-stroke.svg);
    background-size: cover;
    animation: loadinganimstroke 2s forwards infinite ease-in-out;
  }

  &,
  >div {
    width: 200px;
    height: 200px;
  }

  >div {
    border-radius: 100%;
    display: flex;
    transform: rotate(45deg);

    >i {
      flex: 1;

      background: linear-gradient(to bottom,
          rgba(0, 166, 251, 0) 0%,
          #7500e2 10%,
          #dca307 20%,
          #dca307 80%,
          #7500e2 90%,
          rgba(0, 166, 251, 0) 100%);
      transform: scale(1.1, 2) translate(0, 0);

      &:nth-child(odd) {
        animation: loadinganimbg_odd 2s forwards infinite linear;
      }

      &:nth-child(even) {
        animation: loadinganimbg_even 2s forwards infinite linear;
      }

      &:nth-child(1) {
        animation-delay: 0.1s;
      }

      &:nth-child(2) {
        animation-delay: 0.2s;
      }

      &:nth-child(3) {
        animation-delay: 0.3s;
      }

      &:nth-child(4) {
        animation-delay: 0.4s;
      }

      &:nth-child(5) {
        animation-delay: 0.5s;
      }

      &:nth-child(6) {
        animation-delay: 0.6s;
      }

      &:nth-child(7) {
        animation-delay: 0.7s;
      }

      &:nth-child(8) {
        animation-delay: 0.8s;
      }
    }
  }
}

@keyframes color-change-2x {
  0% {
    background-size: 1% 1%;
  }

  100% {
    background-size: 600% 600%;
  }
}

@keyframes loadinganimbg_even {
  0% {
    transform: scale(1.1, 2) translate(0, 100%);
  }

  25%,
  75% {
    transform: scale(1.1, 2) translate(0, 0);
  }

  100% {
    transform: scale(1.1, 2) translate(0, -100%);
  }
}

@keyframes loadinganimbg_odd {
  0% {
    transform: scale(1.1, 2) translate(0, -100%);
  }

  25%,
  75% {
    transform: scale(1.1, 2) translate(0, 0);
  }

  100% {
    transform: scale(1.1, 2) translate(0, 100%);
  }
}

@keyframes loadinganimstroke {

  0%,
  80%,
  100% {
    opacity: 0;
  }

  40% {
    opacity: 0.2;
  }
}

/*----------------------------*/
/* card */
/*----------------------------*/

.modal-content {
  // background: linear-gradient(270deg, #262626,#0A0A0A);
  background: radial-gradient(circle, #262626 0%, #0a0a0a 100%);
  min-height: 200px;
  width: 100%;
  // box-shadow: inset 0 0 0 1px rgb(36, 37, 61),
  //   0 1.5px 1.1px rgba(0, 0, 0, 0.034), 0 3.6px 2.5px rgba(0, 0, 0, 0.048),
  //   0 6.8px 4.8px rgba(0, 0, 0, 0.06), 0 12.1px 8.5px rgba(0, 0, 0, 0.072),
  //   0 22.6px 15.9px rgba(0, 0, 0, 0.086), 0 54px 38px rgba(0, 0, 0, 0.12);
  border-radius: 1rem;

  .card {
    background: transparent;
    border-radius: 1rem 1rem 0 0;
    border: none;
  }
}

.dailyreward-content {
  display: grid;
  grid-template-columns: auto auto auto auto;
  // grid-template-rows: 1fr 1fr;
  gap: 0.5rem;
}

/*----------------------------*/
/* REWARD BOX */
/*----------------------------*/

.rewardbox {
  cursor: pointer;
  align-items: stretch;
  position: relative;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;

  // display: flex;
  // flex: 1;
  // flex-direction: row;
  // flex-flow: wrap;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 120px));
  grid-row-gap: .5rem;
  grid-column-gap: .5rem;


  >* {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
    padding-bottom: 1rem;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 0.5rem;

    &.front {
      z-index: 20;
      position: relative;

      // background-size: auto 400%;
      // background-position: 0% 0%;
      //  background-color: #facc6b;
      // background-image: linear-gradient(315deg, #facc6b 0%, #fabc3c 74%);
      //background-color: #da3d42;
      background-color: #bf033b;
      background-image: linear-gradient(315deg, #be3338 0%, #b68a44 74%);
      //background-image: linear-gradient(315deg, #be3338 0%, #b68a44 74%);
      transition: all 0.9s cubic-bezier(0.5, 0, 0, 1) 0s;
      filter: brightness(100%) saturate(100%);
    }

    &.front:hover {
      //background-image: linear-gradient(315deg, #facc6b 0%, #fabc3c 74%);
      background-image: linear-gradient(315deg, #8f5f37 0%, #be3338 74%);
    }

    &.back {
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      background: #2e2924;
      z-index: 10;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: rotateY(180deg);
      transition: none;
      align-content: center;

      .rewardbox-text {
        opacity: 0.5;
      }
    }
  }
}

.rewardbox-xp {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: calc(-24px - 18px);
  left: 0;

  >div {
    &::before {
      content: "";
      width: 1px;
      height: 24px;
      position: absolute;
      top: -24px;
      left: calc(50% - 0.5px);

      background: linear-gradient(180deg,
          rgba(255, 222, 111, 0) 0%,
          rgba(255, 222, 111, 0.6) 100%);
    }

    display: flex;
    height: 24px;
    align-items: center;
    border-radius: 200px;
    background: rgba(26, 27, 58, 0.85);
    backdrop-filter: blur(2px);
    padding: 2px 5px;
    box-shadow: 0 0 0 1px rgba(255, 222, 111, 0.3),
    0 0 0 0 rgba(255, 222, 111, 0);
    transition: box-shadow 0.4s cubic-bezier(0.2, 0, 0.8, 1) 0.5s;
    line-height: 1;

    >span {
      font-size: 1rem;
      opacity: 0.5;
    }
  }
}

.rewardbox-imagecontainer {
  padding: 0.5rem 0.5rem 0 0.5rem;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  &.is-token {
    color: var(--color-token);
  }

  &.is-coin {
    color: var(--color-coin);
  }

  >.rewardbox-image {
    >.floatingimage+div {
      font-weight: 700;
      min-width: 24px;
    }
  }
}

.back {
  .rewardbox-xp {
    display: none;

    >div {
      height: 0;
      box-shadow: none;
      background: transparent;

      &::before {
        height: 32px;
        background: linear-gradient(180deg,
            rgba(255, 222, 111, 0) 0%,
            rgba(255, 222, 111, 0.6) 50%,
            rgba(255, 222, 111, 0) 100%);
      }
    }
  }
}

.rewardbox-image {
  position: relative;
  // display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;

  .floatingimage {
    position: relative;

    img:nth-child(1) {
      position: relative;
      z-index: 1;
    }

    img:nth-child(2) {
      position: absolute;
      z-index: 2;
      opacity: 0;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
}

.rewardbox-text {
  text-align: center;
}

* {
  &.is-active {
    z-index: 2;
    animation: flip .4s cubic-bezier(0.9, 0, 0.1, 1) both 0.3s;

    .rewardbox-xp {
      >div {
        box-shadow: 0 0 0 2px rgba(255, 222, 111, 1),
          0 0 0 10px rgba(255, 222, 111, 0.1);
      }
    }

    .floatingimage {
      >img:nth-child(2) {
        transform-origin: center;
        animation: floating-out .5s ease-out both 0.2s;
      }
    }

    .front {
      //filter: brightness(125%) saturate(105%);
      background-position: 0% 100%;
    }

    .back {
      >div {
        color: rgba(255, 255, 255, 0.2);
        animation: bounce-top 1.2s both .7s;
      }

      img {
        animation: flipping-in .4s cubic-bezier(0.9, 0, 0.1, 1) both .6s;
      }
    }
  }
}

@keyframes flip {
  0% {
    transform: rotateY(0);
  }

  100% {
    transform: rotateY(180deg);
  }
}

@keyframes floating-out {
  0% {
    transform: scale(1);
    filter: blur(0px) brightness(100%) saturate(100%);
    opacity: 0.3;
  }

  100% {
    transform: scale(3);
    filter: blur(2px) brightness(150%) saturate(200%);
    opacity: 0;
  }
}

@keyframes flipping-in {
  0% {
    transform: scale(3);
    filter: blur(1px) brightness(150%) saturate(200%);
    opacity: 0.5;
  }

  100% {
    transform: scale(1);
    filter: blur(0px) brightness(100%) saturate(100%);
    opacity: 1;
  }
}

@keyframes bounce-top {
  0% {
    transform: translateY(0);
    animation-timing-function: ease-in;
    opacity: 1;
  }

  24% {
    opacity: 1;
  }

  40% {
    transform: translateY(-24px);
    animation-timing-function: ease-in;
  }

  65% {
    transform: translateY(-12px);
    animation-timing-function: ease-in;
  }

  82% {
    transform: translateY(-6px);
    animation-timing-function: ease-in;
  }

  93% {
    transform: translateY(-4px);
    animation-timing-function: ease-in;
  }

  25%,
  55%,
  75%,
  87% {
    transform: translateY(0px);
    animation-timing-function: ease-out;
  }

  100% {
    transform: translateY(0px);
    animation-timing-function: ease-out;
    opacity: 1;
  }
}

/*----------------------------*/
/* BUTTON */
/*----------------------------*/
.button {
  font-family: "Roboto Condensed", sans-serif;
  text-transform: uppercase;
  outline: none;
  font-weight: 700;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  display: inline-flex;
  background-size: 200% auto;
  background-image: linear-gradient(to right,
      #00a6fb 0%,
      #00fddc 50%,
      #00a6fb 100%);
  background-position: left center;
  transition: all 0.4s ease-out;
  border-radius: 0.5rem;
  padding: 0.8rem 1.2rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.1),
    inset 0 -4px 2px -1px rgba(0, 0, 0, 0.15),
    0 0.5px 0.6px rgba(0, 0, 0, 0.039), 0 1.1px 1.3px rgba(0, 0, 0, 0.057),
    0 2.1px 2.5px rgba(0, 0, 0, 0.07), 0 3.8px 4.5px rgba(0, 0, 0, 0.083),
    0 7.1px 8.4px rgba(0, 0, 0, 0.101), 0 17px 20px rgba(0, 0, 0, 0.14);

  &:hover {
    background-position: right center;
    box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.3),
      inset 0 -4px 2px -1px rgba(0, 0, 0, 0.15),
      0 0.1px 0.2px rgba(0, 0, 0, 0.039), 0 0.3px 0.4px rgba(0, 0, 0, 0.057),
      0 0.5px 0.8px rgba(0, 0, 0, 0.07), 0 0.9px 1.3px rgba(0, 0, 0, 0.083),
      0 1.7px 2.5px rgba(0, 0, 0, 0.101), 0 4px 6px rgba(0, 0, 0, 0.14);
  }

  >span {
    color: #06070a;
  }

  &.is-inverted {
    background: transparent;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5);

    >span {
      color: white;
    }

    &:hover {
      box-shadow: inset 0 0 0 3px rgba(255, 255, 255, 1);
    }
  }

  &.is-glowing {
    position: relative;

    box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.1),
      inset 0 -4px 2px -1px rgba(0, 0, 0, 0.15),
      0 0 0 0 rgba(255, 255, 255, 0.1), 0 0 0 0 rgba(255, 255, 255, 0.15),
      0 0 0 0 rgba(255, 255, 255, 0.2), 0 0 0 0 rgba(255, 255, 255, 0.3),
      0 0.5px 0.6px rgba(0, 0, 0, 0.039), 0 1.1px 1.3px rgba(0, 0, 0, 0.057),
      0 2.1px 2.5px rgba(0, 0, 0, 0.07), 0 3.8px 4.5px rgba(0, 0, 0, 0.083),
      0 7.1px 8.4px rgba(0, 0, 0, 0.101), 0 17px 20px rgba(0, 0, 0, 0.14);

    &:hover {
      box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.3),
        inset 0 -4px 2px -1px rgba(0, 0, 0, 0.15),
        0 0 30px 0 rgba(255, 255, 255, 0.1),
        0 0 25px 0 rgba(255, 255, 255, 0.15),
        0 0 10px 0 rgba(255, 255, 255, 0.2),
        0 0 3.33px 0 rgba(255, 255, 255, 0.3),
        0 0.1px 0.2px rgba(0, 0, 0, 0.039), 0 0.3px 0.4px rgba(0, 0, 0, 0.057),
        0 0.5px 0.8px rgba(0, 0, 0, 0.07), 0 0.9px 1.3px rgba(0, 0, 0, 0.083),
        0 1.7px 2.5px rgba(0, 0, 0, 0.101), 0 4px 6px rgba(0, 0, 0, 0.14);

      >i {
        opacity: 1;
        animation: particlescontainer 0.5s ease-in infinite both;

        &::after {
          opacity: 1;
          animation: particles 0.5s ease-in infinite both;
        }
      }
    }

    >i {
      opacity: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 2;
      transition: all 0.2s ease;

      &::after {
        transition: all 0.2s ease;
        opacity: 0;
        content: "";
        display: block;
        width: 3px;
        height: 3px;
        border-radius: 100%;
        background: white;
        filter: blur(0.75px);
      }

      &:nth-of-type(1) {
        left: calc(50% + 21%);
        top: calc(50% - 14%);

        &,
        &::after {
          animation-delay: 0.75s;
          animation-duration: 1.7s;
        }

        &::after {
          transform: scale(1.4);
        }
      }

      &:nth-of-type(2) {
        left: calc(50% + 13%);
        top: calc(50% - 15%);

        &,
        &::after {
          animation-delay: 0.6s;
          animation-duration: 0.7s;
        }
      }

      &:nth-of-type(3) {
        left: calc(50% - 1%);
        top: calc(50% - 10%);

        &,
        &::after {
          animation-delay: 0.8s;
          animation-duration: 0.8s;
        }
      }

      &:nth-of-type(4) {
        left: calc(50% - 17%);
        top: calc(50% - 12%);

        &,
        &::after {
          animation-delay: 0.15s;
          animation-duration: 1.6s;
        }
      }

      &:nth-of-type(5) {
        left: calc(50% - 29%);
        top: calc(50% - 9%);

        &,
        &::after {
          animation-delay: 0.3s;
          animation-duration: 1.6s;
        }

        &::after {
          transform: scale(0.75);
        }
      }

      &:nth-of-type(6) {
        left: calc(50% + 17%);
        top: calc(50% - 8%);

        &,
        &::after {
          animation-delay: 0.6s;
          animation-duration: 1.1s;
        }

        &::after {
          transform: scale(1.3);
        }
      }

      &:nth-of-type(7) {
        left: calc(50% - 42%);
        top: calc(50% + 11%);

        &,
        &::after {
          animation-delay: 0.7s;
          animation-duration: 1.15s;
        }

        &::after {
          transform: scale(1.2);
        }
      }

      &:nth-of-type(8) {
        left: calc(50% + 44%);
        top: calc(50% + 40%);

        &,
        &::after {
          animation-delay: 0.55s;
          animation-duration: 1.74s;
        }

        &::after {
          transform: scale(0.65);
        }
      }
    }
  }
}

@keyframes particlescontainer {
  0% {
    transform: translateY(-20px) scaleY(1) scaleX(1);
  }

  100% {
    transform: translateY(-120px) scaleY(1.5) scaleX(0.75);
  }
}

@keyframes particles {

  0%,
  100% {
    opacity: 0;
    filter: blur(0.5px);
  }

  50% {
    opacity: 0.24;
    filter: blur(1px);
  }
}

@keyframes glow {

  0%,
  100% {
    opacity: 0.25;
  }

  50% {
    opacity: 0.45;
  }
}

/*----------------------------*/
/* DROPSHADOWS */
/*----------------------------*/

.dropshadow-base {
  filter: drop-shadow(0px 15px 18.5px rgba(0, 0, 0, 0.2)) drop-shadow(0px 6.26664px 7.72886px rgba(0, 0, 0, 0.143771)) drop-shadow(0px 3.35045px 4.13222px rgba(0, 0, 0, 0.119221)) drop-shadow(0px 1.87823px 2.31649px rgba(0, 0, 0, 0.1)) drop-shadow(0px 0.997515px 1.23027px rgba(0, 0, 0, 0.0807786)) drop-shadow(0px 0.415088px 0.511942px rgba(0, 0, 0, 0.0562291));
}

.dropshadow-xl {
  filter: drop-shadow(0px 60px 74px rgba(0, 0, 0, 0.2)) drop-shadow(0px 25.0666px 30.9154px rgba(0, 0, 0, 0.143771)) drop-shadow(0px 13.4018px 16.5289px rgba(0, 0, 0, 0.119221)) drop-shadow(0px 7.51293px 9.26595px rgba(0, 0, 0, 0.1)) drop-shadow(0px 3.99006px 4.92108px rgba(0, 0, 0, 0.0807786)) drop-shadow(0px 1.66035px 2.04777px rgba(0, 0, 0, 0.0562291));
}

.dropshadow-md {
  filter: drop-shadow(0px 15px 18.5px rgba(0, 0, 0, 0.2)) drop-shadow(0px 6.26664px 7.72886px rgba(0, 0, 0, 0.143771)) drop-shadow(0px 3.35045px 4.13222px rgba(0, 0, 0, 0.119221)) drop-shadow(0px 1.87823px 2.31649px rgba(0, 0, 0, 0.1)) drop-shadow(0px 0.997515px 1.23027px rgba(0, 0, 0, 0.0807786)) drop-shadow(0px 0.415088px 0.511942px rgba(0, 0, 0, 0.0562291));
}

.dropshadow-xs {
  filter: drop-shadow(0px 7.5px 9.25px rgba(0, 0, 0, 0.2)) drop-shadow(0px 3.13332px 3.86443px rgba(0, 0, 0, 0.143771)) drop-shadow(0px 1.67522px 2.06611px rgba(0, 0, 0, 0.119221)) drop-shadow(0px 0.939116px 1.15824px rgba(0, 0, 0, 0.1)) drop-shadow(0px 0.498758px 0.615134px rgba(0, 0, 0, 0.0807786)) drop-shadow(0px 0.207544px 0.255971px rgba(0, 0, 0, 0.0562291));
}
</style>
