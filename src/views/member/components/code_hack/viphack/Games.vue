<template>
  <div id="list_">
    <div class="text-change-container">
      <div class="text-change"></div>
    </div>
    <div class="d-flex justify-content-center">
    <div class="row" style="max-width: 900px">
      <div
        class="col-4 col-sm-3"
         v-for="game in gameList.gamesList"
        :key="game.key"
        :class="findhack(game.productCode, game.gameId)"
         @click="gameloginJavis(game)" 
      >
          <img class="w-100 img-game" :src="VITE_ASKMEBET_URL+game.imgUrl" />
        <p class="text-center slot-name">{{ game.gameName}}</p>
      </div>
    </div>
    </div>
    <br /><br /><br />
  </div>
</template>

<script>
// import axios from "axios";
import Swal from "sweetalert2";
// import Cookies from 'js-cookie';
import { useConfigStore } from "@/stores/config";
import { useAuthStore } from "@/stores/auth";
import { useOptionStore } from "@/stores/options";
import { useGamesStore } from "@/stores/games";
import { useUserStore } from "@/stores/user"
export default {
  setup() {
    const auth = useAuthStore();
    const config = useConfigStore();
    const option = useOptionStore();
    const GamesStore = useGamesStore();
    const userStore = useUserStore();
    return {
      auth,
      config,
      option,
      GamesStore,
      userStore
    };
  },
  data() {
    return {
      url: "",
      step: 0,
      code: "",
      vendor: "",
      gameList: [],
      slothack: null,
      VITE_ASKMEBET_URL:import.meta.env.VITE_ASKMEBET_URL
    };
  }, 
  async created() {
    
  },
  mounted() {
    document.getElementById('intergramRoot').style.display = 'none';
    this.init()
    class TextScramble {
      constructor(el) {
        this.el = el;
        this.chars = "!<>-_\\/[]{}—=+*^?#________";
        this.update = this.update.bind(this);
      }
      setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => (this.resolve = resolve));
        this.queue = [];
        for (let i = 0; i < length; i++) {
          const from = oldText[i] || "";
          const to = newText[i] || "";
          const start = Math.floor(Math.random() * 40);
          const end = start + Math.floor(Math.random() * 40);
          this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
      }
      update() {
        let output = "";
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
          let { from, to, start, end, char } = this.queue[i];
          if (this.frame >= end) {
            complete++;
            output += to;
          } else if (this.frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = this.randomChar();
              this.queue[i].char = char;
            }
            output += `<span class="dud">${char}</span>`;
          } else {
            output += from;
          }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
          this.resolve();
        } else {
          this.frameRequest = requestAnimationFrame(this.update);
          this.frame++;
        }
      }
      randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
      }
    }

    const phrases = ["VIP Hack Slot", "", "Game Slot"];

    const el = document.querySelector(".text-change");
    const fx = new TextScramble(el);

    let counter = 0;
    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 3000);
      });
      counter = (counter + 1) % phrases.length;
    };
    next();
    //  this.gameList.forEach(element => {
    //   console.log(element);
      
    // });
  },
  methods: { 
   async init(){
      this.slothack = this.option.vipgamelist;
    this.isRequest = true; 
    let distance =
      new Date(this.option.code_max_timeout).getTime() -
      new Date().getTime();

    if (distance < 1 && this.option.game_max_list) {
      this.$router.push("/viphackslot");
    } else {
      // this.vendor = this.$route.params.vendor;
      const user = { username: this.userStore.userProfile.users[1].username, password: this.userStore.userProfile.password };
        await this.GamesStore.getGameAll(user);
        this.gameList = this.GamesStore.SLOT.find((e) => e.productCode === this.$route.params.vendor);
  
    }
    },
    findhack(code,gameid){
      if (typeof this.slothack[code] == "undefined"){
        return ''
      }
      else if (typeof this.slothack[code][gameid] == "undefined") {return ''}
      else if (this.slothack[code][gameid]["future"] == false){return 'hacksuccess'}
      // let datagame = this.slothack[code][gameid];
      // name
      // datagame
      // console.log(datagame);  
      // return 'hacksuccess'
    },
    async gameloginJavis( dataGame) {
        Swal.showLoading()
           let { data } = await this.GamesStore.getlink(dataGame.productCode, dataGame.gameCode);
          if (data.message == "success") {
            let url = data.url.replace("http://", "https://");
            // console.log(dataGame);
            this.option.Setviphackedgames = { url:url,balance:localStorage.credit,data_Game:JSON.stringify(dataGame)};
            this.$router.push("/viphackgames"); 
            Swal.close();
          } else {
            Swal.fire(
              "ขออภัย",
              "ค่ายเกมส์กำลังปิดปรับปรุงอยู่ค่ะ", // data.error.message,
              data.status
            );
          }
          Swal.close();
    },
  },
};
</script>
<style lang="scss" scoped>
#list_ {
  background: #212121;
  z-index: 110;
  width: 100%;
  font-size: 20px !important;
  font-family: "Goldman", monospace;
  //  filter: drop-shadow(0 0 0.5em #5fd8fa);
  color: #5fd8fa;
  // text-shadow: 2px 2px 5px #5fd8fa;
  font-weight: 600;
  .row > * {
    margin-top: 0;
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .row {
    margin-top: 0;
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .img-game {
    border-radius: 10px;
    filter: drop-shadow(0 0 0.5em #5fd8fa);
  }
  .img-game:hover {
    filter: drop-shadow(0 0 0.5em #c72a30);
  }
}
.hacksuccess{
  filter: drop-shadow(0 0 0.5em #c72a30);
  .img-game{
    filter: drop-shadow(0 0 0.5em #860c10) !important;
  }
  .slot-name{
    color: #c72a30;
    text-shadow: 2px 2px 5px #3b0a0c;
  }
  &::after{
    content: "Pro";
    position: absolute;
    color: red;
    font-weight: 900;
    top: 10px;
    left: 20px;
    background: #000;
    padding: 8px;
    border-radius: 10px;
  }
}
.dud {
  color: rgba(200, 30, 30, 0.8);
  filter: drop-shadow(0 0 0.5em red);
}
.text-change-container {
  // position: absolute;
  height: 100px;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  box-shadow: none;
  border: none;
  font-size: 2rem;
  // top: -15%;
}
.text-change {
  position: absolute;
  height: 50px;
  font-family: "Goldman", monospace;
  font-weight: normal;
  font-size: 30px;
  color: rgba(200, 200, 200, 1);
  filter: drop-shadow(0 0 0.3em rgba(200, 200, 200, 0.3));
}
</style>
