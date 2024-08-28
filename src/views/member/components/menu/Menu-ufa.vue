<script setup>
import { useOptionStore } from '../../../../stores/options';

const optionStore = useOptionStore()
</script>

<template>
    <div class="row justify-content-center mt-5">
        <div class="col-3">
            <router-link to="/member/deposit">
                <div class="block-icon">
                    <div class="block-img">
                        <img src="@/assets/img/ic_new/ic_topup.png" class="img-fluid" alt="" />
                    </div>
                </div>
                <span>ฝากเงิน</span>
            </router-link>
        </div>
        <div class="col-3">
            <router-link to="/member/withdraw">
                <div class="block-icon">
                    <div class="block-img">
                        <img src="@/assets/img/ic_new/ic_transfer.png" class="img-fluid" alt="" />
                    </div>
                </div>
                <span>ถอนเงิน</span>
            </router-link>
        </div>
        <div class="col-3">
            <router-link to="/member/bonus">
                <div class="block-icon">
                    <div class="block-img">
                        <img src="@/assets/img/ic_new/ic_gift.png" class="img-fluid" alt="" />
                    </div>
                </div>
                <span>รับโบนัส</span>
            </router-link>
        </div>
        <div class="col-3">
            <router-link to="/member/invite-mlm">
                <div class="block-icon">
                    <div class="block-img">
                        <img src="@/assets/img/ic_new/ic_group.png" class="img-fluid" alt="" />
                    </div>
                </div>
                <span>สร้างรายได้</span>
            </router-link>
        </div>
    </div>
    <br />
    <div class="row justify-content-center mt-1">
        <div class="col-3">
            <!-- <a href="#" data-bs-toggle="modal" data-bs-target="#ModalRanks"> -->
            <a href="#">
                <div class="block-icon">
                    <div class="block-img">
                        <img src="@/assets/img/ic_new/ic_invest.png" class="img-fluid" alt="" />
                    </div>
                </div>
                <span>จัดอันดับ</span>
            </a>
        </div>
        <!-- <div class="col-3">
            <router-link to="/member/reward/spin">
                <div class="block-icon">
                    <div class="block-img">
                        <img src="@/assets/img/ic_new/ic_wheel.png" class="img-fluid" alt="" />
                    </div>
                </div>
                <span>เกมกิจกรรม</span>
            </router-link>
        </div> -->
        <div class="col-3">
            <router-link to="/member/history">
                <div class="block-icon">
                    <div class="block-img">
                        <img src="@/assets/img/ic_new/ic_bullet.png" class="img-fluid" alt="" />
                    </div>
                </div>
                <span>ประวัติ</span>
            </router-link>
        </div>
        <div class="col-3">
            <a :href="optionStore.getLine">
                <div class="block-icon">
                    <div class="block-img">
                        <img src="@/assets/img/ic_new/ic_pay.png" class="img-fluid" alt="" />
                    </div>
                </div>
                <span>ติดต่อเรา</span>
            </a>
        </div>
    </div>
</template>


<style lang="scss" scoped>
a {
    color: #fff;
}

.block-icon {
    margin-right: auto !important;
    margin-left: auto !important;
    text-align: center;
    border-radius: 10rem;
    width: 64px;
    height: 64px;
    background-color: #00000058;
    filter: brightness(70%);
    transition: all 0.4s;
    border: 2px solid #fff;

    &:hover {
        filter: brightness(1);
        cursor: pointer;
    }

    .block-img {
        padding: 0.75rem;
    }

    span {
        filter: brightness(1) !important;
    }
}

.col-3 {
    text-align: center;
}


.row {
    margin-right: auto !important;
    margin-left: auto !important;

    @media (min-width: 768px) {
        max-width: 500px;
    }
}
</style>