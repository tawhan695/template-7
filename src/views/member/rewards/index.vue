<script setup>
import Swal from 'sweetalert2';
import { useDailyRewardStore } from '../../../stores/Rewards/Daily';
import { useUserStore } from '../../../stores/user';

const DailyRewardStore = useDailyRewardStore()
const UserStore = useUserStore();

UserStore.getProfile()
DailyRewardStore.getBonus()

 
function showDailyLoginReward() {
  if (UserStore.userProfile.role != 0) {
    DailyRewardStore.modelRewards.show()
  } else {
    Swal.fire({
      title: "เสียใจด้วย",
      text: "เฉพาะสมาชิดที่มียอดฝากเท่านั้น",
      icon: "warning"
    })
  }
}
 

</script>

<template>
  <div class="container text-center mt-4">
    <div class="row">
      <div class="block-circle mx-auto mb-4">
        <br>

        <h5>จำนวนเพชร </h5>
        <span class="inline">
          <h1>{{ formatNumber(UserStore.userProfile.diamond) }} </h1> <i class="fa fa-diamond" aria-hidden="true"></i>
        </span>

      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-6 my-2">
        <router-link to="/member/reward/spin">
          <img class="w-100" src="../../../assets/img/reward/spin.webp" alt="">
        </router-link>
      </div>
      <!-- <div class="col-md-6 my-2">
        <router-link to="/member/reward/card">
          <img class="w-100" src="../../../assets/img/reward/card.webp" alt="">
        </router-link>
      </div> -->
      <!-- <div class="col-md-6 my-2">
        <a href="#" @click="showDailyLoginReward()">
          <img class="w-100" src="../../../assets/img/reward/daily.webp" alt="">
        </a>
      </div> -->

    </div>

  </div>
</template>

<style lang="scss" scoped>
.block-circle {
  position: relative;
  width: 200px;
  height: 200px;
  text-align: center;
  padding-top: 2.5rem;
  background-color: #00000085;
  border-radius: 50%;
  backdrop-filter: saturate(180%) blur(2px);
  // border: 3px solid #ffae00;

  &::before {
    content: ' ';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    padding: 5px;
    background: linear-gradient(0deg, #12c2e9, #c471ed, #f64f59);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    animation: spinning82341 10s linear infinite;
  }

  &::after {
    content: ' ';
    position: absolute;
    border-radius: 50%;
    top: 0px;
    left: 0px;
    width: 200px;
    height: 200px;
    box-shadow: 0px -5px 20px 0px #f64f59, 0px 5px 20px 0px #00d0ff;
    animation: spinning82341 10s linear infinite;
  }

  p {
    margin-top: .5rem;
    font-weight: 300;
  }
}

@keyframes spinning82341 {
  to {
    transform: rotate(360deg);
  }
}
</style>


