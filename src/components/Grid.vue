<template>
  <v-container class="contenedor" cols="12" fluid>
    <v-row dense justify="space-around" no-gutters>
      <v-col
        class="movieCard-container pa-md-6 pa-sm-2 pa-1 pb-7"
        v-for="(movie, i) in movieList"
        :key="i"
        align-self="center"
        cols="4"
        sm="3"
        md="6"
        lg="4"
        xl="3"
      >
        <MovieCard
          :movie="movie"
          v-if="$vuetify.breakpoint.mdAndUp"
          class="movieCard-card"
        />
        <CarouselCard
          v-else
          class="carrouselCard-card text-caption text-sm-body-2"
          :movie="movie"
          :hideGenres="true"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import MovieCard from "@/components/MovieCard.vue";
import CarouselCard from "@/components/CarouselCard.vue";

export default {
  components: {
    MovieCard,
    CarouselCard,
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
@media (max-width: 500px) {
  .carrouselCard-card {
    font-size: 12px;
  }
}
</style>
