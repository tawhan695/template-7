<template>
    <div class="m-auto">
        <div class="row m-auto text-center" style="max-width: 480px;">
            <div class="col-4 px-3">
                <router-link to="/member/deposit" class="">
                    <div class="block-icon">
                        <div class="block-img ">
                            <img src="@/assets/img/homeView/icon/ฝากเงิน.png" class="img-fluid" alt="" />
                        </div>
                    </div>
                    <span>ฝากเงิน</span>
                </router-link>
            </div>
            <div class="col-4 px-3">
                <router-link to="/member/withdraw">
                    <div class="block-icon">
                        <div class="block-img">
                            <img src="@/assets/img/homeView/icon/ถอนเงิน.png" class="img-fluid" alt="" />
                        </div>
                    </div>
                    <span>ถอนเงิน</span>
                </router-link>
            </div>
            <div class="col-4 px-3">
                <router-link to="/member/bonus">
                    <div class="block-icon">
                        <div class="block-img">
                            <img src="@/assets/img/homeView/icon/รับโบนัส.png" class="img-fluid" alt="" />
                        </div>
                    </div>
                    <span>รับโบนัส</span>
                </router-link>
            </div>
            <div class="col-4 px-3">
                <router-link to="/member/invite-mlm">
                    <div class="block-icon">
                        <div class="block-img">
                            <img src="@/assets/img/homeView/icon/สร้างรายได้.png" class="img-fluid" alt="" />
                        </div>
                    </div>
                    <span>สร้างรายได้</span>
                </router-link>
            </div>
            <div class="col-4 px-3">
                <!-- <a href="#" data-bs-toggle="modal" data-bs-target="#ModalRanks"> -->
                <a href="/member/top10">
                    <div class="block-icon">
                        <div class="block-img">
                            <img src="@/assets/img/homeView/icon/จัดอันดับ.png" class="img-fluid" alt="" />
                        </div>
                    </div>
                    <span>จัดอันดับ</span>
                </a>
            </div>
            <div class="col-4 px-3">
                <router-link to="/member/reward">
                    <div class="block-icon">
                        <div class="block-img">
                            <img src="@/assets/img/homeView/icon/กงล้อ.png" class="img-fluid" alt="" />
                        </div>
                    </div>
                    <span>ห้องเกมส์</span>
                </router-link>
            </div>
            <!-- <div class="col-4 px-3">
                <router-link to="/member/reward">
                    <div class="block-icon">
                        <div class="block-img">
                            <img src="@/assets/img/homeView/icon/กงล้อ.png" class="img-fluid" alt="" />
                        </div>
                    </div>
                    <span>เกมส์พ้อย</span>
                </router-link>
            </div> -->
            <!-- <div class="col-4 px-3">
                <router-link to="/member/history">
                    <div class="block-icon">
                        <div class="block-img">
                            <img src="@/assets/img/homeView/icon/ประวัติ.png" class="img-fluid" alt="" />
                        </div>
                    </div>
                    <span>ประวัติ</span>
                </router-link>
            </div> -->
            <!-- <div class="col-4 px-3">
                <a :href="LINE_URL">
                    <div class="block-icon">
                        <div class="block-img">
                            <img src="@/assets/img/homeView/icon/ติดต่อ.png" class="img-fluid" alt="" />
                        </div>
                    </div>
                    <span>ติดต่อเรา</span>
                </a>
            </div> -->
        </div>
    </div>
</template>

<style lang="scss"></style>