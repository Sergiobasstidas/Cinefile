<template>
  <v-row justify="start" align-items="start">
    <v-col cols="12" lg="8" order-lg="1" order="2">
      <h3 class="title_text mb-5">Comentarios</h3>
      <div v-if="hasComments">
        <div v-for="(comentario, $index) in getComentarios" :key="$index">
          <div class="box-comment pa-6">
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
                  {{ comentario.name }}<br /><small>{{ comentario.date }}</small>
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
                <div class="reaction__like">
                  <div class="like__icon" @click="sumarLike()">
                    <v-icon color="#29B474" dense>mdi-thumb-up-outline</v-icon>
                  </div>
                  <!-- {{ comentario.likes.length = 0 ? 0 : comentario.likes.length }} -->
                  {{comentario.likes}}
                </div>
                <div class="reaction__dislike" @click="sumarDislike()">
                  <div class="dislike__icon">
                    <v-icon color="#EB5757" dense
                      >mdi-thumb-down-outline</v-icon
                    >
                  </div>
                  <!-- {{ comentario.dislikes.length = 0 ? 0 : comentario.dislikes.length }} -->
                  {{comentario.dislikes}}
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
      <div v-if="!hasComments">
        <p>Esta película no tiene comentarios aún.</p>
        <p v-if="!isLogged"><a href="/login">Ingresa a tu cuenta</a> para ser el primero en comentar esta película. Si aún no tienes una cuenta, puedes crearla <a href="/register">aquí</a>.</p>
      </div>
      <AddComments v-if="isLogged"></AddComments>
    </v-col>
  </v-row>
</template>

<script>

import AddComments from "@/components/AddComments";
export default {
  name: "Comentarios",
  components: {
    AddComments,
  },
  props: {
    isLogged: Boolean,
    hasComments: Boolean
  },
  data: () => ({
    //hasComment: false,
    //isLogged: false,
  }),
  computed: {
    getComentarios() {
      console.log(this.$store.getters["comments/getComments"]);
      return this.$store.getters["comments/getComments"];
    },
  },
  methods:{
    sumarLike(){},
    sumarDislike(){}
  }
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
}
.reaction__like {
  margin-right: 1.8rem;
}
.like__icon {
  color: #29b474;
  border-radius: 10px;
  border: 1px solid #29b474;
  padding: 5px 7px;
  margin-right: 10px;
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
