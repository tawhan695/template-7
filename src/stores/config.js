import { defineStore } from "pinia";
export const useConfigStore = defineStore("config", {
  state: () => ({
    Hack9nearSlot: import.meta.env.VITE_APP_HACK_9NEAR_SLOT == "true" ? true : false, // new v2
    fixed_percen: import.meta.env.VITE_APP_VIP_HACK_FIXED_PERCEN == "true" ? true : false,
    VipHackSlot: import.meta.env.VITE_APP_VIP_HACK_SLOT == "true" ? true : false,
    HackJackpot: import.meta.env.VITE_APP_HACK_JACKPOT_SLOT == "true" ? true : false,
    CodeBonus: import.meta.env.VITE_APP_CODE_BONUS == "true" ? true : false,
    RankUp: import.meta.env.VITE_APP_RANKING == "true" ? true : false,
    CheckIn: import.meta.env.VITE_APP_CHECK_IN == "true" ? true : false,
    LINE_REGITER: import.meta.env.VITE_APP_LINE_REGITER == "true" ? true : false,
    LINE_LOGIN: import.meta.env.VITE_APP_LINE_LOGIN == "true" ? true : false,
  }),
  actions: {},
  persist: true,
});
