import axios from "axios";
import Cookies from "js-cookie";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import Swal from "sweetalert2";

const selector = Cookies.get('selector') ? Cookies.get('selector') : { text: 'amb', num: 1 };

export const useUserStore = defineStore({
    id: "user",
    persist: true,
    state: () => ({
        userProfile: {},
        selector,
        users: {
            amb: { active: true, logo: new URL("../assets/logo.webp", import.meta.url).href },
            ufa: { active: false, logo: new URL("../assets/logo-ufa.png", import.meta.url).href }
        },
        returnLose: {
            loss:0,
            returnLostPercent:0

        }
    }),
    actions: {
        depositWithPromotion(payload) {
            // payload
            // let dataPayload = {
            //     proId: payload.proId,
            //     bankCode: payload.bankCode,
            //     bankAccount: payload.bankAccount,
            //     ag: 1,
            //     amount: payload.amount
            // }

            // console.log(dataPayload);

            return axios.post(import.meta.env.VITE_API_URL + '/user/promotion', payload, { headers: { 'Authorization': 'Bearer ' + Cookies.get('accessToken') } })
                .then(({ data }) => {
                    return Promise.resolve(data)
                })
                .catch(error => {
                    // Swal.showValidationMessage(
                    //     `Request failed: ${error}`
                    // )
                    console.log(error);
                })

        },
        getProfile() {
            return axios.get(import.meta.env.VITE_API_URL + '/user/profile', { headers: { 'Authorization': 'Bearer ' + Cookies.get('accessToken') } })
                .then(({ data }) => {
                    if (!data.error) {
                        this.userProfile = data.data
                        Object.assign(this.users.amb, data.data.users[1])
                        Object.assign(this.users.ufa, data.data.users[2])
                    } else alert(data.error.msg)
                    return Promise.resolve(data)
                }).catch(e => {
                    useAuthStore().Logout()
                    alert(e.message)
                    window.location.href = "/login"
                })
        },
        postWithdraw(payload) {
            const dataPayload = {
                username: this.userProfile.users[this.selector.num].username,
                amount: payload.amount,
                isWallet: payload.selectWithdrawBank == 'wallet'
            }
            Swal.fire({
                title: 'ยืนยันถอนเงิน',
                confirmButtonText: 'ตกลง',
                showLoaderOnConfirm: true,
                icon: "question",
                customClass: {
                    popup: "swall-cashback",
                    confirmButton: 'btn -submit mx-1',
                    cancelButton: 'btn -cancel mx-1',
                },
                preConfirm: () => {
                    return axios.post(import.meta.env.VITE_API_URL + '/user/withdraw/', dataPayload, { headers: { 'Authorization': 'Bearer ' + Cookies.get('accessToken') } })
                        .then(({ data }) => {
                            return Promise.resolve(data)
                        })
                        .catch(error => {
                            Swal.showValidationMessage(
                                `Request failed: ${error}`
                            )
                        })
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({ 
                        iconHtml: '<img width="118" src="' + new URL("../assets/img/ic-cheked.png", import.meta.url).href + '">',
                        text: result.value.error.msg,
                        customClass: {
                            popup: "swall-cashback",
                            confirmButton: 'btn -submit mx-1',
                            cancelButton: 'btn -cancel mx-1',
                        }
                    })
                }
            })

        },
        async postChangeUserAgent() {
            const { username, agent } = this.userProfile.users[this.selector.num];

            try {
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/user/change/ag`, { username, agent }, { headers: { 'Authorization': `Bearer ${Cookies.get('accessToken')}` } });

                if (this.selector.text === "amb") {
                    const credit = data.data.credit;
                    this.userProfile.users[this.selector.num].credit = credit;
                    this.users[this.selector.text].credit = credit;
                }

                return Promise.resolve(data)
            } catch (error) {
                useAuthStore().Logout()
                console.error("/user/change/ag", error.message);
                alert(error.message)
                window.location.href = "/"
            }
        },
        async getReport(payload) {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/${payload}/history/?limit=50&ag=0`, { headers: { 'Authorization': `Bearer ${Cookies.get('accessToken')}` } });
                return Promise.resolve(data)
            } catch (error) {
                console.error(error.message);
                if (error.response && error.response.data && error.response.data.error) {
                    alert(error.response.data.error.msg);
                }

            }
        },

        setSelector(payload) {
            let selector = {}
            switch (payload) {
                case "amb": selector = { text: 'amb', num: 1 }; break;
                case "amb2": selector = { text: 'amb', num: 1 }; break;
                case "ufa": selector = { text: 'ufa', num: 2 }; break;
                default: break;
            }
            this.selector = selector
            this.users.amb.active = false
            this.users.ufa.active = false
            this.users[selector.text].active = true
            Cookies.set('selector', JSON.stringify(selector), { expires: 7, secure: true, sameSite: 'strict' })

        },

        getReturnLose() {

            const selec = this.selector.num;
            return axios.get(`${import.meta.env.VITE_API_URL}/user/return/loss/?ag=${selec}`, { headers: { 'Authorization': 'Bearer ' + Cookies.get('accessToken') } })
                .then(({ data }) => {
                    this.returnLose = data.data
                    return Promise.resolve(data)
                }).catch(e => {
                    useAuthStore().Logout()
                    alert(e.message)
                    window.location.href = "/login"
                })

        }

    }
})

export const useTop10 = defineStore({
    id: "top10",
    state: () => ({

    }),
    actions: {
        async getData(type) {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL_2}/member/topchart/${type}?limit=10`);
                return data
            } catch (error) {

                return {}
            }
        }
    }
})