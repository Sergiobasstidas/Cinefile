<template>
  <v-app>
      <AppBar />
    <v-main >
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: { AppBar, Footer },

  data: () => ({
    //
  }),
  async beforeCreate() {
    this.$store.dispatch("system/initializeApp");
  },
};
</script>
<style>
:root {
  --main-light-color: #151f30;
  --main-dark-color: #131720;
  --highlight-color: #2f80ed;
}
#app {
  background-color: #131720 !important;
  color: white !important;
  font-family: "Rubik", sans-serif !important;
}

body,
html {
  background-color: #131720 !important;
  color: white !important;
  font-family: "Rubik", sans-serif;
}

v-main {
  padding: 65px 0px 0px !important;
}
</style>
