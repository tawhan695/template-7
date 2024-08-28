<template>
  <!-- <loading v-model:active="isLoading" :can-cancel="true" :is-full-page="true" color="red" backgroundColor="#ffffff00" loader="bars" /> -->
  <div class="box_ text-white">
    <div class="h-100 w-100">
      <div class="justify-content-center d-flex">
        <div class="container-fluid">
          <div class="text-white w-100 game-header">
            <div class="d-flex w-100">
              <div class="p-2 pt-3 v-title">Casino Online ยอดฮิตระดับโลก</div>
            </div>
          </div>
          <div class="row p-2" v-for="item in getGamedata" :key="item">
            <p class="text-title p-1 text-center mb-0" style="font-size: 11pt">{{ item.providerName }}</p>
            <div class="col-6 col-sm-4 col-lg-3  p-2" v-for="game in item.games" :key="game">

              <div @click="gamesV2.gamelogin(game.gameCategory, game.provider, game.id)">
                <picture>
                  <source media="(min-width:650px)" :srcset="game.image.horizontal">
                  <source media="(min-width:465px)" :srcset="game.image.vertical">
                  <img v-lazy="{ src: game.image.vertical, loading: loadingImg, error: errorImg }" class="w-100 img-hover-zoom"
                    style="border-radius: 10px">
                </picture>

                <p class="text-white p-1 text-center mb-0" style="font-size: 0.9rem">{{ game.gameName }}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import Loading from 'vue-loading-overlay';
import { useGamesStoreV2 } from "../../../stores/games-v2";


export default {
  setup() {
    const gamesV2 = useGamesStoreV2();
    return {
      gamesV2
    };
  },
  components: {
    // Loading
  },
  data() {
    return {
      gamedata: { data: [] },
      isLoading: false,
      loadingImg: new URL('@/assets/img/loading.svg', import.meta.url).href,
      errorImg: new URL('@/assets/icons/img-not-found.png', import.meta.url).href,
    };
  },

  computed: {
    getGamedata() {
      return this.gamesV2.ListGamesAll.data[1];
    }
  },
};
</script>
