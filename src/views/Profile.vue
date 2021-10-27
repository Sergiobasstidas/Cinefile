<template>
  <v-container class="my-6 profile_container">
    <ProfileInfo class="my-12" />
    <span class="title_text text-h5 text-sm-h3">Mis Listas</span>
    <listsPanel class="my-7" />
    <v-container fluid style="margin-top: 100px">
      <CarouselProfile
        :movieList="$store.state.listedMovies"
        title="Descubre nuevas peliculas"
      />
    </v-container>
  </v-container>
</template>
<script>
  import ProfileInfo from "@/components/ProfileInfo";
  import CarouselProfile from "@/components/CarouselProfile";
  import listsPanel from "@/components/listsPanel";
  export default {
    components: {
      ProfileInfo,
      CarouselProfile,
      listsPanel,
    },
  };
</script>
<style>
  .profile_container {
    width: 80%;
    margin: 0 auto;
  }
  @media (max-width: 600px) {
    .profile_container {
      width: 95%;
    }
  }
</style>
