<template>
  <div class="card">
    <img
      :src="
        movie.poster_path
          ? $store.state.IMAGE_URL + movie.poster_path
          : 'https://media.comicbook.com/files/img/default-movie.png'
      "
      alt=""
    />
    <div class="text">
      <h3 class="title">{{ movie.title }}</h3>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    props: {
      movie: Object,
    },
  };
</script>
<style scoped>
  .card:hover > .text .title {
    color: #2f80ed;
  }
  .card img {
    width: 100%;
    border-radius: 10px;
    cursor: pointer;
  }
  .text {
    margin-top: 10px;
  }
  .text .title {
    color: white;
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
</style>
