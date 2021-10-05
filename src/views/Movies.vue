<template>
  <div>
    <Grid :movieList="$store.state.listedMovies" />
  </div>
</template>
<script>
  import Grid from "@/components/Grid";

  export default {
    components: {
      Grid,
    },
    data() {
      return {};
    },
    beforeCreate() {
      this.$store.dispatch("getByCategory", {
        category: "popular",
        type: "movie",
      });
    },
  };
</script>
<style></style>
