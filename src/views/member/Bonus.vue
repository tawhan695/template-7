<template>
    <br><br>
    <div class="container">
        <div class="card card-member">
            <div class="card-body text-dark ">
                <h2>รายการโบนัส</h2>

                <div class="card bg-light card-member">
                    <div class="px-1 py-1 text-center">
                        <div class="btn-group btn-group-sm" role="group" aria-label="Basic radio toggle button group">
                            <input type="radio" class="btn-check" name="rd" id="game" checked />
                            <label class="btn btn-outline-primary" for="game" @click="setFilter('game')">เกมส์</label>
                            <input type="radio" class="btn-check" name="rd" id="cashback" />
                            <label class="btn btn-outline-primary" for="cashback" @click="setFilter('cashback')">คอมมิสชั่น</label>
                            <input type="radio" class="btn-check" name="rd" id="admin"  />
                            <label class="btn btn-outline-primary" for="admin" @click="setFilter('admin')">โปรโมรชั่น</label>
                            <input type="radio" class="btn-check" name="rd" id="mlm" />
                            <label class="btn btn-outline-primary" for="mlm" @click="setFilter('mlm')">พันธมิตร</label>
                            <input type="radio" class="btn-check" name="rd" id="b1"  />
                            <label class="btn btn-outline-primary" for="b1" @click="setFilter('')">ทั้งหมด</label>

                        </div>

                    </div>
                    <div class="text-center my-3" v-show="isRequest">
                        <div class="spinner-border text-secondary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>

                    <div class="card-body text-dark text-center px-0" v-show="!isRequest">
                        <table class="table table-sm">
                            <thead>
                                <tr>
                                    <th scope="col" class="text-start">วันที่ทำรายการ</th>
                                    <th scope="col" class="text-end">
                                        <span v-if="report.data">เครดิต</span>
                                    </th>
                                    <th scope="col">รายการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="list in reportDataFilter" :key="list.key" style="font-size: 10pt">
                                    <td class="text-start">{{ $filters.moment(list.time) }}</td>
                                    <td class="text-end">{{ toCurrency(list.bonus || list.amount) }} ฿</td>
                                    <td>
                                        <span class="badge"
                                            :class="list.type == 'ฝาก' ? 'bg-info' : 'bg-warning text-dark'">
                                            {{ convertBonusTextType(list.type) }}
                                        </span>
                                        <small v-show="list.bank">({{ list.bank }})</small>
                                    </td>
                                    <td>
                                        <button v-if="list.status == 0 && list.token != '' && list.token"
                                            class="btn btn-sm btn-success" @click="redeemBonus(list.token, list.bonus)">
                                            รับโบนัส
                                        </button>
                                        <span v-else-if="list.status == 2" class="text-danger">
                                            <i class="fa fa-times-circle" aria-hidden="true"></i> สละสิทธิ์
                                        </span>
                                        <div v-else-if="list.status == 4">
                                            <button class="btn btn-sm btn-secondary" disabled>รับโบนัส</button>
                                            <br>
                                            <small v-if="report.notice" class="text-danger">
                                                ช่วงเวลารับ <br class="d-sm-none" /> {{ report.notice }}
                                            </small>
                                        </div>
                                        <span v-else class="text-success">
                                            <i class="fa fa-check-circle" aria-hidden="true"></i>
                                            รับแล้ว
                                        </span>
                                    </td>

                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <br /><br /><br /><br /><br />
</template>
<script>
import Cookies from "js-cookie"
import axios from 'axios';
import { useAuthStore } from "../../stores/auth";
import Swal from "sweetalert2";

export default {
    name: "Member.History",
    setup() {
        const authStore = useAuthStore();
        return {
            authStore
        }
    },

    data() {
        return {
            report: {
                data: [],
            },
            isRequest: false,
            filter: ""
        };
    },
    computed: {
        reportDataFilter() {
            return this.filter ? this.report.data.filter(e => e.type == this.filter) : this.report.data
        }
    },

    created() {
        this.getReport('rewards')
        this.setFilter('game')

    },
    methods: {
        async getReport(action) {

            try {
                this.isRequest = true;
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL_2}/member/menu/reports`, { action: action }, { headers: { Authorization: `${Cookies.get("accessToken")}` } });
                if (!data.error) {
                    this.report = data;
                } else {
                    alert(data.error.msg);
                }
            } catch (error) {
                // console.error(error.message);
                alert(error.message);
                this.$store.push("/member")
            } finally {
                this.isRequest = false;
            }
        },
        async redeemBonus(token, bonus) {

            try {
                this.isRequest = true;
                const payload = { action: "rewards", token, bonus, username: this.report.username }
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL_2}/member/getBonus`, payload, { headers: { Authorization: `${Cookies.get("accessToken")}` } });
                if (!data.error) {
                    Swal.fire("เรียบร้อย", data.message, data.status);
                    this.getReport("rewards");
                } else {
                    alert(data.error.msg);
                }
            } catch (error) {
                alert(error.message);
                this.$store.push("/member")
            } finally {
                this.isRequest = false;
            }

        },
        convertBonusTextType(txt) {
            switch (txt) {
                case "game": return "เกมส์";
                case "cashback": return "คอมมิสชั่น";
                case "admin": return "โปรโมรชั่น";
                case "mlm": return "พันธมิตร";
                default: return txt;
            }
        },
        setFilter(filter) {
            this.filter = filter
        }
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