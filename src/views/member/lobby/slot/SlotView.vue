<template>
  <div class="box_ text-white">
    <div class="h-100 w-100">
      <div class="justify-content-center d-flex">
        <div class="container-fluid">
          <div class="text-white w-100 game-header">
            <div class="d-flex w-100">
              <div class="p-2 pt-3 v-title">ค่ายเกมส์สล็อต</div>
            </div>
          </div>
          <div class="row p-2">
            <!-- onesoft  -->
            <!-- <div class="col-6 col-sm-3 col-lg-2 p-2">
              <router-link to="/member/lobby/slot/onesoft">
                <img class="img-hover-zoom slot-box" style="border-radius: 15px;background-color: #4d4d4d94;" src="@/assets/img/onesoft/one4.png" />
                <p class="text-white p-1 text-center mb-0" style="font-size: 0.7rem">
                  One soft
                </p>
              </router-link>
            </div> -->
            <!-- onesoft  -->
            <div class="col-6 col-sm-3 col-lg-2 p-2 " v-for="item in getGamedata" :key="item.provider">
              <router-link :to="'/member/lobby/slot/' + item.provider">
                <picture>
                  <!-- <source media="(min-width:650px)" :srcset="item.image.horizontal"> -->
                  <source media="(min-width:465px)" :srcset="item.image.logoURL">
                  <img v-lazy="{ src: item.logoMobileURL, loading: loadingImg, error: errorImg }" class="w-100 img-hover-zoom  "
                    style="border-radius: 10px;background-color: #4d4d4d94;">
                </picture>
                <p class="text-white p-1 text-center mb-0" style="font-size: 0.9rem">{{ item.providerName }}</p>
              </router-link>
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>

</template>
<script>

import { useGamesStoreV2 } from "../../../../stores/games-v2";

export default {
  setup() {

    const gamesV2 = useGamesStoreV2();

    return {
      gamesV2,

    }
  },
  data() {
    return {
      loadingImg: new URL('@/assets/img/loading.svg', import.meta.url).href,
      errorImg: new URL('@/assets/icons/img-not-found.png', import.meta.url).href,
    }
  },
  computed: {
    getGamedata() {
      return (this.gamesV2.ListGamesAll) ? this.gamesV2.ListGamesAll.data[0] : null;
    }
  },

  mounted() {
  },
  methods: {

  },
  components: {
  }
}
</script>

<style lang="scss" scoped></style>
