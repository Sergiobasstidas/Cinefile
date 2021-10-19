<template>
  <div class="card card-hover">
    <img
      :src="cast.image"
      alt=""
      @click="goToDetails(cast.id)"
    />
    <div class="text text-center">
      {{ cast.title }}<br />
      <i>{{ cast.character }}</i>
    </div>
  </div>
</template>
<script>
export default {
  name: "CarouselCardCast",
  data() {
    return {};
  },

  props: {
    cast: Object,
  },

  methods: {
    goToDetails(id) {
      this.$store.dispatch("getMovieDetails", id);
    },
    imageExists(image_url) {
      let http = new XMLHttpRequest();

      http.open("HEAD", image_url, false);
      http.send();
      console.log(http.status);
      return http.status != 404;
      // fetch(image_url, { method: "HEAD", mode: "cors" })
      //   .then((res) => {
      //     if (res.ok) {
      //       console.log("Image exists.");
      //       return true
      //     } else {
      //       console.log("Image does not exist.");
      //       return false
      //     }
      //   })
      //   .catch((err) => console.log("Error:", err));
    },
  },
};
</script>
<style>
.card-hover:hover > .text .castTitle {
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
.castTitle {
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
</style>
