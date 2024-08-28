<template>
  <div class="card card-member mb-3">
    <div class="card-body text-white">
      <!-- <h4 class=""><img src="@/assets/icons/icons8_user_groups_96px.png" style="width: 50px;"> ระบบพันธมิตร</h4> -->

      <ul>
        <li>
          <span class="badge bg-secondary">สมาชิกใหม่</span>
          สมาชิกที่สมัครแล้วแต่ยังไม่มีรายการฝาก
        </li>
        <li>
          <span class="badge bg-success">สมาชิกทั่วไป</span>
          สมาชิกที่สมัครและมีรายการฝากเล่นแล้ว
        </li>
        <li>
          <span class="badge bg-warning text-white">สมาชิก VIP</span>
          สมาชิกที่มีสิทธิพิเศษ และเป็นนักเล่นดีเด่น
        </li>
        <li>
          <span class="badge bg-danger">ระงับบัญชี</span> สมาชิกที่ถูกระงับบัญชี
        </li>
      </ul>
    </div>
  </div>
  <div class="card text-black m-0 p-0 bg-white">
    <div class="card-body">
      <div class="row">
        <div class="col-6">
          <input class="form-control" type="datetime-local" v-model="start_date" @change="onDateUpdate()" />
        </div>
        <div class="col-6">
          <input class="form-control" type="datetime-local" v-model="end_date" @change="onDateUpdate()" />
        </div>
      </div>
      <div class="text-center my-3" v-show="isRequest">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div class="table-responsive">
        <DataTable class="table table-hover table-striped" :data="report.aaData" :columns="columns" :options="options">
          <thead>
            <tr>
              <th scope="col">Unername</th>
              <th scope="col">สถาณะ</th>
              <th scope="col">วันที่</th>
            </tr>
          </thead>
        </DataTable>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import axios from "axios";
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net-bs5";
import { useInviteStore } from "@/stores/invite";
import Cookies from "js-cookie";
DataTable.use(DataTablesLib);

export default {
  name: "register-member",
  setup() {
    const invite = useInviteStore();
    return {
      invite,
    };
  },
  components: {
    DataTable,
  },
  data() {
    return {
      isRequest: false,
      report: [],
      allreport: [],
      start_date: moment().clone().startOf("day").format("YYYY-MM-DDTHH:mm"),
      end_date: moment().format("YYYY-MM-DDTHH:mm"),
      columns: [
        { data: "username" },
        { data: "status" },
        { data: "register_at" },
      ],
      options: {
        searching: false,
        pageLength: 20,
      },
    };
  },
  mounted() {
    this.init_();
  },
  created() {
    // console.log(this.tempData.aaData[0]);
    // console.log(moment("3 ม.ค. 2023 18:39").locale("th").format("ll LT"));
  },
  methods: {
    async init_() {
      await this.getReport("suggesting_v2");
      // await this.onDateUpdate();
    },
    onDateUpdate() {
      this.isRequest = true;
      this.report.aaData = [];
      console.log("onDateUpdate");
      let reportUpdate = this.allreport.filter((item) => {
        // const itemDate = new Date(item.register_at);
        let start_at = new Date(this.start_date).getTime();
        // let end_at = new Date(this.end_date).getTime();
        let date = new Date(item.register_at).getTime();
        // console.log(date, start_at, date >= start_at);
        if (date >= start_at) {
          //   console.log(item);
          return item;
        }
      });
      this.report.aaData = reportUpdate;
      this.isRequest = false;
      // console.log(reportUpdate);
    },
    async getReport(action) {
      this.isRequest = true;
      try {
        const { data } = await axios.post(
          import.meta.env.VITE_APP_API_URL + "/member/menu/reports",
          { action },
          { headers: { Authorization: Cookies.get("accessToken") } }
        );
        if (data.status == "error") {
          alert("เกิดข้อผิดพลาด");
          return 0;
        }
        // console.log(data);
        const tmp = data;
        this.invite.setiTotalRecords(data.iTotalRecords);
        this.tempData = tmp;

        data.aaData = tmp.aaData.map((val) => {
          let html = "";
          switch (val[1]) {
            case 0:
              html = '<span class="badge bg-secondary">สมาชิกใหม่</span>';
              break;
            case 1:
              html = '<span class="badge bg-success">สมาชิกทั่วไป</span>';
              break;
            case 2:
              html =
                '<span class="badge bg-warning text-white">สมาชิก VIP</span>';
              break;
            case 3:
              html = '<span class="badge bg-danger">ระงับบัญชี</span>';
              break;
            default:
              html = val[1];
              break;
          }
          return {
            username: val[0],
            status: html,
            register_at: moment(val[2]).locale("th").format("L LT"),
          };
        });
        this.allreport = data.aaData;
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

.badge {
  width: 94px;
}
</style>
