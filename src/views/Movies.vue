<template>
  <div class="grid-container mx-auto">
    <h1 class="title-text mb-6">Peliculas</h1>

    <DisplayMovies :list="$store.state.listedMovies" :type="type" />
  </div>
</template>
<script>
  import DisplayMovies from "@/components/DisplayMovies";

  export default {
    components: {
      DisplayMovies,
    },
    data() {
      return {
        type: "movie",
        currentPage: 1,
      };
    },

    methods: {
      changePage(page) {
        this.currentPage = page;
      },
    },
  };
</script>
<style scoped>
  .grid-container {
    width: 90%;
  }
  .title-text {
    font-weight: 400;
    font-size: 6em;
  }
  @media (max-width: 600px) {
    .title-text {
      font-weight: 400;
      font-size: 3em;
    }
  }
</style>
