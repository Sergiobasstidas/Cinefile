<template>
  <div
    class="
      card-container card-hover
      d-flex
      flex-nowrap flex-column flex-sm-row
      rounded-xl
    "
  >
    <div class="card-img">
      <img
        class="rounded-l-xl"
        :src="
          movie.poster_path
            ? $store.state.POSTER_URL + movie.poster_path
            : 'https://media.comicbook.com/files/img/default-movie.png'
        "
      />
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
        >{{ movie.title }}</span
      >
      <span class="d-none d-sm-flex text-caption pt-0 pb-0">
        <p class="mr-2">Accion</p>
        <p class="mr-2">Aventura</p>
      </span>

      <span class="d-none d-sm-flex pt-0 text-caption">
        <p>Lorem ipsum dolor sit.</p>
      </span>

      <span
        class="
          d-none d-sm-flex
          rounded-br-xl
          mb-3
          mt-auto
          pr-2 pr-lg-1
          text-caption
        "
      >
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
  export default {
    name: "MovieCard",
    props: {
      movie: Object,
    },
  };
</script>
<style>
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
  }

  .card-img img {
    max-height: 100%;
    max-width: 100%;
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
