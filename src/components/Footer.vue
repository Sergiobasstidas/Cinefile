<template>
  <v-footer class="footer" dark padless>
    <v-card flat tile class="white--text text-center">
      <img class="logo-footer" src="../assets/logo.png" alt="" />

      <v-layout class="d-flex justify-center mt-3">
        <v-card-text class="nosotros white--text pt-0">
          Somos una comunidad unida por el cine. Conoce más acerca de tus
          películas, series y actores favoritos. Disponibilizamos la información
          más detallada para que puedas conocer a fondo tus intereses del
          séptimo arte.
        </v-card-text>
      </v-layout>

      <v-card-text class="icons py-0 d-flex justify-space-between flat">
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

      <v-card-text class="pt-2">
        <v-btn class="about" plain :to="{ name: 'Home' }">Home</v-btn>
        <v-btn class="about" plain :to="{ name: 'About' }">Quienes Somos</v-btn>
        <v-btn class="about" plain :to="{ name: 'Login' }">Login</v-btn>
        <v-btn class="about" plain :to="{ name: 'Estrenos' }">Estrenos</v-btn>
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
  //   data: () => ({
  //     icons: [
  //         '<i class="fab fa-facebook"></i>',
  //         '<i class="fab fa-instagram"></i>',
  //     ],
  //   }),
};
</script>

<style>
.logo-footer {
  width: 10%;
}
.derechos {
  font-weight: 400;
  font-size: 13px;
}
.icons {
  width: 18%;
  margin: auto;
  
}
.about {
  font-size: 12px !important;
  font-weight: 400;
}
.nosotros {
  width: 50%;
}
</style>
