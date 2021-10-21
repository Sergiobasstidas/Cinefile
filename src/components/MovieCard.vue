<template>
  <div class="card-container card-hover d-flex flex-nowrap rounded-xl">
    <div class="card-img">
      <img
        class="rounded-l-xl"
        @click="goToDetails(movie.id, movie.type)"
        :src="
          movie.poster_path
            ? $store.state.POSTER_URL + movie.poster_path
            : 'https://media.comicbook.com/files/img/default-movie.png'
        "
      />
      <movieCardActions :movie="movie" class="actions" />
    </div>

    <div class="d-flex flex-column ml-4 text card-text">
      <span
        class="
          movieTitle
          d-flex
          flex-column
          text-body-2 text-md-subtitle-1
          font-weight-bold
          p-0
        "
        >{{ movie.title ? movie.title : movie.name }}</span
      >
      <span class="d-flex text-caption pt-0 pb-0">
        <p class="mr-2">Accion</p>
        <p class="mr-2">Aventura</p>
      </span>

      <span class="d-flex pt-0 text-caption">
        <p>Lorem ipsum dolor sit.</p>
      </span>

      <span class="d-flex rounded-br-xl mb-3 mt-auto pr-2 pr-lg-1 text-caption">
        <i class="movieOverview"> {{ `"${movie.overview}"` }}... </i>
        <v-tooltip bottom max-width="400px">
          <template v-slot:activator="{ on, attrs }">
            <span class="dots" v-bind="attrs" v-on="on"> ... </span>
          </template>
          <span>{{ movie.overview }}</span>
        </v-tooltip>
      </span>
    </div>
  </div>
</template>
<script>
  import movieCardActions from "./movieCardActions";
  export default {
    name: "MovieCard",
    props: {
      movie: Object,
    },
    components: {
      movieCardActions,
    },

    methods: {
      goToDetails(id, type) {
        this.$router.push(`/${type}/${id}`);
      },
    },
  };
</script>
<style scoped>
  .card-hover:hover > .card-text .movieTitle {
    color: #2f80ed !important;
  }
  .card-container {
    max-width: 100%;
    height: 100%;
    background-color: #151f30 !important;
    color: white;
  }
  .card-img {
    min-width: 180px;
    max-width: 200px;
    height: 100%;
    display: flex;
    position: relative;
  }

  .card-img img {
    max-height: 100%;
    max-width: 100%;
  }
  .card-img .actions {
    opacity: 0;
  }
  .card-img:hover img {
    opacity: 0.1;
    transition: opacity 0.5s;
  }
  .card-img:hover .actions {
    transition: opacity 0.9s;
    opacity: 1;
  }

  .card-text {
    width: 250px;
  }
  .card-text .movieTitle {
    width: 90%;
    white-space: normal !important;
  }
  .card-img,
  .movieTitle {
    cursor: pointer;
  }
  .card-text .movieOverview {
    line-height: 1.5em;
    height: 3em;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis !important;
  }
  .dots {
    cursor: pointer;
  }
</style>
