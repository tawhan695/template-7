<template>
  <div class="box_ text-white">
    <div class="h-100 w-100">
      <div class="justify-content-center d-flex">
        <div class="container-fluid">
          <div class="text-white w-100 game-header">
            <div class="d-flex w-100">
              <div class="p-2 pt-3 v-title">TRADING</div>
            </div>
          </div>
          <div class="row p-2">
            <div class="col-6 col-sm-4 col-lg-2 p-2" v-for="item in trading" :key="item.gameId">
              <div @click="games.gamelogin('hotgraph', 'hotgraph','hotgraph')">
                <img class="w-100 img-hover-zoom" style="border-radius: 15px" :src="'https://cdn.apptaipe.com/web/img/' + item.img" />
                <p class="text-white p-1 text-center mb-0" style="font-size: 0.7rem">{{ item.productName }}</p>
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
  data() {
    return {
      trading: this.games.TRADING,
    };
  },

  mounted() { },
  methods: {},
};
</script>
