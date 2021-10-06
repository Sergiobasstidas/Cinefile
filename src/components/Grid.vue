<template>
  <v-container class="contenedor" cols="12" fluid>
    <v-row dense justify="space-between" no-gutters>
      <v-col
        class="movieCard-container pa-6 pb-7"
        v-for="(movie, i) in movieList"
        :key="i"
        align-self="center"
        cols="12"
        sm="6"
        lg="4"
        xl="3"
      >
        <MovieCard :movie="movie" class="movieCard-card" />
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
    width: 100% !important;
    padding: 0 !important;
  }

  .movieCard-card {
    margin: 0 auto;
  }
</style>
