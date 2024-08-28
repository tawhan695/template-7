<template>
  <div id="float" @click="start()" :class="option.hack9near.float == true ? '' : 'd-none'">
    <img id="img-float" src="../assets/float.png" />
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
  methods: {
    start() {
      // document.getElementById('float').style.display = 'none';
      this.$emit('callback',true)
      this.option.hack9near.float = false;
      this.option.hack9near.terminal = true;
    }
  }
}
</script>

<style lang="scss" scoped>
#float {
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
