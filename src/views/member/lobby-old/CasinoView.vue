<template>
  <div class="box_ text-white">
    <div class="h-100 w-100">
      <div class="justify-content-center d-flex">
        <div class="container-fluid">
          <div class="text-white w-100 game-header">
            <div class="d-flex w-100">
              <div class="p-2 pt-3 v-title">Casino Online ยอดฮิตระดับโลก</div>
            </div>
          </div>
          <div class="row p-2">
            <div class="col-6 col-sm-3 col-lg-2 p-2" v-for="item in casino_auth" :key="item" v-show="item.active">
              <div @click="games.gamelogin(item.productCode, item.productCode,item.gameName)">
                <img class="w-100 img-hover-zoom" style="border-radius: 15px" :src="item.img ? item.img : item.logo" />
                <p class="text-white p-1 text-center mb-0" style="font-size: 0.7rem">{{ item.productName }}</p>
              </div>
            </div>
          </div>
          <div class="text-white w-100 game-header">
            <div class="d-flex w-100">
              <div class="p-2 pt-3 v-title">COMING SOON</div>
            </div>
          </div>
          <div class="row p-2">
            <div class="col-6 col-sm-3 col-lg-2 p-2" v-for="item in casino_auth" :key="item" v-show="!item.active">
              <div style="filter: grayscale(1);">
                <img class="w-100 " style="border-radius: 15px" :src="item.img ? item.img : item.logo" />
                <p class="text-white p-1 text-center mb-0" style="font-size: 0.7rem">{{ item.productName }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useGamesStore } from "../../../stores/games";
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
      casino_auth: this.games.CASINO,
    };
  },

  mounted() { },
  methods: {},
};
</script>
