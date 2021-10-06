<template>
  <div>
    <v-card class="navbar d-flex justify-center" flat height="100px" color="#131720" tile>
      <v-toolbar flat height="100px" color="#131720" dark>
        <img class="logo mr-4" src="../assets/logo.png" alt="" />
        <v-btn plain :to="{ name: 'Home' }">Home</v-btn>
        <v-btn plain :to="{ name: 'Peliculas' }">Peliculas</v-btn>
        <v-btn plain :to="{ name: 'Series' }">Series</v-btn>
        <v-btn plain :to="{ name: 'Actores' }">Actores</v-btn>

        <v-spacer></v-spacer>

        <v-btn class="px-0" plain :to="{ name: 'Login' }">Registrate</v-btn>
        <v-btn icon>
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
  </div>
</template>

<script>
// src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
export default {
  name: "Navbar",
};
</script>

<style>
.navbar {
  font-size: 14px;
  font-weight: 500;
}
.logo {
  max-width: 70px;
  min-width: 70px;
}
</style>
