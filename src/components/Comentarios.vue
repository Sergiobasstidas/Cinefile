<template>
  <v-row justify="center" align-items="start">
    <v-col cols="12" lg="8" order-lg="1" order="2">
      <h3 class="title_text mb-5">Comentarios</h3>
      <div
        v-for="(comentario, $index) in comentarios"
        :key="$index"
      >
        <div class="box-comment pa-6">
          <v-row
            justify="start"
            align-items="center"
            class="mb-1"
            :no-gutters="true"
          >
            <v-col cols="auto" class="box-comment__avatar">
              <img :src="comentario.avatar" alt="" />
            </v-col>
            <v-col class="box-comment__datos ml-3">
              <h4>
                {{ comentario.user }}<br /><small>{{ comentario.date }}</small>
              </h4>
            </v-col>
          </v-row>
          <v-divider dark></v-divider>
          <div class="box-comment__texto">
            <p class="m-0">{{ comentario.text }}</p>
          </div>
          <v-divider dark></v-divider>
          <v-row justify="space-between" align-items="center" class="mt-3">
            <v-col cols="auto" class="reaction">
              <div class="reaction__like">
                <div class="like__icon">
                  <v-icon color="#29B474" dense>mdi-thumb-up-outline</v-icon>
                </div>
                {{ comentario.likes }}
              </div>
              <div class="reaction__dislike">
                <div class="dislike__icon">
                  <v-icon color="#EB5757" dense>mdi-thumb-down-outline</v-icon>
                </div>
                {{ comentario.dislikes }}
              </div>
            </v-col>
            <v-col cols="auto" class="actions">
              <div class="actions__reply">
                <div class="action__icon">
                  <v-icon color="#2F80ED">mdi-reply-outline</v-icon>
                </div>
                Responder
              </div>
              <div class="actions__quote">
                <div class="action__icon">
                  <v-icon color="#2F80ED">mdi-format-quote-open-outline</v-icon>
                </div>
                Citar
              </div>
            </v-col>
          </v-row>
        </div>
        <div v-if="comentario.answers">
          <div v-for="(respuesta, $index) in comentario.answers" :key="$index" class="box-comment-answer pa-6">
            <v-row
            justify="start"
            align-items="center"
            class="mb-1"
            :no-gutters="true"
          >
            <v-col cols="auto" class="box-comment__avatar">
              <img :src="respuesta.avatar" alt="" />
            </v-col>
            <v-col class="box-comment__datos ml-3">
              <h4>
                {{ respuesta.user }}<br /><small>{{ respuesta.date }}</small>
              </h4>
            </v-col>
          </v-row>
          <v-divider dark></v-divider>
          <div class="box-comment__texto">
            <p class="m-0">{{ respuesta.text }}</p>
          </div>
          <v-divider dark></v-divider>
          <v-row justify="space-between" align-items="center" class="mt-3">
            <v-col cols="auto" class="reaction">
              <div class="reaction__like">
                <div class="like__icon">
                  <v-icon color="#29B474" dense>mdi-thumb-up-outline</v-icon>
                </div>
                {{ respuesta.likes }}
              </div>
              <div class="reaction__dislike">
                <div class="dislike__icon">
                  <v-icon color="#EB5757" dense>mdi-thumb-down-outline</v-icon>
                </div>
                {{ respuesta.dislikes }}
              </div>
            </v-col>
            <v-col cols="auto" class="actions">
              <div class="actions__reply">
                <div class="action__icon">
                  <v-icon color="#2F80ED">mdi-reply-outline</v-icon>
                </div>
                Responder
              </div>
              <div class="actions__quote">
                <div class="action__icon">
                  <v-icon color="#2F80ED">mdi-format-quote-open-outline</v-icon>
                </div>
                Citar
              </div>
            </v-col>
          </v-row>
          </div>
        </div>
      </div>
    </v-col>
    <v-col cols="12" lg="4" order-lg="2" order="1">
      <h3 class="title_text mb-5">Te puede interesar</h3>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Comentarios",
  data: () => ({
    comentarios: [
      {
        id: 1,
        user: "Matías Morales",
        avatar: "../avatar.png",
        date: "24-09-2021,  22:30",
        text: "En la línea solipsista del Christopher Nolan de Dunkerque (2017) o del Zack Snyder de Watchmen (2009), pero cada uno, claro, fiel a su estilo único e intransferible. Hay muy pocos directores capaces de hacerse cargo de un proyecto de presupuesto desorbitado y cargado de estrellas de primer nivel -Dune parece un all-stars: Timothée Chalamet, Zendaya, Rebecca Ferguson, Oscar Isaac, Jason Momoa, Dave Bautista, Stellan Skarsgård, Javier Bardem, Josh Brolin, Charlotte Rampling, etc- y tener la valentía de hacer con él una película tan tremendamente personal, ajena a cualquier moda imperante y que, con ello, siga resultando un espectáculo inabarcable de primer nivel. Porque esa era la sensación que me abrasaba mientras veía la película: el del espectáculo totémico que sólo puedes mirar con la boca abierta y los ojos en spinning continuo. Las imágenes que construye Villeneuve, son majestuosa...",
        likes: 12,
        dislikes: 7,
        answers: false,
      },
      {
        id: 2,
        user: "Sergio Bastidas",
        avatar: "../avatar.png",
        date: "24-09-2021,  22:30",
        text: "Es tal el aparataje audiovisual que uno está con el botón de fascinación en modo ON todo el rato. Cada mundo nuevo que aparece, cada castillo, cada nave, cada objeto -que fetichismo le aplica Villeneuve a los objetos sobre los que hace pivotar el relato continuamente, ya sea una cornamenta de toro, ya sea el cuchillo que acaba empuñando Paul Atreides-, están pensados hasta el último detalle, magníficamente diseñados y construidos para que sirvan al mismo tiempo de decorado y de explicación de los propios personajes. Y desde Lawrence de Arabia (1962) nadie había captado tan bien la esencia del desierto. ",
        likes: 5,
        dislikes: 1,
        answers: [
          {
            id: 1,
            user: "Ignacio Lagunas",
            avatar: "../avatar.png",
            date: "24-09-2021,  22:30",
            text: "La espectacularidad de Dune va a la par de la intensidad que Villeneuve la aplica a las imágenes. Este no es un espectáculo ligero, no es una batalla galáctica divertida y entretenida, sino más bien todo lo contrario. Aquí se ha venido a sufrir. A ver traiciones, complots, asesinatos, masacres, sueños oníricos, brujas maléficas y gusanos gigantes. Viéndola no paraba de pensar “esto me está gustando mucho pero ¿le gustará a alguien más?”.",
            likes: 8,
            dislikes: 4,
          },
        ],
      },
    ],
  }),
};
</script>

<style lang="scss">
.box-comment {
  background-color: #151f30;
  border-radius: 10px;
  margin-bottom: 2rem;
}
.box-comment-answer{
  background-color: #151f30;
  border-radius: 10px;
  margin-bottom: 2rem;
  margin-left: 3rem;
}
.box-comment__texto {
  padding: 1rem 0;
}
.reaction,
.actions {
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
  margin-right: 3rem;
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
  margin-right: 3rem;
}
.action__icon {
  margin-right: 10px;
}
</style>