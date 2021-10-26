<template>
  <div>
    <SearchBar
      class="mb-6"
      :type="type"
      :currentPage="currentPage"
      @categoryChange="changePage(1)"
    />
    <Grid :movieList="list" />
    <pageChanger @pageChange="changePage" :currentPage="currentPage" />
  </div>
</template>
<script>
  import Grid from "@/components/Grid";
  import SearchBar from "@/components/SearchBar";
  import PageChanger from "@/components/PageChanger";

  export default {
    components: {
      Grid,
      SearchBar,
      PageChanger,
    },
    data() {
      return {
        currentPage: 1,
      };
    },
    props: {
      list: Array,
      type: String,
    },

    methods: {
      changePage(page) {
        this.currentPage = page;
      },
    },
  };
</script>
<style scoped></style>
