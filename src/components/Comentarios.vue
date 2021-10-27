<template>
  <v-row justify="start" align-items="start">
    <v-col cols="12" lg="8" order-lg="1" order="2">
      <h3 class="title_text mb-5">Comentarios</h3>
      <div v-if="hasComments">
        <div v-for="(comentario, $index) in getComentarios" :key="$index">
          <div class="box-comment pa-6" :data-comment-id="$index" :data-comment-user="comentario.id">
            <v-row
              justify="start"
              align-items="center"
              class="mb-1"
              :no-gutters="true"
            >
              <v-col cols="auto" class="box-comment__avatar">
                <img :src="comentario.avatar" alt="" class="" />
              </v-col>
              <v-col class="box-comment__datos ml-3">
                <h4>
                  {{ comentario.name }}<br /><small>{{
                    comentario.date
                  }}</small>
                </h4>
              </v-col>
            </v-row>
            <v-divider dark></v-divider>
            <div class="box-comment__texto">
              <p class="mb-0">{{ comentario.comment }}</p>
            </div>
            <v-divider dark></v-divider>
            <v-row justify="space-between" align-items="center" class="mt-3">
              <v-col cols="auto" class="reaction">
                <div :class="getLinkedLike($index)">
                  <div
                    class="like__icon"
                    @click="sumarLike($index)"
                  >
                    <v-icon :color="colorIconLike" dense>mdi-thumb-up-outline</v-icon>
                  </div>
                  {{
                    comentario.likes.length == 0 ? 0 : comentario.likes.length
                  }}
                </div>
                <div
                  :class="getLinkedDislike($index)"
                  @click="sumarDislike($index)"
                >
                  <div class="dislike__icon">
                    <v-icon :color="colorIconDislike" dense>mdi-thumb-down-outline</v-icon>
                  </div>
                  {{
                    comentario.dislikes.length == 0
                      ? 0
                      : comentario.dislikes.length
                  }}
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
      <div v-if="!hasComments">
        <p>Esta película no tiene comentarios aún.</p>
        <p v-if="!isLogged && !hasComments">
          <a href="/login">Ingresa a tu cuenta</a> para ser el primero en
          comentar esta película. Si aún no tienes una cuenta, puedes crearla
          <a href="/register">aquí</a>.
        </p>
      </div>
      <AddComments v-if="isLogged"></AddComments>
      <p v-if="!isLogged && hasComments">
          <a href="/login">Ingresa a tu cuenta</a> para comentar esta película. Si aún no tienes una cuenta, puedes crearla
          <a href="/register">aquí</a>.
        </p>
    </v-col>
    <v-col cols="12" lg="4" order-lg="2" order="1" class="d-none d-lg-block">
      <SimilarMovies></SimilarMovies>
    </v-col>
  </v-row>
</template>

<script>
import AddComments from "@/components/AddComments";
import SimilarMovies from "@/components/SimilarMovies"
export default {
  name: "Comentarios",
  components: {
    AddComments,
    SimilarMovies
  },
  props: {
    isLogged: Boolean,
    hasComments: Boolean,
  },
  data: () => ({
    colorIconLike: "#29B474",
    colorIconDislike: "#EB5757",
  }),
  computed: {
    getComentarios() {
      return this.$store.getters["comments/getComments"];
    },
  },
  methods: {
    async sumarLike(idComment) {
      if(this.isLogged){
        await this.$store.dispatch("comments/agregarLike", idComment)
      }else{
        console.log("Usuario no esta logueado para dar Like")
      }
    },
    async sumarDislike(idComment) {
      if(this.isLogged){
        await this.$store.dispatch("comments/agregarDislike", idComment)
      }else{
        console.log("Usuario no esta logueado para dar Dislike")
      }
    },
    getLinkedLike(idComment) {
      let comentarios = this.$store.getters["comments/getComments"];
      let userActive = this.$store.getters["comments/getUserActive"];
      let isLiked = comentarios[idComment].likes.filter(like => like == userActive)
      if (this.isLogged && isLiked.length == 0) {
        this.colorIconLike = "#29B474"
        return "reaction__like--click";
      } else if(this.isLogged && isLiked.length > 0) {
        this.colorIconLike = "#ffffff"
        return "reaction__like--liked";
      }else if (!this.isLogged){
        this.colorIconLike = "#29B474"
        return "reaction__like";
      }
    },
    getLinkedDislike(idComment) {
      let comentarios = this.$store.getters["comments/getComments"];
      let userActive = this.$store.getters["comments/getUserActive"];
      let isDisliked = comentarios[idComment].dislikes.filter(dislike => dislike == userActive)
      if (this.isLogged && isDisliked.length == 0) {
        this.colorIconDislike = "#EB5757"
        return "reaction__dislike--click";
      } else if(this.isLogged && isDisliked.length > 0) {
        this.colorIconDislike = "#ffffff"
        return "reaction__dislike--disliked";
      }else if (!this.isLogged){
        this.colorIconDislike = "#EB5757"
        return "reaction__dislike";
      }
    },
  },
};
</script>

<style lang="scss">
.box-comment {
  background-color: #151f30;
  border-radius: 10px;
  margin-bottom: 2rem;
}
.box-comment-answer {
  background-color: #151f30;
  border-radius: 10px;
  margin-bottom: 2rem;
  margin-left: 3rem;
}
.box-comment__texto {
  padding: 1rem 0;
}
.box-comment__avatar img {
  border-radius: 80px;
  width: 52px;
}
.reaction {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.reaction__like,
.reaction__dislike {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &--click {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  &--liked {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  &--disliked {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
}
.reaction__like {
  margin-right: 1.8rem;
  &--click {
    margin-right: 1.8rem;
  }
  &--liked {
    margin-right: 1.8rem;
  }
}
.reaction__like--liked .like__icon {
  background-color: #29b474;
}
.like__icon {
  color: #29b474;
  border-radius: 10px;
  border: 1px solid #29b474;
  padding: 5px 7px;
  margin-right: 10px;
}
.reaction__dislike--disliked .dislike__icon {
  background-color: #eb5757;
}
.dislike__icon {
  color: #eb5757;
  border-radius: 10px;
  border: 1px solid #eb5757;
  padding: 5px 7px;
  margin-right: 10px;
}
.actions__reply,
.actions__quote {
  display: flex;
  justify-content: center;
  align-items: center;
}
.actions__reply {
  margin-right: 1.8rem;
}
.action__icon {
  margin-right: 10px;
}
</style>
