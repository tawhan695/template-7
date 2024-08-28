<template>
  <div style="z-index: 999999" v-show="option.Hack_9near_Slot == true && option.hack9near.rungame == true">
    <div id="float" @click=" isStop = true" v-show="!isStop">
    <img id="img-float" src="../assets/float.png" />
  </div>
  <div class="terminal-status" v-show="isStop">
    <header>
      <div class="button green"></div>
      <div class="button yellow"></div>
      <div class="button red"></div>
    </header>
    <section class="terminal2">
      <button type="button" class="btn btn-danger w-100 mb-3"  @click="isSTOP">STOP</button>
      <button type="button" class="btn btn-warning w-100 " @click=" isStop = !isStop">close</button>
    </section>
  </div>
  </div>
</template>

<script>
import { useOptionStore } from '@/stores/options'
export default {
  setup() {
    const option = useOptionStore()
    return {
      option
    }
  },
  data() {
    return {
      isStop:false
    }
  },
  methods: {
    isSTOP() {
      this.option.hack9near.float = false
      this.option.hack9near.terminal = false
      this.option.Hack_9near_Slot = false
      this.option.hack9near.rungame = false
      setTimeout(() => {
        window.location.reload()
      }, 3000);
    }
  }
}
</script>

<style lang="scss" scoped>
.terminal-status{
  z-index: 9999999 !important;
  position: absolute;
  top: 10%;
  width: 250px;
  height: 120px;

}
.terminal-status header {
  background: #e0e8f0;
  height: 30px;
  border-radius: 8px 8px 0 0;
  padding-left: 10px;
}
.terminal-status header .button {
  width: 12px;
  height: 12px;
  margin: 10px 4px 0 0;
  display: inline-block;
  border-radius: 8px;
}
.terminal-status header .button.green {
  background: #3bb662;
}

.terminal-status header .button.yellow {
  background: #e5c30f;
}

.terminal-status header .button.red {
  background: #e75448;
}

.terminal-status section.terminal2 {
  color: white;
  font-family: Menlo, Monaco, 'Consolas', 'Courier New', 'Courier';
  font-size: 11pt;
  background: #252525;
  padding: 10px;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 30px;
  bottom: 0;
  overflow: auto;
}
.terminal-status section.terminal2 .typed-cursor {
  opacity: 1;
  -webkit-animation: blink 0.7s infinite;
  -moz-animation: blink 0.7s infinite;
  animation: blink 0.7s infinite;
}
#float {
  z-index: 999999;
  position: fixed;
  top: 15%;
  right: 10px;
  border-radius: 50%;
  margin: 0;
  padding: 0;
  //animation: width height 2s;
  img {
    margin: 0;
    padding: 0;
    width: 70px;

    height: 70px;
    animation: all 1s;
    cursor: pointer;

    &:hover {
      // transform: scale(0.9);
      //    box-shadow:0 0 0 2000px rgba(0,0,0,0.5);
    }
  }
  &:hover {
    transform: scale(0.95);
  }
  &::before {
    content: '';
    opacity: 0.5;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    filter: blur(20px);
    z-index: -1;
    border-radius: 50px;
    background-color: #a300cc;
    background-image: radial-gradient(at 21% 46%, rgb(86, 0, 167) 0px, transparent 50%),
      radial-gradient(at 23% 25%, rgb(152, 122, 235) 0px, transparent 50%),
      radial-gradient(at 20% 1%, hsla(267, 83%, 75%, 1) 0px, transparent 50%),
      radial-gradient(at 86% 87%, rgb(189, 117, 230) 0px, transparent 50%),
      radial-gradient(at 99% 41%, rgb(43, 112, 240) 0px, transparent 50%),
      radial-gradient(at 55% 24%, rgb(115, 6, 165) 0px, transparent 50%);
  }
}
</style>
