import { defineStore } from 'pinia'
import axios from 'axios'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import { CASINO_LIST, SLOT_LIST } from '@/mixins/data'
import { isMobile } from 'mobile-device-detect'
import { useUserStore } from './user'
import { useAuthStore } from './auth'
import { useGameOnesoft } from './gameOnesoft'
import { event } from 'vue-gtag'

// import {useUserStore} from "./user"
export const useGamesStore = defineStore('games', {
  state: () => ({
    Game: null,
    GameFishing: null,
    list: null,
    LOTTO: null,
    CASINO: null,
    SLOT: null,
    CARD: null,
    TRADING: null,
    KENO: null,
    HEADERS: {
      Authorization: 'Bearer ' + Cookies.get('accessToken'),
      'Content-Type': 'application/json'
    },
    userData: {
      username: useUserStore().userProfile.users[1].username,
      password: useUserStore().userProfile.password
    },
    entrance_url: null
  }),
  actions: {
    async entrance() {
      const data = {
        action: 'all',
        game: 'all',
        gameId: '',
        ...this.userData
      }
      return await axios
        .post(import.meta.env.VITE_API_URL + '/user/play', data, {
          headers: { Authorization: 'Bearer ' + Cookies.get('accessToken') }
        })
        .then((response) => {
          if (response.status == 201 && !response.data.error) {
            this.CONFIG = response.data.config
            let url = response.data.data
            url = url.replace('taipebet.com', 'casinozxc.com')
            url = !isMobile ? url.replace('m.casinozxc.com', 'casinozxc.com') : url
            // url = url.replace("m.casinozxc.com", "casinozxc.com")
            url += '&url=' + window.location.href // window.location.origin;
            this.entrance_url = url
            return url
          }
        })
        .catch((e) => {
          window.location.href = '/member'
          return e
        })
    },
    async getGameAll(user) {
      user
      if (Cookies.get('accessToken')) {
        await axios({

          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://status-read.onestars.cloud/TAIPEBET',
          headers: {}
        })
          .then(async ({ data }) => {
            if (!data.error) {
              const GameList = data.data.list
              this.list = GameList
              //    console.log('GameList',GameList);
              // จัดกลุ่มเกม
              let DataSlot = []
              const groupByType = GameList.reduce((group, data) => {
                const { type } = data
                if (type == 'SLOT') {
                  // หาไทป์ SLOT
                  group[type] = group[type] ?? []
                  group[type].push(data)
                  DataSlot = DataSlot.concat(data.gamesList)
                } else {
                  group[type] = group[type] ?? []
                  group[type].push(data)
                }
                return group
              })
              const groupByType_2 = DataSlot.reduce((group, data) => {
                const { gameType, active } = data
                if (gameType === 'FISHING' && active === true) {
                  group[gameType] = group[gameType] ?? []
                  group[gameType].push(data)
                }
                return group
              })
              //    console.log('groupByType',groupByType);
              this.Game = groupByType
              this.LOTTO = groupByType.LOTTO
              groupByType.TRADING[0].img = 'trading/hotgraph.jpg'
              this.TRADING = groupByType.TRADING
              this.KENO = groupByType.KENO[0].gamesList
              // this.CARD = groupByType.CARD;
              this.CARD = []
              Object.entries(groupByType.CARD).forEach((key) => {
                let arr1 = key[1].gamesList
                this.CARD = this.CARD.concat(arr1)
              })

              this.CASINO = groupByType.LIVE.map((e) => {
                let game = CASINO_LIST.find((item) => item.gameId == e.productCode)
                if (game != undefined) {
                  e.img = game.img
                } else {
                  e.img = null
                }
                return e
              })
              this.SLOT = groupByType.SLOT.map((e) => {
                let game = SLOT_LIST.find((item) => item.gameId == e.productCode)
                if (game != undefined) {
                  e.img = game.img
                } else {
                  e.img = null
                }
                return e
              })

              this.GameFishing = groupByType_2.FISHING
              // Get gamew one soft 
              const data_onesoft = await useGameOnesoft().getGameAll();
              if (data_onesoft.status == 200) {
                this.SLOT = [data_onesoft.data.data, ...this.SLOT]
              }
              // Get gamew one soft
            }
          })
          .catch((res) => {
            alert(res)
            if (res.response.status == 401) {
              useAuthStore().Logout()
            }
          })
      }
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

    async ufaLogin() {
      return await axios.post(import.meta.env.VITE_UFA_LOGIN_API + '?mobile=' + isMobile)
    },

    async gameList(gameType) {

      return await axios({
        method: 'post',
        url: import.meta.env.VITE_API_URL + '/user/play/v2',//'https://ambxufa3.tawin65.com/api/user/play/v2',
        headers: this.HEADERS,
        data: JSON.stringify({
          "action": "gameList",
          "gameType": gameType
        })
      })
        .catch(({ response }) => {
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
    /*
    async gameListALL() {
      return await axios({
        method: 'post',
        url: import.meta.env.VITE_API_URL + '/user/play/v2',//'https://ambxufa3.tawin65.com/api/user/play/v2',
        headers: this.HEADERS,
        data: JSON.stringify({
          "action": "gameListAll",
          "gameType": "all"
        })
      })
        .catch(({ response }) => {
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
    }
    */
  },

  persist: true
})
