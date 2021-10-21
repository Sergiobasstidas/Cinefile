<template>
  <div class="grid-container mx-auto">
    <h1 class="title-text mb-6">Series</h1>
    <SearchBar class="search-bar" :type="type" />
    <Grid :movieList="$store.state.listedSeries" />
  </div>
</template>
<script>
  import Grid from "@/components/Grid";
  import SearchBar from "@/components/SearchBar";

  export default {
    components: {
      Grid,
      SearchBar,
    },
    data() {
      return {
        type: "tv",
      };
    },
    beforeCreate() {
      this.$store.dispatch("getByCategory", {
        category: "popular",
        type: "tv",
      });
    },
  };
</script>
<style>
  .grid-container {
    width: 90%;
  }
  .search-bar {
    margin-bottom: 50px;
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
