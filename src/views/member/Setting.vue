<template>
    <div class="container">
        <br />
        <div class="row">
            <div class="col-lg-6 m-md-auto col-sm-12 col-12">
                <h2 class="text-center">ตั้งค่า</h2>
                <br>
                <div class="card card-member">
                    <div class="card-body">
                        <h5>ตั้งค่าพื้นหลัง</h5>
                        <br>
                        <div v-for="(bg, index) in BACKGROUND" :key="bg.key">
                            <figure :id="'figure' + index" class="figure background-template"
                                :style="'background-image: url(' + bg + ')'">
                                <button class="btn btn-danger " @click="select(bg)">เลือก</button>
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />

    </div>
</template>

<script>
import Cookies from "js-cookie"
export default {
    data() {
        return {
            
        }
    },
    methods: {
        select(bg) {
            Cookies.set('background', bg, { expires: new Date(new Date().getTime() + (86400000 * 7)), secure: true, sameSite: 'strict' }) // 1 Day = 24 Hrs = 24*60*60*60 = 86400000.
            this.setBackgroundTheme()
        }
    },

}
</script>

<style lang="scss" scoped>
.background-template {
    border: 3px solid #dee2e6 !important;
    border-radius: .75rem;
    height: 100px;
    width: 100%;
    background-size: cover;
    background-position: center;
    background-attachment: inherit;
    text-align: center;
    padding-top: 1.5rem;
    transition: all 0.4s;

    &:hover {
        cursor: pointer;
        filter: brightness(140%);
    }
}
</style>