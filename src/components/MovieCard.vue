<template>
  <div class="card">
    <img
      :src="
        movie.poster_path
          ? $store.state.POSTER_URL + movie.poster_path
          : 'https://media.comicbook.com/files/img/default-movie.png'
      "
      alt=""
    />
    <div class="text">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on" class="movieTitle">{{
            movie.title ? movie.title : movie.name
          }}</span>
        </template>
        <span>{{ movie.title ? movie.title : movie.name }}</span>
      </v-tooltip>
      <div class="categories mt-1">
        <span v-for="cat in categories" :key="cat" class="mr-2">{{ cat }}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        categories: ["Accion", "Drama"],
      };
    },
    props: {
      movie: Object,
    },
  };
</script>
<style scoped>
  .card:hover > .text .movieTitle {
    color: #2f80ed !important;
  }
  .card img {
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
  .categories {
    font-size: 0.8em;
  }
  .categories span {
  }
</style>
