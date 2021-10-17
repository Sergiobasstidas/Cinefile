<template>
  <v-container class="my-6 profile_container">
    <ProfileInfo class="my-12" />
    <v-container fluid style="margin-top: 100px">
      <CarouselProfile
        :movieList="$store.state.home.homeMovies[3]"
        title="Peliculas Gustadas"
      />
    </v-container>
    <span class="title_text">Mis Listas</span>
  </v-container>
</template>
<script>
  import ProfileInfo from "@/components/ProfileInfo";
  import CarouselProfile from "@/components/CarouselProfile";
  export default {
    components: {
      ProfileInfo,
      CarouselProfile,
    },

    async beforeCreate() {
      // const usuarioPrueba = {
      //   name: "listas Probando",
      //   nick: "prueba 2",
      //   mail: "listas@gmail.com",
      // };
      await this.$store.dispatch("user/setUserInfo", "ign.lagunas@gmail.com");
      // this.$store.dispatch("user/createNewUser", usuarioPrueba);
      // this.$store.dispatch("user/updateUserInfo", {
      //   ...usuarioPrueba,
      //   name: "cambiado exitoso ",
      // });
    },
  };
</script>
<style>
  .profile_container {
    width: 80%;
    margin: 0 auto;
  }
</style>
