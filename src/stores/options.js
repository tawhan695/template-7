import axios from "axios";
// import Cookies from "js-cookie";
import { defineStore } from "pinia";
export const useOptionStore = defineStore("option", {
  state: () => ({
    VIP_Hack_Slot: false,
    Hack_9near_Slot: false, // new v2
    Hackjackpot: false,
    CodeBonus: false,
    fixed_percen: false,
    ShowRecapcha: false,
    modelLogin: null,
    modelRank: null,
    // modelRewards: null,
    modelMenu: null,
    modelPromotion: "show",
    model_Promotion: null,
    code_bonus_timeout: null,
    iSLogin: true,
    iSRegister: false,
    code_max_timeout: 0,
    game_max_list: null,
    vipgamelist: null,
    Setviphackedgames: null,
    Line: [],
    dataPromotion: {
      data: [],
    },
    dataPromotionPopup: {
      data: [],
    },
    hack9near:{
      float:true,
      terminal:false,
      code:'',
      rungame:false
    }
  }),
  getters: {
    getLine: (state) => state.Line.url,
    getPromotions: (state) => state.dataPromotion,
    getPromotionsPopup: (state) => state.dataPromotionPopup,
  },
  actions: {
    LinkContact() {
      window.open(this.Line.url, "_blank");
    },
    async getPromotion() {
      const { data } = await axios.get(import.meta.env.VITE_CODEHACK_API + "/api/promotion/images/" + import.meta.env.VITE_CODEHACK_KEY);
      this.dataPromotion = data;
    },
    async getPromotion_Deposit() {
      const { data } = await axios.post(import.meta.env.VITE_CODEHACK_API + "/api/promotion/detail/" + import.meta.env.VITE_CODEHACK_KEY);
      this.dataPromotion = data;
    },
    async getPromotionPopup() {
      const { data } = await axios.get(
        import.meta.env.VITE_CODEHACK_API + "/api/promotion/popup/images/" + import.meta.env.VITE_CODEHACK_KEY);
      this.dataPromotionPopup = data;
    },
    async getLineContact() {
      const { data } = await axios.get(import.meta.env.VITE_CODEHACK_API + "/api/contact/" + import.meta.env.VITE_CODEHACK_KEY);
      this.Line = data;
    },
  },
  persist: true,
});
