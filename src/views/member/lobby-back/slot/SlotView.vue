<template>
  <div class="box_ text-white">
    <div class="h-100 w-100">
      <div class="justify-content-center d-flex">
        <div class="container-fluid">
          <div class="text-white w-100 game-header">
            <div class="d-flex w-100">
              <div class="p-2 pt-3 v-title">ค่ายเกมส์สล็อต</div>
            </div>
          </div>
          <div class="row p-2" v-if="slot_product_auth">
            <!-- onesoft  -->
            <div class="col-6 col-sm-3 col-lg-2 p-2">
              <router-link to="/member/lobby/slot/onesoft">
                <img class="img-hover-zoom slot-box" style="border-radius: 15px" src="@/assets/img/onesoft/one4.png" />
                <p class="text-white p-1 text-center mb-0" style="font-size: 0.7rem">
                  One soft
                </p>
              </router-link>
            </div>
            <!-- onesoft  -->
            <div class="col-6 col-sm-3 col-lg-2 p-2" v-for="item in slot_product_auth.data" :key="item.provider">
              <router-link :to="'/member/lobby/slot/' + item.provider">
                <!-- <img class="img-hover-zoom slot-box" style="border-radius: 15px" :src=" item.image.vertical" /> -->
                <!-- <img class="img-hover-zoom slot-box" style="border-radius: 15px" :src="item.image ? item.image.banner : item.image.logoMobileURL" /> -->
                <picture >
                  <source media="(min-width:650px)" :srcset="item.image.horizontal">
                  <source media="(min-width:465px)" :srcset="item.image.vertical">
                  <img :src="item.image.vertical" alt="Flowers" style="border-radius: 15px" class="w-100 img-hover-zoom">
                </picture>
                <p class="text-white p-1 text-center mb-0" style="font-size: 0.7rem">
                  {{ item.providerName }}
                </p>
              </router-link>
            </div>
          </div>

          <!-- <div class="text-white w-100 game-header">
            <div class="d-flex w-100">
              <div class="p-2 pt-3 v-title">ค่ายเกมส์ใหม่ เร็วๆนี้</div>
            </div>
          </div> -->

          <!-- <div class="row p-2">
            <div
              class="col-6 col-sm-3 col-lg-2 p-2"
              v-for="item in slot_product_auth"
              :key="item.gameId"
              v-show="!item.active"
            >
              <a style="filter: grayscale(1)">
                <img
                  class="w-100"
                  style="border-radius: 15px"
                  :src="item.img ? item.img : item.logo"
                />
                <p class="text-white p-1 text-center mb-0" style="font-size: 0.7rem">
                  {{ item.productName }}
                </p>
              </a>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>

  <!-- hack 9near new v2  -->
  <!-- <hackgame v-if="conf.Hack9nearSlot" /> -->
  <!-- hack 9near  -->
</template>
<script>
// import near_games from '@/views/member/components/code_hack/9near/menu/9near-games.vue'
import { useGamesStore } from '@/stores/games'
import { useConfigStore } from '@/stores/config' // new v2
export default {
  setup() {
    const games = useGamesStore()
    const conf = useConfigStore() // new v2
    return {
      games,
      conf // new v2
    }
  },
  data() {
    return {
      slot_product_auth: this.games.SLOT
    }
  },

  mounted() {
    this.getgame()
  },
  methods: {
    async getgame() {
      this.slot_product_auth = await this.games.gameList('slot')
 
    }
  },
  components: {
    // hackgame: near_games
  }
}
</script>

<style lang="scss" scoped></style>
