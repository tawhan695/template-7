<template>
  <div class="container">
    <div class="row">

      <div class="col-12">
        <div class="card-top10 rounded h-100 p-4 ps-1">
          <h6 class="mb-4 ps-3 text-title">10 อันดับ {{ title }}</h6>
          <div class="d-flex align-items-start">
            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <button class="button active" id="v-pills-bigwin-tab" data-bs-toggle="pill" data-bs-target="#v-pills-bigwin"
                type="button" role="tab" aria-controls="v-pills-bigwin" aria-selected="false"
                @click="title = 'แจ็คพอตแตก'">
                <span class="button_lg">
                  <span class="button_sl"></span>
                  <span class="button_text">แจ็คพอต</span>
                </span>
              </button>
              <!-- <button class="button" id="v-pills-payment-tab" data-bs-toggle="pill" data-bs-target="#v-pills-payment"
                type="button" role="tab" aria-controls="v-pills-payment" aria-selected="false"
                @click="title = 'ถอนเครดิตมากที่สุด'">
                <span class="button_lg">
                  <span class="button_sl"></span>
                  <span class="button_text">payment</span>
                </span>
              </button>
              <button class="button" id="v-pills-spin-tab" data-bs-toggle="pill" data-bs-target="#v-pills-spin"
                type="button" role="tab" aria-controls="v-pills-spin" aria-selected="false"
                @click="title = 'ได้รับเงินรางวัลหมุนกงล้อ'">
                <span class="button_lg">
                  <span class="button_sl"></span>
                  <span class="button_text">spin</span>
                </span>
              </button>
              <button class="button" id="v-pills-card-tab" data-bs-toggle="pill" data-bs-target="#v-pills-card"
                type="button" role="tab" aria-controls="v-pills-card" aria-selected="false"
                @click="title = 'ได้รับเงินรางวัลเปิดไพ่'">
                <span class="button_lg">
                  <span class="button_sl"></span>
                  <span class="button_text">สุ่มไพ่</span>
                </span>
              </button>
              <button class="button" id="v-pills-login-tab" data-bs-toggle="pill" data-bs-target="#v-pills-login"
                type="button" role="tab" aria-controls="v-pills-login" aria-selected="false"
                @click="title = 'ล็อกอินสะสมสูงสุด'">
                <span class="button_lg">
                  <span class="button_sl"></span>
                  <span class="button_text">login</span>
                </span>
              </button> -->
            </div>
            <div class="tab-content" id="v-pills-tabContent">
              <div class="tab-pane fade active show" id="v-pills-bigwin" role="tabpanel"
                aria-labelledby="v-pills-bigwin-tab">
                <div class="list">
                  <div v-if="!Topten.bigwin.data">
                    <h3 class="text-center">ไม่มีข้อมูล</h3>
                  </div>
                  <div class="alert user-dark mb-2" role="alert" v-for="(item, index) in Topten.bigwin.data" :key="index">
                    <div class="d-flex box" :class="'no-' + index">
                      <div class="">
                        <div class="top" v-if="index == 0">
                          <img class="img-top" src="@/assets/img/top10/coin1.png" />
                        </div>
                        <div class="top" v-else-if="index == 1">
                          <img class="img-top" src="@/assets/img/top10/coin2.png" />
                        </div>
                        <div class="top" v-else-if="index == 2">
                          <img class="img-top" src="@/assets/img/top10/coin3.png" />
                        </div>
                        <div class="no" v-else>
                          {{ ++index }}
                        </div>
                      </div>
                      <div class="mt-2 px-1">
                        <span class="username">{{ item.username }}</span>
                        <br />
                        <span class="phone">{{ item.phone }}</span>
                      </div>
                      <div class="details">{{ toCurrency(item.details || 0) + '฿' }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="v-pills-payment" role="tabpanel" aria-labelledby="v-pills-payment-tab">
                <div class="list">
                  <div v-if="!Topten.payment.data">
                    <h3 class="text-center">ไม่มีข้อมูล</h3>
                  </div>
                  <div class="alert user-dark mb-2" role="alert" v-for="(item, index) in Topten.payment.data"
                    :key="index">
                    <div class="d-flex box" :class="'no-' + index">
                      <div class="no">
                        <div class="" v-if="index == 0">
                          <img src="@/assets/img/top10/coin1.png" alt="" />
                        </div>
                        <div class="" v-else>
                          {{ ++index }}
                        </div>
                      </div>
                      <div class="mt-2">
                        <span class="username">{{ item.username }}</span>
                        <br />
                        <span class="phone">{{ item.phone }}</span>
                      </div>
                      <div class="details">{{ toCurrency(item.details || 0) + '฿' }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="v-pills-spin" role="tabpanel" aria-labelledby="v-pills-spin-tab">
                <div class="list">
                  <div v-if="!Topten.spin.data">
                    <h3 class="text-center">ไม่มีข้อมูล</h3>
                  </div>
                  <div class="alert user-dark mb-2" role="alert" v-for="(item, index) in Topten.spin.data" :key="index">
                    <div class="d-flex box" :class="'no-' + index">
                      <div class="no">{{ ++index }}</div>
                      <div class="mt-2">
                        <span class="username">{{ item.username }}</span>
                        <br />
                        <span class="phone">{{ item.phone }}</span>
                      </div>
                      <div class="details">{{ toCurrency(item.details || 0) + '฿' }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="v-pills-card" role="tabpanel" aria-labelledby="v-pills-card-tab">
                <div class="list">
                  <div v-if="!Topten.card.data">
                    <h3 class="text-center">ไม่มีข้อมูล</h3>
                  </div>
                  <div class="alert user-dark mb-2" role="alert" v-for="(item, index) in Topten.card.data" :key="index">
                    <div class="d-flex box" :class="'no-' + index">
                      <div class="no">{{ ++index }}</div>
                      <div class="mt-2">
                        <span class="username">{{ item.username }}</span>
                        <br />
                        <span class="phone">{{ item.phone }}</span>
                      </div>
                      <div class="details">{{ toCurrency(item.details || 0) + '฿' }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="v-pills-login" role="tabpanel" aria-labelledby="v-pills-login-tab">
                <div class="list">
                  <div v-if="!Topten.login.data">
                    <h3 class="text-center">ไม่มีข้อมูล</h3>
                  </div>
                  <div class="alert user-dark mb-2" role="alert" v-for="(item, index) in Topten.login.data" :key="index">
                    <div class="d-flex box" :class="'no-' + index">
                      <div class="no">{{ ++index }}</div>
                      <div class="mt-2">
                        <span class="username">{{ item.username }}</span>
                        <br />
                        <span class="phone">{{ item.phone }}</span>
                      </div>
                      <div class="details">{{ toCurrency(item.details || 0) + '฿' }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTop10 } from '@/stores/user'
export default {
  setup() {
    const Top10 = useTop10()
    return {
      Top10
    }
  },
  data() {
    return {
      select_type: 'bigwin',
      TYPE: ['bigwin',/*'payment', 'spin', 'card', 'login'*/],
      datatop: {
        bigwin: [],
        payment: [],
        spin: [],
        card: [],
        login: []
      },
      title: 'แจ็คพอตแตก'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      for (let index = 0; index < this.TYPE.length; index++) {
        this.Topten[this.TYPE[index]] = await this.Top10.getData(this.TYPE[index])
      }
      //   this.Topten = await this.Top10.getData(type)
    }
  },
  computed: {
    Topten: {
      get() {
        return this.datatop
      },
      set(val) {
        this.datatop = val.data
      }
    }
  }
}
</script>

<style lang="scss">
.card-top10 {
  color: #ebebeb;
  font-weight: 700;
  background-color: rgba(0, 0, 0, 0.6) !important;
  border: #e0a953 2px solid !important;
  box-shadow: #f4c039 0px 0px 3px 0px;

  .tab-content {
    width: 100%;

    .list {
      position: relative;
      display: block;
      width: 100%;

      .user-dark {
        padding: 2px;
        overflow: hidden;
        width: 100%;
        height: 100%;

        // z-index: 90;
        .box {
          position: relative;
          // z-index: 99;
          background: #0f1923;
        }

        &::before {
          position: absolute;
          content: ' ';
          display: block;
          width: 120%;
          height: 100%;
          opacity: 0.2;
          filter: blur(10px);
          background: linear-gradient(90deg,
              transparent,
              #f4c039,
              #f4c039,
              #f4c039,
              #f4c039,
              transparent);
          animation: rotation_481 5000ms infinite linear;
        }

        @keyframes rotation_481 {
          0% {
            transform: rotateZ(0deg);
          }

          0% {
            transform: rotateZ(360deg);
          }
        }

        width: 100%;
        background: #0f1923;

        .no-0 {
          color: #f0b80c !important;
        }

        .no-1 {
          color: #e78383 !important;
        }

        .no-2 {
          color: #f0730c !important;
        }

        .top {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 0.9rem;
          padding-right: 0.9rem;

          @media (max-width: 800px) {
            padding-top: 5px;
            padding-left: 0.1rem;
            padding-right: 0.9rem;
          }
        }

        .img-top {
          height: 100%;
          max-height: 60px;

          @media (max-width: 800px) {
            max-height: 45px;
          }
        }

        .no {
          font-size: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 2rem;
          padding-right: 2rem;

          @media (max-width: 800px) {
            font-size: 1rem;
            padding: 2px;
            width: 65px;
            padding-left: 2px;
            padding-right: 2px;
          }
        }

        .username {
          // display: flex;
          // align-items: center;
          font-size: 1.5rem;

          @media (max-width: 800px) {
            font-size: 0.8rem;
          }
        }

        .phone {
          // display: flex;
          // align-items: start;
          color: #7d8082;

          @media (max-width: 800px) {
            font-size: 0.7rem;
          }
        }

        .details {
          @media (max-width: 800px) {
            font-size: 0.9rem;
            padding-right: 10px;
          }

          font-size: 2.5rem;
          display: flex;
          align-items: center;
          //   padding-left: 15px;
          justify-content: flex-end;
          width: 100%;
          padding-right: 10px;
        }
      }
    }
  }

  // tap
  .nav-pills {
    padding-left: 2%;
    padding-right: 2%;

    @media (max-width: 400px) {
      padding-left: 1%;

      .button {
        max-width: 80px;
        padding: 5px;
      }

      .button_lg {
        position: relative;
        display: block;
        padding: 10px 1px;
        color: #fff;
        background-color: #0f1923;
        overflow: hidden;

        -webkit-box-shadow: inset 0px 0px 0px 1px transparent;
        box-shadow: inset 0px 0px 0px 1px transparent;
      }
    }
  }

  .button {
    width: 120px;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    border: none;
    background: none;
    color: #0f1923;
    cursor: pointer;
    position: relative;
    padding: 8px;
    margin-bottom: 20px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;
    -webkit-transition: all 0.15s ease;
    transition: all 0.15s ease;

    @media (max-width: 500px) {
      font-size: 1rem;
      margin-bottom: 10px;
    }
  }

  .button::before,
  .button::after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    left: 0;
    height: calc(50% - 5px);
    border: 1px solid #7d8082;
    -webkit-transition: all 0.15s ease;
    transition: all 0.15s ease;
  }

  .button::before {
    top: 0;
    border-bottom-width: 0;
  }

  .button::after {
    bottom: 0;
    border-top-width: 0;
  }

  .button:active,
  .button:focus {
    outline: none;
  }

  .button:active::before,
  .button:active::after {
    right: 3px;
    left: 3px;
  }

  .button:active::before {
    top: 3px;
  }

  .button:active::after {
    bottom: 3px;
  }

  .button_lg {
    position: relative;
    display: block;
    padding: 10px 20px;
    color: #fff;
    background-color: #0f1923;
    overflow: hidden;

    -webkit-box-shadow: inset 0px 0px 0px 1px transparent;
    box-shadow: inset 0px 0px 0px 1px transparent;
  }

  .button_lg::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 2px;
    background-color: #0f1923;
  }

  .button_lg::after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 4px;
    height: 4px;
    background-color: #0f1923;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }

  .active {
    .button_lg {
      background-color: #caa02c;
    }
  }

  .button_sl {
    display: block;
    position: absolute;
    top: 0;
    bottom: -1px;
    left: -8px;
    width: 0;
    color: #0f1923;
    background-color: #caa02c;
    -webkit-transform: skew(-15deg);
    -ms-transform: skew(-15deg);
    transform: skew(-15deg);
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }

  .button_text {
    position: relative;
  }

  .button:hover {
    color: #0f1923;
  }

  .button:hover .button_sl {
    width: calc(100% + 15px);
  }

  .button:hover .button_lg::after {
    background-color: #fff;
  }

  //   .head {
  //     font-weight: 900;
  //   }
  //   .nav-tabs {
  //     --bs-nav-tabs-border-width: 1px;
  //     --bs-nav-tabs-border-color: #dee2e6;
  //     --bs-nav-tabs-border-radius: 0.375rem;
  //     --bs-nav-tabs-link-hover-border-color: #e9ecef #ffffff #ffffff;
  //     --bs-nav-tabs-link-active-color: #495057;
  //     --bs-nav-tabs-link-active-bg: #fff;
  //     --bs-nav-tabs-link-active-border-color: #ffffff #ffffff #fff;
  //     border-bottom: var(--bs-nav-tabs-border-width) solid var(--bs-nav-tabs-border-color);
  //     border: none;
  //     . {
  //       min-width: 110px;
  //       margin-left: 5px;
  //       border-color: var(--bs-nav-tabs-link-hover-border-color);
  //       .active {
  //         border-bottom-color: #ffffff;
  //         border-color: #ffff !important;
  //       }
  //     }
  //   }
  //   .tab-content {
  //     background: #ffffff;
  //     border-color: #ffffff;
  //     border-radius: 5px;
  //   }
  //   .nav-left {
  //     width: 100%;
  //     max-width: 120px;
  //     padding-left: 10px;

  //     .nav-item {
  //       .card {
  //         cursor: pointer;
  //         padding: 10px;
  //         margin-bottom: 5px;
  //         background: rgb(241, 205, 76);
  //         &:hover {
  //           color: rgb(28, 29, 29);
  //           background: rgb(241, 205, 76);
  //           background: linear-gradient(
  //             180deg,
  //             rgb(246, 228, 167) 1%,
  //             rgb(241, 205, 76) 50%,
  //             rgb(230, 146, 28) 55%,
  //             rgb(246, 228, 167) 99%
  //           );
  //           transition: filter 0.2s;
  //         }
  //       }
  //     }
  //   }
}
</style>
