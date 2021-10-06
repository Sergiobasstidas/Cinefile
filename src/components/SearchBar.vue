<template>
  <div>
    <v-container fluid>
      <v-row
        align="center"
        justify="space-between"
        class="bar_container"
        col="5"
      >
        <div class="search-container">
          <input type="text" class="search-input" placeholder="Buscar..." />
          <v-icon class="search-icon">mdi-magnify</v-icon>
        </div>

        <v-col class="categories" cols="3">
          <CategoriesToggle />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
  import CategoriesToggle from "@/components/CategoriesToggle";

  export default {
    name: "searchBar",
    components: {
      CategoriesToggle,
    },
  };
</script>
<style>
  .bar_container {
    background-color: #151f30;
    padding: 20px;
    border-radius: 20px;
    align-items: center;
  }
  .search-container {
    width: 40%;
    position: relative;
  }
  .search-container .search-icon {
    position: absolute !important;
    right: 10px;
    color: #2f80ed !important;
    top: 10px;
  }

  .search-input {
    background-color: black;
    border-radius: 20px;
    padding: 10px;
    width: 100%;

    color: white;
  }
  .search-input::placeholder {
    color: white;
    margin-left: 10px;
  }
  .categories {
    width: 300px;
  }
  .categories:first-child {
    margin: 0 auto;
  }
</style>
