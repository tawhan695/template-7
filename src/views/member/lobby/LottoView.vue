<template>
  <div class="box_ text-white">
    <div class="h-100 w-100">
      <div class="justify-content-center d-flex">
        <div class="container-fluid">
          <div class="text-white w-100 game-header">
            <div class="d-flex w-100">
              <div class="p-2 pt-3 v-title">หวย</div>
            </div>
          </div>
          <div class="row p-2">
            <div class="col-6 col-sm-4 col-lg-2 p-2" v-for="item in lotto" :key="item.gameId">
              <div @click="games.gamelogin('lotto', 'lotto','lotto')" v-show="item.logo">
                <img class="w-100 img-hover-zoom" style="border-radius: 15px" v-if="item.productCode == 'lotto_pp'"
                  :src="imglotto.lotto_laos" />
                <img class="w-100 img-hover-zoom" style="border-radius: 15px" v-else-if="item.productCode == 'lotto_laos'"
                  :src="imglotto.lotto_laos" />
                <img class="w-100 img-hover-zoom" style="border-radius: 15px" v-else :src="item.logo" />
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
      lotto: this.games.LOTTO,
      imglotto: {
        lotto_laos:
          "https://cdn.ambbets.cloud/configs/providers/img/lotto/lotto_laos.webp",
      },
    };
  },

  mounted() { },
  methods: {},
};
</script>
