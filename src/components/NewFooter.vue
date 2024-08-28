<template>
    <div class="max-w-4xl w-full mx-auto bg-gradient-to-b from-black to-black/30 pt-4">
        <h1 class='text-gradient-title text-center'>♠︎ สล็อตออนไลน์บนมือถือ ♣︎</h1>

        <div class='flex-row-default flex-wrap pt-3 md:!pt-6 gap-3 md:!gap-6 w-[90%] mx-auto'>

            <div class='w-[13%] h-auto rounded-full overflow-hidden drop-shadow-[0px_0px_5px_rgba(255,255,255,0.35)]'>
                <img src="../assets/img/icon/scb.png" alt="scb" />
            </div>

            <div class='w-[13%] h-auto rounded-full overflow-hidden drop-shadow-[0px_0px_5px_rgba(255,255,255,0.35)]'>
                <img src="../assets/img/icon/kbank.png" alt="kbank" />
            </div>

            <div class='w-[13%] h-auto rounded-full overflow-hidden drop-shadow-[0px_0px_5px_rgba(255,255,255,0.35)]'>
                <img src="../assets/img/icon/blbank.png" alt="blbank" />
            </div>

            <div class='w-[13%] h-auto rounded-full overflow-hidden drop-shadow-[0px_0px_5px_rgba(255,255,255,0.35)]'>
                <img src="../assets/img/icon/ksBank.png" alt="ksBank" />
            </div>

            <div class='w-[13%] h-auto rounded-full overflow-hidden drop-shadow-[0px_0px_5px_rgba(255,255,255,0.35)]'>
                <img src="../assets/img/icon/gsBank.png" alt="gsBank" />
            </div>

            <div class='w-[13%] h-auto rounded-full overflow-hidden drop-shadow-[0px_0px_5px_rgba(255,255,255,0.35)]'>
                <img src="../assets/img/icon/trueMoney.png" alt="trueMoney" />
            </div>

            <div class='w-[13%] h-auto rounded-full overflow-hidden drop-shadow-[0px_0px_5px_rgba(255,255,255,0.35)]'>
                <img src="../assets/img/icon/kkBank.png" alt="kkBank" />
            </div>

            <div class='w-[13%] h-auto rounded-full overflow-hidden drop-shadow-[0px_0px_5px_rgba(255,255,255,0.35)]'>
                <img src="../assets/img/icon/ktbank.png" alt="ktbank" />
            </div>

            <div class='w-[13%] h-auto rounded-full overflow-hidden drop-shadow-[0px_0px_5px_rgba(255,255,255,0.35)]'>
                <img src="../assets/img/icon/ttBank.png" alt="ttBank" />
            </div>
        </div>

        <div class='flex-col-default py-10'>
            <h1 class='text-gradient-title'>ID LINE : @TAWIN</h1>
            <a :href='lineLink' target="_blank" class='w-48 h-auto hover:scale-105 duration-300 pt-3'>
                <img src="../assets/img/icon/add-line-icon.png" alt="addLine" />
            </a>
        </div>

        <div class='flex-row-default justify-around items-end pb-4'>
            <router-link to="/login" class='btn-footer hover:scale-105 duration-200 active:scale-95'>
                <img src="../assets/img/icon/footer/home.png" alt="เข้าสู่ระบบ" class="w-10 md:!w-14 mx-auto" />
                <p class='drop-shadow-[0px_1px_2px_rgba(0,0,0)] text-footer'>เข้าสู่ระบบ</p>
            </router-link>

            <router-link to="/register" target="_bank" class='btn-footer hover:scale-105 duration-200 active:scale-95'>
                <img src="../assets/img/icon/footer/user.png" alt="สมัครสมาชิก" class="w-10 md:!w-14 mx-auto" />
                <p class='drop-shadow-[0px_1px_2px_rgba(0,0,0)] text-footer'>สมัครสมาชิก</p>
            </router-link>

            <router-link to="/member/deposit" target="_bank"
                class='btn-footer hover:scale-105 duration-200 active:scale-95'>
                <img src="../assets/img/icon/footer/wallet.png" alt="ฝากเงิน" class="w-10 md:!w-14 mx-auto" />
                <p class='drop-shadow-[0px_1px_2px_rgba(0,0,0)] text-footer'>ฝากเงิน</p>
            </router-link>

            <router-link to="/income" class='btn-footer hover:scale-105 duration-200 active:scale-95'>
                <img src="../assets/img/icon/footer/chart.png" alt="สร้างรายได้" class="w-10 md:!w-14 mx-auto" />
                <p class='drop-shadow-[0px_1px_2px_rgba(0,0,0)] text-footer'>สร้างรายได้</p>
            </router-link>

            <a :href="optionStore.Line.url" target="_bank" class='btn-footer hover:scale-105 duration-200 active:scale-95'>
                <img src="../assets/img/icon/footer/line.png" alt="ติดต่อเรา" class="w-10 md:!w-14 mx-auto" />
                <p class='drop-shadow-[0px_1px_2px_rgba(0,0,0)] text-footer'>ติดต่อเรา</p>
            </a>
        </div>

    </div>
</template>

<script>
import { useOptionStore } from "../stores/options";
export default {
    setup() {
        const optionStore = useOptionStore();

        return ({
            optionStore
        })

    },
    data() {
        return {
            lineLink: this.optionStore.Line.url
        };
    },

    created() {
    },
    methods: {
        

    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.css' ;
</style>