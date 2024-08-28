<template>
  <div class="box_ text-white">
    <div class="h-100 w-100 pt-3">
      <div class="row">
        <div class="col-sm-6 col-12 d-flex justify-content-start">
          <!-- <nav-botton-back></nav-botton-back> -->
        </div>
        <div class="col-sm-6 col-12 d-flex justify-content-center justify-content-sm-end">
          <div class="group">
            <svg class="icon" aria-hidden="true" viewBox="0 0 24 24">
              <g>
                <path
                  d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                </path>
              </g>
            </svg>
            <input placeholder="ค้นหาเกมส์" type="search" class="input" v-model="search" />
          </div>
        </div>
      </div>
      <div class="justify-content-center d-flex">
        <div class="container-fluid">
          <div class="text-white w-100 game-header">
            <div class="d-flex w-100">
              <div class="p-2 pt-3 v-title">
                เกมส์สล็อต {{ this.$route.params.name }}
              </div>
            </div>
          </div>
          <!-- // new function 10/10/23 -->
          <div class="row p-2" v-if="slot">
            <div class="col-6 col-sm-3 col-lg-2 p-2" v-for="item in slot.games" :key="item" v-show="search == ''">
              <div @click="games.gamelogin('slot', item.provider, item.id)">
                <picture>
                  <source media="(min-width:650px)" :srcset="item.image.horizontal">
                  <source media="(min-width:465px)" :srcset="item.image.vertical">
                  <img v-lazy="{ src: item.image.vertical, loading: loadingImg, error: errorImg }" class="w-100 img-hover-zoom"
                    style="border-radius: 10px">
                </picture>
                <p class="text-white p-1 text-center" style="font-size: 0.7rem">
                  {{ item.gameName }}
                </p>
              </div>
            </div>
            <!-- search -->
            <div class="col-6 col-sm-3 col-lg-2 p-2" v-for="item in datasearch" :key="item" v-show="search != ''">
              <div @click="games.gamelogin('slot', item.provider, item.id)">
                <picture>
                  <source media="(min-width:650px)" :srcset="item.image.horizontal">
                  <source media="(min-width:465px)" :srcset="item.image.vertical">
                  <img v-lazy="{ src: item.image.vertical, loading: loadingImg, error: errorImg }" class="w-100 img-hover-zoom"
                    style="border-radius: 10px">
                </picture>
                <p class="text-white p-1 text-center" style="font-size: 0.7rem">
                  {{ item.gameName }}
                </p>
              </div>
            </div>
          </div>
          <!-- // new function 10/10/23 -->
          <div class="row p-2" v-if="slotOnesoft">
            <div class="col-6 col-sm-3 col-lg-2 p-2" v-for="item in slotOnesoft.gamesList" :key="item" v-show="item.active && search == ''">
              <div @click="gameOnesoft.gameloginonesoft(item.gameCode, item.productName, item.gameName)">
                <img class="w-100 img-hover-zoom" style="border-radius: 15px" :src="slotOnesoft.host + item.imgUrl" />
                <p class="text-white p-1 text-center" style="font-size: 0.7rem">
                  {{ item.gameName }}
                </p>
              </div>
            </div>
            <!-- search -->
            <div class="col-6 col-sm-3 col-lg-2 p-2" v-for="item in datasearch" :key="item" v-show="search != ''">
              <div @click="gameOnesoft.gameloginonesoft(item.gameCode, item.productName, item.gameName)">
                <img class="w-100 img-hover-zoom" style="border-radius: 15px" :src="slotOnesoft.host + item.imgUrl" />
                <p class="text-white p-1 text-center" style="font-size: 0.7rem">
                  {{ item.gameName }}
                </p>
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
import { useGameOnesoft } from "../../../../stores/gameOnesoft";
import { useGamesStoreV2 } from "../../../../stores/games-v2";
export default {
  setup() {

    const games = useGamesStore();
    const gameOnesoft = useGameOnesoft();
    const gamesV2 = useGamesStoreV2();
    return {
      games,
      gameOnesoft,
      gamesV2
    };
  },
  data() {
    return {
      slot: null,
      slotOnesoft: null,
      // slot: this.games.SLOT.data.find((e) => e.provider === this.$route.params.name),
      search: "",
      searchSlot: [],
      loadingImg: new URL('@/assets/img/loading.svg', import.meta.url).href,
      errorImg: new URL('@/assets/icons/img-not-found.png', import.meta.url).href,

    };
  },

  mounted() {
    switch (this.$route.params.name) {
      case 'onesoft':
        this.getonesoft()
        break;

      default:
        this.getgame()
        break;
    }


  },
  methods: {

    async getgame() {  // new function 10/10/23 

      this.slot = this.gamesV2.ListGamesAll.data[0].find((e) => e.provider === this.$route.params.name)

      /* 
      // Request method
      this.games.gameList('slot')
        .then((datagames) => {
          this.slot = datagames.data.find((e) => e.provider === this.$route.params.name)
        })
      */

    },
    async getonesoft() {   // new function 10/10/23
      this.gameOnesoft.getGameAll().then((Onesoft) => {
        this.slotOnesoft = Onesoft.data.data
      })

    }
  },
  computed: {
    datasearch() {
      let newList = [];
      if (this.search.length > 0) {
        switch (this.$route.params.name) {
          case 'onesoft':
            for (const [key, value] of Object.entries(this.slotOnesoft.gamesList)) {
              if (key && value.gameName.toLowerCase().indexOf(this.search.toLowerCase()) != -1) {
                newList.push(value);
              }
            }
            break;

          default:
            for (const [key, value] of Object.entries(this.slot.games)) {
              if (key && value.gameName.toLowerCase().indexOf(this.search.toLowerCase()) != -1) {
                newList.push(value);
              }
            }
            break;
        }

      }
      return newList;
    },
  },
};
</script>

<style lang="scss" scoped>
.group {
  display: flex;
  line-height: 28px;
  align-items: center;
  position: relative;
  max-width: 190px;

  .input {
    width: 100%;
    height: 30px;
    line-height: 28px;
    padding: 0 1rem;
    padding-left: 2.5rem;
    border: 2px solid #f4c039;
    border-radius: 20px;
    outline: none;
    background-color: #f5e5e5;
    color: #0d0c22;
    transition: 0.3s ease;
  }

  .input::placeholder {
    color: #f4c039;
  }

  .input:focus,
  input:hover {
    outline: none;
    border-color: rgba(234, 76, 137, 0.4);
    background-color: #fff;
    box-shadow: 0 0 0 4px rgb(234 76 137 / 10%);
  }

  .icon {
    position: absolute;
    left: 1rem;
    fill: #9e9ea7;
    width: 1rem;
    height: 1rem;
  }
}
</style>
