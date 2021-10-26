<template>
  <v-row justify="center" class="listPanel" light>
    <v-expansion-panels inset>
      <v-expansion-panel v-for="(list, i) in lists" :key="i" class="list">
        <v-expansion-panel-header>{{ list.name }}</v-expansion-panel-header>
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
  };
</script>
<style scoped>
  .listPanel .list {
    background-color: var(--main-light-color) !important;
    color: white !important;
    font-size: 13px !important;
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
