<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="sidebar" class="sidebar">
    <br /><br /><br />
    <ul class="sidebarList">
      <li class="row text-white">
        <router-link :to="{ name: 'Member.Lobby.Hotgame' }" active-class="sidebar-group"
          class=" sidebar-group-unclick MuiGrid-container">
          <div class=" sidebar-icon MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-lg-6">
            <img src="@/assets/img/sidebar/ez-slot-category-popular-mobile.webp" class="" />
          </div>
          <div class=" sidebar-title MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-lg-6">
            <span class="manu-md">HOT GAME<br class="" /></span><span class="text-base-2">ยอดนิยม</span>
          </div>
        </router-link>
      </li>
      <li class="row text-white">
        <router-link :to="{ name: 'Member.Lobby.Casino' }" active-class="sidebar-group"
          class=" sidebar-group-unclick MuiGrid-container">
          <div class=" sidebar-icon MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-lg-6">
            <img src="@/assets/img/sidebar/ez-slot-category-casino-mobile.webp" class="" />
          </div>
          <div class=" sidebar-title MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-lg-6">
            <span class="manu-md"> CASINO<br class="" /></span><span class="text-base-2">คาสิโนสด</span>
          </div>
        </router-link>
      </li>
      <li class="row text-white">
        <router-link :to="{ name: 'Member.Lobby.Slot' }" active-class="sidebar-group" :class="$route.name == 'Slot.games'
          ? 'sidebar-group router-link-exact-active'
          : ''
          " class=" sidebar-group-unclick MuiGrid-container">
          <div class=" sidebar-icon MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-lg-6">
            <img src="@/assets/img/sidebar/ez-slot-category-brand-mobile.webp" class="" />
          </div>
          <div class=" sidebar-title MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-lg-6">
            <span class="manu-md">SLOT<br class="" /></span><span class="text-base-2">สล็อตเกม</span>
          </div>
        </router-link>
      </li>
      <li class="row text-white">
        <router-link :to="{ name: 'Member.Lobby.Card' }" active-class="sidebar-group"
          class=" sidebar-group-unclick MuiGrid-container">
          <div class=" sidebar-icon MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-lg-6">
            <img src="@/assets/img/sidebar/ic-nav-menu-card.png" class="" />
          </div>
          <div class=" sidebar-title MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-lg-6">
            <span class="manu-md">CARDS<br class="" /></span><span class="text-base-2">เกมส์ไพ่</span>
          </div>
        </router-link>
      </li>
      <li class="row text-white">
        <router-link :to="{ name: 'Member.Lobby.Fishing' }" active-class="sidebar-group"
          class=" sidebar-group-unclick MuiGrid-container">
          <div class=" sidebar-icon MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-lg-6">
            <img src="@/assets/img/sidebar/ez-slot-category-fishing-game-mobile.webp" class="" />
          </div>
          <div class=" sidebar-title MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-lg-6">
            <span class="manu-md">FISHING<br class="" /></span><span class="text-base-2">เกมส์ตกปลา</span>
          </div>
        </router-link>
      </li>
      <!-- <li class="row text-white">
        <router-link :to="{ name: 'Member.Lobby.Sport' }" active-class="sidebar-group"
          class=" sidebar-group-unclick MuiGrid-container">
          <div class=" sidebar-icon MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-lg-6">
            <img src="@/assets/img/sidebar/ez-slot-category-sport-mobile.webp" class="" />
          </div>
          <div class=" sidebar-title MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-lg-6">
            <span class="manu-md">SPORT<br class="" /></span><span class="text-base-2">กีฬา</span>
          </div>
        </router-link>
      </li> -->
      <!-- <li class="row text-white">
        <router-link :to="{ name: 'Member.Lobby.Lotto' }" active-class="sidebar-group"
          class=" sidebar-group-unclick MuiGrid-container">
          <div class=" sidebar-icon MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-lg-6">
            <img src="@/assets/img/sidebar/ic-nav-menu-lotto.png" class="" />
          </div>
          <div class=" sidebar-title MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-lg-6">
            <span class="manu-md">LOTTO<br class="" /></span><span class="text-base-2">หวย</span>
          </div>
        </router-link>
      </li> -->
      <li class="row text-white">
        <router-link :to="{ name: 'Member.Lobby.Trading' }" active-class="sidebar-group"
          class=" sidebar-group-unclick MuiGrid-container">
          <div class=" sidebar-icon MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-lg-6">
            <img src="@/assets/img/sidebar/ic-nav-menu-hotgraph.png" class="" />
          </div>
          <div class=" sidebar-title MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-lg-6">
            <span class="manu-md">TRADING<br class="" /></span><span class="text-base-2">เทรดดิ้ง</span>
          </div>
        </router-link>
      </li>
      <!-- <li class="row text-white">
        <router-link :to="{ name: 'Member.Lobby.esport' }" active-class="sidebar-group"
          class=" sidebar-group-unclick MuiGrid-container">
          <div class=" sidebar-icon MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-lg-6">
            <img src="@/assets/img/sidebar/esport.webp" class="" />
          </div>
          <div class=" sidebar-title MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-lg-6">
            <span class="manu-md">E-SPORT<br class="" /></span><span class="text-base-2">E-SPORT</span>
          </div>
        </router-link>
      </li>  -->
      <li class="row text-white">
        <router-link :to="{ name: 'Member.Lobby.Keno' }" active-class="sidebar-group"
          class=" sidebar-group-unclick MuiGrid-container">
          <div class=" sidebar-icon MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-lg-6">
            <img src="@/assets/img/sidebar/ic-nav-menu-keno.png" class="" />
          </div>
          <div class=" sidebar-title MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-lg-6">
            <span class="manu-md">KENO<br class="" /></span><span class="text-base-2">คีโน</span>
          </div>
        </router-link>
      </li>
      <br><br><br>
      <br />
      <br />
      <br />
    </ul>
  </div>
</template>
<script> 

export default {
  setup() {
   

    return { 
      
    };
  },
  data() {
    return {
      activeClass: true,
    };
  },

  created() {
   
  },
  methods: {
   
  },
};
</script>
<style scoped lang="scss">
.sidebar {
  width: 250px;
  left: 0;
  top: 0;
  height: 100%;
  position: fixed;
}

ul {
  padding-left: 0px !important;
  padding-right: 0px !important;
}

.row {
  margin: 0;
  padding: 0;
  margin-left: 0px !important;
  margin-right: 0px !important;
}

.manu-md {
  font-weight: 900;
  background: linear-gradient(0deg, #e0a953 0%, #fbd46d 53%, #e0a953 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
}

.row>* {
  margin-right: 0px;
  margin-left: 0px;
  padding-right: 0;
  padding-left: 0;
}

.sidebarList .row {
  margin-top: 15px;
  display: -moz-box;
  display: flex;
  -moz-box-align: center;
  align-items: center;
  -moz-box-pack: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 20px;
}

.MuiGrid-container {
  /* width: 100%; */
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  border-radius: .75rem;
}

.mobile-row {
  margin-top: 12px;
  padding: 0rem 0.7rem;
}

.text-base-2 {
  color: #f5f5f5;
}

.sidebar-group-unclick {
  background: linear-gradient(0deg, #7c1114, #2a0000);
  box-shadow: #f4c039 0px 0px 3px 0px;
  border-top: #e0a953 1.7px solid !important;
  padding: 20px 0;

  img {
    transition: width 0.1s;
  }
}

.router-link-exact-active {
  background: linear-gradient(0deg, #9c1116, #7e0101);
  filter: drop-shadow(1px 2px 5px #f4c039);
  border: #e0a953 1.7px solid !important;
  color: #fff !important;

}

.sidebarList {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  overflow-x: none;
  padding-bottom: 6.5rem;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */

  .row {
    margin-top: 15px;
    display: -moz-box;
    display: flex;
    -moz-box-align: center;
    align-items: center;
    -moz-box-pack: center;
    justify-content: center;
    cursor: pointer;
    padding: 0 15px;
  }
}

.sidebarList::-webkit-scrollbar {
  display: none;
}

.sidebar-group-unclick:hover {
  color: #fff !important;
  padding: 20px 0;
  background: linear-gradient(0deg, #9c1116, #7e0101);
  filter: drop-shadow(1px 2px 5px #f4c039);
  border: #e0a953 1.7px solid !important;
  color: #e0a953 !important;

  .text-base-2 {
    color: #ecebeb;
  }
}

.sidebar-icon {
  height: 1rem;
  width: 1rem;
  display: -moz-box;
  display: flex;
  -moz-box-align: center;
  align-items: center;
  -moz-box-pack: center;
  justify-content: center;
  align-self: center;

  img {
    height: 50px;
    width: 50px;
    padding: 0;
  }
}

.MuiGrid-grid-xs-6 {
  flex-grow: 0;
  max-width: 50%;
  flex-basis: 50%;
}

.MuiGrid-item {
  margin: 0;
  box-sizing: border-box;
}


@media only screen and (max-width: 750px) {
  .manu-md {
    display: none;
  }

  .sidebar-title {
    padding-top: 25px;
    text-align: center;
    font-size: 80%;
  }

  .sidebar {
    width: 100px;
  }

  .sidebarList {
    .row {
      margin-top: 6px;
      padding: 0 8px;
    }

    a {
      height: 93px;
    }
  }

  .sidebar-group-unclick:hover {
    .text-base-2 {
      color: #e0a953;
    }
  }

  .router-link-exact-active {
    font-weight: 900;
    color: #e0a953 !important;
    padding: 20px 0;

    .manu-md {
      font-weight: 900;
      background: linear-gradient(0deg, #e0a953 0%, #fbd46d 53%, #e0a953 100%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-transform: uppercase;
    }

    .text-base-2 {
      color: #e0a953;
    }

    .text-base {
      color: #e0a953;
    }
  }

  .MuiGrid-grid-xs-6 {
    max-width: 100%;
    flex-basis: 100%;
  }

  .MuiGrid-item {
    padding-top: 20px;

    img {
      margin: 10px;
    }
  }
}

@media only screen and (max-width: 360px) {
  .sidebar-title {
    font-size: 70%;
  }

  .sidebar-icon img {
    width: 30px;
    height: 30px;
  }

  .MuiGrid-container {
    height: 40px;
  }
}

@media only screen and (max-width: 440px) {
  .sidebar-icon img {
    width: 40px;
    height: 40px;
  }
}
</style>
