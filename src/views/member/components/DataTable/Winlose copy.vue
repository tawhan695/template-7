<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="card">
    <h4 class="p-2 pt-3 text-dark d-block">
      <img src="@/assets/icons/icons8_bitcoin_accepted_96px.png" style="width: 50px" />
      สรุปส่วนแบ่งยอดเสียเดือนนี้
    </h4>
    <div class="row m-0">
      <div class="col-12 col-sm-4 p-0 m-0">
        <div class="card p-3 text-dark m-2 stcard">
          <div>
            <p>ยอดเล่นจริง</p>
            <span class="text-base">
              {{
                winlose.summary != null
                ? formatNumber(winlose.summary.Amount, 2)
                : "-"
              }}</span>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-4 p-0 m-0">
        <div class="card p-3 text-dark m-2 stcard">
          <div>
            <p>เปอเช็นแชรายได้ที่จะได้</p>
            <span class="text-base">{{
              winlose.summary != null
              ? formatNumber(winlose.summary.Share * 100, 1)
              : "-"
            }}
              %</span>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-4 p-0 m-0">
        <div class="card p-3 text-dark m-2 stcard">
          <div>
            <p>จำนวนครั้งที่เล่น</p>
            <span class="text-base">{{
              winlose.summary != null
              ? formatNumber(winlose.summary.StackCount, 2)
              : "-"
            }}</span>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-4 p-0 m-0">
        <div class="card p-3 text-dark m-2 stcard">
          <div>
            <p>ยอดได้เสียรวมค่าคอม</p>
            <span class="text-base">
              {{
                winlose.summary != null
                ? formatNumber(winlose.summary.TotalWinLoseCom, 2)
                : "-"
              }}</span>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-4 p-0 m-0">
        <div class="card p-3 text-dark m-2 stcard">
          <div>
            <p>ยอดเทิร์นที่ไม่นับรายการเสมอ</p>
            <span class="text-base">{{
              winlose.summary != null
              ? formatNumber(winlose.summary.ValidAmount, 2)
              : "-"
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card border-0 mt-2">
      <div class="card-body">
        <div class="text-center my-3" v-show="isRequest">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <!-- :columns="columns" -->
        <div class="table-responsive">
          <DataTable class="table table-hover table-striped" :data="winlose.data" :columns="columns" :options="options">
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">ยอดเล่นจริง</th>
                <th scope="col">จำนวนครั้งที่เล่น</th>
                <th scope="col">ยอดได้เสียรวมค่าคอม</th>
                <th scope="col">ยอดเล่นที่ไม่นับรายการเสมอ</th>
              </tr>
            </thead>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import axios from "axios";
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net-bs5";
import Cookies from "js-cookie";
DataTable.use(DataTablesLib);

export default {
  components: {
    DataTable,
  },
  data() {
    return {
      isRequest: false,
      winlose: [],
      start_date: moment()
        .subtract(1, "months")
        .clone()
        .startOf("day")
        .format("YYYY-MM-DDTHH:mm"),
      end_date: moment().format("YYYY-MM-DDTHH:mm"),
      columns: [
        { data: "Username" },
        { data: "Amount" },
        { data: "StackCount" },
        { data: "TotalWinLoseCom" },
        { data: "ValidAmount" },
        // { data: "WinLose" },
        // { data: "WinLoseCom" },
      ],
      options: {
        searching: false,
        pageLength: 20,
        lengthChange: false,
        // ordering:  false
      },
    };
  },
  async created() {
    // await this.getReport("suggesting_v2");
    const payload = {
      start_date: moment().subtract(1, "months").unix(),
      // start_date: moment().unix(),
      end_date: moment().unix(),
    };
    // 1672074000
    // 1673424801
    this.getWinlose(payload);
    // console.log(moment().subtract(1, "months").unix());
    // console.log(moment().unix());
    // console.log(moment("3 ม.ค. 2023 18:39").locale("th").format("ll LT"));
  },
  methods: {
    onDateUpdate() {
      // console.log(this.start_date, this.end_date);
      // let reportUpdate = this.report.aaData.filter(item => {
      //     // const itemDate = new Date(item.register_at);
      //     console.log((item.register_at));
      //     // return itemDate >= this.start_date && itemDate <= this.end_date;
      // });
      // console.log(reportUpdate);
    },
    async getWinlose(payload) {
      this.isRequest = true;
      try {
        const { data } = await axios.post(
          import.meta.env.VITE_APP_API_URL + "/agent/suggesting/winlose",
          payload,
          { headers: { Authorization: Cookies.get("accessToken") } }
        );
        this.$store.dispatch("summary", data.summary);
        // const tmp = data
        this.winlose = data;
        this.winlose.data.map((val) => {
          delete val.WinLose;
          delete val.WinLoseCom;
          return val;
        });
        // console.log(data);

        // data.aaData = tmp.aaData.map(val => {
        //     let html = "";
        //     switch (val[1]) {
        //         case 0: html = '<span class="badge bg-secondary">สมาชิกใหม</span>'; break;
        //         case 1: html = '<span class="badge bg-success">สมาชิกทั่วไป</span>'; break;
        //         case 2: html = '<span class="badge bg-warning text-dark">สมาชิก VIP</span>'; break;
        //         case 3: html = '<span class="badge bg-danger">ระงับบัญชี</span>'; break;
        //         default: html = val[1]; break;
        //     }
        //     return {
        //         username: val[0],
        //         status: html,
        //         register_at: moment(val[2]).locale("th").format("L LT")
        //     }
        // })

        this.report = data;
      } catch (e) {
        alert(e);
        return;
      }
      this.isRequest = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "datatables.net-bs5";

.stcard {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.text-base {
  color: #d39205;
  font-size: 1.7rem;
}

#DataTables_Table_1>thead {
  background: #d39205;
}
</style>
