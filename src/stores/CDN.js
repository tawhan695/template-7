import { defineStore } from "pinia";

export const useCDN = defineStore({
    id: "auth",
    persist: true,
    state: () => ({
        creditBonus: 0,
    }),
    actions:{
        
    }
})