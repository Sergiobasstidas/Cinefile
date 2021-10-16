<template>
  <div>
    <v-container fluid>
      <v-row
        align="center"
        justify="space-between"
        class="bar_container"
        col="5"
      >
        <v-col class="search-container" cols="12" sm="5">
          <input
            type="text"
            class="search-input"
            placeholder="Buscar..."
            v-model="searchText"
          />
          <v-icon class="search-icon">mdi-magnify</v-icon>
        </v-col>

        <v-col class="categories" cols="12" sm="1">
          <CategoriesToggle
            :categories="categories"
            :activeCategory="activeCategory"
            @categoryChange="changeCategory"
          />
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
    props: {
      type: {
        required: true,
        type: String,
      },
    },
    data() {
      return {
        categories: [
          {
            name: "Popular",
            path: "popular",
          },
          {
            name: "Top-rated",
            path: "top_rated",
          },
          {
            name: "Upcoming",
            path: "upcoming",
          },
        ],
        activeCategory: "popular",
        searchText: "",
      };
    },
    watch: {
      searchText: async function () {
        const searchText = this.searchText;
        if (searchText !== "") {
          this.searchByText(searchText);
        } else {
          this.changeCategory(this.activeCategory);
        }
      },
    },
    methods: {
      changeCategory(categoryPath) {
        this.activeCategory = categoryPath;
        this.$store.dispatch("getByCategory", {
          category: categoryPath,
          type: this.type,
        });
      },

      searchByText(text) {
        this.$store.dispatch("searchByText", {
          text: text,
          type: this.type,
        });
      },
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
    position: relative !important;
  }
  .search-container .search-icon {
    position: absolute !important;
    right: 23px;
    color: #2f80ed !important;
    top: 22px;
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
    min-width: 300px;
  }
  .categories:first-child {
    margin: 0 auto;
  }
</style>
