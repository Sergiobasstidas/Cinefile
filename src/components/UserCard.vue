<template>
  <v-container>
    <div v-if="userLoged" class="mb-2">
      <v-col class="text-center">
        <v-avatar color="white" size="60" align-self="center" v-if="userLoged">
          <img :src="$store.state.user.user.userInfo.avatar" alt="" />
        </v-avatar>
      </v-col>
      <div class="text-center text-body-1 ma-1" v-if="userLoged">
        {{ $store.state.user.user.userInfo.mail }}
      </div>
    </div>
    <v-row justify="center">
      <v-btn
        class="text-center mt-4"
        outlined
        v-if="userLoged"
        @click="$emit('logOut')"
      >
        Cerrar sesion
        <span class="ml-1"><v-icon small>mdi-logout</v-icon></span></v-btn
      >
      <v-btn class="text-center my-6" to="/login" outlined v-else>
        Iniciar sesion
        <span class="ml-1"><v-icon small>mdi-login</v-icon></span></v-btn
      >
    </v-row>
  </v-container>
</template>
<script>
  export default {
    props: {
      userLoged: Boolean,
    },
    methods: {
      logOut() {
        this.$store.dispatch("session/logOut");
        this.$router.push("login");
      },
    },
  };
</script>
<style></style>
