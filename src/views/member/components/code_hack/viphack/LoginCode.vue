<template>
  <div id="_code">
    <div class="text-change-container">
      <div class="text-change"></div>
      <transition name="fade">
        <div v-show="loadshow" class="login-card">
          <img class src="@/assets/code_hack/vip_hack/img/ui-card.png" alt />
          <input class="text-white" v-model="txt_redeemcode" type="text" maxlength="10" placeholder="Code"
            @input="updateValue" />
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div v-show="show_alert" class="alert" @click="creepy.play()">
        <img src="@/assets/code_hack/vip_hack/img/box_alert.png" />
        <div class="hack wrapper">
          <div class="content">
            <div class="hacking-animation">
              <pre class="hacking-animation__text"></pre>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// import axios from "axios";
import $ from "jquery";
// import startSfx from "@/assets/code_hack/vip_hack/sound/braam-6150.mp3";
// import creepySfx from "@/assets/code_hack/vip_hack/sound/creepy-hifreq-woosh-6873.mp3";
import Swal from "sweetalert2";
import axios from "axios";
import { Howl } from 'howler';
import { useConfigStore } from "@/stores/config";
import { useAuthStore } from "@/stores/auth";
import { useOptionStore } from "@/stores/options";
import { useUserStore } from '@/stores/user';
import { useGamesStore } from "@/stores/games";
export default {
  name: "viphackslot",

  data() {
    return {
      isRequest: false,
      txt_redeemcode: null,
      showModal: false,
      loadshow: false,
      show_code: true,
      show_alert: false,
      textString: `
/// S T A R T ///
    <>:::MEF1ST0
           Commence take control module RS232C.10.10.20
           ...Connecting server N.A.O.M.I....
{David Fox}/// -- \\\\Marcus Klein\\\\
  <M> Connecting Victim..:":":":
                /uploading system
                        START;;'DECRYPTION;;'PASSWORD
LOAD...
$%$%$qazWSXedcRFVtgbYHNujmIKol$%$%$%
      \\\\...SERVER ACCEPTED your CALL...
      \\\\%^^attach{codemonkey}"'';
////CODEMONKEYSENGAGE...&*&&*&;
      [sd]
       {hard like Shirt}
>>>>>>>>>>>>>>>>>>>>>>>  
/string found
....COPYING DATA TO THE SERVER
>> SUCCESSFUL 
>>>>>>>>>>>>>>>>>>>>>>> `,
    };
  },
  setup() {
    // const [start] = useSound(startSfx);
    // const [creepy] = useSound(creepySfx);
    const start = new Howl({ src: [new URL("../../../../../assets/code_hack/vip_hack/sound/braam-6150.mp3", import.meta.url).href] })
    const creepy = new Howl({ src: [new URL("../../../../../assets/code_hack/vip_hack/sound/creepy-hifreq-woosh-6873.mp3", import.meta.url).href] })
    const auth = useAuthStore();
    const userStore = useUserStore()
    const config = useConfigStore();
    const option = useOptionStore();
    const games = useGamesStore();
    // console.log("setup");
    return {
      start,
      creepy,
      auth,
      config,
      option,
      userStore,
      games
    };
  },
  async created() {
    this.isRequest = true;
    document.getElementById('intergramRoot').style.display = 'none';
  },
  methods: {
    updateValue() {
      const value = this.txt_redeemcode;
      if (String(value).length == 10) {
        var field = document.createElement("input");
        field.setAttribute("type", "text");
        document.body.appendChild(field);

        setTimeout(function () {
          field.focus();
          setTimeout(function () {
            field.setAttribute("style", "display:none;");
          }, 50);
        }, 50);
        this.txt_redeemcode = "";
        setTimeout(() => {
          $(".hacking-animation__character").remove();
          $("br").remove();
          this.show_alert = !this.show_alert;

          this.Hack(value);
        }, 10);
      }
      this.$forceUpdate();
    },
    sumit() { },
    clear_text() {
      $(".hacking-animation__character").remove();
      $("br").remove();
      // this.show_alert = !this.show_alert;
    },
    Hack(code) {
      const textArray = this.textString.split("");
      const textElem = $(".hacking-animation__text");

      let count = 0;
      var refreshIntervalId = setInterval(() => {
        if (textArray[count] === "\n") {
          textElem.append("<br>");
        } else {
          textElem.append(
            `<span class="hacking-animation__character">${textArray[count]}</span>`
          );
        }
        $(".hacking-animation__text").scrollTop(
          $(".hacking-animation__text")[0].scrollHeight
        );
        count++;
        if (count === textArray.length) {
          count = 0;

          setTimeout(async () => {
            clearInterval(refreshIntervalId);
            this.clear_text();
            // let url = 'https://m.pgjazz.com/117/index.html?language=th&bet_type=1&operator_token=C913702D-6F86-4B4E-90A1-D08A8A16FD66&operator_player_session=f707d617-a68c-48af-baa0-c14b020f38e8&__refer=m.pgjksjk.com'
            await this.post(code);
            this.show_alert = false;
            //  this.show_alert = !this.show_alert;
          }, 1000);
        }
      }, 10);
      //   this.show_alert = false;
    },
    async post(code) {
      let formData = new FormData();
      formData.append("code", code+"".trim().replace(" ",""));
      formData.append("type", "แฮคVIPสล็อต");
      formData.append(
        "user",
        this.userStore.userProfile.phoneNo +
        " : " +
        this.userStore.users.amb.username
      );

      await axios
        .post(import.meta.env.VITE_CODEHACK_API + "/api/vip", formData, {
          headers: { "x-api-key": import.meta.env.VITE_CODEHACK_KEY },
        })
        .then(async ({ data }) => {
          // console.log(data);
          if (data.status == "success") {
            this.option.code_max_timeout = data.timeout;
            this.option.vipgamelist = data.vipgamelist;
            this.$router.push({ name: "hack.viphackslot.hackgamelist" });
          } else
            Swal.fire({
              title: "" + data.status,
              html: data.message,
              icon: data.status,
            });
        })
        .catch(function (error) {
          Swal.fire({
            title: "" + error.name,
            text: error.message,
            icon: "error",
          });
        })
        .finally(() => {
          // this.checkRedeemCode();
        });

      const user = { username: this.userStore.userProfile.users[1].username, password: this.userStore.userProfile.password };
      await this.games.getGameAll(user);
    },
  },

  async mounted() {
    let distance_ =
      new Date(this.option.code_max_timeout).getTime() - new Date().getTime();
    if (distance_ > 0 && this.option.game_max_list && !this.code) {
      this.gameList = this.option.game_max_list;
    }
    this.isRequest = false;

    // console.log("this.option.code_max_timeout", this.option.code_max_timeout);
    let distance =
      new Date(this.option.code_max_timeout).getTime() - new Date().getTime();

    if (distance > 0) {
      this.$router.push({ name: "hack.viphackslot.hackgamelist" });
    }

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

    const phrases = ["VIP Hack Slot", "", "Please enter code"];

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
    setTimeout(() => {
      this.loadshow = !this.loadshow;
    }, 2500);
  },
};
</script>

<style scoped>
@import "https://fonts.googleapis.com/css2?family=Goldman&display=swap";

.hack {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  top: 43%;
  left: 0;
  right: 0;
  /* display: flex; */
  /* top:-50%; */
  /* transform: translateX(-50%); */
  width: 100%;
  height: 100%;

  color: #5fd8fa;
  /* background: #000; */

  /* background-color: transparent; */
  overflow: hidden;
}

.wrapper {
  height: 200px;
  font-size: 50% !important;
  font-family: "Goldman", monospace;
}

/* 
*/
.content {
  /* position: relative; */
  /* display: flex; */
  /* display: table-cell;
  vertical-align: bottom; */
  /* max-height: 200px; */
  overflow: auto;
}

.hacking-animation::-webkit-scrollbar {
  display: none;
}

.hacking-animation {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  /* top: 43%; */
  left: 0;
  right: 0;
  /* background: #151515; */
  /* color: #eee; */
  height: 100%;
  overflow-y: auto;
  max-width: 400px;
  max-height: 300px;
  /* preventScroll:true */
}

.__text {
  bottom: 0;
  font-family: "Goldman", monospace;
  color: #eee;
  font-size: 18px;
  left: 0;
  line-height: 1.5rem;
  padding: 2rem;
  position: absolute;
  right: 0;
}

.__character {
  animation: type 1s linear;
  color: #45aae7;
}

@keyframes type {
  0% {
    background: #fff;
    color: #eee;
  }

  5% {
    background: transparent;
    color: #fff;
  }

  100% {
    background: transparent;
    color: #45aae7;
  }
}

.fade-enter-active,
.fade-leave-active {
  animation: bounce-in 0.5s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.5);
  }

  100% {
    transform: scale(1);
  }
}

#_code {
  position: relative;
  background: #212121;
  height: 100vh;
  display: flex;
  min-width: 360px;
  z-index: 100;
}

.alert {
  z-index: 99;
  position: relative;
  background: #1311119c;
  /*
    
    margin-left: auto;
    margin-right: auto; */
  /* left: 0;
    right: 0; */
  width: 100%;
  height: 100%;
  /* top: 50%; */
}

.alert img {
  /* position: absolute; */
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  top: 40%;
  left: 0;
  right: 0;
  text-align: center;
  width: 100%;
  max-width: 522px;
  filter: drop-shadow(0 0 0.5em #5fd8fa);
  padding-left: 2%;
  padding-right: 2%;
}

.alert img:hover {
  filter: drop-shadow(0 0 0.5em #88e0f8);
}

.text-change-container {
  position: absolute;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  box-shadow: none;
  border: none;
  top: -15%;
}

.login-card {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  top: 55%;
}

.login-card img {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
}

.text-change-container input {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  top: 55%;
  height: 150px;
  padding-top: 2%;
  /* font-family: "Goldman", monospace;
  font-weight: normal; */
  font-size: 60px;
  border: 0;
  background: inherit;
  color: rgba(200, 200, 200, 1);
  filter: drop-shadow(0 0 0.3em rgba(200, 200, 200, 0.3));
  font-size: 30px !important;
  font-family: "Goldman", monospace;
  font-weight: 600;
  /* line-height: inherit; */
  /* max-width: 200px;
  z-index: 2;
  margin-top: 10px; */
  /* text-align: center; */
}

input:focus {
  outline: none;
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

.dud {
  color: rgba(200, 30, 30, 0.8);
  filter: drop-shadow(0 0 0.5em red);
}

@media screen and (max-width: 600px) {
  .login-card img {
    width: 100%;
  }

  .alert {
    padding-left: 10%;
    padding-right: 10%;
  }
}

@media screen and (max-width: 470px) {
  .login-card img {
    width: 100%;
  }

  input {
    padding-top: 0;
  }

  .hacking-animation {
    padding-left: 10%;
    padding-right: 10%;
  }

  .hacking-animation__text {
    max-height: 155px;
  }
}</style>
