<template>
  <div class="container-custom-lobby">
    <RouterView class="animate__animated animate__fadeIn" />
  </div>
  <Sidebar />
</template>

<script>
import Sidebar from "./components/sidebar.vue";
import { useGamesStore } from "../../../stores/games";
import { useUserStore } from "../../../stores/user";
import { useGamesStoreV2 } from "../../../stores/games-v2";

export default {
  setup() {
    const games = useGamesStore();
    const userStore = useUserStore();
    const gamesV2 = useGamesStoreV2();

    return {
      games,
      userStore,
      gamesV2

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
  created() {
    this.loadGameAll()
  },
  methods: {
    loadGameAll() {
      this.gamesV2.setGameListAll()
      // console.log("ListGamesAll :", this.gamesV2.ListGamesAll);

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
