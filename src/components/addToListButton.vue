<template>
  <div>
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on"
          ><v-icon dark size="30">mdi-bookmark-plus-outline</v-icon></span
        >
      </template>
      <v-card>
        <v-card-title>Agregar a lista</v-card-title>
        <v-divider></v-divider>

        <v-list>
          <v-list-item-group color="primary" v-model="selectedItem">
            <v-list-item v-for="(list, index) in lists" :key="index">
              <v-list-item-content>
                <v-list-item-title v-text="list.name"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon>mdi-star-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>

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
  export default {
    data() {
      return {
        selectedItem: 0,
        editing: false,
        dialog: false,
        newList: "",
        lists: [
          {
            name: "Favoritos",
          },
          { name: "Ver mas tarde" },
        ],
      };
    },
    computed: {},
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
        this.lists.push({ name: this.newList });
        this.editing = false;
        this.newList = "";
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
