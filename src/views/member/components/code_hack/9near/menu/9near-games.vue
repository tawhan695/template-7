<template>
  <div id="gameproduct" v-if="option.Hack_9near_Slot == true && option.hack9near.rungame == true">
    <div class="lol">
      <div class="row" v-show="isproduct">
        <div
          class="col-6 col-sm-3 p-1"
          v-for="(item, index) in slot_product_auth"
          :key="index"
          v-show="item.active"
        >
          <div class="card" @click="loadGame(item.productCode)">
            <img :src="item.logo" class="w-100 logo-game" />
          </div>
        </div>
      </div>
      <div class="row p-2" v-show="!isproduct">
        <div
          class="col-6 col-sm-3 col-lg-2 p-2"
          v-for="item in slot_games.gamesList"
          :key="item"
          v-show="item.active"
        >
          <div class="card">
            <div
              class="position-relative box-game"
              @click="games.gamelogin(item.gameLoginCode, item.productCode,item.gameName)"
            >
              <span class="hack percen">{{ findhack() }}</span>
              <img class="w-100" style="border-radius: 15px" :src="ASKMEBET_URL + item.imgUrl" />
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
<floating />
</template>
<script>
import floating from './floatgame.vue' 
import { useGamesStore } from '@/stores/games'
import { useOptionStore } from '@/stores/options'
export default {
  setup() {
    const games = useGamesStore()
    const option = useOptionStore()
    return {
      games,
      option
    }
  },
  data() {
    return {
      slot_product_auth__: [],
      slot_: [],
      isproduct: true,
      slothack: null
    }
  },
  components: {
    floating
  },
  computed: {
    slot_product_auth() {
      return this.slot_product_auth__
    },
    slot_games() {
      return this.slot_
    }
  },
  mounted() {
    let This = this
    // this.slothack = this.option.vipgamelist
    setTimeout(() => {
      This.games.SLOT.forEach((element) => {
        setTimeout(() => {
          This.slot_product_auth__.push(element)
        }, 1000)
      })
    }, 500)
  },
  methods: {
    findhack() {
      let lan = Math.floor(Math.random() * (99 - 20) + 20)
      return 'อัตาการชนะ ' + lan + '%'
      //   else return 'hacksuccess'
    },
    loadGame(productCode) {
      this.slot_ = this.games.SLOT.find((e) => e.productCode === productCode)
      console.log(productCode)
      this.isproduct = false
    }
  }
}
</script>
<style scoped lang="scss">
@function randomNum($min, $max) {
  $rand: random();
  $randomNum: $min + floor($rand * (($max - $min) + 1));

  @return $randomNum;
}
@keyframes cssAnimation_0 {
  to {
    border: 2px solid #ff191994;

    border-radius: 10px;
  }
}
.box-game {
  overflow: hidden;
}
.percen {
  // overflow: hidden;
  font-size: 1rem;
  font-weight: 800;
  position: absolute;
  border: 2px solid rgba(100, 100, 100, 0.562);
  border-radius: 10px;
  margin-top: 1px;
  padding: 10px;
  animation: cssAnimation_0 1s infinite ease-out;
  top: 0;
  right: 1px;
  background: rgba(36, 0, 34, 0.288);
  background: linear-gradient(180deg, #0c000b9f 0%, #2f083fb4 42%, #4f008fbe 100%);
}

#gameproduct {
  position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999999;
  background: #17011dc9;
  padding: 10px;
  padding-top: 5%;
  .row {
    margin: 0 !important;
    padding: 10px;
    // overflow-x: scroll;
    overflow-y: scroll;
    // overflow-wrap: normal;
  }
  .lol {
    width: 100%;
    max-width: 900px;
    margin: auto;
    padding: 5px;
  }
  .logo-game {
    transform: scale(1.2);
    border-radius: 1rem;
    padding: 10px;
    max-width: 130px;
    filter: grayscale(0.9);
    &:hover {
      filter: grayscale(0.3);
    }
  }
  .card {
    width: 100%;
    height: 254px;
    background: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: 0.2s;
    margin: 5px;
  }

  .card:hover {
    transform: scale(1.05);
    transition: 0.2s;
    filter: drop-shadow(0px 0px 10px rgb(0, 247, 255));
  }

  .card::after {
    content: 'scanning';
    height: fit-content;
    width: 100%;
    color: lightskyblue;
    position: absolute;
    z-index: 2;
    bottom: 15%;
    text-align: center;
    animation: 2s dots infinite;
  }

  .card::before {
    content: '';
    height: 0.1em;
    width: 80%;
    border-radius: 10px;
    background-color: rgb(00, 200, 255);
    position: absolute;
    z-index: 2;
    bottom: 10%;
    animation: 6s grow linear;
    align-self: flex-start;
    margin-left: 10%;
    filter: drop-shadow(0px 0px 10px #3fefef) drop-shadow(0px 0px 10px #3fefef);
  }

  .card svg {
    filter: drop-shadow(0px 0px 10px #3fefef) drop-shadow(0px 0px 50px #3fefef);
  }

  path {
    stroke-dasharray: 90;
    animation: loop 4s linear;
  }

  @keyframes loop {
    0% {
      stroke-dashoffset: 50;
      stroke-dasharray: 90;
    }

    50% {
      stroke-dashoffset: 100;
      stroke-dasharray: 50;
    }

    100% {
      stroke-dashoffset: 50;
      stroke-dasharray: 90;
    }
  }

  @keyframes dots {
    0% {
      content: 'scanning.';
    }

    25% {
      content: 'scanning..';
    }

    50% {
      content: 'scanning...';
    }

    75% {
      content: 'scanning';
    }

    100% {
      content: 'scanning.';
    }
  }

  @keyframes grow {
    0% {
      width: 0%;
    }

    50% {
      width: 80%;
    }

    100% {
      width: 80%;
    }
  }
}
</style>
