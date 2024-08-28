<template>
  <div class="login">
    <div class="container ">
      <div class="row">
        <div class="col-xl-7 m-xl-auto col-lg-7 m-lg-auto col-lg-6 m-md-auto col-sm-12 col-12">
          <div class="card mt-5">
            <div class="card-body">
              <div class="text-center">
                <router-link to="/">
                  <img src="@/assets/logo.png" alt style="max-width: 250px" class="img-fluid mx-auto" />
                </router-link>
              </div>
              <h3 class="text-center text-white my-4 h3">เข้าสู่ระบบ</h3>
              <form @submit.prevent="login()" method="POST">
                <div class="mb-3">
                  <label class="form-label">เบอร์โทรศัพท์</label>
                  <input v-model="User.phoneNo" type="text" class="form-control input-username"
                    placeholder="เบอร์โทรศัพท์" @keypress="isNumber($event)" required />
                </div>
                <div class="mb-3">
                  <label class="form-label">รหัสผ่าน</label>
                  <div class="input-group">
                    <input v-model="User.password" :type="passwordFieldType" class="form-control input-password"
                      placeholder="รหัสผ่าน" required autocomplete="on" />
                    <span class="input-group-text show-password" @click="showPassword()">
                      <img :src="icon_eye" width="20" />
                    </span>
                  </div>
                </div>
                <br />
                <button type="submit" class="btn btn2 btn-primary w-100">เข้าสู่ระบบ</button>
                <router-link to="/register" class="btn btn2 btn-secondary w-100 mt-2">สมัครสมาชิก
                </router-link>

                <br />
                <br />
              </form>
              <div class="text-center my-3">
                <div class="spinner-border" role="status" v-show="is_request">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalPromotions show_in="login"></ModalPromotions>
</template>

<script>
import ModalPromotions from "@/components/modals/modalPromotion.vue";

import icon_eye_sleepy from '@/assets/img/icons/icons8_sleepy_eyes_96px_1.png'
import icon_eye_show from '@/assets/img/icons/icons8_eye_96px_1.png'
import icon_eye from '@/assets/img/icons/icons8_eye_96px_1.png'
import { useUserStore } from '../stores/user'
import { useAuthStore } from '../stores/auth'
// new
import { useConfigStore } from '@/stores/config'
import { useOptionStore } from '@/stores/options'
export default {
  setup() {
    const userStore = useUserStore()
    const authStore = useAuthStore()
    //new
    const config = useConfigStore()
    const option = useOptionStore()

    // const ModalPromotions = ModalPromotions()
    return {
      userStore,
      authStore,
      //new
      config,
      option
    }
  },
  components: {
    ModalPromotions
  },
  data() {
    return {
      User: {
        phoneNo: '',
        password: ''
      },
      is_request: false,
      passwordFieldType: 'password',
      icon_eye_sleepy,
      icon_eye_show,
      icon_eye
    }
  },
  created() { },
  mounted() {
    // code hack
    this.init_code_hack()
  },
  methods: {
    init_code_hack() {
      //this.option.Hack_9near_Slot = true //** โปรด ลบบรรทัดนี้ ก่อนนำไปใช้งาน = true
      if (Object.keys(this.$route.query).length > 0) {
        this.option.VIP_Hack_Slot = false
        this.option.Hackjackpot = false
        this.option.fixed_percen = false
        this.option.CodeBonus = false
        this.option.Hack_9near_Slot = false // new v2

        if (this.$route.query.vip_hack) {
          if (this.$route.query.vip_hack == '100' && this.config.VipHackSlot) {
            this.option.VIP_Hack_Slot = true
          }
        } else if (this.$route.query.hackjackpot) {
          if (this.$route.query.hackjackpot == '100' && this.config.HackJackpot) {
            this.option.Hackjackpot = true
          }
        } else if (this.$route.query.hack9nearslot) {
          // new v2
          if (this.$route.query.hack9nearslot == '100' && this.config.Hack9nearSlot) {
            this.option.Hack_9near_Slot = true
          }
        } else if (this.$route.query.hackcode) {
          // if (this.$route.query.hackcode == "100PER" && this.config.CodeBonus) {
          //   this.option.CodeBonus = true;
          // }
        } else if (this.$route.query.fixed_percen) {
          if (this.$route.query.fixed_percen == 'true' && this.config.fixed_percen) {
            this.option.fixed_percen = true
          }
        }
      }
    },
    async login() {
      this.is_request = true
      const loginData = await this.authStore.Login(this.User)

      if (!loginData.error) {
        const userProfile = await this.userStore.getProfile()
        // console.log('userProfile',userProfile);
        if (!userProfile.error) window.location.href = "/member/"

        // if (!userProfile.error) this.$router.push('/member')
      }
      this.is_request = false
    },
    showPassword() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
      this.icon_eye =
        this.passwordFieldType === 'password' ? this.icon_eye_show : this.icon_eye_sleepy
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  input.input-password {
    border-radius: 5rem 0rem 0rem 5rem !important;
    border-right: unset;
  }

  span.show-password {
    border-radius: 0rem 5rem 5rem 0rem !important;
    background-color: #fff;
    border-left: unset;
    cursor: pointer;
  }
}

.card {
  background-color: rgba(0, 0, 0, 0.8);
  box-shadow: #6c757d 0px 0px 11px 0px;
  border-radius: 2rem;
  border: unset;
  border-radius: 2rem;
  padding: 0 5rem;

  @media (max-width: 576px) {
    padding: 0 0rem;
    border-radius: 1rem;
  }
}
</style>
