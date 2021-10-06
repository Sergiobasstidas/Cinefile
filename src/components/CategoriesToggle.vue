<template>
  <div class="toggle-container">
    <span> Popular </span>
    <span>Top-rated</span>
    <span>Newest</span>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        categories: [
          {
            name: "Popular",
          },
        ],
      };
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
    max-width: 250px;
    font-size: 0.9em;
    margin: 0 auto;
  }
</style>
