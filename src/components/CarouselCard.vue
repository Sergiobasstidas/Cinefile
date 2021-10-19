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
      <movieCardActions :movie="movie" />
      <!--<div class="movieCardActions">
        <div class="cardIcons">
          <v-icon x-large dark class="likeIcon">mdi-heart-outline</v-icon>
          <addToList class="addToList" :movie="movie" />
        </div>
        <h3 class="goToDetails" @click="goToDetails(movie.id, movie.type)">
          Ver detalles
        </h3>
      </div> !-->
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
<style>
  .card-hover .text:hover > .movieTitle {
    color: #2f80ed !important;
  }
  .cardImg {
    position: relative;
  }

  .cardImg .movieCardActions {
    opacity: 0;
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    top: 5px;
  }
  .movieCardActions .cardIcons {
    display: flex;
    margin-bottom: 25px;
  }

  .movieCardActions .goToDetails {
    font-weight: 400;
  }
  .movieCardActions .goToDetails:hover {
    color: var(--highlight-color);
    cursor: pointer;
  }

  .cardImg .cardIcons .likeIcon {
    margin-right: 30px;
    cursor: pointer;
  }

  .cardImg img {
    width: 100%;
    border-radius: 10px;
    cursor: pointer;
  }
  .text {
    margin-top: 10px;
    width: 80%;
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
  .cardImg:hover .movieCardActions {
    transition: opacity 0.9s;
    opacity: 1;
  }
  .cardImg .addToList:hover i {
    color: var(--highlight-color);
  }
  .cardImg .likeIcon:hover {
    color: crimson;
  }
</style>
