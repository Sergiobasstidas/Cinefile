<template>
  <div>
    <v-container fluid class="bar_container text-center">
      <v-row justify="center">
        <v-col justify="">
          <v-btn
            @click="pageChange(currentPage - 1)"
            :disabled="currentPage == 1 ? true : false"
            dark
            class="page-btn page-indicator"
            ><v-icon>mdi-chevron-left</v-icon></v-btn
          ><v-btn dark class="page-indicator">{{ currentPage }}</v-btn
          ><v-btn
            @click="pageChange(currentPage + 1)"
            dark
            :disabled="lastPage ? true : false"
            class="page-btn page-indicator"
            ><v-icon>mdi-chevron-right</v-icon></v-btn
          ></v-col
        >
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lastPage: false,
    };
  },
  props: {
    currentPage: Number,
  },
  methods: {
    pageChange(page) {
      console.log(page);
      this.$emit("pageChange", page);
    },
  },
};
</script>
<style lang="scss" scoped>
.page-indicator {
  margin: 0 2px;
  background-color: black !important;
  cursor: initial !important;
}
.page-btn {
  cursor: pointer !important;
}
.page-btn:hover {
  color: var(--highlight-color) !important;
}
</style>
