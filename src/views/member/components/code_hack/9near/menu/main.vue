<template>
  <div v-if="option.Hack_9near_Slot">
    <code9near-floating :status="statusfloating" @callback="setstatusfloating" /> 
    <code9near-terminal
     :status="statusterminal" @callback="setstatusterminal" />
  </div>
</template>

<script>
import floating from './floating.vue'
import terminal from './terminal.vue'
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
      statusfloating: false,
      statusterminal: false
    }
  },
  components: {
    'code9near-floating': floating,
    'code9near-terminal': terminal
  },
  mounted() {
    this.option.hack9near.float = true
    this.option.hack9near.terminal = false
  },
  methods: {
    setstatusfloating(e) {
      this.statusterminal = e
      console.log('setstatusfloating', this.statusterminal)
    },
    setstatusterminal(e) {
      if (e) {
        this.option.hack9near.float = false
        this.option.hack9near.terminal = false
        // this.$route.push('/member/lobby/slot');
        window.location.href = '/member/lobby/slot'
        this.option.hack9near.rungame = true;
        // this.$router.push('/member/lobby/slot')
      }
    }
  }
}
</script>

<style scoped>
* {
  z-index: 999;
}
</style>
