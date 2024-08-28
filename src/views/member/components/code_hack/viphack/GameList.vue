<template>
  <div id="list_">
    <div class="text-change-container">
      <div class="text-change"></div>
    </div>
    <div class="d-flex justify-content-center">
      <div class="row" style="max-width: 900px">
        <router-link
          class="col-6 col-sm-3"
          v-for="slot in SLOT_LIST"
          :key="slot.key"
          :value="slot.gameId"
          :to="{ path: '/viphackslotgames/' + slot.gameId + '' }"
        >
          <div v-if="slothack[slot.gameId]" class="d-vip">
            <p class="hack-vpi">HACK VIP</p>
          </div>
          <img
            :class="[slothack[slot.gameId] ?  'w-100 img-game-vip ' : 'w-100 img-game' ]"
            :src="''+slot.img"
          />
          <p
            :class="[slothack[slot.gameId] ? 'text-center  name-vip' : 'text-center  slot-name' ]"
          >{{ slot.name }}</p>
          <!-- <p class="text-center slot-name text-dark"  v-bind:class="{name-vip: slotgame[slot.gameId]}">{{ slot.name }}</p> -->
          <!-- <p class="text-center slot-name" > {{ slot.name }}</p> -->
        </router-link>
      </div>
    </div>
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import { SLOT_LIST } from "@/mixins/data";
import { useConfigStore } from "@/stores/config";
import { useAuthStore } from "@/stores/auth";
import { useOptionStore } from "@/stores/options";
export default {
  name:'VIP GameList',
  data() {
    return {
      SLOT_LIST,
      gameList: [],
      isRequest: false,
      slothack: null,
      slotgame: null,
    };
  }, 
  setup() {
    const auth = useAuthStore();
    const config = useConfigStore();
    const option = useOptionStore();
    return {
      auth,
      config,
      option,
    };
  },
  async created() {
    this.slothack = this.option.vipgamelist;
    this.slotgame = this.option.vipgamelist;
    this.isRequest = true; 
    let distance =
      new Date(this.option.code_max_timeout).getTime() -
      new Date().getTime();
    
    if ((distance < 1 && this.option.game_max_list ) || this.option.code_max_timeout == null) {
      this.$router.push("/viphackslot");
    }
  },
  mounted() {
    document.getElementById('intergramRoot').style.display = 'none';
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
  },
  methods: {

  },
};
</script>
<style lang="scss" scoped>
.d-vip {
  position: absolute;
  z-index: 1;
  transform: rotate(-45deg);
  background: #212121;
  width: 131px;
  padding-left: 10px;
  height: 40px;
  margin-left: -27px;
  margin-top: 34px;
  border-radius: 10px;
  border: #ff0000 2px double;
}
.hack-vpi {
  font-size: 18pt; 
  text-shadow: 2px 0px 1px #ffe600;
  font-weight: 900;

  background: linear-gradient(
    to bottom,
    #ff0000 22%,
    #fa0e0e 24%,
    #ff0000 26%,
    #ff0000 27%,
    #ff0000 40%,
    #c00303 78%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
}
#list_ {
  background: #212121;
  z-index: 110;
  width: 100%;
  font-size: 20px !important;
  font-family: "Goldman", monospace;
  //  filter: drop-shadow(0 0 0.5em #5fd8fa);
  color: #ffff;
  text-shadow: 2px 2px 5px #5fd8fa;
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
    filter: blur(5px) !important;
    filter:grayscale(0.9) !important;
    filter: drop-shadow(0 0 0.5em #5fd8fa);
  }
  .img-game:hover {
    filter: drop-shadow(0 0 0.5em #c72a30);
  }
  .img-game-vip {
    filter: drop-shadow(0 0 1em #e6aa22);
    animation: vip 1.5s infinite;
    // animation-duration: 4s ;
  }
  .img-game-vip:hover {
    filter: drop-shadow(0 0 1.5em #ffb60c);
  }
  @keyframes vip {
    0% {
      filter: drop-shadow(0 0 0.9em #e6aa22);
    }
    25% {
      filter: drop-shadow(0 0 1em #e6aa22);
    }
    50% {
      filter: drop-shadow(0 0 1.5em #e6aa22);
    }
    75% {
      filter: drop-shadow(0 0 1em #e6aa22);
    }
    100% {
      filter: drop-shadow(0 0 0.9em #e6aa22);
    }
  }
  .name-vip {
    text-shadow: 2px 2px 5px #e6aa22;
    // color: #cfc09f;
    background: linear-gradient(
      to bottom,
      #cfc09f 22%,
      #634f2c 24%,
      #cfc09f 26%,
      #cfc09f 27%,
      #ffecb3 40%,
      #3a2c0f 78%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #fff;
    font-family: "Playfair Display", serif;
    position: relative;
    text-transform: uppercase;
    // font-size: 18vw;
    margin: 0;
    // font-weight: 400;
  }

  .name-vip:after {
    background: none;
    content: attr(data-heading);
    left: 0;
    top: 0;
    z-index: -1;
    position: absolute;
    text-shadow: -1px 0 1px #c6bb9f, 0 1px 1px #c6bb9f,
      5px 5px 10px rgba(0, 0, 0, 0.4), -5px -5px 10px rgba(0, 0, 0, 0.4);
  }

  .img-gamevip {
    filter: drop-shadow(0 0 0.5em #5fd8fa);
  }
  a {
    font-size: 20px !important;
    font-family: "Goldman", monospace;
    color: #5fd8fa;
    text-shadow: 2px 2px 5px #5fd8fa;
    font-weight: 600;
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
