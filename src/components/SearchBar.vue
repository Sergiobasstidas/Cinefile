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
            :categories="type === 'movie' ? categoriesMovies : categoriesTv"
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
      currentPage: Number,
    },
    data() {
      return {
        categoriesMovies: [
          {
            name: "Popular",
            path: "popular",
          },
          {
            name: "Top",
            path: "top_rated",
          },
          {
            name: "Proximamente",
            path: "upcoming",
          },
        ],
        categoriesTv: [
          {
            name: "Popular",
            path: "popular",
          },
          {
            name: "Top",
            path: "top_rated",
          },
          {
            name: "On air",
            path: "on_the_air",
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
      currentPage: function () {
        this.searchCategory();
      },
    },
    methods: {
      changeCategory(categoryPath) {
        this.activeCategory = categoryPath;

        this.$emit("categoryChange");
        this.searchCategory();
      },

      searchCategory() {
        this.$store.dispatch("getByCategory", {
          category: this.activeCategory,
          type: this.type,
          page: this.currentPage,
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
    position: absolute;
    right: 300px;
  }
  .categories:first-child {
    margin: 0 auto;
  }

  @media (max-width: 600px) {
    .categories {
      position: static;
      right: 0px;
    }
  }
</style>
