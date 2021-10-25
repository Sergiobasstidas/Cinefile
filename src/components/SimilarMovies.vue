<template>
  <div>
    <h3 class="title_text mb-5">Te puede interesar</h3>
    <div
      v-for="(similar, $index) in getSimilares"
      :key="$index"
      class="box-similares"
      :data-similar-id="similar.id"
      @click="goToMovie(similar.id)"
    >
      <!-- <img :src="getImagen(similar.backdrop_path)" class="" /> -->
      <figure class="Objf">
          <img :src="getImagen(similar.backdrop_path)" class="lazy" />
        </figure>
      <div class="title-similares">
        <h4>{{ similar.title ? similar.title : similar.name }}</h4>
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
      return "https://www.themoviedb.org/t/p/w1280" + imagen;
    },
    goToMovie(idMovie){
        let type = this.$route.params.type
        let id = idMovie
        this.$router.push(`/${type}/${id}`);
    }
  },
};
</script>

<style scoped lang="scss">
// .Objf{
//     height: 210px;
// }
.box-similares {
  cursor: pointer;
  border-radius: 10px;
  margin-bottom: 2rem;
  position: relative;
  & img {
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
}
.title-similares {
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  width: 100%;
  bottom: 5px;
  border-radius: 0 0 10px 10px;
  padding: 1rem;
}
</style>