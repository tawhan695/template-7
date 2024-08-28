<script>
import { useUserStore } from '@/stores/user'
export default {
  setup() {
    const userStore = useUserStore()
    return {
      userStore
    }
  },
  data() {
    return {
      rankicons: {
        New: new URL('./icons/NEW.png', import.meta.url).href,
        //    "MEMBER": new URL('', import.meta.url)
        MEMBER: new URL('./icons/MEMBER.png', import.meta.url).href,
        VIP1: new URL('./icons/1.png', import.meta.url).href,
        VIP2: new URL('./icons/2.png', import.meta.url).href,
        VIP3: new URL('./icons/3.png', import.meta.url).href,
        VIP4: new URL('./icons/4.png', import.meta.url).href,
        VIP5: new URL('./icons/5.png', import.meta.url).href,
        VIP6: new URL('./icons/6.png', import.meta.url).href,
        VIP7: new URL('./icons/7.png', import.meta.url).href
        // 'vip': new URL("@/views/member/components/Ranking/assets/icon vip.png", import.meta.url).href
      },
      exp:'width:0%',
      rank: 'New', // test 
      ranks: ['New', 'MEMBER', 'VIP1', 'VIP2', 'VIP3', 'VIP4', 'VIP5', 'VIP6', 'VIP7'],
      ranking: {
        rank: { rank: null, icon: null },
        rank_up: { rank: null, icon: null },
        exp: 100,
        exp_up: 10000
      }
    }
  },
  mounted() {
    this.getRank = this.userStore.userProfile.ranks
    this.ranks.forEach((e, index) => {
      if (e == this.rank) {
        this.ranking.rank.rank = e
        this.ranking.rank_up.rank = this.ranks[index + 1]
        this.ranking.rank.icon = this.rankicons[e]
        this.ranking.rank_up.icon = this.rankicons[this.ranks[index + 1]]
        // console.log(e, index)
      }
    })
  },
  computed: {
    getRank: {
      get() {
        return this.rank
      },
      set(val) {
        this.rank = val.rankName
        // console.log(val.score.split("/"));
        let score =val.score.split("/");
        this.ranking.exp = score[0]
        this.ranking.exexp_upp  = score[1]
        this.exp = 'width:' +(score[0] *100 )/ score[1] +'%'
      }
    }
  }
}
</script>
<template>
  <div class="progress-icon">
    <img class="rank" :src="this.ranking.rank.icon" />
    <img class="rank_up" :src="this.ranking.rank_up.icon" />
    <div class="status text-gold">Rank : {{ rank }}</div>
    <div class="progress-loader">
      <div class="progress" :style="this.exp"></div>
    </div>
    <div class="exp text-gold">
      {{ formatNumber(ranking.exp) }} / {{ formatNumber(ranking.exp_up) }}
    </div>
  </div>
</template>
<style scoped lang="scss">
.progress-icon {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  top: -8px;
  .rank {
    width: 50px;
    @media (max-width: 550px) {
      width: 40px;
      left: -27px;
    }
    top: -9px;
    position: absolute;
    left: -37px;
    bottom: 0;
    margin: auto;
    cursor: pointer;
    &:hover {
      transform: scale(1.3);
      animation: all 5s linear;
    }
  }
  .text-gold {
    background: linear-gradient(
      0deg,
      rgba(224, 169, 83, 1) 0%,
      rgba(251, 212, 109, 1) 53%,
      rgba(224, 169, 83, 1) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-transform: uppercase;
    font-weight: 900;
  }
  .status {
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 5px;
    bottom: 0;
    margin: auto;
    text-align: center;
  }
  .exp {
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    // top: 0;
    bottom: 12px;
    margin: 0 auto;
    font-size: 0.8rem;
    text-align: center;
  }
  .rank_up {
    cursor: pointer;
    &:hover {
      transform: scale(1.3);
      animation: all 5s linear;
    }
    width: 50px;
    top: -9px;
    @media (max-width: 550px) {
      width: 40px;
      right: -27px;
    }
    position: absolute;
    right: -37px;
    bottom: 0;
    margin: auto;
  }
  .progress-loader {
    width: 300px;
    @media (max-width: 550px) {
      width: 180px;
      height: 15px;
    }
    background: rgb(56, 56, 54);
    background: linear-gradient(
      0deg,
      rgba(56, 56, 54, 1) 17%,
      rgba(19, 21, 20, 1) 49%,
      rgba(56, 56, 54, 1) 87%
    );
    height: 20px;
    border-radius: 7px;
    box-shadow: #ffe3a7 0px 0px 2px 0px, #996e1a 0px 0px 2px 2px, #5b3a00 0px 0px 10px 5px;
  }

  .progress {
    width: 1px;
    height: 20px;
    border-radius: 7px;
    background: linear-gradient(
      0deg,
      rgba(241, 200, 80, 1) 17%,
      rgba(193, 112, 10, 1) 49%,
      rgba(241, 200, 80, 1) 87%
    );
    @media (max-width: 550px) {
      height: 15px;
    }
    transition: 0.5s;
    width: 50%;
    animation: width 1s linear;
  }

  @keyframes loading_44 {
    from {
      width: 0%;
    }
    to {
      width: 80%;
    }
  }
}
</style>
