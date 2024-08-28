<template>
  <div>
    <div class="modal fade" id="modalPromotion" ref="modalPromotion" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header float-right">
          </div>
          <div class="modal-body">
            <div id="c_slide" class="carousel slide">
              <div class="carousel-indicators">
                <button v-for="(item, index) in Items_promotion" :key="index" :class="index == 0 ? 'active' : ''" type="button"
                  data-bs-target="#c_slide" :data-bs-slide-to="index">{{ index + 1 }}</button>
              </div>
              <div class="carousel-inner">
                <div v-for="(item, index) in Items_promotion" :key="index" class="carousel-item" :class="index == 0 ? 'active' : ''">
                  <img :src="this.API_HOST + item.img" class="d-block w-100">
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#c_slide" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#c_slide" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>


            <div class="text-center mt-3">
              <button class="btn btn-light btn-sm mt-4 px-4 btn-outline-orange" data-bs-dismiss="modal">ปิด</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from "bootstrap";
import { useOptionStore } from "@/stores/options";
import { Carousel } from "bootstrap";


export default {
  name: "modelPromotion",
  setup() {
    const option = useOptionStore();
    return {
      option,
    };
  },
  data() {
    return {
      start: 0,
      lineLink: this.option.Line.url,
      API_HOST: import.meta.env.VITE_CODEHACK_API,
      splideOption: {
        rewind: true,
        pagination: true,
        arrows: true,
        perPage: 1,
      }
    };
  },
  components: {
  },
  computed: {
    Items_promotion() {
      return this.option.getPromotionsPopup.data.filter(e => e.show_in === this.$attrs.show_in);
    },
  },
  created() {


  },
  methods: {
    getStart(index) {
      if (index == this.Items_promotion.length) {
        return 0;
      } else {
        return index;
      }
    },
    // checkShow() {
    //   if (this.Items_promotion.length == 1) {
    //     this.modelPromotion.hide();
    //   }
    // },
  },
  mounted() {
    if (this.option.modelPromotion === "show") {
      if (this.Items_promotion.length > 0) {
        this.modelPromotion = new Modal(
          document.getElementById("modalPromotion")
        );
        this.modelPromotion.show();
        this.option.model_Promotion = this.modelPromotion;


        //Carousel
        const myCarousel = document.getElementById('c_slide');
        new Carousel(myCarousel, {
          touch: true
        }); 

        myCarousel.addEventListener('slide.bs.carousel', event => {
          console.log(event.to);
        })



      }
    }


  },
};
</script>
<style>
/* .splide__pagination {
  display: flex !important;
} */
</style>
<style lang="scss" scoped>
.modal-body {
  border-radius: 30px;
}

.modal-content {
  color: white;
  background: white !important;
}

.modal-header {
  border-bottom: 0px;
  -webkit-box-pack: center;
  justify-content: center;
  padding: 0px !important;
}

.modal-body {
  position: relative;
  -moz-box-flex: 1;
  flex: 1 1 auto;
  padding: 1rem;
}

@media (min-width: 1200px) {

  .h4,
  h4 {
    font-size: 1.5rem;
  }
}

.carousel-indicators {
  margin-bottom: -2rem;


  .active {
    background: linear-gradient(180deg, #ffc16f 0, #e7700e);
    color: #fff !important;

  }

  [data-bs-target] {
    color: #c56618;
    font-size: 11pt;
    text-indent: unset;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1rem;
    border-top: unset;
    border-bottom: unset;
    // border: solid 1px #c56618;
    box-shadow: inset 0px 0px 0px 1px #c566184f;
    opacity: 1;
  }
}
.btn-outline-orange{
  border: solid 1px #e7700e;
  color: #e7700e;

  &:focus,
  &:active{
    background-color: #e7700e;
    border: solid 1px #e7700e;
    color: white;
  }

  &:hover{
    background-color: #e7700e52;
    color: #e7700e;
  }
}
</style>
