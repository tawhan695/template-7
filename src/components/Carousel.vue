<template>
  <div class="x-tab-menu-wrapper">
    <div class="container"> 
      <div id="carousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="../assets/black-gold/carousel/หวย-min.png" class="d-block w-100" alt="DEMO" />
          </div>
          <div class="carousel-item">
            <img src="../assets/black-gold/carousel/หวยลาว-min.png" class="d-block w-100" alt="DEMO" />
          </div>
          <div class="carousel-item">
            <img src="../assets/black-gold/carousel/เว็บตรง-min.png" class="d-block w-100" alt="DEMO" />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.x-tab-menu-wrapper {
  position: relative;
  background: linear-gradient(180deg, #ffd445, #bb9b51 35%, #00000000);
  &:before {
    top: -5px;
  }
  &:after,
  &:before {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(
      90deg,
      transparent 10%,
      #eab671 50%,
      transparent 90%
    );
  }
}
</style>