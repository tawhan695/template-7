<template>
    <div>
        <br />
        <div class="container">
            <div class="row">
                <div class="col-lg-8 m-md-auto col-12">
                    <div class="card card-member">
                        <div class="card-body text-dark">
                            <h2>ประวัติการทำรายการ</h2>

                            <div class="card bg-light card-member">
                                <div class="px-1 py-1 text-center">
                                    <div class="btn-group btn-group-sm" role="group"
                                        aria-label="Basic radio toggle button group">
                                        <input type="radio" class="btn-check" name="rd" id="b1" autocomplete="off"
                                            checked />
                                        <label class="btn btn-outline-primary" for="b1"
                                            @click="getReport('deposit')">ฝาก</label>
                                        <input type="radio" class="btn-check" name="rd" id="b2" autocomplete="off" />
                                        <label class="btn btn-outline-primary" for="b2"
                                            @click="getReport('withdraw')">ถอน</label>

                                    </div>
                                </div>
                                <div class="text-center my-3" v-show="isRequest">
                                    <div class="spinner-border text-secondary" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>

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
                                            <tr v-for="data in report.data" :key="data.key" style="font-size: 10pt">
                                                <td>{{ $filters.moment(data.uat) }}</td>
                                                <td>{{ toCurrency(data.bonus || data.amount) }} ฿</td>
                                                <td>
                                                    <HistoryDetail :detail="data" />
                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br /><br /><br /><br /><br />
    </div>
</template>
<script>
import { useUserStore } from '../../stores/user';
import HistoryDetail from "./components/HistoryDetail.vue"
export default {
    name: "Member.History",
    setup() {
        const userStore = useUserStore();
        return {
            userStore,
        };
    },
    data() {
        return {
            report: {
                data: "",
            },
            isRequest: false,
        };
    },
    components: {
        HistoryDetail
    },
    created() {
        this.getReport('deposit')
    },
    methods: {
        async getReport(action) {
            let x = await this.userStore.getReport(action)
            this.report = x;
        },
    },
};
</script>
  
<style lang="scss" scoped>
.btn-outline-primary {
    color: #29b6e9;
    border-color: #29b6e9;

    &:hover {
        color: #fff;
        background-color: #29b6e9;
        border-color: #29b6e9;
    }
}

.btn-check:checked+.btn-outline-primary {
    background-color: #29b6e9;
    border-color: #29b6e9;
}
</style>