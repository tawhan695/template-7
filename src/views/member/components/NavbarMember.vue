<template>
  <header class="header" :class="stickyClass">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid" style="height: 84px">
        <div class="col-md-6 col-10 d-flex">
          <a href="#">
            <img src="../../../assets/avatar.png" alt style="max-width: 64px" class="img-circle" />
          </a>
          <div class=" d-lg-block d-none my-auto">
            <!-- <a href="https://t.me/tawin65"><img src="@/assets/img/member2/ic-menu/ic-telegram.png" width="48" alt=""></a> -->
            <!-- <a :href="optionStore.Line.url"><img src="@/assets/img/member2/ic-menu/ic-line.png" width="48" alt=""></a> -->
          </div>
          
        </div>
        <div class="block-rank">
          <rank-block> </rank-block>
        </div>
        <div class="col-auto my-auto">
          <div class="d-flex ">
            <div class="d-lg-flex d-none">
              <div class="px-1 ">
                <a href="#" class="block-pv">
                  แต้ม PV {{ formatNumber(UserStore.userProfile.pivilate, 0) }}
                </a>
              </div>
              <div class="px-1">
                <router-link to="/member/reward" class="block-diamond">
                  {{ formatNumber(UserStore.userProfile.diamond, 0) }}
                  <img src="../../../assets/img/member2/ic-menu/diamond.png" width="32" alt="">
                </router-link>
              </div>
            </div>

            <a href="#" @click="authStore.Logout()" class="px-1">
              <h3 class="text-white">
                <span class="material-icons">logout</span>
              </h3>
            </a>
          </div>
        </div>
      </div>
    </nav>

  </header>
</template>

<script>
import { useAuthStore } from '../../../stores/auth'
import rankblock from '@/views/member/components/Ranking/indexView.vue'
import { useUserStore } from '../../../stores/user'
import { useOptionStore } from '../../../stores/options'
export default {
  setup() {
    const authStore = useAuthStore()
    const UserStore = useUserStore()
    const optionStore = useOptionStore()
    return {
      authStore,
      UserStore,
      optionStore
    }
  },
  components: {
    'rank-block': rankblock
  },
  data() {
    return {
      stickyClass: ''
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleSCroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleSCroll)
  },
  methods: {
    handleSCroll() {
      this.stickyClass = window.scrollY > 0 ? 'sticky' : ''
    }
  }
}
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


  .block-avatar {
    // background-image: url("../../../assets/img/loby/bar/Asset\ 12.png");
    background-repeat: no-repeat;
    background-size: 85px;
  }

  &.sticky {
    transform: translateY(-120%);
  }

  .navbar {
    padding-top: 0;
  }

  .navbar-brand .logo {
    max-width: 84px;
  }

  .btn-primary:hover {
    box-shadow: 0 0 10px 1px #ffff86;
  }

  .img-circle {
    border-radius: 5rem;
  }

  .badge-notify-count {
    font-size: 8pt;
    position: absolute;
    right: 2.3rem;
    top: 1rem;
  }
}

.rank-block {
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
  background-image: linear-gradient(#997500, #000000);
  border-radius: 0 0 12px 12px;
  padding: 12px 0 12px 0;
  cursor: pointer;
  color: #fff;
  transition: all 0.35s;

  &:hover {
    background-image: linear-gradient(#c48104, #000);
  }
}

.block-diamond {
  color: #000;
  border-radius: 1rem;
  border: #997500 solid 1px;
  padding: .4rem 1.2rem;
  background: linear-gradient(0deg, #b4812e 0%, #f7fbc0 53%, #b4812e 100%);
  transition: all 0.35s;

  &:hover {
    background: linear-gradient(0deg, #e6a43a 0%, #f7fbc0 53%, #e6a43a 100%);
  }
}

.block-pv {
  color: #fff;
  border-radius: 1rem;
  border: #997500 solid 2px;
  padding: .4rem 1.2rem;
  transition: all 0.35s;

  &:hover {
    border: #e6a43a solid 2px;
  }
}

.block-rank {
  position: absolute;
  height: 84px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
