<template>
  <div class="account-actions-mobile">
    <div class="-outer-wrapper">
      <div class="-left-wrapper">
        <router-link to="/member" style="cursor: pointer;" class="-item-wrapper">
          <img src="../../../assets/img/member2/ic-menu/ic-home.png" width="24" alt="">
          <span class="-text">หน้าหลัก</span>
        </router-link>

        <router-link to="/member/invite-mlm" style="cursor: pointer;" class="-item-wrapper -promotion">
          <img src="../../../assets/img/member2/ic-menu/ic-diamond.png" width="24" alt="">
          <span class="-text">สร้างรายได้</span>
        </router-link>
      </div>
      <a @click="loby()" style="cursor: pointer;" class="-center-wrapper">
        <div class="-selected">
        </div>
      </a>
      <div class="-fake-center-bg-wrapper">
        <svg viewBox="-10 -1 30 12">
          <defs>
            <linearGradient id="rectangleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="3%" stop-color="#F6E4A7" />
              <stop offset="66%" stop-color="#F1CD4C" />
              <stop offset="70%" stop-color="#C2770F" />
              <stop offset="92%" stop-color="#F6E4A7" />
            </linearGradient>
          </defs>
          <path d="M-10 -1 H30 V12 H-10z M 5 5 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0z" />
        </svg>
      </div>

      <div class="-right-wrapper">
        <router-link to="/member/history" style="cursor: pointer;" class="-item-wrapper -login">
          <img src="../../../assets/img/member2/ic-menu/ic-history.png" width="24" alt="">
          <span class="-text">ประวัติ</span>
        </router-link>

        <a :href="optionStore.Line.url" style="cursor: pointer;" class="-item-wrapper -login">
          <img src="../../../assets/img/member2/ic-menu/ic-contact.png" width="24" alt="">
          <span class="-text">ติดต่อเรา</span>
        </a>
      </div>

    </div>
    <form method="post" class="d-none" @submit="onSubmit" ref="form" :action="ufaInput.URL_LOGIN">
      <input name="txtUserName" type="hidden" class="form-control" v-model="txtUserName" />
      <input name="password" type="hidden" class="form-control" v-model="password" />
      <input type="hidden" name="__EVENTTARGET" :value="isMobile ? 'btnSignIn' : 'btnLogin'">
      <input type="hidden" name="__EVENTARGUMENT" value="">
      <input type="hidden" name="__VIEWSTATEGENERATOR" v-model="ufaInput.VIEWSTATEGENERATOR" />
      <input type="hidden" name="__VIEWSTATE" v-model="ufaInput.VIEWSTATE" />
      <input type="hidden" name="__EVENTVALIDATION" v-model="ufaInput.EVENTVALIDATION" />
    </form>
  </div>
</template>

<script>
import { useGamesStore } from '../../../stores/games'
import { useUserStore } from '../../../stores/user'
import { useOptionStore } from '../../../stores/options'
import { isMobile } from "mobile-device-detect"
export default {
  setup() {
    const userStore = useUserStore()
    const gameStore = useGamesStore()
    const optionStore = useOptionStore()
    return {
      userStore,
      gameStore,
      isMobile,
      optionStore
    }
  },
  data() {
    return {
      ufaInput: {
        VIEWSTATE: "",
        EVENTVALIDATION: "",
        VIEWSTATEGENERATOR: "",
        SESSION_ID: "",
        URL_LOGIN: null,
        // EVENTTARGET: isMobile
      }
    }
  },
  computed: {
    txtUserName() {
      return ""// this.userStore.userProfile.users[2].username
    },
    password() {
      return "" // this.userStore.userProfile.password
    },
  },
  mounted() {
    // this.loadUfa()
  },
  methods: {
    loby() {
      const selector = this.userStore.selector.text
      if (selector === "ufa") {
        this.onSubmit()
      } else {
        this.$router.push("/member/lobby")
      }
    },
    onSubmit() {
      if (!this.ufaInput.URL_LOGIN) {
        alert('ERROR URL_LOGIN')
      } else {
        this.$refs.form.submit()
        return
      }
    },
    async loadUfa() {
      const { data } = await this.gameStore.ufaLogin();
      this.ufaInput = data;
    }
  },


}
</script>

<style lang="scss" scoped>
.account-actions-mobile {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 4;
  width: 100%;
}

.material-icons {
  color: rgb(0, 0, 0);
}

.account-actions-mobile .-outer-wrapper {
  display: flex;
  align-items: flex-end;
}

.account-actions-mobile .-left-wrapper,
.account-actions-mobile .-right-wrapper {
  display: flex;
  align-items: flex-end;
  flex: 1;
  z-index: 2;
  height: 60px;
  padding-bottom: 6px;
  background: rgb(241, 205, 76);
  background: linear-gradient(180deg, rgba(246, 228, 167, 1) 1%, rgba(241, 205, 76, 1) 50%, rgba(194, 119, 15, 1) 55%, rgba(246, 228, 167, 1) 99%);
  // background: linear-gradient(180deg, #ffbb00, #C2770F);
  transition: filter 0.2s;
}

.account-actions-mobile .-center-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  z-index: 2;
  width: 74px;
  height: 74px;
  margin: 0 8px 16px;
  // padding-bottom: 8px;
  color: #fff;
  // background: linear-gradient(180deg, #fdff9e 25%, #ffbb00);
  border-radius: 50%;
  // box-shadow: 0 0 10px hsla(0, 0%, 100%, 0.4);
}

.account-actions-mobile .-center-wrapper .-selected,
.account-actions-mobile .-center-wrapper .-selecting {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
}

.account-actions-mobile .-center-wrapper .-selected {
  transition: all 0.4s;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
  background-size: 74px;
  background-position: 0px 0px;
  // border-radius: 50%;
  background-image: url("../../../assets/img/member2/ic-menu/ic-entrance.png");
}

.account-actions-mobile .-center-wrapper .-selected .-bottom-curve,
.account-actions-mobile .-center-wrapper .-selected .-top-curve {
  position: absolute;
  left: 50%;
  z-index: 2;
  width: 85%;
  height: auto;
  transform: translateX(-50%);
}

.account-actions-mobile .-center-wrapper .-selected .-top-curve {
  top: 3px;
}

.account-actions-mobile .-center-wrapper .-selected .-bottom-curve {
  bottom: 3px;
}

.account-actions-mobile .-center-wrapper:hover {
  color: #fff;
  text-decoration: none;
}

.account-actions-mobile .-fake-center-bg-wrapper {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: 50px;
  transition: filter 0.2s;
  overflow: hidden;

}

.account-actions-mobile .-fake-center-bg-wrapper svg {
  position: absolute;
  left: 50%;
  bottom: 0;
  height: 108px;
  transform: translateX(-50%);
}

.account-actions-mobile .-fake-center-bg-wrapper svg path {
  fill: url(#rectangleGradient);
}

.account-actions-mobile .-left-wrapper {
  border-top-left-radius: 10px;
  border-top-right-radius: 12px;
}

.account-actions-mobile .-right-wrapper {
  border-top-right-radius: 10px;
  border-top-left-radius: 12px;
}

.account-actions-mobile .-item-wrapper {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  color: #7c7c7c;
  text-decoration: none;
}

.account-actions-mobile .-item-wrapper .-text {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #000000;
  font-weight: 900;
  transition: color 0.2s;
}

@media (max-width: 575.98px) {
  .account-actions-mobile .-item-wrapper .-text {
    font-size: 0.8rem;
  }
}

.account-actions-mobile .-item-wrapper:active,
.account-actions-mobile .-item-wrapper:hover {
  text-decoration: none;
}

.account-actions-mobile .-item-wrapper:active .-text,
.account-actions-mobile .-item-wrapper:hover .-text {
  color: #4e4e4e;
}

.account-actions-mobile .-item-wrapper.-shimmer .-text {
  display: inline-block;
  color: #fff;
  background-position: -200px top;
  background-repeat: no-repeat;
  animation-name: x-shimmer;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-name: x-shimmer-shorter;
}

@media (max-width: 991.98px) {
  .account-actions-mobile .-item-wrapper.-shimmer .-text {
    animation-duration: 2s;
    animation-duration: 2.5s;
  }
}

.account-actions-mobile .-item-wrapper.-register {
  position: relative;
}

.account-actions-mobile .-fully-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: rgba(0, 0, 0, 0.6);
}

.account-actions-mobile.-active .-fake-center-bg-wrapper,
.account-actions-mobile.-active .-left-wrapper,
.account-actions-mobile.-active .-right-wrapper {
  filter: brightness(0.5);
}

.account-actions-mobile.-active .-fake-center-bg-wrapper a,
.account-actions-mobile.-active .-left-wrapper a,
.account-actions-mobile.-active .-right-wrapper a {
  pointer-events: none;
}

.account-actions-mobile.-active .-center-wrapper {
  background: linear-gradient(0deg,
      rgba(251, 200, 68, 0.85),
      rgba(248, 128, 18, 0.85));

  .-selected {
    display: none;
  }

  .-selecting {
    display: flex;
  }
}



.account-actions-mobile.-active .-fully-overlay {
  display: block;
}

@keyframes x-shimmer {
  0% {
    background-position: -200px top;
  }

  to {
    background-position: 200px top;
  }
}

@keyframes x-shimmer-shorter {
  0% {
    background-position: -60px top;
  }

  to {
    background-position: 60px top;
  }
}
</style>