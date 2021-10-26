<template>
  <v-row justify="center" class="listPanel" light>
    <v-expansion-panels inset>
      <v-expansion-panel v-for="(list, i) in lists" :key="i" class="list">
        <v-expansion-panel-header
          ><div class="list_panel_info">
            {{ list.name }}
            <div class="ml-2">({{ list.movies.length }})</div>
          </div></v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col
                v-for="(movie, index) in list.movies"
                cols="6"
                sm="3"
                md="2"
                :key="index"
              >
                <CarouselCard
                  :movie="movie"
                  :hideGenres="true"
                  class="Moviecard"
                />
              </v-col>
            </v-row>
          </v-container>
          <v-container fluid v-if="list.default ? false : true">
            <v-row justify="end">
              <v-dialog transition="dialog-bottom-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on">mdi-delete</v-icon>
                </template>
                <template v-slot:default="dialog">
                  <v-card color="#151f30" dark>
                    <v-card-text>
                      <div class="text-h5 py-12">
                        Esta seguro que desea borrar la lista?
                      </div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn text @click="dialog.value = false">Cerrar</v-btn>
                      <v-btn color="red" text @click="deleteList(list.name)"
                        >Borrar</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>
<script>
  import CarouselCard from "./CarouselCard.vue";

  export default {
    data() {
      return {};
    },
    computed: {
      lists() {
        return this.$store.state.lists.userLists;
      },
    },
    components: {
      CarouselCard,
    },
    methods: {
      deleteList(listName) {
        this.$store.dispatch("lists/deleteList", listName);
      },
    },
  };
</script>
<style scoped>
  .listPanel .list {
    background-color: var(--main-light-color) !important;
    color: white !important;
    font-size: 13px !important;
  }
  .list_panel_info {
    display: flex;
  }

  @media (min-width: 1900px) {
    .Moviecard {
      width: 160px;
    }
  }
  @media (max-width: 600px) {
    .Moviecard {
      max-width: 140px;
    }
  }
</style>
