<template>
  <div>
    <div class="cast_carousel_title">
      <h3 class="title_text">Reparto</h3>
    </div>
    <carousel
      :perPageCustom="[
        [100, 4],
        [800, 3],
        [1124, 4],
        [1400, 5],
        [1904, 6],
      ]"
      :navigationEnabled="windowWidth > 1200 ? true : false"
      :paginationEnabled="windowWidth < 1200 ? true : false"
      class="carousel"
    >
      <slide class="slide" v-for="cast in castList" :key="cast.id">
        <CarouselCardCast class="castCard" :cast="cast" />
      </slide>
    </carousel>
  </div>
</template>

<script>
  import { Carousel, Slide } from "vue-carousel";
  import CarouselCardCast from "@/components/CarouselCardCast.vue";

  export default {
    name: "CarouselCast",

    data: () => ({
      model: null,
      windowWidth: 0,
      carouselSettings: [
        [
          [100, 2],
          [700, 3],
          [1024, 4],
          [1300, 5],
          [1500, 5],
        ],
      ],
    }),
    components: {
      Carousel,
      Slide,
      CarouselCardCast,
    },
    props: {
      castList: Array,
    },
    created() {
      window.addEventListener("resize", this.handleResize);
      this.handleResize();
      // TMDB api key: 21b858443ab2bbdbb90fa7c26e40b421
    },
    destroyed() {
      window.removeEventListener("resize", this.handleResize);
    },
    methods: {
      handleResize() {
        this.windowWidth = window.innerWidth;
      },
    },
  };
</script>
<style lang="scss">
  .carousel {
    width: 90%;
    margin: 0 auto;
  }

  .VueCarousel-navigation-button {
    border-radius: 100px;
    padding: 10px !important;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #151f30 !important;
    color: white !important;
  }
  .VueCarousel-navigation-next {
    transform: translateY(-50%) translateX(120%) !important;
  }
  .VueCarousel-navigation-prev {
    transform: translateY(-50%) translateX(-120%) !important;
  }
  .VueCarousel-navigation-button:hover {
    background-color: #2f80ed !important;
  }
  .VueCarousel-navigation-button:focus,
  .VueCarousel-dot:focus {
    outline: none !important;
  }

  .VueCarousel-pagination {
    text-align: initial !important;
  }
  .VueCarousel-dot-container {
    margin-top: 0 !important;
    margin-left: 20px !important;
  }
  .VueCarousel-dot {
    margin-top: 0 !important;
    background-color: #204b87 !important;
    width: 12px !important;
    height: 5px !important;
    border-radius: 16px !important;
    transition: all 0.5s ease !important;
    padding: 8px !important;
  }
  .VueCarousel-dot--active {
    background-color: #2f80ed !important;
    width: 20px !important;
  }
  .slide {
    display: flex;
    justify-content: center;
  }
  .castCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 220px;
    margin: 20px;
    &:first-child {
      margin-left: 0px !important;
    }
  }
  .cast_carousel_title {
    width: 100%;
    margin: 0 auto;
    margin-bottom: 1em;
  }
  .cast_carousel_title .title_text {
    font-size: 2em;
  }
  @media (max-width: 600px) {
    .title_text {
      font-size: 1.5em !important;
    }
    .castCard {
      max-width: 80px;
      margin: 10px;
      font-size: 12px;
    }
    .carousel {
      width: 100%;
      margin: 0 auto;
    }
  }
</style>
