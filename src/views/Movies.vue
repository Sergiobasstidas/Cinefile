<template>
  <div class="grid-container mx-auto">
    <h1 class="title-text mb-6">Movies</h1>
    <SearchBar class="search-bar" :type="type" />
    <Grid :movieList="$store.state.listedMovies" />
  </div>
</template>
<script>
import Grid from "@/components/Grid";
import SearchBar from "@/components/SearchBar";

<<<<<<< HEAD
export default {
  components: {
    Grid,
    SearchBar,
  },
  data() {
    return {
      type: "movie",
    };
  },
  beforeCreate() {
    this.$store.dispatch("getByCategory", {
      category: "popular",
      type: "movie",
    });
  },
};
=======
  export default {
    components: {
      Grid,
      SearchBar,
    },
    data() {
      return {
        type: "movie",
      };
    },
  };
>>>>>>> df7f4cb26cb3e62a3bc06bbecbd7b28879370322
</script>
<style scoped>
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
