<template>
  <v-container class="contenedor mx-auto" fluid>
    <v-row dense>
      <v-col v-for="(movie, i) in movieList" :key="i" cols="12" md="6" lg="4">
        <MovieCard :movie="movie" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import MovieCard from "@/components/MovieCard.vue";
  export default {
    components: {
      MovieCard,
    },
    props: {
      movieList: Array,
    },
  };
</script>
<style scoped>
  .contenedor {
    max-width: 85%;
  }
  @media (min-width: 600px) {
    .card {
      max-width: 200px;
      max-height: 300px;
    }
    .contenedor {
      max-width: 85%;
    }
  }
  @media (min-width: 960px) {
    .card {
      max-width: 380px;
      max-height: 270px;
    }
    .contenedor {
      max-width: 85%;
    }
  }
</style>
