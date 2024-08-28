import { defineStore } from "pinia";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserStore } from "../user";
export const useSpinStore = defineStore("spin", {
  state: () => ({
    spinActive: false,
    ip: null,
    messageSuccess: null,
  }),
  actions: {
    async getExternalIP() {
      let ipv4 = await axios.get("https://ipinfo.io/ip");
      let ipv6 = await axios.get("http://icanhazip.com");

      this.ip = { ipv4: ipv4.data.trim(), ipv6: ipv6.data.trim() };

      return { ipv4: ipv4.data.trim(), ipv6: ipv6.data.trim() };
    },
    async getSpinStart() {
      const config = {
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
        errorHandle: false,
      };
      const currentRequest = await axios
        .get(import.meta.env.VITE_API_URL_2 + `/gamePoint/spin`, config)
        .catch((error) => {
          alert(error.message), (window.location.href = "/member");
        });

      let currentData = [];
      if (currentRequest.data.isActive) {
        currentRequest.data.data.map((item) => {
          currentData.push({
            id: item.id,
            text: item.msg + "",
            fillStyle: item.color,
          });
        });

        const UserStore = useUserStore();

        UserStore.userProfile.diamond = currentRequest.data.creditBonus
        

        this.spinActive = currentRequest.data.isActive;
        return currentData;
      }
    },

    async setSpinStart() {
      const UserStore = useUserStore();
      const config = { headers: { Authorization: Cookies.get("accessToken") } };
      const payload = { action: "getresult", creditBonus: UserStore.userProfile.diamond, ag: UserStore.selector.text };
      const { data } = await axios
        .post(import.meta.env.VITE_API_URL_2 + "/gamePoint/spin", payload, config)
        .catch((error) => {
          alert(error.message), (window.location.href = "/member");
        });
      if (data.status == "error") {
        alert(data.message); 
      } else {
        this.messageSuccess = data.data.msg;
        UserStore.userProfile.diamond = data.creditBonus;
        console.log(data.creditBonus);
        return data.data.id;
      }
    },
  },
  persist: false,
});
