<template>
  <v-footer  class="footer" dark padless color="#131720">
    <v-card flat tile class="white--text text-center mt-6" color="#131720" width="100%">

      <img class="logo-footer" src="../assets/logo.png" alt="" />

      <v-layout class="d-flex justify-center mt-3">
        <v-card-text class="nosotros d-none d-md-flex  white--text pt-0">
          Somos una comunidad unida por el cine. Conoce más acerca de tus
          películas, series y actores favoritos. Disponibilizamos la información
          más detallada para que puedas conocer a fondo tus intereses del
          séptimo arte.
        </v-card-text>
      </v-layout>

      <v-card-text class="icons py-0 d-none d-sm-flex justify-space-between flat">
        <v-btn icon plain>
          <v-icon>mdi-facebook</v-icon>
        </v-btn>
        <v-btn icon plain>
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
        <v-btn icon plain>
          <v-icon>mdi-instagram</v-icon>
        </v-btn>
        <v-btn icon plain>
          <v-icon>mdi-youtube</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="d-flex flex-row justify-center py-sm-0 pt-0 pt-md-2">

        <v-btn class="about" plain :to="{ name: 'Home' }">Home</v-btn>
        <v-btn class="about d-none d-md-flex" plain :to="{ name: 'About' }">Quienes Somos</v-btn>
        <v-btn class="about" plain :to="{ name: 'Login' }">Login</v-btn>
        <v-btn class="about d-none d-md-flex" plain :to="{ name: 'Estrenos' }">Estrenos</v-btn>

      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="derechos white--text">
        &copy; {{ new Date().getFullYear() }} Cinefile. Todos los derechos
        reservados.
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>

export default {
  name: "Footer",
};
</script>

<style>
.logo-footer {
  width: 8%;
  min-width: 110px;
  
}
.derechos {
  font-weight: 400;
  font-size: 13px;
}
.icons {

  width: 40%;
  margin: auto;
  max-width: 300px

  
}
.about {
  font-size: 12px !important;
  font-weight: 400;
}
.nosotros {
  width: 50%;
  max-width: 720px;
}
@media (max-width: 960px) {
  .logo-footer {
    min-width: 60px;
  }
  .derechos {
  font-weight: 400;
  font-size: 10px !important;
}

}
</style>
