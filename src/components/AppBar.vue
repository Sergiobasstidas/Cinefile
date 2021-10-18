<template>
  <div>
    <v-app-bar class="px-5" app absolute color="#131720" height="90px" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-items
        v-if="$vuetify.breakpoint.mdAndUp"
        class="d-flex flex-row align-center justify-end"
      >
        <v-btn
          v-for="(link, index) in links"
          :key="index"
          :to="link.route"
          plain
        >
          {{ link.title }}
        </v-btn>

        <v-btn color="#FFFFFF" plain to="/profile">Mi perfil</v-btn>

        <v-spacer></v-spacer>

        <v-btn absolute right class="px-0" plain to="/login"
          >Ingresar<v-icon>mdi-login</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer height="300px" v-model="drawer" absolute temporary>
      <v-list>
        <v-list-item link>
          <v-list-item-content>
            <UserCard :userLoged="$store.state.system.loged" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-spacer></v-spacer>

      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item v-for="link in links" :key="link" :to="link.route">
            <v-list-item-icon>
              <v-icon>mdi-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import UserCard from "@/components/UserCard.vue";
export default {
  components: { UserCard },
  name: "App",
  data: () => ({
    drawer: false,
    group: null,
    links: [
      {
        title: "Home",
        route: "/home",
      },
      {
        title: "Peliculas",
        route: "/movies",
      },
      {
        title: "Series",
        route: "/series",
      },
    ],
  }),
  methods: {
    setDrawer() {
      this.$store.dispatch("system/toggleDrawer");
    },
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

  <!-- <v-toolbar-items
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
    <v-spacer></v-spacer>
    <v-btn color="#FFFFFF" plain to="/profile">Mi cuenta</v-btn>
  </v-toolbar-items> -->
 