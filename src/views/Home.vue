<template>
  <v-main class="carousel_container">

    <v-container fluid>

      <v-row justify="center">
        <v-col
          v-for="(list, index) in $store.state.home.homeMovies"
          :key="index"
          id="carousel"
        >
          <Carousel
            :movieList="list"
            :title="$store.state.home.homeSections[index].title"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>


<script>

  import Carousel from "@/components/Carousel";
  // import SearchBar from "@/components/SearchBar";
  export default {
    name: "App",
    components: { Carousel },
  };
</script>
<style>
  #carousel {
    margin-top: 100px;
  }
  .carousel_container {
    width: 95%;
    margin: 0 auto;
  }
</style>
