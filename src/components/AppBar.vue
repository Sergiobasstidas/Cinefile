<template>
  <v-app-bar app color="#131720" class="navbar px-5 d-flex" height="100px">
    <img src="@/assets/logo.png" alt="" class="logo mr-4" />
    <v-toolbar-items
      v-if="$vuetify.breakpoint.mdAndUp"
      class="d-flex flex-row align-center justify-end"
    >
      <v-btn color="#FFFFFF" plain to="/home"> Home </v-btn>

      <v-btn color="#FFFFFF" plain to="/movies"> Peliculas </v-btn>

      <v-btn color="#FFFFFF" plain to="/series"> Series </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-items class="float-right">
        <v-btn class="px-0" plain to="/login"
          >Ingresar<v-icon>mdi-login</v-icon></v-btn
        >
      </v-toolbar-items>
    </v-toolbar-items>

    <v-app-bar-nav-icon v-else @click="setDrawer(true)" />
  </v-app-bar>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState(["links"]),
  },
  methods: {
    ...mapMutations({
      setDrawer: "SET_DRAWER",
    }),
  },
};
</script>

<style scoped>
.navbar {
  font-size: 14px;
  font-weight: 500;
}
.logo {
  max-width: 70px;
  min-width: 70px;
}
</style>
