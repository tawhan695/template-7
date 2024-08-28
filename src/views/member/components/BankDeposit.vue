<template>
  <div>
    <div class="row">
      <div class="col-auto px-0 mx-0 text-center">
        <img :src="BankIcon.icon" :style="{ 'background-color': BankIcon.color }" style="width: 64px"
          class="img-fluid rounded" />
        <br />
        <span class="text-dark">{{ BankIcon.name }}</span>
      </div>
      <div class="col">
        <label for>เลขที่บัญชี</label>
        <div class="input-group mb-3">
          <input type="text" class="form-control" readonly :id="'banknumber' + bankData.code" :value="bankData.account" />
          <button @click="copy('banknumber' + bankData.code)" class="btn btn-outline-secondary">คัดลอก</button>
        </div>
      </div>
    </div>
    <h4 class="text-secondary">ชื่อบัญชี: {{ bankData.name }}</h4>
    <hr />
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { BANK } from "../../../mixins/bank";
import { useUserStore } from "../../../stores/user";
export default {
  props: {
    bankData: Object,
  },
  setup() {
    const userstore = useUserStore();
    return {
      userstore
    }

  },
  computed: {
    BankIcon() { return BANK.find(({ code }) => code == this.bankData.code) }
  },
  methods: {
    copy(id) {
      let copyText = document.getElementById(id);
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");
      if (id != 'suggest') {
        let TotalCreditAMB = this.userstore.userProfile.deposit[1].total;
        let TotalCreditUFA = this.userstore.userProfile.deposit[2].total;
        let html = "";// "<span style='color:red'>เพื่อความรวดเร็วของระบบ <br>กรุณาโอนเข้ามาเป็นเศษสตางค์นะคะ เช่น 200.81 , 500.79 </span><br>"

        if (TotalCreditAMB == 0 && TotalCreditUFA == 0) {
          html += `<a href="${import.meta.env.VITE_LINE_URL}"><img class="w-100" src="/cdn/firstmember.jpg?v=${Date.now()}"/></a>`
        }
        Swal.fire({
          title: "คัดลอกเลขบัญชีแล้ว",
          html
        })

      }

    },
  },
};
</script>
