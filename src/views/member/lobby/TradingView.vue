<template>
  <div class="box_ text-white">
    <div class="h-100 w-100">
      <div class="justify-content-center d-flex">
        <div class="container-fluid">
          <div class="text-white w-100 game-header">
            <div class="d-flex w-100">
              <div class="p-2 pt-3 v-title">Trade</div>
            </div>
          </div>
          <div class="row p-2" v-if="games_data">
            <div class="col-6 col-sm-3 col-lg-2 p-2" v-for="item in games_data" :key="item">
              <div @click="games.gamelogin(type_game, item.provider, item.id)">
                <!-- <img class="w-100 img-hover-zoom" style="border-radius: 15px" :src="item.image.vertical" /> -->
                <picture >
                  <source media="(min-width:650px)" :srcset="item.image.horizontal">
                  <source media="(min-width:465px)" :srcset="item.image.vertical">
                  <img :src="item.image.vertical" alt="Flowers" style="border-radius: 15px" class="w-100 img-hover-zoom">
                </picture>
                <p class="text-white p-1 text-center" style="font-size: 0.7rem">
                  {{ item.gameName }}
                </p>
              </div>
            </div>
          </div>
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
      games_data: [],
      type_game: 'Trade'
    };
  },

  mounted() {
    this.getgame()
  },
  methods: {
    async getgame() {
      const datalist = await this.games.gameList(this.type_game);
      for (let index = 0; index < datalist.data.length; index++) {
        const glist = datalist.data[index].games;
        this.games_data = [...this.games_data, ...glist];
      }
    }
  },
};
</script>
