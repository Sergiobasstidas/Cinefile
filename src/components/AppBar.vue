<template>
  <div>
    <v-app-bar
      class="px-5"
      app
      hide-on-scroll
      scroll-threshold="200"
      fixed
      color="#131720"
      height="90px"
      dark
    >
      <v-avatar @click="$router.push('/Home')" style="cursor: pointer">
        <img src="@/assets/logo.png" alt="" />
      </v-avatar>
      <v-app-bar-nav-icon
        absolute
        right
        @click="drawer = true"
        v-if="!$vuetify.breakpoint.mdAndUp"
      ></v-app-bar-nav-icon>

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

        <v-btn color="#FFFFFF" plain to="/profile" v-if="userLogedIn"
          >Mi perfil</v-btn
        >

        <v-spacer></v-spacer>

        <v-btn v-if="userLogedIn" plain  absolute right class="px-0" @click="logOut()"
          >Cerrar Sesión<v-icon class="ml-2">mdi-logout</v-icon>
        </v-btn>
        <v-btn v-else absolute right class="px-0" plain to="/login"
          >Ingresar<v-icon class="ml-2">mdi-login</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer
      height="auto"
      v-model="drawer"
      absolute
      right
      dark
      temporary
      clipped
      class="navigationDrawer"
    >
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <UserCard :userLoged="userLogedIn" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-spacer></v-spacer>

      <v-list nav dense>
        <v-list-item-group v-model="group">
          <v-list-item
            v-for="(link, index) in links"
            :key="index"
            :to="link.route"
            class="mb-3"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item>
          <v-list-item class="mb-3" to="/profile" v-if="userLogedIn">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Mi perfil</v-list-item-title>
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
        icon: "mdi-home",
      },
      {
        title: "Peliculas",
        route: "/movies",
        icon: "mdi-movie-open-outline",
      },
      {
        title: "Series",
        route: "/series",
        icon: "mdi-television-classic",
      },
    ],
  }),
  methods: {
    setDrawer() {
      this.$store.dispatch("system/toggleDrawer");
    },
    async logOut() {
      await this.$store.dispatch("system/logOut");
      this.$router.push("Home");
    },
  },
  computed: {
    userLogedIn() {
      return this.$store.state.system.logedUser ? true : false;
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
.navigationDrawer {
  top: 90px !important;
  background-color: var(--main-dark-color) !important;
}
</style>
