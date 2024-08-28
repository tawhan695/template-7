<template>
  <div class="box_ text-white">
    <div class="h-100 w-100">
      <div class="justify-content-center d-flex">
        <div class="container-fluid">
          <div class="text-white w-100 game-header">
            <div class="d-flex w-100">
              <div class="p-2 pt-3 v-title">Sport</div>
            </div>
          </div>
          <div class="row p-2">
            <div class="col-6 col-sm-3 col-lg-2 p-2" v-for="item in sport" :key="item.gameId">
              <div @click="openNewTab()">
                <img class="w-100 img-hover-zoom" style="border-radius: 15px" :src="item.img" />
              </div>
            </div>
          </div>

          <div class="p-5"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { SPORT_LIST } from "@/mixins/data";
import { useGamesStore } from "../../../stores/games";
export default {

  setup() {
    const gameStore = useGamesStore()

    return {
      gameStore
    }
  },

  data() {
    return {
      sport: SPORT_LIST,
      ENTRANCE_URL: "",
      isRequest: false
    };
  },
  async created() {

  },
  mounted() {
    this.entrance();
  },
  methods: {

    openNewTab() {
      window.open(this.ENTRANCE_URL + "&state=sport", "_blank");
    },

    async entrance() {
      this.isRequest = true;
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
        color: 'red',
        backgroundColor: "#000",
        opacity: 0.9

      });
      if (!this.gameStore.entrance_url) {
        await this.gameStore.entrance().then((data) => this.ENTRANCE_URL = data);
      }
      this.ENTRANCE_URL = this.gameStore.entrance_url
      this.isRequest = false;
      loader.hide()
    }
  },
};
</script>
