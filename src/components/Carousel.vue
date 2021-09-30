<template>
  <carousel
    :perPageCustom="[
      [100, 2],
      [700, 3],
      [1024, 4],
      [1400, 6],
    ]"
    :navigationEnabled="windowWidth > 1000 ? true : false"
    :paginationEnabled="windowWidth < 1000 ? true : false"
    class="carousel"
  >
    <slide class="slide" v-for="movie in movieList" :key="movie.id">
      <movieCard class="movieCard" :movie="movie" />
    </slide>
  </carousel>
</template>

<script>
  import { Carousel, Slide } from "vue-carousel";
  import movieCard from "@/components/MovieCard.vue";

  export default {
    name: "HelloWorld",

    data: () => ({
      model: null,
      windowWidth: 0,
    }),
    components: {
      Carousel,
      Slide,
      movieCard,
    },
    props: {
      movieList: Array,
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
<style>
  .scroller {
    margin: 0 auto;
    margin-top: 100px;
    border: 1px solid red;
    height: 500px;
    width: 90%;
  }
  .carousel {
    width: 90%;
    margin: 0 auto;
    margin-top: 100px;
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
  .movieCard {
    max-width: 220px;
    margin: 20px;
  }
</style>
