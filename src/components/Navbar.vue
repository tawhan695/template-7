<template>
    <div class="header">
        <nav class="navbar">
            <div class="container d-flex">

                <div class="col justify-content-center text-sm-start text-center">
                    <router-link class="navbar-brand" to="/">
                        <img src="../assets/logo.png" class="img-fluid logo" />
                    </router-link>
                </div>
                <div class="col-auto d-sm-block d-none">
                    <div class="float-end navbar-login">
                        <div class="d-flex">
                            <a href="/login" class="btn btn2 btn-primary">เข้าสู่ระบบ</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>
  
    
<script>
import $ from "jquery";

export default {
    data() {
        return {};
    },
    mounted() {
        $(document).scroll(function () {
            var scrollTop = $(document).scrollTop();
            if (scrollTop > 0) {
                $(".header").addClass("sticky");
            } else {
                $(".header").removeClass("sticky");
            }
        });
    },
    methods: {},
};
</script>
  
<style lang="scss" scoped>
.header {
    background: linear-gradient(180deg, black, transparent);
    display: block;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    opacity: 1;
    transition: transform 0.5s ease-out;

    &.sticky {
        transform: translateY(-120%);
    }

    .navbar-brand .logo {
        width: 150px;
    }

    .btn-primary:hover {
        box-shadow: 0 0 10px 1px #ffff86;
    }
}
</style>
  