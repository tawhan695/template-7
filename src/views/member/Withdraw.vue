<template>
  <div>
    <br />

    <div class="container">
      <div class="row">
        <div class="col-lg-6 m-md-auto col-sm-12 col-12">
          <div class="card card-member">
            <div class="card-body text-dark">
              <h2>ถอนเครดิต </h2>

              <div v-show="!isRequest">
                <div class="card bg-light card-member">
                  <div class="card-body text-dark">
                    <div class="text-center">
                      <p class="mb-0">ยูเซอร์: {{ userStore.userProfile.users[userStore.selector.num].username }}</p>
                      <span>
                        เครดิตปัจจุบัน:
                        <span class="badge bg-light text-dark" style="font-size: 18pt">
                          {{ toCurrency(userStore.userProfile.users[userStore.selector.num].credit) }}</span>

                      </span>
                    </div>
                    <span class="text-danger">ถอนขั้นต่ำ {{ MinWidthdraw }} บาท</span>
                    <div class="input-group mb-3">
                      <span class="input-group-text">จำนวนเงิน</span>
                      <input type="number" class="form-control" :min="MinWidthdraw"
                        :max="userStore.userProfile.withdraw.intWdBillMax" :placeholder="('ขั้นต่ำ ' + MinWidthdraw) + ' บาท'"
                        v-model="amount" />
                      <button class="btn btn-danger" type="button" @click="widthDraw()">ถอนเงิน</button>
                    </div>
                    <div class="input-froup has-validation">
                      <select v-model="selectWithdrawBank" class="form-select"
                        v-bind:class="{ 'is-invalid': require_bank }">
                        <option selected disabled value>เลือกบัญชี</option>
                        <option value="bank" v-show="userStore.userProfile.bankAccount != '-'">ธนาคาร</option>
                        <option value="wallet">Wallet</option>
                      </select>
                    </div>

                    <p>เครดิตจะเข้าบัญชีนี้</p>
                    <div v-if="selectWithdrawBank == 'bank'">
                      <div class="row">
                        <div class="col-3 px-0 mx-0 text-center">
                          <img :src="BankIcon.icon" :style="{ 'background-color': BankIcon.color }" style="width: 64px"
                            class="img-fluid rounded" />
                          <br />
                        </div>
                        <div class="col">
                          <span>เลขที่บัญชี: {{ toBankFormat(userStore.userProfile.bankAccount) }}</span>
                          <br />
                          <span>ชื่อบัญชี: {{ userStore.userProfile.name + " " + userStore.userProfile.lastname }}</span>
                          <br />
                          <span>ธนาคาร: {{ BankIcon.name }}</span>
                          <br />
                        </div>
                      </div>
                    </div>
                    <div v-else-if="selectWithdrawBank == 'wallet'">
                      <div class="mt-2">
                        <div class="text-dark">
                          <div class="row">
                            <div class="col-3 px-0 mx-0 text-center">
                              <img src="../../assets/banks-logo/th/tmn.svg" style="width: 64px"
                                class="img-fluid rounded border" />
                              <br />
                            </div>
                            <div class="col">
                              <span>เลขที่บัญชี: {{ toPhoneFormat(userStore.userProfile.phoneNo) }}</span>
                              <br />
                              <span>ชื่อบัญชี: {{ userStore.userProfile.name + " " + userStore.userProfile.lastname }}</span>
                              <br />
                              <span>True Wallet</span>
                              <br />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="text-center my-3" v-show="isRequest">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="card mt-3 card-member" v-show="!isRequest">
            <div class="card-body">
              ประวัตการถอน
              <div class="card bg-light card-member">
                <div class="card-body text-dark text-center" v-show="!isRequest">
                  <table class="table table-sm">
                    <thead>
                      <tr>
                        <th scope="col">วันที่ทำรายการ</th>
                        <th scope="col">
                          <span v-if="report.data">เครดิต</span>
                        </th>
                        <th scope="col">รายการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="list in report" :key="list.key" style="font-size: 10pt">
                        <td class="text-start">{{ $filters.moment( list.time) }}</td>
                        <td class="text-end">{{ list.credit || list.prize }}</td>
                        <td>
                          <span
                            class="badge"
                            :class="
                              list.type == 'ฝาก' ? 'bg-info' : 'bg-warning'
                            "
                          >{{ list.type }}</span>
                          <small v-show="list.bank">({{ list.bank }})</small>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
  <ModalPromotions show_in="withdraw"></ModalPromotions>
</template>

<script>
// import Swal from "sweetalert2";
// import BankData from "../../services/BankData"
// import { load } from "recaptcha-v3";
import { BANK } from '../../mixins/bank';
import { useUserStore } from '../../stores/user';

import ModalPromotions from "@/components/modals/modalPromotion.vue";

export default {
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },
  data() {
    return {
      report: {
        data: [],
      },
      BankIcon: Object,
      isRequest: false,
      amount: 300,
      MinWidthdraw: "",
      selectWithdrawBank: "",
      require_bank: false,
       
    };
  },
  components: {
    ModalPromotions
  },
  created() {
    this.MinWidthdraw = this.userStore.userProfile.withdraw.intWdMin
    this.BankIcon = BANK.find(({ code }) => code == this.userStore.userProfile.bankCode);
 

  },
  methods: {
    widthDraw() {
      this.userStore.postWithdraw({ amount: this.amount, selectWithdrawBank: this.selectWithdrawBank })

    },
  },
};
</script>

<style lang="scss" scoped></style>