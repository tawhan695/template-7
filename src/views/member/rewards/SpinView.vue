<template>
  <div class="p-3 text-white">
    <div class="container">
    
      <whell-spin></whell-spin>
    </div>
  </div>
</template>
<script>
import WheelSpin from "../components/Reward/WheelSpin.vue";
export default {
  components: {
    "whell-spin": WheelSpin,
  },
  data() {
    return {};
  },

  mounted() {},
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  max-width: 1110px;
}
.row {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
