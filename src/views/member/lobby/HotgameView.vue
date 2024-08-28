<template>
  <div class="box_ text-white">
    <div class="h-100 w-100" v-if="getGamedata">
      <div class="justify-content-center d-flex">
        <div class="container-fluid">
          <div class="text-white w-100 game-header">
            <p class="text-title p-1 text-start mb-0" style="font-size: 16pt">{{ getGamedata[0].providerName }}</p>
          </div>
          <div class="row p-2">
            <div class="col-6 col-sm-4 col-lg-3  p-2" v-for="game in getGamedata[0].games" :key="game">
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
      <div class="justify-content-center d-flex">
        <div class="container-fluid">
          <div class="text-white w-100 game-header">
            <p class="text-title p-1 text-start mb-0" style="font-size: 16pt">{{ getGamedata[1].providerName }}</p>
          </div>
          <div class="row p-2">
            <div class="col-6 col-sm-4 col-lg-3  p-2" v-for="game in getGamedata[1].games" :key="game">
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
    <div v-else>
      <loading :active="isLoading" :can-cancel="true" :is-full-page="true" color="red" backgroundColor="#ffffff00" loader="bars" />
    </div>
  </div>
</template>
<script>
import { useGamesStoreV2 } from "../../../stores/games-v2";

import Loading from 'vue-loading-overlay';

export default {
  setup() {
    const gamesV2 = useGamesStoreV2();
    return {
      gamesV2
    };
  },
  components: {
    Loading
  },
  data() {
    return {
      gamedata: { data: [] },
      isLoading: true,
      loadingImg: new URL('@/assets/img/loading.svg', import.meta.url).href,
      errorImg: new URL('@/assets/icons/img-not-found.png', import.meta.url).href,
    };
  },

  computed: {
    getGamedata() {
      return (this.gamesV2.ListGamesAll) ? this.gamesV2.ListGamesAll.data[0] : null;
    }
  },
};
</script>
