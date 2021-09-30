<template>
  <div>
    <div class="card">
      <div class="img">
        <img
          src="http://image.tmdb.org/t/p/w220_and_h330_face//rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg"
          alt=""
        />
      </div>
      <div class="details"></div>
    </div>
  </div>
</template>
<script>
  //   import movieCard from "@/components/MovieCard.vue";
  export default {
    components: {
      //   movieCard,
    },
  };
</script>
<style scoped>
  .card {
    max-width: 500px;
    height: 350px;
    background-color: #151f30;
    margin: 60px;
    border-radius: 30px;
    display: flex;
  }
  .img {
    height: 100%;
    width: 50%;
  }
  .img img {
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    border-radius: 10px 0 0 10px;
  }
</style>
