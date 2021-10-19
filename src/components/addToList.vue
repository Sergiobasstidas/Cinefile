<template>
  <div>
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on"
          ><v-icon dark x-large size="30"
            >mdi-bookmark-plus-outline</v-icon
          ></span
        >
      </template>
      <v-card>
        <v-card-title>Agregar a lista</v-card-title>
        <v-divider></v-divider>

        <v-list>
          <v-list-item-group
            color="primary"
            v-model="selectedItem"
            active-class="black--text"
          >
            <listButton
              v-for="(list, index) in lists"
              :key="index"
              :list="list"
              :movie="movie"
              @add="addOrRemoveFromList(list)"
            />

            <v-list-item v-if="editing">
              <v-list-item-content>
                <input type="text" class="nuevaListaInput" v-model="newList" />
              </v-list-item-content>
              <v-list-item-icon @click="confirmNewList()">
                <v-icon>mdi-check</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item v-else>
              <v-list-item-content>
                <v-list-item-title @click="editing = true">
                  Nueva lista
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  import listButton from "./listButton";
  export default {
    components: {
      listButton,
    },
    data() {
      return {
        selectedItem: 0,
        editing: false,
        dialog: false,
        newList: "",
      };
    },
    props: {
      movie: Object,
    },
    computed: {
      lists() {
        return this.$store.state.lists.userLists;
      },
    },
    watch: {
      dialog() {
        this.editing = false;
        this.newList = "";
      },
    },
    methods: {
      editNewList() {
        this.editing = true;
      },
      confirmNewList() {
        try {
          this.$store.dispatch("lists/createNewList", this.newList);
        } catch (e) {
          console.log(e);
        }
        this.editing = false;
        this.newList = "";
      },
      async addOrRemoveFromList(list) {
        console.log(this.movie);
        const movieToAdd = {
          id: this.movie.id,
          type: this.movie.type,
          title: this.movie.title ? this.movie.title : this.movie.name,
          poster_path: this.movie.poster_path,
          genre_ids: this.movie.genre_ids,
        };
        this.$store.dispatch("lists/addOrRemoveMovieFromList", {
          listName: list.name,
          newMovie: movieToAdd,
        });
      },
    },
  };
</script>
<style>
  .nuevaListaInput {
    max-width: 228px;
  }
  .nuevaListaInput:focus {
    border: none !important;
  }
</style>
