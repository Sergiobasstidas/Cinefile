<template>
  <div class="card card-hover">
    <div class="cardImg">
      <img
        :src="
          movie.poster_path
            ? $store.state.POSTER_URL + movie.poster_path
            : 'https://media.comicbook.com/files/img/default-movie.png'
        "
        alt=""
        @click="goToDetails(movie.id, movie.type)"
      />
      <addToListButton class="addToListButton" />
    </div>
    <div class="text">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on" class="movieTitle">{{
            movie.title ? movie.title : movie.name
          }}</span>
        </template>
        <span>{{ movie.title ? movie.title : movie.name }}</span>
      </v-tooltip>
      <div class="genres mt-1">
        <span v-for="genre in genres.slice(0, 2)" :key="genre" class="mr-2">{{
          genre
        }}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import addToListButton from "./addToListButton";
  export default {
    data() {
      return {};
    },
    components: {
      addToListButton,
    },

    props: {
      movie: Object,
    },
    computed: {
      genres() {
        const movieGenreIds = this.movie.genre_ids;
        const genresListFromStore =
          this.movie.type == "movie"
            ? this.$store.state.GENRES[0]
            : this.$store.state.GENRES[1];
        const genreNames = [];
        movieGenreIds.forEach((id) => {
          let foundGenre = genresListFromStore.find((genre) => {
            if (genre.id === id) {
              return genre;
            }
          });
          genreNames.push(foundGenre.name);
        });
        return genreNames;
      },
    },

    methods: {
      goToDetails(id, type) {
        this.$router.push(`/${type}/${id}`);
      },
    },
  };
</script>
<style>
  .card-hover:hover > .text .movieTitle {
    color: #2f80ed !important;
  }
  .cardImg {
    position: relative;
  }

  .cardImg .addToListButton {
    position: absolute;
    right: 10px;
    top: 5px;
  }

  .cardImg img {
    width: 100%;
    border-radius: 10px;
    cursor: pointer;
  }
  .text {
    margin-top: 10px;
    width: 200px;
  }
  .movieTitle {
    display: block;
    color: white;
    font-weight: 500;
    font-size: 1.1em !important;
    cursor: pointer;
    transition: all 0.3s ease;

    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
  .genres {
    font-size: 0.8em;
  }
  .addToListButton {
  }
</style>
