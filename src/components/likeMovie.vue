<template>
  <div>
    <v-icon
      x-large
      dark
      class="likeIcon"
      :class="movieLiked ? 'liked' : ''"
      @click="likeMovie()"
      >mdi-heart-outline</v-icon
    >
  </div>
</template>
<script>
  export default {
    props: {
      movie: Object,
    },
    computed: {
      movieLiked() {
        if (this.$store.state.lists.userLikes.movies) {
          const movieLiked = this.$store.state.lists.userLikes.movies.some(
            (movie) => {
              return (
                movie.id === this.movie.id && movie.type === this.movie.type
              );
            }
          );
          return movieLiked;
        } else {
          return false;
        }
      },
    },
    methods: {
      async likeMovie() {
        console.log(this.movie);
        const movieToAdd = {
          id: this.movie.id,
          type: this.movie.type,
        };
        await this.$store.dispatch("lists/addOrRemoveMovieFromList", {
          listName: "Likes",
          newMovie: movieToAdd,
        });
      },
    },
  };
</script>
<style>
  .liked {
    color: crimson;
  }
</style>
