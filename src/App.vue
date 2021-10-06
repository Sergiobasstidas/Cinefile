<template>
  <v-app>
    <v-container>
      <Navbar />
    </v-container>
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: { Navbar, Footer },
  data: () => ({
    //
  }),
};
</script>
<style>
#app{background-color: #131720 !important;color: white !important;}
body,html {
  background-color: #131720 !important;
  color: white !important;
  font-family: "Rubik", sans-serif;
}
</style>
