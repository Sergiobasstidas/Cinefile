<template>
  <div>
    <v-container>
      <v-row align="center" class="search_container">
        <v-col class="search_bar" cols="4"> Buscar...</v-col>
        <v-col class="d-flex genres" cols="12" sm="6">
          <v-select :items="items" label="Outlined style" outlined></v-select>
        </v-col>

        <v-col class="categories"></v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
  export default {
    name: "searchBar",
  };
</script>
<style>
  .search_container {
    background-color: #151f30;
    padding: 30px;
    border-radius: 20px;
    align-items: center;
  }
  .search_bar {
    background-color: grey;
    border-radius: 20px;
  }
</style>
