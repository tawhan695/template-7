
<template>
    <div class='p-4 md:!p-8'>
        <img class='w-44 h-[50px] md:w-48 md:h-[60px]' src="../assets/img/icon/logo.png" alt="logo" />
    </div>

    <form @submit.prevent="login()" method="POST">
        <div class='px-4 md:!px-10 py-2 flex flex-col gap-y-6 '>
            <div class='border-input-auth'>
                <input v-model="User.phoneNo" type="text" required class="input-auth" placeholder="ชื่อผู้ใช้งาน" @keypress="isNumber($event)"  />
            </div>

            <div class='border-input-auth'>
                <div class='relative rounded-md'>
                    <input v-model="User.password" :type="passwordFieldType" required name='password' class="input-auth"
                        placeholder="รหัสผ่าน" />
                    <span @click="showPassword()" class="absolute inset-y-0 right-3 flex items-center text-white ">
                        <i class="fa fa-eye cursor-pointer" aria-hidden="true"></i>
                    </span>
                </div>
            </div>

            <div class='flex-row-default gap-x-6 md:py-2'>
                <button type="submit"
                    class='bgBtn hover:text-black flex justify-center items-center btn-auth'>เข้าสู่ระบบ</button>
                <router-link to="/register"
                    class='bgBtn hover:text-black flex justify-center items-center btn-auth'>สมัครสมาชิก</router-link>
            </div>
        </div>
    </form>
</template>

<script>
import { useAuthStore } from '../stores/auth';
import { useUserStore } from '../stores/user';
export default {
    setup() {
        const userStore = useUserStore()
        const authStore = useAuthStore()
        return {
            userStore,
            authStore
        }
    },
    data() {
        return {
            User: {
                phoneNo: "",
                password: "",
            },
            line_id: "",
            passwordFieldType: "password"
        };
    },
    methods: {
        showPassword() {
            this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
        },
        async login() {
            const loginData = await this.authStore.Login(this.User); 

            if (!loginData.error) {
                const userProfile = await this.userStore.getProfile(); 
                if (!userProfile.error)
                // console.log('userProfile',userProfile);
                window.location.href = '/member/'
                    // this.$router.push("/member");
            }
        },

    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.css';

.bgBtn {
    background: rgb(254, 240, 138);
    background: -moz-linear-gradient(180deg, rgba(254, 240, 138, 1) 0%, rgba(234, 179, 8, 1) 40%, rgba(234, 179, 8, 1) 50%, rgba(254, 240, 138, 1) 100%);
    background: -webkit-linear-gradient(180deg, rgba(254, 240, 138, 1) 0%, rgba(234, 179, 8, 1) 40%, rgba(234, 179, 8, 1) 50%, rgba(254, 240, 138, 1) 100%);
    background: linear-gradient(180deg, rgba(254, 240, 138, 1) 0%, rgba(234, 179, 8, 1) 40%, rgba(234, 179, 8, 1) 50%, rgba(254, 240, 138, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fef08a", endColorstr="#fef08a", GradientType=1);
}
</style>