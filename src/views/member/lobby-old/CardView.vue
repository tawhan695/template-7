<template>
  <div class="box_ text-white">
    <div class="h-100 w-100">
      <div class="justify-content-center d-flex">
        <div class="container-fluid">
          <div class="text-white w-100 game-header">
            <div class="d-flex w-100">
              <div class="p-2 pt-3 v-title">เกมไพ่</div>
            </div>
          </div>
          <div class="row p-2">
            <div class="col-6 col-sm-3 col-lg-2 p-2" v-for="item in card_auth" :key="item.gameId" v-show="item.active">
              <!-- @click="showAlert_login" -->

              <div @click="games.gamelogin(item.gameCode, item.productCode,item.gameName)">
                <img class="w-100 img-hover-zoom" style="border-radius: 15px" :src="ASKMEBET_URL + item.imgUrl" />
                <p class="text-white p-1 text-center mb-0" style="font-size: 0.7rem">{{ item.gameName }}</p>
              </div>
            </div>
          </div>
          <!-- desc -->
          <div class="p-5"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useGamesStore } from "@/stores/games";
export default {
  setup() {
    const games = useGamesStore();
    return {
      games,
    };
  },
  components: {},
  data() {
    return {
      card_auth: this.games.CARD,
    };
  },

  mounted() { },
  methods: {},
};
</script>
