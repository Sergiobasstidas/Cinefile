<template>
  <div class="movieCardActions">
    <div class="cardIcons">
      <!-- <likeMovie :movie="movie" class="likeIcon" v-if="userLogedIn" />
       <v-icon x-large dark class="likeIcon" v-else>mdi-heart-outline</v-icon> !-->
      <addToList class="addToList" :movie="movie" />
    </div>
    <h3 class="goToDetails" @click="goToDetails(movie.id, movie.type)">
      Ver detalles
    </h3>
  </div>
</template>
<script>
  import addToList from "./addToList";
  // import likeMovie from "./likeMovie";

  export default {
    data() {
      return {};
    },
    components: {
      addToList,
      // likeMovie,
    },
    props: {
      movie: Object,
    },
    computed: {
      userLogedIn() {
        return this.$store.state.system.logedUser ? true : false;
      },
    },
    methods: {
      goToDetails(id, type) {
        this.$router.push(`/${type}/${id}`);
      },
    },
  };
</script>
<style scoped>
  .movieCardActions {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    top: 5px;
  }
  .movieCardActions .cardIcons {
    display: flex;
    margin-bottom: 25px;
  }
  .movieCardActions .goToDetails {
    font-weight: 400;
  }
  .movieCardActions .goToDetails:hover {
    color: var(--highlight-color);
    cursor: pointer;
  }
  .cardIcons .likeIcon {
    margin-right: 30px;
    cursor: pointer;
  }
</style>
<style>
  .addToList:hover i {
    color: var(--highlight-color);
  }
  .likeIcon:hover {
    color: crimson;
  }
</style>
