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
      />
      <movieCardActions :movie="movie" class="actions" />
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
      <div class="genres mt-1" v-if="!hideGenres">
        <span v-for="genre in genres.slice(0, 2)" :key="genre" class="mr-2">{{
          genre
        }}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import movieCardActions from "./movieCardActions";

  export default {
    data() {
      return {};
    },
    components: {
      movieCardActions,
    },

    props: {
      movie: Object,
      hideGenres: {
        required: false,
        default: false,
      },
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
  };
</script>
<style lang="scss">
  .card-hover .text:hover > .movieTitle {
    color: #2f80ed !important;
  }
  .cardImg {
    position: relative;
  }

  .cardImg img {
    width: 100%;
    border-radius: 10px;
    cursor: pointer;
  }
  .text {
    margin-top: 10px;
    width: 80% !important;
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

  .cardImg:hover img {
    opacity: 0.1;
    transition: opacity 0.5s;
  }
  .cardImg .actions {
    opacity: 0;
  }
  .cardImg:hover .actions {
    transition: opacity 0.9s;
    opacity: 1;
  }
</style>
