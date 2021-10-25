<template>
  <div>
    <h3 class="title_text mb-5">Te puede interesar</h3>
    <div v-for="(similar, $index) in getSimilares" :key="$index">
      <div class="box-similares" :data-similar-id="similar.id">
        <img :src="getImagen(similar.backdrop_path)" class="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SimilarMovies",
  computed: {
    getSimilares() {
      return this.$store.getters["getInfoMovieSimilar"];
    },
  },
  methods: {
    getImagen(imagen) {
      return "https://www.themoviedb.org/t/p/w1280/" + imagen;
    },
  },
};
</script>

<style scoped lang="scss">
.box-similares {
  cursor: pointer;
  background-color: #151f30;
  border-radius: 10px;
  margin-bottom: 2rem;
  position: relative;
  & img {
    width: 100%;
  }
}
</style>