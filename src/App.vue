<template>
  <v-app>
    <v-container id="headerContainer">
      <AppBar />
    </v-container>
    <v-main absolute>
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
      this.$store.dispatch("system/initializeFirebase");
      await this.$store.dispatch("getGenreLists");
      const sections = this.$store.state.home.homeSections;
      for (const section of sections) {
        await this.$store.dispatch("initializeHome", {
          category: section.category,
          type: section.type,
        });
      }
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
    padding: 80px 0px 0px !important;
  }
</style>
