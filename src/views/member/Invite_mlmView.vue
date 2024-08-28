<template>
  <div>
    <br />
    <div class="container">
      <div class="row mt-5 pt-2">
        <div class="col-lg-12 m-md-auto col-sm-12 col-12">
          <div class="card">
            <div class="card-body">
              <h2 class="title">สร้างรายได้</h2>
              <div class="text-center my-3" v-show="isRequest">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>

              <div class="input-group mb-3 bg-light" style="border-radius: 5rem">
                <input type="text" class="form-control" readonly v-model="invite_link" id="suggest" />
                <button @click="copy('suggest')" class="btn btn-outline-secondary">
                  คัดลอก
                </button>
              </div>
              <div class="row">
                <div class="col-6 col-sm-3">
                  <div class="card-menu mb-3 p-0 b1 mouse-pointer" @click="active_tab = 1"
                    :class="active_tab == 1 ? 'active' : ''">
                    <div class="card-body text-center p-0">
                      <img src="@/assets/icons/icons8_dashboard_96px_1.png" width="50px"  class="mx-auto py-2"/>
                      <h5 class="text-center h5">ภาพรวม</h5>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-sm-3">
                  <!-- @click="active_tab = 2" -->
                  <div class="card-menu mb-3 p-0 b2 mouse-pointer" :class="active_tab == 2 ? 'active' : ''">
                    <div class="card-body text-center p-0">
                      <img src="@/assets/icons/icons8_personal_growth_96px.png" width="50px"  class="mx-auto py-2"/>
                      <h5 class="text-center h5">ที่สมัคร</h5>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-sm-3">
                  <!-- @click="active_tab = 3" -->
                  <div class="card-menu mb-3 p-0 b3 mouse-pointer" @click="active_tab = 3"
                    :class="active_tab == 3 ? 'active' : ''">
                    <div class="card-body text-center p-0">
                      <img src="@/assets/icons/icons8_expensive_price_96px_1.png" width="50px"  class="mx-auto py-2"/>
                      <h5 class="text-center h5">พันธมิตร</h5>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-sm-3">
                  <div class="card-menu mb-3 p-0 b4 mouse-pointer" @click="active_tab = 4"
                    :class="active_tab == 4 ? 'active' : ''">
                    <div class="card-body text-center p-0">
                      <img src="@/assets/icons/icons8_cash_withdrawal_96px.png" width="50px" class="mx-auto py-2" />
                      <h5 class="text-center h5">คอมมิชชั่น</h5>
                    </div>
                  </div>
                </div>
              </div>

              <div class="text-white " v-show="active_tab == 1">
                <h5 class="pt-3 text-white d-block">รายได้ทั้งหมด</h5>
                
                  <div class="row ">
                    <div class="col-12 col-sm-4 p-0 m-0">
                      <div class="card p-3 text-white m-2 stcard">
                        <div>
                          <p style="font-size: 15px">รายได้พันธมิตร</p>
                          <span class="text-base"> ฿ {{ incomeMLM }} </span>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-sm-4 p-0 m-0">
                      <div class="card p-3 text-white m-2 stcard">
                        <div>
                          <p style="font-size: 15px">รายได้คอมมิสชั่น</p>
                          <span class="text-base">
                            ฿ {{ incomeCommission }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-sm-4 p-0 m-0">
                      <div class="card p-3 text-white m-2 stcard">
                        <div>
                          <p style="font-size: 15px">จำนวนสมาชิกทั้งหมด</p>
                          <span class="text-base">
                            {{ formatNumber(0 || 0, 0) }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <br />

                  <!-- <p class="pt-2 mb-2 text-center">
                    สามารถกดรับเครดิตได้สูงสุด 100,000 ต่อวัน
                  </p>
                  <p style="text-indent: 25px">
                    ท่านจะได้รับส่วนแบ่ง {{ formatNumber(mlm.summary.Share * 100, 2) }}% ทุกรายการเดิมพันของลูกค้า
                    ตัวอย่างเช่น….
                  </p>
                  <ul>
                    <li>
                      ลูกค้าท่าน 1 คน แทง 10,000 บาท <br class="d-sm-none" />
                      ท่านจะได้ {{ (10000 * (mlm.summary.Share * 100)) / 100 }} บาท
                    </li>
                    <li>
                      ลูกค้าท่าน 1 คน แทง 100,000 บาท <br class="d-sm-none" />
                      ท่านจะได้ {{ (100000 * (mlm.summary.Share * 100)) / 100 }} บาท
                    </li>
                    <li>
                      แจ้งรับคืนยอดเสีย ได้ทุกวัน <br class="d-sm-none" />
                      เวลา : 11:00-24-00น.
                    </li>
                    <li>
                      แจ้งรับคืนยอดเสีย ได้ทุกวัน <br class="d-sm-none" />
                      เวลา : 11:00-24-00น.
                    </li>
                  </ul> -->


                  <br>
                  <!-- <ul>
                    <li>
                      แจ้งรับคืนยอดเสีย ได้ทุกวัน <br class="d-sm-none" />
                      เวลา : 11:00-24-00น.
                    </li>
                    <li>
                      รับยอดพันธมิตรได้ทุกวันที่ 1-5 ของทุกเดือน <br class="d-sm-none" />
                    </li>
                  </ul> -->

                  <p>หมายเหตุ: สอบถามรายละเอียดเพิ่มเติมได้ที่แอดมินคะ</p>
                
              </div>
              <div class="" v-show="active_tab == 2">
                <!-- <InviteDataTable /> -->
              </div>
              <div class="" v-show="active_tab == 3">
                <MLM />
              </div>
              <div class="" v-show="active_tab == 4">
                <Commission />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>

import Commission from "./components/InviteMLM/Commission.vue";
import MLM from "./components/InviteMLM/MLM.vue";

import { useWinloseStore } from "../../stores/winlose";
import { useUserStore } from "../../stores/user";
import { Toast } from "../../plugins/SweetAlert";

export default {
  setup() {

    const winloseStore = useWinloseStore();
    const userStore = useUserStore();

    return {
      winloseStore,
      userStore
    };
  },
  components: {

    Commission,
    MLM,

  },
  data() {
    return {
      invite_link: "",
      isRequest: false,
      isRequestReport: false,
      userstatus: { class: "", message: "" },
      active_tab: 1,
      withdrawAmount: 0,
    };
  },
  computed: {
    incomeCommission() {
      return this.formatNumber(this.winloseStore.com.summary.Share * this.winloseStore.com.summary.ValidAmount || 0, 2);
    },
    incomeMLM() {
      return this.formatNumber(this.winloseStore.mlm.summary.Share * this.winloseStore.mlm.summary.ValidAmount || 0, 2);
    },
  },

  created() { },
  mounted() {
    // this.invite_link = window.location.origin + "/register?invite=" + parseInt(this.userStore.users.amb.username.substring(6));
    this.invite_link = window.location.origin + "/register?invite=" +this.userStore.users.amb.username;
  },
  methods: {
    copy(id) {
      let copyText = document.getElementById(id);
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");
      Toast.fire({ title: "คัดลอกสำเร็จ", icon: "success", });
    },
  },
};
</script>

<style lang="scss" scoped>
.b1,
.b2,
.b3,
.b4 {
  color: #000;

  :hover.active {
    // background: #d39205;
    background-color: #7f53ac;
    background-image: linear-gradient(315deg,
        #7f53ac 0%,
        #647dee 74%) !important;
    color: white;
  }

  img {
    width: 50px;
  }
}

.text-base {
  font-size: 1.7rem !important;
  color: #d39205;
  font-size: 1.7rem !important;
}

.title {
  font-weight: 900;
  font-size: 1.5rem;

  background: linear-gradient(0deg,
      #e0a953 0%,
      #ffe25e 53%,
      #f59802 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
}

.active {
  background-color: #bf033b;
  border: #e0a953 2px solid !important;
  background-image: linear-gradient(315deg, #be3338 0%, #b68a44 74%) !important;
  color: white !important;

  img {
    -webkit-filter: invert(100%);
    /* Safari/Chrome */
    filter: invert(100%);
    width: 50px;
  }
}

.card-menu {
  border: #e0a953 2px solid !important;
  background: #ffffffe8;
  border-radius: 1rem;
}

input {
  font-weight: 300;
  font-size: 9pt;
}

.badge {
  font-weight: 400;
}

tbody>tr>td {
  font-size: 10pt;
}

.stcard {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
 

.card {
  color: #ebebeb;
  font-weight: 700;
  background-color: rgba(0, 0, 0, 0.6) !important;
  border: #e0a953 2px solid !important;
  box-shadow: #f4c039 0px 0px 3px 0px;
}
</style>
