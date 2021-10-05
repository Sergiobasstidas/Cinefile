<template>
  <v-app>
    <span @click="$router.push('/login')">login</span>
    <router-view />
    <Footer />
  </v-app>
</template>

<script>
  export default {
    name: "App",
    data: () => ({
      //
    }),
    async beforeCreate() {
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
  .v-application {
    background-color: black !important;
    color: white !important;
    font-family: "Rubik", sans-serif !important;
  }
</style>
