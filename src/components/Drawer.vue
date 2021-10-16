<template>
  <v-navigation-drawer app v-model="drawer" absolute right fixed temporary>
    <v-list class="mt-3">
      <v-list-item v-for="(link, i) in links" :key="i" :to="{name: link}"
        min-width="118px"
        exact
        color="#FFFFFF"
        text
      >
        <v-list-item-content>
          <v-list-item-title v-text="link" />
          <v-btn icon>
            <v-icon color="#FFFFFF" to >mdi-account-outline</v-icon>
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapState } from "vuex";

export default {
  name: "Drawer",

  computed: {
    ...mapState(["links"]),
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      },
    },
  },
};
</script>

<style scoped>

</style>
