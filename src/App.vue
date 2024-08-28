<script setup> 
import { useOptionStore } from "./stores/options";
// import chatKk from "./components/Chat-KK/chat-kk.vue";
const optionStore = useOptionStore();

optionStore.getLineContact()
optionStore.getPromotionPopup()

</script>

<template>
  <RouterView />
  <!-- <chatKk></chatKk> -->
</template>

<style lang="scss">
@import "~bootstrap";
</style>
