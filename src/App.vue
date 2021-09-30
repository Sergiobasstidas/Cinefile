<template>
  <v-app>
    <v-main class="carousel_container">
      <v-container :fluid="true">
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
    <Footer />
  </v-app>
</template>

<script>
  import Carousel from "@/components/Carousel";
  export default {
    name: "App",
    components: { Carousel },
    data: () => ({
      //
    }),
    async beforeCreate() {
      const sections = this.$store.state.home.homeSections;
      for (const section of sections) {
        await this.$store.dispatch("setUpHomeCategories", {
          category: section.category,
          type: section.type,
        });
      }
    },
  };
</script>
<style>
  .v-application {
    background-color: black !important;
    color: white !important;
    font-family: "Rubik", sans-serif !important;
  }
  #carousel {
    margin-top: 100px;
  }
  .carousel_container {
    width: 95%;
    margin: 0 auto;
  }
</style>
