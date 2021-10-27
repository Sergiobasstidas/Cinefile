<template>
  <div class="card card-hover">
    <img :src="cast.image" alt="" @click="goToDetails(cast.id)" />
    <div class="text text-center">
      {{ cast.title }}<br />
      <i class="d-none d-sm-inline">{{ cast.character }}</i>
    </div>
  </div>
</template>
<script>
  export default {
    name: "CarouselCardCast",
    data() {
      return {};
    },

    props: {
      cast: Object,
    },

    methods: {
      goToDetails(id) {
        this.$store.dispatch("getMovieDetails", id);
      },
    },
  };
</script>
<style>
  .card-hover:hover > .text .castTitle {
    color: #2f80ed !important;
  }
  .card img {
    width: 100%;
    border-radius: 10px;
    cursor: pointer;
  }
  .text {
    margin-top: 10px;
    width: 200px;
  }
  .castTitle {
    display: block;
    color: white;
    font-weight: 500;
    font-size: 1.1em !important;
    cursor: pointer;
    transition: all 0.3s ease;

    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
</style>
