import axios from "axios";
import Cookies from "js-cookie";
import { decode } from "jsonwebtoken-esm";
import { defineStore } from "pinia";
import { Toast } from "../plugins/SweetAlert";
import { event } from 'vue-gtag'

export const useAuthStore = defineStore({
    id: "auth",
    persist: true,
    state: () => ({
    }),
    actions: {
        Login(payload) {

            return axios.post(import.meta.env.VITE_API_URL + '/auth/login', payload)
                .then((response) => {
                    let data = response.data;
                    if (!data.error) {
                        let userData = decode(data.data.accessToken)
                        localStorage.USERNAME = userData.usernames;

                        event('login', {
                            'event-label': 'user-login',
                            value: userData.usernames
                        })
                        /**
                         * chat kk
                         */
                        localStorage.setItem("username_guest", localStorage.getItem("username"));
                        localStorage.setItem("role", 'member')
                        localStorage.setItem("sessionID", JSON.parse(userData.usernames)[0])
                        localStorage.setItem("username", JSON.parse(userData.usernames)[0]);
                        Cookies.set("sessionID", JSON.parse(userData.usernames)[0])
                        //...
                        Cookies.set('accessToken', data.data.accessToken, { expires: new Date(userData.exp * 1000), secure: true, sameSite: 'strict' })
                        Cookies.set('refreshToken', data.data.refreshToken, { expires: new Date(userData.exp * 1000), secure: true, sameSite: 'strict' })

                        Toast.fire({ icon: "success", title: "เข้าสู่ระบบสำเร็จ" })
                        this.checkSession()
                    } else Toast.fire({ icon: "error", title: data.error.msg })
                    return Promise.resolve(data)
                }).catch(e => {
                    alert(e.message)
                })
        },
        async checkSession() {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL_2}/member/checkSession`, { headers: { 'Authorization': `${Cookies.get('accessToken')}` } });
                return Promise.resolve(data)
            } catch (error) {
                console.error(error.message);
                if (error.response && error.response.data && error.response.data.error) {
                    alert(error.response.data.error.msg);
                }
            }
        },

        Logout() {
            Cookies.remove('accessToken', { secure: true, sameSite: 'strict' })
            Cookies.remove('refreshToken', { secure: true, sameSite: 'strict' })

            localStorage.clear();

        }
    }
})