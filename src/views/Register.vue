<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-7 m-xl-auto col-lg-7 m-lg-auto col-lg-6 m-md-auto col-sm-12 col-12">
        <div class="card mt-5">
          <div class="card-body">
            <div class="text-center">
              <img src="../assets/logo.png" alt style="max-width: 250px" class="img-fluid mx-auto" />
            </div>
            <div class="step-register">
              <h3 class="text-center text-white my-4 h3">สมัครสมาชิก</h3>
              <div class="d-block">
                <div class="col-7 m-auto row px-0">
                  <div class="col-auto px-0 my-auto">
                    <div class="modal-step-box-outer m-auto" v-bind:class="{
                      'step-active': reg_state == 0 || reg_state == 1.5,
                    }">
                      <div class="modal--step-box-inner text-center">1</div>
                    </div>
                  </div>
                  <div class="modal-border">
                    <hr />
                  </div>
                  <div class="col-auto px-0 my-auto">
                    <div class="modal-step-box-outer m-auto" v-bind:class="{ 'step-active': reg_state == 1 }">
                      <div class="modal--step-box-inner text-center">2</div>
                    </div>
                  </div>
                  <div class="modal-border">
                    <hr />
                  </div>
                  <div class="col-auto px-0 my-auto">
                    <div class="modal-step-box-outer m-auto" v-bind:class="{ 'step-active': reg_state == 2 }">
                      <div class="modal--step-box-inner text-center">3</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 text-left mt-3">
              <!-- STEP 1 -->
              <form method="POST" @submit.prevent="checkPhone()" v-show="reg_state == 0">
                <div class="mb-3">
                  <small>เบอร์มือถือ</small>
                  <input type="text" v-model="phoneNo" class="form-control" placeholder="เบอร์โทรศัพท์"
                    @keypress="isNumber($event)" required />
                </div>
                <button type="submit" name="submit_register" class="btn btn2 btn-primary w-100">
                  สมัครสมาชิก
                </button>
              </form>
              <!-- STEP otp -->
              <form method="POST" @submit.prevent="requestOTP()" v-show="reg_state == 0.5">
                <div class="mb-3">
                  <small class="text-white p-1" style="font-size: 18px; float: left">รหัส OTP</small>
                  <input type="text" v-model="Otp" class="form-control" placeholder="รหัส otp"
                    @keypress="isNumber($event)" required />
                </div>
                <div class="row">
                  <button type="button" @click="() => { this.reg_state-- }" class="btn btn2 btn-primary col px-0">
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>
                    ย้อนกลับ
                  </button>
                  <button type="submit" class="btn btn2 btn-primary col px-0">
                    ยืนยันรหัส Otp
                  </button>
                </div>

              </form>
              <!-- STEP 2 -->
              <form method="POST" @submit.prevent="register2()" v-show="reg_state == 1">
                <div class="mb-3">

                  <div class="row">
                    <div class="col-12"> <small class="text-white p-2"
                        style="font-size: 18px; float: left">ชื่อบัญชี</small></div>
                    <div class="col-6">
                      <input type="text" v-model="name" class="form-control" placeholder="ชื่อ" required />
                    </div>
                    <div class="col-6">
                      <input type="text" v-model="lastname" class="form-control" placeholder="นามสกุล" required />
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="input-group mb-3">
                    <select class="custom-select" style="font-size: initial; max-width: 150px" v-model="bankCode"
                      @change="checkiSWallet">
                      <option disabled value selected>เลือกธนาคาร</option>
                      <option v-for="_bank in BANK" :key="_bank.code" :value="_bank.code">{{ _bank.name }} ({{
                        _bank.api_code
                      }})</option>
                    </select>
                    <input type="text" v-model="bankAccount" class="form-control" placeholder="เลขบัญชี"
                      @keypress="isNumber($event)" :disabled="bankCode == 'TRUE'" required />
                  </div>
                </div>

                <div class="row">
                  <button type="button" @click="() => { this.reg_state-- }" class="btn btn2 btn-primary col px-0">
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>
                    ย้อนกลับ
                  </button>
                  <button type="submit" name="submit_register" class="btn btn2 btn-primary col px-0" v-show="!is_request">
                    ถัดไป
                    <i class="fa fa-arrow-right" aria-hidden="true"></i>
                  </button>
                </div>
              </form>
              <!-- STEP 3 -->
              <form method="POST" @submit.prevent="register3()" v-show="reg_state == 2">
                <div class="mb-3">
                  <small>
                    รหัสผ่าน
                    <span style="color: red">(อย่างน้อย 8 ตัวอักษร)</span>
                  </small>
                  <input type="text" v-model="password" class="form-control" placeholder="Password" required />
                </div>
                <div class="mb-3">
                  <small>ยืนยันรหัสผ่าน</small>
                  <input type="text" v-model="password_confirm" class="form-control" placeholder="Password" required />
                </div>

                <button :disabled="is_request" type="submit" name="submit_register" class="btn btn2 btn-primary w-100">
                  ถัดไป ->
                </button>
              </form>
              <div class="text-center mt-3">
                <div class="spinner-border" role="status" v-show="is_request">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <router-link to="/login" class="text-white" v-show="!$route.query.invite">มีบัญชีแล้ว / เข้าสู่ระบบ
              </router-link>
            </div>

          </div>
          <br>
          <br>
          <br>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  </div>
  <ModalPromotions show_in="register"></ModalPromotions>
</template>
<script>

import ModalPromotions from "@/components/modals/modalPromotion.vue";
import { BANK } from "../mixins/bank";
import axios from "axios"
import Swal from "sweetalert2"

import { useAuthStore } from '../stores/auth'
import { useUserStore } from '../stores/user'

import { event } from 'vue-gtag'

export default {

  setup() {
    const authStore = useAuthStore()
    const userStore = useUserStore()

    return {
      authStore,
      userStore
    }
  },
  data() {
    return {
      BANK,
      reg_state: 0,

      phoneNo: "",
      bankAccount: "",
      bankCode: "",
      name: "",
      lastname: "",
      Otp: null,
      line_id: "",
      is_request: false,
      password: "",
      password_confirm: "",
      suggest: "",

      key: "",
      tokenz: "",
    }
  },

  components: {
    ModalPromotions
  },

  created() {
    this.suggest = this.$route.query.invite ?? "";
  },

  methods: {
    checkiSWallet() {
      if (this.bankCode == "TRUE") this.bankAccount = this.phoneNo;
      else this.bankAccount = ""
    },
    async checkPhone() {
      this.is_request = true
      try {
        const { data } = await axios.get(import.meta.env.VITE_API_URL + "/signup?phoneNo=" + this.phoneNo.trim());
        console.log(data);
        if (data.error)
          Swal.fire({
            icon: 'warning',
            text: this.phoneNo + " " + data.error.msg,
            confirmButtonText: 'ลองอีกครั้ง!'
          })
        else {
          this.key = data.data.key
          this.reg_state = (data.data.isUseOtp) ? 0.5 : 1
        }
      } catch (error) {
        alert(error)
      }
      this.is_request = false
    },
    async requestOTP() { // check OTP
      this.is_request = true
      try {
        let data_ = {
          phoneNo: this.phoneNo,
          otp: this.Otp
        }
        const { data } = await axios.post(import.meta.env.VITE_API_URL + "/signup/otp?key=" + this.key, data_);
        if (data.error)
          Swal.fire({
            icon: 'warning',
            text: this.phoneNo + " " + data.error.msg,
            confirmButtonText: 'ลองอีกครั้ง!'
          })
        else {
          this.key = data.data.key
          this.reg_state = 1
        }
      } catch (error) {
        alert(error)
      }
      this.is_request = false
    },
    async register2() { // check Bank Account
      this.is_request = true
      try {
        let data_ = {
          phoneNo: this.phoneNo.trim(),
          bankCode: this.bankCode,
          bankAccount: this.bankAccount.trim()
        };

        const { data } = await axios.post(import.meta.env.VITE_API_URL + "/signup/account?key=" + this.key, data_);


        if (data.error)
          Swal.fire({
            icon: 'warning',
            text: this.phoneNo + " " + data.error.msg,
            confirmButtonText: 'ลองอีกครั้ง!'
          })
        else {
          this.key = data.data.key
          this.reg_state = 2
        }
      } catch (error) {
        alert(error)
      }
      this.is_request = false
    },
    async register3() {
      this.is_request = true
      try {
        let payload = {
          phoneNo: this.phoneNo.trim(),
          bankCode: this.bankCode,
          bankAccount: this.bankAccount.trim(),
          name: this.name.trim(),
          lastname: this.lastname.trim(),
          username: "",
          password: this.password.trim(),
          walletNo: this.phoneNo.trim(),
          lineId: "",
          contact: "contact",
          channel: "channel",
          suggest: this.suggest
        }
        const { data } = await axios.post(import.meta.env.VITE_API_URL + "/signup/?key=" + this.key, payload);
        if (data.error)
          Swal.fire({
            icon: 'warning',
            text: this.phoneNo + " " + data.error.msg,
            confirmButtonText: 'ลองอีกครั้ง!'
          })
        else {
          this.Toast.fire({
            icon: "success",
            title: "สมัครสมาชิกสำเร็จ",
          })

          const User = {
            phoneNo: this.phoneNo.trim(),
            password: this.password.trim()
          }

          let loginData = await this.authStore.Login(User)
          if (!loginData.error) {
            const userProfile = await this.userStore.getProfile()
            if (!userProfile.error) window.location.href = "/member"
          }
          // Gtag add event
          event('login', {
            'event-label': 'user-registered',
            value: this.phoneNo.trim()
          })

          this.is_request = false

          // window.location.href = "https://lin.ee/rUJBzkb"
        }

      } catch (error) {
        alert(error)
      }
      this.is_request = false
    },
  },


}
</script>

<style lang="scss" scoped>
.step-register .modal-step-box-outer {
  background-color: transparent;
  border-radius: 100%;
  border: 2px solid #fff;
  width: 26px;
  height: 26px;
}

/* STEP REGISTER */
.step-register .modal-step-box-outer .modal--step-box-inner {
  background: 0 0;
  border-radius: 100%;
  width: 18px;
  height: 18px;
  color: #d2d2d2;
  font-family: Sans-Serif, sans-serif;
  font-size: 10px !important;
  margin: 2px;
  line-height: 18px;
}

.step-register .-step-box-outer.step-active .modal--step-box-inner {
  background-color: #ecbd7b;
  color: #000;
  font-weight: 700;
  border-radius: 50%;
}

.step-register .modal-step-box-outer.step-active .modal--step-box-inner {
  color: #000;
  background-color: #fec600;
}

.step-register .modal-border {
  flex: 1;
  max-width: 100%;
}

.step-register .modal-border hr {
  border-top-width: 1px;
  border-color: #fff;
  margin: 1rem 0 !important;
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

.youtube-embed {
  position: relative;
  padding-bottom: calc(21 / 9 * 25%);
  width: 100%;
  max-width: 400px;
  max-height: 750px;

  @media (max-width: 767.98px) {
    padding-bottom: calc(21 / 9 * 80%);
    max-height: 620px;
  }
}

.youtube-embed video {
  width: 100%;
  height: 100%;
  max-height: 980px;
  overflow: hidden;
}
</style>
