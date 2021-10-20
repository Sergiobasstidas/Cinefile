<template>
  <div>
    <v-list-item @click="addOrRemoveFromList()">
      <v-list-item-content>
        <v-list-item-title v-text="list.name"></v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon>
        <v-icon v-if="!loading" :style="movieInList ? 'color:gold' : ''"
          >mdi-star-outline</v-icon
        >
        <v-progress-circular
          v-else
          indeterminate
          size="20"
          width="3"
          color="primary"
        ></v-progress-circular>
      </v-list-item-icon>
    </v-list-item>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loading: false,
      };
    },
    props: {
      list: Object,
      movie: Object,
    },
    computed: {
      movieInList() {
        const movieInList = this.list.movies.some((movie) => {
          return movie.id === this.movie.id && movie.type === this.movie.type;
        });
        return movieInList;
      },
    },

    methods: {
      async addOrRemoveFromList() {
        console.log(this.movie);
        const movieToAdd = {
          id: this.movie.id,
          type: this.movie.type,
          title: this.movie.title ? this.movie.title : this.movie.name,
          poster_path: this.movie.poster_path,
          genre_ids: this.movie.genre_ids,
        };
        this.loading = true;
        await this.$store.dispatch("lists/addOrRemoveMovieFromList", {
          listName: this.list.name,
          newMovie: movieToAdd,
        });
        this.loading = false;
      },
    },
  };
</script>
<style>
  .inList {
    color: yellow;
  }
</style>
