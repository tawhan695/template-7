import axios from "axios";
import Cookies from "js-cookie";
import Swal from 'sweetalert2'
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { useUserStore } from './user'
import { event } from 'vue-gtag'

export const useGamesStoreV2 = defineStore("gamesV2", {
    persist: true,
    state: () => ({
        HEADERS: {
            Authorization: 'Bearer ' + Cookies.get('accessToken'),
            'Content-Type': 'application/json'
        },
        ListGamesAll: null,
        GAME_DATA: { Slot: null, Casino: null, Keno: null, Fish: null, Card: null, Trade: null, Poker: null, Esport: null, Cock: null, Sbo: null, Saba: null }
    }),
    actions: {
        async gameList(gameType) {
            return await axios({
                method: 'post',
                url: import.meta.env.VITE_API_URL + '/user/play/v2',//'https://ambxufa3.tawin65.com/api/user/play/v2',
                headers: this.HEADERS,
                data: JSON.stringify({
                    "action": "gameList",
                    "gameType": gameType
                })
            }).catch(({ response }) => {
                if (response.status == 401) {
                    useAuthStore().Logout()
                    this.Toast.fire({
                        icon: 'error',
                        title: response.data.message
                    })
                    this.$router.push('/member')
                    return
                }
                return response
            })
        },
        async setGameListAll() {

            // if (!this.ListGamesAll) {

           
            const { data } = await axios({
                method: 'get',
                url: import.meta.env.VITE_API_URL + '/user/play/v2/gamelists',
                headers: this.HEADERS,
            });

            // console.log(Object.keys(this.GAME_DATA).length);
            // console.log(Object.keys(this.GAME_DATA)[0]);

            /* // push to GAME_DATA
             for (let index = 0; index < Object.keys(this.GAME_DATA).length; index++) {
                 const key = Object.keys(this.GAME_DATA)[index];
                 this.GAME_DATA[key] = data.data[index]; 
             }
             */

            this.ListGamesAll = data;
        },
        async gamelogin(gameType, game, gameId) {

            event('gamelogin', {
                'event-label': 'game-login',
                value: { gameType, game, gameId }
            })

            if (useUserStore().userProfile.role != 0) {
                Swal.fire({
                    title: 'รอสักครู่!',
                    html: 'กำลังโหลดเกม',
                    timerProgressBar: true,
                    didOpen: async () => {
                        try {
                            Swal.showLoading()
                            let { data } = await this.getlink(gameType, game, gameId)
                            // console.log({gameType, game ,gameId} );
                            if (data.msg == "SUCCESS") {
                                window.location.href = data.data.uri
                                Swal.close()
                            } else Swal.fire('ขออภัย', data.error.msg, 'warning')
                        } catch (error) {
                            console.log('ERROR', error)
                            Swal.fire('ขออภัย', error.error.msg, 'warning')
                            Swal.close()
                        }
                    }
                })
            } else {
                Swal.fire('ขออภัย', 'กรุณาเติมเงินเพื่อเปิดสิทธิเล่นเกม', 'warning').then(() => {
                    window.location.href = '/member/deposit'
                })
            }
        },


        getlink(gameType, game, gameId) {
            return axios({
                method: 'post',
                url: import.meta.env.VITE_API_URL + '/user/play/v2',
                headers: this.HEADERS,
                data: JSON.stringify({ action: 'login', gameType, game, gameId, ...this.userData, from: 3, to: 1 })
            }).catch(({ response }) => {
                if (response.status == 401) {
                    useAuthStore().Logout()
                    this.Toast.fire({
                        icon: 'error',
                        title: response.data.message
                    })
                    this.$router.push('/member')
                    return
                }
                return response
            })
        },
    },

})