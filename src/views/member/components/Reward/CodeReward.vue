<template>
    <form @submit.prevent="submitReward()">
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="กรอกโค้ด" required v-model="codeReward">
            <button class="btn btn-warning" type="submit" id="button-addon2">ยืนยัน</button>
        </div>

    </form>
</template>

<script>
import axios from 'axios';
import Cookies from "js-cookie";
import Swal from 'sweetalert2';
import moment from "moment";
import $ from "jquery";
import { useUserStore } from '../../../../stores/user';

export default {
    setup() {
        const Userstore = useUserStore();
        return {
            Userstore
        }
    },
    data() {
        return {
            codeReward: "",
            HEADERS: {
                Authorization: 'Bearer ' + Cookies.get('accessToken'),
                'Content-Type': 'application/json'
            },
            SWAL_CONFIG: {
                showConfirmButton: false,
                timer: 1700,
                position: 'top-end',
                customClass: {
                    popup: "swall-cashback",
                },
            }
        }
    },
    methods: {
        submitReward() {
            (this.codeReward.length === 10) ? this.redeemGame() : this.redeemAMBxUFA();
        },
        redeemAMBxUFA() {
            Swal.fire({
                title: 'รอสักครู่!',
                html: 'กำลังโหลด',
                timerProgressBar: true,
                customClass: {
                    popup: "swall-cashback",
                    loader: "swall-loader"
                },

                didOpen: async () => {

                    Swal.showLoading()
                    await axios.request({
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: `${import.meta.env.VITE_API_URL}/user/deposit/reward/code?code=${this.codeReward}`,
                        headers: this.HEADERS,
                    })
                        .then(({ data }) => {
                            if (!data.error) {
                                const action = data.data.data.action
                                const amount = data.data.data.data.amount
                                Swal.close()
                                Swal.fire({
                                    ...this.SWAL_CONFIG,
                                    customClass: {
                                        popup: "swall-cashback",
                                        icon: 'no-border'
                                    },
                                    // icon: 'success',
                                    iconHtml: '<img width="118" src="' + new URL("../../../../assets/img/ic-cheked.png", import.meta.url).href + '">',
                                    title: `สำเรีจ`,
                                    text: `ยินดีด้วยคุณได้รับ ${action} จำนวน ${amount}`,
                                })

                            } else {
                                Swal.close()
                                Swal.fire({
                                    ...this.SWAL_CONFIG,
                                    icon: 'error',
                                    title: `ผิดพลาด`,
                                    text: `${data.error.msg}`,
                                })
                            }
                        })
                        .catch((error) => {
                            Swal.close()
                            Swal.fire({
                                ...this.SWAL_CONFIG,
                                icon: 'error',
                                text: `${JSON.stringify(error)}`,
                            })
                        });
                    this.codeReward = ""
                },
            })
        },
        async redeemGame() {
            let formData = new FormData();
            formData.append("code", this.codeReward);
            formData.append("type", 'bonus');
            formData.append(
                "user",
                this.Userstore.userProfile.phoneNo + " : " + this.Userstore.users.amb.username
            );

            axios
                .post(`${import.meta.env.VITE_CODEHACK_API}/api/redeem`, formData, { headers: { 'x-api-key': import.meta.env.VITE_CODEHACK_KEY, } })
                .then(({ data }) => {
                    // console.log(data);
                    let message = "";
                    if (data.status == "success") {
                        localStorage.setItem("code_bonus_timeout", data.timeout);
                        message = data.message + moment(localStorage.getItem("code_bonus_timeout")).locale("th").format("H:mmน. Do MMM YYYY");
                    } else message = data.message;

                    Swal.fire({
                        title: "" + data.status,
                        html: message,
                        icon: data.status,
                    });
                    $(".progress-bar").animate({ width: "100%", }, 1500);
                    // this.loadCountdown();
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(() => {
                    this.code = "";
                    // this.checkRedeemCode();
                });
            this.codeReward = ""
        },
    },
}
</script>

<style lang="scss" scoped>
.input-group {
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;

    .btn.btn-warning {
        background: linear-gradient(0deg, #d89400, #d8a600, #f6cf4f);
        border: none;
    }
}
</style>