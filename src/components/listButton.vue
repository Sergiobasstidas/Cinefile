<template>
  <div>
    <v-list-item @click="addOrRemoveFromList()">
      <v-list-item-content>
        <v-list-item-title v-text="list.name"></v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon>
        <v-icon :style="movieInList ? 'color:gold' : ''"
          >mdi-star-outline</v-icon
        >
      </v-list-item-icon>
    </v-list-item>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
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
      addOrRemoveFromList() {
        this.$emit("add");
      },
    },
  };
</script>
<style>
  .inList {
    color: yellow;
  }
</style>
