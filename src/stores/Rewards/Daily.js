import { defineStore } from "pinia";
import { useConfigStore } from "../config";
import axios from "axios";
import Cookies from "js-cookie";

export const useDailyRewardStore = defineStore({
    id: "dailyReward",
    persist: true,
    state: () => ({
        REWORDS_SHOW_FRIST: false,
        Rewards: null,
        RewardTotol: 0,
        modelRewards: null,
    }),
    actions: {
        getBonus() {
            if (useConfigStore().CheckIn) {
                axios
                    .get(import.meta.env.VITE_API_URL_2 + "/member/loginBonus", {
                        headers: { Authorization: Cookies.get("accessToken") },
                    })
                    .then(async (data) => {
                        this.Rewards = data.data;
                        this.RewardTotol = data.data.dayTotal + 1;
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        },
    }
})