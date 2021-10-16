<template>
  <div class="toggle-container">
    <span
      v-for="(category, index) in categories"
      :key="index"
      :class="category.path === activeCategory ? 'category-active' : ''"
      @click="changeCategory(category)"
      >{{ category.name }}</span
    >
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    props: {
      activeCategory: {
        required: true,
        type: String,
      },
      categories: {
        required: true,
        type: Array,
      },
    },
    methods: {
      changeCategory(category) {
        if (category.path !== this.activeCategory) {
          this.$emit("categoryChange", category.path);
        }
      },
    },
  };
</script>
<style>
  .toggle-container {
    border-radius: 20px;
    background-color: black;
    padding: 10px 20px 10px 20px;
    display: flex;
    justify-content: space-between;
    max-width: 300px;
    font-size: 0.9em;
    margin: 0 auto;
  }
  .toggle-container span {
    font-weight: 500;
    cursor: pointer;
  }
  .category-active {
    color: #2f80ed;
  }
</style>
