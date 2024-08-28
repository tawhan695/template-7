<template>
    <div class="flex flex-row items-center justify-between px-3 md:!px-8 py-1 min-h-[105px] md:!min-h-[180px] lg:!min-h-[205px] h-auto ">
        <router-link to="/" class="active:scale-95 duration-300">
            <img src="../assets/img/icon/home.png" alt="home" class="hover:scale-105 duration-200" />
        </router-link>

        <router-link to="/promotion" class="active:scale-95 duration-300">
            <img src="../assets/img/icon/promotion.png" alt="promotion" class="hover:scale-105 duration-200" />
        </router-link>

        <router-link to="/review" class="active:scale-95 duration-300">
            <img src="../assets/img/icon/review.png" alt="review" class="hover:scale-105 duration-200" />
        </router-link>

        <router-link to="/income" class="active:scale-95 duration-300">
            <img src="../assets/img/icon/income.png" alt="income" class="hover:scale-105 duration-200" />
        </router-link>
    </div>
</template>


<script>
export default {
    data() {
        return {
            incomeLink: ""
        };
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.css' ;
</style>