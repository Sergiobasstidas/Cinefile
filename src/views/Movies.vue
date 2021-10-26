<template>
  <div class="grid-container mx-auto">
    <h1 class="title-text mb-6">Movies</h1>
    <SearchBar
      class="search-bar"
      :type="type"
      :currentPage="currentPage"
      @categoryChange="currentPage = 1"
    />
    <Grid :movieList="$store.state.listedMovies" />
    <pageChanger @pageChange="changePage" :currentPage="currentPage" />
  </div>
</template>
<script>
import Grid from "@/components/Grid";
import SearchBar from "@/components/SearchBar";
import PageChanger from "@/components/PageChanger";

export default {
  components: {
    Grid,
    SearchBar,
    PageChanger,
  },
  data() {
    return {
      type: "movie",
      currentPage: 1,
    };
  },
  methods: {
    changePage(page) {
      console.log("page changed", page);
      this.currentPage = page;
    },
  },
};
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
