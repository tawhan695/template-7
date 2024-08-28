<template>
  <div class="member">
    <div class="container mt-0 pt-2">
      <!-- <div class="row text-center mb-1 d-lg-none d-flex">
        <div class="col-6 text-end"><a href="https://t.me/+uo7ocoq1azA1OWY9"><img src="@/assets/img/member2/ic-menu/ic-telegram.png" width="48" alt=""></a></div>
        <div class="col-6 text-start"> <a :href="option.Line.url"><img src="@/assets/img/member2/ic-menu/ic-line.png" width="48" alt=""></a></div>
      </div> -->

      <div class="d-lg-none d-flex mx-auto mb-3" style="max-width: 480px;">
        <a href="#" class="block-pv col-6">
          แต้ม PV {{ formatNumber(userStore.userProfile.pivilate, 0) }}
        </a>
        <router-link to="/member/reward" class="block-diamond col-6">
          {{ formatNumber(userStore.userProfile.diamond, 0) }}
          <img src="@/assets/img/member2/ic-menu/diamond.png" width="32" alt="">
        </router-link>
      </div>

      <CodeReward />


      <Splide :options="splideOption_body" @splide:active="onSplideActive" ref="splidebody">
        <SplideSlide :name="'amb'" class="splide-body">

          <div class="">
            <div class="card card-amb text-dark">
              <div class="username text-end" v-if="userStore.users.amb">

                <span class="ic-profile"> <i class="fa fa-suitcase" aria-hidden="true"></i> BAG I</span>


                <h5 class="fw-bold mb-0 pb-0">
                  {{ userStore.users.amb.username || '..' }}
                </h5>
                <span class="m-0 p-0 text-phoneNo">
                  {{ userStore.userProfile.phoneNo || '..' }}
                </span>
              </div>

              <br><br>
              <div class="box-credit text-end">
                <span class="credit" v-if="userStore.users.ufa">
                  <span>{{ toCurrency(userStore.users.amb.credit + userStore.userProfile.mygameCredit || 0) }}</span>
                  <span class="thb p-0 m-0">THB</span>
                </span>
              </div>

              <div class="">
                <router-link to="/member/reward" class="pt-1 text-daimond text-dark">
                  {{ formatNumber(userStore.userProfile.diamond) }}
                  : <i class="fa fa-diamond" aria-hidden="true"></i>
                </router-link>
              </div>

              <span class="text-start pt-1 text-status">สถาณะลูกค้า
                <span class="badge bg-dark text-gold" v-bind:class="userStatus(userStore.userProfile.role).class">
                  {{ userStatus(userStore.userProfile.role).text }}
                </span></span>
            </div>
          </div>

          <div class="block-content px-3 mt-3  mb-4">
            <div class="border border-secondary py-2 px-3 mb-2 rounded-5">
              <span class="text-start"> คืนยอดเสีย &nbsp;{{ returnLose }}฿ </span>
              <router-link to="/member/invite-mlm" class="float-end">คอมมิชชั่น {{ formatNumber(turnOver) }}฿
              </router-link>
            </div>

            <!-- <div class="card bg-transparent border border-secondary rounded-4">
              <div class="card-body bg-transparency">
                <div class="row">
                  <div class="col-6 text-center">
                    <div class="mb-2">
                      <input type="text" id="suggest" class="form-control" v-model="invite_link" readonly>
                    </div>
                    <button class="btn btn-secondary btn-sm w-100" @click="copy('suggest')">คัดลอกลิ้ง</button>

                  </div>
                  <div class="col-6">
                    <div class="border border-secondary mb-2 rounded-3 h-100 text-center ">
                      <router-link to="/member/deposit">
                        <h3>
                          {{ toCurrency(userStore.users.amb.credit + userStore.userProfile.mygameCredit || 0) }}
                        </h3>
                        <img src="../../assets/img/member2/ic-menu/money.png" alt="" width="42" class="">
                      </router-link>
                    </div>
                  </div>
                </div>
                <div class="border border-secondary py-2 px-3 mb-2 rounded-5 mt-3">
                  <span class="text-start">คืนยอดเสีย 10฿ </span>
                  <router-link to="/member/invite-mlm" class="float-end">คอมมิชชั่น 10฿ </router-link>
                </div>
              </div>
            </div> -->

          </div>


          <MenuAmb />
        </SplideSlide>


        <!-- <SplideSlide :name="'ufa'" class="splide-body">

          <div class="row">
            <div class="col pt-4">
              <div class="block-circle mx-auto">
                <p>ยอดเงินที่ใช้ได้</p>
                <h2 v-if="userStore.users.ufa" class="h2">
                  {{ toCurrency(userStore.users.ufa.credit ?? 0) }}
                </h2>
                <p>
                  สถาณะลูกค้า
                  <span class="badge" v-bind:class="userStatus(userStore.userProfile.role).class">
                    {{ userStatus(userStore.userProfile.role).text }}
                  </span>
                </p>
                <div class="block-icon setting-icon">
                  <router-link to="/member/setting">
                    <div class="block-img">
                      <img src="../../assets/img/ic_new/ic_setting.png" class="img-fluid" alt="" />
                    </div>
                  </router-link>
                </div>
              </div>
              <div class="text-center mt-2">
                <small class="text-center" style="color: #ffffff82">
                  ข้อมูล ณ เวลา {{ time }}
                </small>
              </div>
            </div>
          </div>
          <MenuUfa />
        </SplideSlide> -->
      </Splide>


    </div>
  </div>

  <!-- Modal -->
  <!-- <div class="modal fade" id="selectProfile" tabindex="-1" aria-labelledby="selectProfileLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-3" id="selectProfileLabel">สลับบัญชี</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="list-group">
            <a @click="setUserGame(key)" v-for="(user, key) in userStore.users" :key="user.key" class="list-group-item list-group-item-action"
              :class="user.active ? 'active' : ''">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1 text-uppercase">{{ key }}</h5>
                <i v-if="user.active" class="fa fa-check" aria-hidden="true"></i>
              </div>
              <p class="mb-1">{{ user.username }}</p>
              <small>{{ userStore.userProfile.name + ' ' + userStore.userProfile.lastname }}</small>
            </a>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
        </div>
      </div>
    </div>
  </div> -->

  <!-- code hack  -->
  <app-vip-hack v-if="config.VipHackSlot &&
    option.VIP_Hack_Slot &&
    $route.name != 'hack.viphackedgames' &&
    $route.name != 'hack.viphackslot' &&
    $route.name != 'hack.viphackslot.hackgamelist' &&
    $route.name != 'hack.viphackslot.hackedgames'" />

  <hack-percen v-if="config.fixed_percen && option.fixed_percen" />

  <app-hack-jackpot v-if="config.HackJackpot &&
    option.Hackjackpot &&
    this.$route.name != 'hack.hack-javis' &&
    this.$route.name != 'hack.hackedjavis' &&
    this.$route.name != 'hack.hackjavis'" />

  <!-- code hack end -->

  <!-- code9near -->
  <code9near v-if="config.Hack9nearSlot && option.Hack_9near_Slot" />
  <!-- code9near end -->

  <ModalPromotions show_in="member"></ModalPromotions>
  <Cashback></Cashback>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import Cookies from 'js-cookie'
import '@splidejs/vue-splide/css'
import '../../assets/scss/splidejs-theme.scss'

// import '@splidejs/vue-splide/css/skyblue';

import { useUserStore } from '../../stores/user'
import { useSocketIO } from '../../socket'
// import { Howl } from 'howler';
import { Toast } from "../../plugins/SweetAlert";

// code hack
import VipHackVue from "./components/code_hack/viphack/nav/VipHack.vue";
import hackpercen from "./components/code_hack/codeChangePercen/Percen.vue";
import Hackjackpot from "./components/code_hack/hackjackpot/Hackjackpot.vue";
import MenuAmb from "./components/menu/Menu-amb-2.vue";
// import MenuUfa from "./components/menu/Menu-ufa.vue"
import { useConfigStore } from "@/stores/config";
import { useOptionStore } from "@/stores/options";
import { useDailyRewardStore } from "../../stores/Rewards/Daily";
import code9near from './components/code_hack/9near/menu/main.vue'

import ModalPromotions from "@/components/modals/modalPromotion.vue";
import CodeReward from './components/Reward/CodeReward.vue'
import Cashback from './components/Reward/Cashback.vue'

import { useWinloseStore } from "@/stores/winlose";

export default {
  setup() {
    const userStore = useUserStore();
    const { socket } = useSocketIO();
    const config = useConfigStore();
    const option = useOptionStore();
    const DailyRewardStore = useDailyRewardStore();
    const winloseStore = useWinloseStore();

    return {
      userStore,
      socket,
      config,
      option,
      DailyRewardStore,
      winloseStore
    };
  },
  data() {
    return {
      time: new Date().toLocaleTimeString(),
      invite_link: "",
      splideOption_body: {
        rewind: true,
        pagination: false,
        arrows: false,
        perPage: 1,
        start: this.userStore.selector.text == 'ufa' ? 1 : 0,
        classes: {
          arrows: 'splide__arrows custom-class-arrows'
        }
      },
      splideActive: ""
    }
  },
  computed: {
    incomeCommission() {
      return this.formatNumber(this.winloseStore.com.summary.Share * this.winloseStore.com.summary.ValidAmount || 0, 2);
    },
    turnOver() {
      return this.formatNumber(this.winloseStore.com.summary.ValidAmount || 0, 2);
    },
    returnLose() {
      try {
        return this.formatNumber((this.userStore.returnLose.loss * this.userStore.returnLose.returnLostPercent) / 100 || 0, 2)
      } catch (error) {
        return 0;
      }


    }

  },
  components: {
    Splide,
    SplideSlide,
    MenuAmb,
    // MenuUfa,
    code9near,
    'app-vip-hack': VipHackVue,
    'hack-percen': hackpercen,
    'app-hack-jackpot': Hackjackpot,
    ModalPromotions,
    CodeReward,
    Cashback
  },

  created() {
    this.userStore.getProfile()
    // this.winloseStore.getReportCOM();
    this.userStore.getReturnLose();
  },
  mounted() {
    localStorage.ShowModalCarBonus = true;
    this.invite_link = window.location.origin + "/register?invite=" + this.userStore.users.amb.username;

  },
  beforeUnmount() {
    this.socket.disconnect()
  },
  methods: {

    /*
    async showDailyLoginReward() {
      if (!this.DailyRewardStore.REWORDS_SHOW_FRIST) {
        await this.DailyRewardStore.getBonus();
        // show only != สมาชิกใหม่
        if (this.userStore.userProfile.role != 0) this.DailyRewardStore.modelRewards.show();
        this.DailyRewardStore.REWORDS_SHOW_FRIST = true;
      }
    },
    */

    copy(id) {
      let copyText = document.getElementById(id);
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");
      Toast.fire({ title: "คัดลอกสำเร็จ", icon: "success", });
    },

    onSplideActive(e, { slide }) {
      const slideName = slide.getAttribute('name')
      this.splideActive = slideName;
      this.setUserGame(slideName)
    },

    setUserGame(slideName) {
      // const splidehead = this.$refs.splidehead;
      const splidebody = this.$refs.splidebody

      if (slideName == 'amb') {
        splidebody.go(0)
        Cookies.set('background', '/bg/bg.jpg', {
          expires: new Date(new Date().getTime() + 86400000 * 7),
          secure: true,
          sameSite: 'strict'
        })
      } else if (slideName == 'amb2') {

        if (this.userStore.userProfile.role != 0) splidebody.go(1)
        else splidebody.go(0)

        Cookies.set('background', '/bg/5.jpg', {
          expires: new Date(new Date().getTime() + 86400000 * 7),
          secure: true,
          sameSite: 'strict'
        })
      }
      else if (slideName == 'ufa') {
        splidebody.go(2)
        Cookies.set('background', '/bg/2.jpg', {
          expires: new Date(new Date().getTime() + 86400000 * 7),
          secure: true,
          sameSite: 'strict'
        })
      }

      this.userStore.setSelector(slideName)
      this.userStore.postChangeUserAgent()
      this.setBackgroundTheme()
    },

    userStatus(role) {
      switch (role) {
        case 0:
          return { class: 'bg-secondary', text: 'สมาชิกใหม่' }
        case 1:
          return { class: 'bg-success', text: 'สมาชิกทั่วไป' }
        case 2:
          return { class: 'bg-warning', text: 'VIP' }
        case 3:
          return { class: 'bg-warning', text: 'สมาชิก Super VIP' }
        default:
          return { class: 'bg-secondary', text: role }
      }
    }
  }
}
</script>
<style lang="scss">
.custom-class-arrows {
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  margin: auto;

  //  margin-top: 0;
  width: 100%;
  max-width: 300px;
}
</style>
<style lang="scss" scoped>
.btn-bag {
  color: #fbd46d;
  // background: linear-gradient(0deg, #ff9d00 0%, #ffc362 100%);
  padding-bottom: 0;
  font-size: 18pt;
  border: none !important;
  background: linear-gradient(0deg, #e0a953 0%, #fbd46d 53%, #e0a953 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
}

.splide-head {
  margin: auto;
  width: 100%;
  max-width: 300px;

  .splide-body {
    padding: 0 10px 0 10px;
  }

  .logo {
    text-align: center;
    // padding: 30px;
    padding-top: 0px;
    padding-bottom: 0px;
    padding-left: 40px;
    padding-right: 40px;
    width: 100%;
    min-width: 200px;
    max-width: 250px;
  }

  .text-bagname {
    padding-top: .5rem;
    font-weight: 900;
    background: linear-gradient(0deg, #e0a953 0%, #fbd46d 53%, #e0a953 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-transform: uppercase;
  }
}

.splide-body {
  margin: 0 auto;
  padding-top: 0px;
  width: 100%;
  padding: 0px 5px 0px 5px;

  .block-content {
    max-width: 480px;
    margin: auto;


  }

  .card.card-amb {
    padding: 10px;
    margin: auto;
    width: 100%;
    max-width: 450px;
    height: 220px;
    background: rgb(240, 167, 65);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-image: url('@/assets/img/homeView/bg-card.png');
    box-shadow: #0000004d 0px 19px 38px, #00000038 0px 15px 12px;

    .text-phoneNo {
      font-size: 0.8rem;
      color: #494949;
    }

    .ic-profile {
      position: absolute;
      left: 5px;
      font-size: 24pt;
    }

    .icon-user {
      width: 47px;
    }

    .box-credit {
      padding-top: 0;
      width: 100%;
      border-bottom: #202020 3px solid;

      .credit {
        padding-top: 0;
        margin-top: 0;
        font-size: 2.2rem;

        span {
          padding-top: 0;
          margin-top: 0;
        }

        .thb {
          font-size: 1rem;
        }
      }
    }

    .center-separetor {
      position: absolute;
      right: 50%;
      background-color: #0000008c;
      bottom: 30%;
      border-radius: 5rem;

      &::after {
        content: " ";
        width: 3px;
        height: 20px;
        display: inline-block;

      }
    }

    .text-daimond {
      font-size: 1.5rem;
      position: absolute;
      bottom: 15px;
      right: 10px;
    }

    .text-status {
      font-size: 0.8rem;
    }

    .text-gold {
      color: gold;
    }
  }
}

.badge {
  font-weight: 400;
}

.badge-username {
  background-color: rgba(139, 139, 139, 0.527);
  font-weight: 300;
  font-size: 11pt;
}

hr {
  opacity: 1;
  height: 2px;
  background: linear-gradient(90deg, transparent, #bd6a00, transparent);
}

.text-account {
  font-weight: 300;
  transition: all 0.4s;

  &:hover {
    cursor: pointer;
    color: #ffae00;
  }
}

.text-user {
  transition: all 0.4s;
  font-weight: 300;
  margin-bottom: 0;
}

.block-circle {
  position: relative;
  width: 250px;
  height: 250px;
  text-align: center;
  padding-top: 2.5rem;
  background-color: #00000085;
  border-radius: 50%;
  backdrop-filter: saturate(180%) blur(2px);
  // border: 3px solid #ffae00;

  &::before {
    content: ' ';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    padding: 5px;
    background: linear-gradient(0deg, #12c2e9, #c471ed, #f64f59);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    animation: spinning82341 10s linear infinite;
  }

  &::after {
    content: ' ';
    position: absolute;
    border-radius: 50%;
    top: 0px;
    left: 0px;
    width: 250px;
    height: 250px;
    box-shadow: 0px -5px 20px 0px #f64f59, 0px 5px 20px 0px #00d0ff;
    animation: spinning82341 10s linear infinite;
  }

  p {
    margin-top: .5rem;
    font-weight: 300;
  }
}

@keyframes spinning82341 {
  to {
    transform: rotate(360deg);
  }
}

.setting-icon {
  position: absolute;
  z-index: 100;
  right: 0%;
  bottom: 20px;
  background-color: #000000be;
  border: 2px solid #fff;
  border-radius: 10rem;
  width: 38px;
  height: 38px;
  float: right;
  margin-right: 1.5rem;

  .block-img {
    padding: 0.15rem;
  }
}

.modal-dialog {
  .modal-content {
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(20px);
  }

  .modal-title {
    color: #ffae00;
  }

  .modal-body {
    color: var(--bs-gray-900);
  }
}

.block-diamond {
  text-align: center;
  color: #000;
  border-radius: 1rem;
  border: #997500 solid 1px;
  padding: .4rem 1.2rem;
  background: linear-gradient(0deg, #b4812e 0%, #f7fbc0 53%, #b4812e 100%);
  transition: all 0.35s;

  &:hover {
    background: linear-gradient(0deg, #e6a43a 0%, #f7fbc0 53%, #e6a43a 100%);
  }
}

.block-pv {
  text-align: center;
  color: #fff;
  border-radius: 1rem;
  border: #997500 solid 2px;
  padding: .4rem 1.2rem;
  transition: all 0.35s;

  &:hover {
    border: #e6a43a solid 2px;
  }
}
</style>
 
