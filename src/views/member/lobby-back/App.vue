<template>
  <div class="container-custom-lobby">
    <RouterView class="animate__animated animate__fadeInUp" />
  </div>
  <Sidebar />
</template>

<script>
import Sidebar from "./components/sidebar.vue";
import { useGamesStore } from "../../../stores/games";
import { useUserStore } from "../../../stores/user";

export default {
  setup() {
    const games = useGamesStore();
    const userStore = useUserStore();
  
    return {
      games,
      userStore,
    
    };
  },
  data() {
    return {
      fullPage: true
    }
  },
  components: {
    Sidebar,
  },
  mounted() {
    // this.loadGame()
  },
  methods: {
    async loadGame() {
      if (!this.games.Game) {

        let loader = this.$loading.show({
          container: this.fullPage ? null : this.$refs.formContainer,
          color: 'red',
          backgroundColor: "#000",
          opacity: 0.9

        });
        const user = { username: this.userStore.userProfile.users[1].username, password: this.userStore.userProfile.password };
        await this.games.getGameAll(user);
        setTimeout(() => {
          loader.hide()
        }, 1000)
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.animate__animated {
  --animate-duration: .3s;
}
.container-custom-lobby {
  // padding-top: 6%;
  margin-left: 250px;

  @media only screen and (max-width: 750px) {
    margin-left: 100px;
  }
}

.v-title {
  font-weight: 900;
  background: linear-gradient(0deg,
      rgba(224, 169, 83, 1) 0%,
      rgba(251, 212, 109, 1) 53%,
      rgba(224, 169, 83, 1) 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
}
</style>
