<template>
  <div>
    <br />

    <div class="row m-auto justify-content-center">
      <button class="btn btn-lg bg-dark w-100 px-0 text-white m-auto" data-bs-toggle="modal" style="max-width: 300px"
        data-bs-target="#modalPercen">
        ปรับเปอร์เซ็นต์สล็อตแตก
      </button>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="modalPercen" tabindex="-1" data-bs-backdrop="static" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen text-dark">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">ระบบปรับเปอร์เซ็นต์สล็อตแตก</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <form @submit.prevent="submitSelectGame" method="post" v-show="step == 1">
                <div class="row">
                  <div class="col-6" v-if="GamesStore.SLOT">
                    <label>เลือกค่ายเกม</label>
                    <select class="form-select mb-2" v-model="selectVendorGame" required>
                      <option selected value disabled>เลือกค่ายเกม</option>
                      <option v-for="slot in GamesStore.SLOT.filter((d) => {
                        return d.logo && d.active;
                      })" :key="slot.key" :value="slot">
                        {{ slot.productName }}
                      </option>
                    </select>
                  </div>
                  <div class="col-6" v-if="selectVendorGame.gamesList">
                    <label>เลือกเกมส์</label>
                    <select class="form-select mb-2" v-model="selectGame" required>
                      <option selected value disabled>เลือกเกมส์</option>
                      <option v-for="game in selectVendorGame.gamesList.filter(
                        (d) => {
                          return d.imgUrl && d.active;
                        }
                      )" :key="game.key" :value="game">
                        {{ game.gameName }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="text-start">
                      <img :src="selectVendorGame.logo" alt="" style="max-height: 120px" class="img-fluid" />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="text-start" v-if="selectGame.imgUrl">
                      <img :src="this.ASKMEBET_URL + selectGame.imgUrl" alt="" style="max-height: 120px"
                        class="img-fluid" />
                    </div>
                  </div>
                </div>

                <div class="row" v-if="selectGame">
                  <div class="col">
                    <form action="" method="post">
                      <div class="mb-2">
                        <label class="form-label">อัตราเพิ่มสปิน: {{ range.spin }}</label>
                        <input type="range" class="form-range" min="0" max="60" v-model="range.spin" />
                      </div>
                      <div class="mb-2">
                        <label class="form-label">อัตราเข้า SCETTER: {{ range.scatter }}</label>
                        <input type="range" class="form-range" min="0" max="60" v-model="range.scatter" />
                      </div>
                      <div class="mb-2">
                        <label class="form-label">อัตราเข้า COMBO: {{ range.combo }}</label>
                        <input type="range" class="form-range" min="0" max="60" v-model="range.combo" />
                      </div>
                      <div class="mb-2">
                        <label class="form-label">อัตราเข้าตัวคูณ X: {{ range.multipy }}</label>
                        <input type="range" class="form-range" min="0" max="60" v-model="range.multipy" />
                      </div>
                    </form>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary w-100">
                  ยืนยัน
                </button>
              </form>

              <form @submit.prevent="submitCode" method="post" v-show="step == 2">
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">รหัสทำรายการ</label>
                      <input type="text" class="form-control mb-3" placeholder="ใส่รหัสปรับเปอร์เซ็นต์ที่นี่"
                        v-model="code" required />
                      <button type="submit" class="btn btn-primary w-100">
                        ยืนยัน
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import { Modal } from "bootstrap";
import { useUserStore } from "@/stores/user";
import { useGamesStore } from "@/stores/games";
export default {
  // props: ["usersData"],
  setup() {
    const userStore = useUserStore();
    const GamesStore = useGamesStore();
    return {
      userStore,
      GamesStore,
    };
  },
  data() {
    return {
      selectVendorGame: "",
      selectGame: "",
      range: {
        spin: "30",
        scatter: "35",
        combo: "25",
        multipy: "40",
      },
      step: 1,
      code: "",
      usersData: null,
    };
  },
  created() {
    // this.$store.dispatch("getGameAll");
    this.GamesStore.getGameAll({});
  },
  methods: {
    submitCode() {
      let modalPercen = Modal.getInstance(
        document.getElementById("modalPercen")
      );
      modalPercen.hide();
      this.post(this.code);
    },
    submitSelectGame() {
      this.step = 2;
    },
    async post(code) {
      let formData = new FormData();
      formData.append("code", code+"".trim().replace(" ",""));
      formData.append("type", "ปรับสล็อตแตก");
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
          if (data.status == "success") {
            this.GamesStore.gamelogin(this.selectGame.gameLoginCode, this.selectGame.productCode,this.selectGame.gameName);
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
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.form-check {
  max-width: 100px;
  height: 100px;
  box-shadow: #6c757d94 0px 0px 7px 0px;
  border-radius: 0.2rem;
}

.btn-primary {
  padding: 0.375rem 4%;
  color: #fff;
  background: transparent linear-gradient(270deg, #4facfe, #1ed7fe) 0 0 no-repeat padding-box;
  border: none;
  letter-spacing: 0.48px;
  box-shadow: none;

  &:focus,
  &:active,
  &:hover {
    box-shadow: 0 10px 12px rgba(1, 176, 204, 0.270588) !important;
  }
}

.blink {
  animation: blinker 1s linear infinite;

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
}
</style>
