import axios from "axios";
import Cookies from "js-cookie";
import { defineStore } from "pinia";
import Swal from "sweetalert2";
import { useAuthStore } from "./auth";
import { useUserStore } from "./user";
import { event } from "vue-gtag";

export const useGameOnesoft = defineStore({
    id: "onesoft",
    persist: true,
    state: () => ({
        HEADERS: {
            Authorization: 'Bearer ' + Cookies.get('accessToken'),
            'Content-Type': 'application/json'
        },
        userData: {
            username: useUserStore().userProfile.users[1].username,
            password: useUserStore().userProfile.password
          },
    }),
    actions: {
        async getGameAll() {

            return await axios.get(`${import.meta.env.VITE_API_ONE_SOFT}/api/games/list`)
                .then((data) => {
                    return Promise.resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                })

        },
        async gameloginonesoft(gameId, vendername,name) {

            event('gamelogin', {
                'event-label': 'game-login-onesoft',
                value: { vendername,gameId,name }
              })

            if (useUserStore().userProfile.role == 0) {
                Swal.fire({
                    title: 'แจ้งเตือน',
                    text: 'กรุณาทำรายการฝาก เพื่อยืนยันการเปิดบัญชี',
                    icon: 'warning'
                }).then(() => {
                    window.location.href = '/member/deposit'
                    // This.$router.push("/member/deposit");
                })
                return
            }
            Swal.fire({
                title: 'รอสักครู่!',
                html: 'กำลังโหลดเกม',
                timerProgressBar: true,
                didOpen: async () => {
                    try {
                        Swal.showLoading()
                        let { data } = (vendername == "onesoft2") ? await this.getlinkOnessoft2("onesoft", gameId) : await this.getlinkonesoft(vendername, gameId)
                        if (data.data ?? data.url != null) {
                            window.location.href = data.url ?? data.data
                            Swal.close()
                        } else Swal.fire('ขออภัย', data.error ? data.error : 'เกิดข้แผิดพลาด', 'warning')



                    } catch (error) {
                        console.log('ERROR', error)
                        Swal.fire('ขออภัย', error.error.msg, 'warning')
                        Swal.close()
                    }
                }
            })
        },

        getlinkonesoft(game, gameId) {
            return axios({
                method: 'post',
                url: `${import.meta.env.VITE_API_ONE_SOFT}/api/user/play`,
                headers: this.HEADERS,
                data: JSON.stringify({ action: 'login', game: game, gameId: gameId, ...this.userData, codesite: import.meta.env.VITE_API_ONE_KEY })
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

        getlinkOnessoft2(game, gameId) {
            return axios({
                method: "post",
                url: import.meta.env.VITE_API_URL_2 + "/member/menu/play",
                headers: {
                    Authorization: Cookies.get('accessToken'),
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({ action: "login", game, gameId }),
            }).catch(({ response }) => {
                if (response.status == 401) {
                    // console.log(response);
                    Cookies.remove("accessToken", { secure: true, sameSite: "strict" });
                    localStorage.clear();
                    Swal.fire({
                        icon: "error",
                        title: "ออกจากระบบ",
                    })
                        .then(() => {
                            window.location.reload(true);
                        });
                    return;
                }
                this.Toast.fire({
                    icon: "error",
                    title: response.data.message,
                });
                this.$router.push("/member");
            });
        },
    }
})