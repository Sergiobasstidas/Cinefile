<template>
  <div class="movieCardActions">
    <div class="cardIcons">
      <v-icon x-large dark class="likeIcon">mdi-heart-outline</v-icon>
      <addToList class="addToList" :movie="movie" />
    </div>
    <h3 class="goToDetails" @click="goToDetails(movie.id, movie.type)">
      Ver detalles
    </h3>
  </div>
</template>
<script>
  import addToList from "./addToList";

  export default {
    data() {
      return {};
    },
    components: {
      addToList,
    },
    props: {
      movie: Object,
    },
    methods: {
      goToDetails(id, type) {
        this.$router.push(`/${type}/${id}`);
      },
    },
  };
</script>
<style></style>
