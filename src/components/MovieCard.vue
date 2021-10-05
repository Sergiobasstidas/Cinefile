<template>
  <v-container>
    <v-card class="card d-flex flex-nowrap flex-column flex-sm-row my-4">
      <img
        class="rounded-l-xl"
        :src="
          movie.poster_path
            ? $store.state.POSTER_URL + movie.poster_path
            : 'https://media.comicbook.com/files/img/default-movie.png'
        "
      />

      <div class="rounded-r-xl d-flex flex-column pl-4 text">
        <v-card-text
          class="
            movieTitle
            d-flex
            flex-column
            text-body-2 text-md-subtitle-1
            font-weight-bold
            pt-3
            pl-0
            rounded-tr-xl
          "
          >{{ movie.title }}</v-card-text
        >
        <v-card-text class="d-none d-sm-flex text-caption pt-0 pb-0">
          <p class="pr-2">Accion</p>
          <p class="pr-2">Aventura</p>
          <p class="pr-2">2010</p>
        </v-card-text>

        <v-card-text class="d-none d-sm-flex pt-0 text-caption">
          <p>Lorem ipsum dolor sit.</p>
        </v-card-text>

        <v-card-text
          class="
            d-none d-sm-flex
            rounded-br-xl
            mb-3
            mt-auto
            pr-2 pr-lg-1
            text-caption
          "
        >
          <i> "Lorem ipsum dolor sit amet consectetur adipisicing elit." </i>
        </v-card-text>
      </div>
    </v-card>
  </v-container>
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
  .card * {
    background-color: #151f30;
    padding: 0;
    color: white;
  }
  .card {
    width: 170px;
    height: 300px;
    background-color: transparent !important;
  }
  .card img {
    height: 250px !important;
    width: auto;
  }
  .card .text {
  }
  @media (min-width: 600px) {
    .card {
      max-width: 200px;
      max-height: 300px;
    }
  }

  @media (min-width: 960px) {
    .card {
      max-width: 380px;
      max-height: 270px;
    }
  }
</style>
