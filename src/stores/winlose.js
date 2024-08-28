import axios from "axios";
import Cookies from "js-cookie";
import { defineStore } from "pinia";
export const useWinloseStore = defineStore("winlose", {
  persist: true,
  state: () => ({
    com: {
      summary: {
        Amount: 0,
        Share: 0,
        StackCount: 0,
        TotalWinLoseCom: 0,
        ValidAmount: 0,
        WinLose: 0,
        WinLoseCom: 0,
      }
    },
    mlm: {
      summary: {
        Amount: 0,
        Share: 0,
        StackCount: 0,
        TotalWinLoseCom: 0,
        ValidAmount: 0,
        WinLose: 0,
        WinLoseCom: 0,
      }
    },
  }),
  actions: {

   async getReportCOM() {
      this.com = await this.getReport('com')
    },
    async getReportMLM(){
      this.mlm = await this.getReport('mlm')
    },

    async getReport(type) {
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL_2}/agent/suggesting/winlose`,
          { type },
          { headers: { Authorization: `${Cookies.get("accessToken")}` } });

        if (!data.error) {
          return data
        } else {
          alert(data.error.msg);
          window.location.href = "/member"
        }
      } catch (error) {
        alert(error.message);
        window.location.href = "/member"
      }
    }
  },

});
