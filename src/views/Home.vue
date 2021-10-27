<template>
  <v-main class="home_container">
    <v-container fluid>
      <v-row justify="center">
        <v-col
          v-for="(list, index) in $store.state.home.homeMovies"
          :key="index"
          class="home_carousel_container"
        >
          <Carousel :movieList="list.movies" :title="list.title" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
  import Carousel from "@/components/Carousel";
  export default {
    name: "App",
    components: { Carousel },
  };
</script>
<style scoped>
  .home_container {
    width: 100%;
    margin: 0 auto;
    padding: 0 !important;
  }
  .home_carousel_container {
    margin-top: 100px;
  }
  @media (max-width: 600px) {
    .home_carousel_container {
      margin-top: 50px;
    }
  }
</style>
