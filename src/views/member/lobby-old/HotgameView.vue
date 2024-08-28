<template>
  <div class="box_ text-white">
    <div class="h-100 w-100">
      <!-- <v-menu></v-menu> -->
      <div class="justify-content-center d-flex">
        <div class="container-fluid">
          <div class="text-white w-100 game-header">
            <div class="d-flex w-100">
              <div class="p-2 pt-3 v-title">เกมส์สล็อต ยอดนิยม</div>
            </div>
          </div>
          <div class="row p-2">
            <div class="col-6 col-sm-2 col-lg-2 p-2" v-for="item in slot" :key="item.gameCode">
              <!-- @click="showAlert_login" -->

              <!-- <div @click="gameStore.gamelogin(item.gameLoginCode, item.productCode,item.gameName)">
                <img class="w-100 img-hover-zoom" style="border-radius: 15px" :src="ASKMEBET_URL + item.imgUrl" />

                <! -- <div class="text-white text-center pt-2">{{ casino.name }}</div> -- >
              </div> -->

              <div
                @click="item.productName === 'onesoft' || item.productName === 'onesoft2' ? gameOnesoft.gameloginonesoft(item.gameCode, item.productName, item.gameName) : gameStore.gamelogin(item.gameLoginCode, item.productCode, item.gameName)">
                <img class="w-100 img-hover-zoom" style="border-radius: 15px"
                  :src="item.productName === 'onesoft' || item.productName === 'onesoft2' ? `https://api2.onesoft-media.com${item.imgUrl}` : ASKMEBET_URL + item.imgUrl" />
                <p class="text-white p-1 text-center" style="font-size: 0.7rem">
                  {{ item.gameName }}
                </p>
              </div>
            </div>
          </div>
          <div class="text-white w-100 game-header">
            <div class="d-flex w-100">
              <div class="p-2 pt-3 v-title">ค่ายเกมส์สล็อต ยอดนิยม</div>
            </div>
          </div>
          <div class="row p-2">
            <div class="col-6 col-sm-2 col-lg-2 p-2" v-for="item in slot_product" :key="item.gameId">
              <!-- @click="showAlert_login" -->

              <router-link :to="'/member/lobby/slot/' + item.gameId">
                <img class="w-100 img-hover-zoom" style="border-radius: 15px" :src="item.img" />
              </router-link>
            </div>
          </div>
          <div class="text-white w-100 game-header">
            <div class="d-flex w-100">
              <div class="p-2 pt-3 v-title">คาสิโนสด ยอดนิยม</div>
            </div>
          </div>
          <div class="row p-2">
            <div class="col-6 col-sm-2 col-lg-2 p-2" v-for="item in items" :key="item.name">
              <div @click="gameStore.gamelogin(item.gameId, item.vendor, item.name)">
                <img class="w-100 img-hover-zoom" style="border-radius: 15px" :src="item.img" />
              </div>
            </div>
          </div>
          <div class="text-white w-100 game-header">
            <div class="d-flex w-100">
              <div class="p-2 pt-3 v-title">สปอร์ต</div>
            </div>
          </div>
          <div class="row p-2">
            <div class="col-6 col-sm-2 col-lg-2 p-2" v-for="item in sport" :key="item.name">
              <div @click="openNewTab()">
                <img class="w-100 img-hover-zoom" style="border-radius: 15px" :src="item.img" />
              </div>
            </div>
          </div>
          <div class="text-white w-100 game-header">
            <div class="d-flex w-100">
              <div class="p-2 pt-3 v-title">เกมส์ไพ่ ยอดนิยม</div>
            </div>
          </div>
          <div id="#card" class="row p-2">
            <div class="col-6 col-sm-2 col-lg-2 p-2" v-for="item in card" :key="item">
              <div @click="gameStore.gamelogin(item.gameId, item.productCode, item.gameName)">
                <img class="w-100 img-hover-zoom" style="border-radius: 15px" :src="item.imgUrl" /> {{ item.gameName }}
              </div>
            </div>
          </div>
          <div class="text-white w-100 game-header">
            <div class="d-flex w-100">
              <div class="p-2 pt-3 v-title">เกมส์ตกปลา ยอดนิยม</div>
            </div>
          </div>
          <div class="row p-2">
            <div class="col-6 col-sm-2 col-lg-2 p-2" v-for="item in fishing" :key="item">
              <div @click="gameStore.gamelogin(item.gameId, item.vendor, item.gameName)">
                <img class="w-100 img-hover-zoom" style="border-radius: 15px" :src="item.imgUrl" />
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

import {
  HOST_CASINO_LIST,
  HOST_SLOT_LIST,
  HOST_SLOT_PRODUCT,
  HOT_CARD_LIST,
  HOT_FISHING_LIST,
  SPORT_LIST,
} from "@/mixins/data";
import { useGamesStore } from "../../../stores/games";
import { useGameOnesoft } from "../../../stores/gameOnesoft";
export default {
  setup() {
    const gameStore = useGamesStore();
    const gameOnesoft = useGameOnesoft()
    return {
      gameStore,
      gameOnesoft
    };
  },
  components: {},

  data() {
    return {
      items: HOST_CASINO_LIST,
      slot: HOST_SLOT_LIST,
      slot_product: HOST_SLOT_PRODUCT,
      card: HOT_CARD_LIST,
      fishing: HOT_FISHING_LIST,
      sport: SPORT_LIST,
      ENTRANCE_URL: ""
    };

  },

  mounted() {
    if (this.sport.length != 6) {
      this.sport.pop();
    }
  },
  created() {
    // this.entrance()
  },
  methods: {

    openNewTab() {
      window.open(this.ENTRANCE_URL + "&state=sport", "_blank");
    },
    async entrance() {
      await this.gameStore.entrance().then((data) => {
        this.ENTRANCE_URL = data;
        this.isRequest = false;
      });
    }
  },
};
</script>
