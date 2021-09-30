<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from './components/Footer.vue'
export default {
  name: "App",
  components: { Navbar, Footer },
  data: () => ({
    //
  }),
};
</script>
<style>
body * {
  background-color: #131720 !important;
  color: white !important;
  font-family: 'Rubik', sans-serif;
}
</style>
