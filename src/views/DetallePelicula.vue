<template>
  <div>
    <div class="bodyMovie">
      <div class="bodyMovie__back">
        <figure class="Objf">
          <img :src="getImagen" class="lazy" />
        </figure>
      </div>
      <div class="infografia">
        <v-container>
          <!-- <v-layout align-center justify-start>
            <v-icon class="infografia__trailerIcon" color="#ffffff" size="50px"
              >mdi-play-circle-outline</v-icon
            >
            <h3 class="infografia__trailerText">Tráiler</h3>
          </v-layout> -->
          <h2 class="infografia__title">{{ getTitle }}<br><small>{{ getOriginalTitle }}</small></h2>
          <v-row
            align="center"
            justify="start"
            :no-gutters="true"
            class="infografia__listado"
          >
            <v-col
              cols="auto"
              v-for="(item, $index) in getListas"
              :key="$index"
            >
              <v-row align="center" justify="start" :no-gutters="true">
                <v-layout align-center justify-center>
                  <v-icon v-if="item.icono" color="#2F80ED" size="25px">{{
                    item.icono
                  }}</v-icon>
                  <h4>{{ item.text }}</h4>
                </v-layout>
                <v-icon
                  class="icono__separador mx-6"
                  color="#2F80ED"
                  size="40px"
                  >mdi-circle-small</v-icon
                >
              </v-row>
            </v-col>
          </v-row>
          <div class="infografia__container">
            <div class="infografia__descripcion">
              <p>{{ getDescription }}</p>
            </div>
            <div class="infografia__trailer">
              <iframe
                width="100%"
                height="500"
                :src="getTrailer"
                title="YouTube video player"
                frameborder="0"
                allowfullscreen
              ></iframe>
              <v-layout align-center justify-space-between>
                <div class="infografia__valoracion">
                  <v-rating
                    empty-icon="mdi-star-outline"
                    full-icon="mdi-star"
                    half-icon="mdi-star-half-full"
                    hover
                    length="5"
                    size="25"
                    :value="3"
                    color="#2F80ED"
                    dense
                  ></v-rating>
                  Valoración
                </div>
                <div class="infografia-listas">
                  <addToList :movie="$store.state.infoMovie" />
                </div>
              </v-layout>
            </div>
          </div>
          <div class="infografia__cast">
            <CarouselCast :castList="getCast" />
          </div>
          <div class="infografia__genre">
            <h3 class="title_text">Géneros</h3>
            <v-chip
              v-for="(genre, $index) in getGenres"
              :key="$index"
              class="mr-12"
              color="#151F30"
              text-color="#fff"
              >{{ genre.text }}</v-chip
            >
          </div>
          <div class="infografia__share">
            <h3 class="title_text">Compartir</h3>
            <v-chip class="mr-12 infografia__chip" color="#3B5998" text-color="#fff" :href="`https://www.facebook.com/sharer/sharer.php?u=https%3A//www.cinefile.cl/${this.$route.params.type}/${this.$route.params.id}`" target="_blank"><v-icon>mdi-facebook</v-icon> Compartir</v-chip
            >
            <v-chip class="mr-12" color="#55ACEE" text-color="#fff" :href="`https://twitter.com/intent/tweet?text=https%3A//www.cinefile.cl/${this.$route.params.type}/${this.$route.params.id}`" target="_blank"><v-icon>mdi-twitter</v-icon> Compartir</v-chip
            >
            <v-chip class="mr-12" color="#00BB2D" text-color="#fff" :href="`whatsapp://send?text=https%3A//www.cinefile.cl/${this.$route.params.type}/${this.$route.params.id}`" target="_blank"><v-icon>mdi-whatsapp</v-icon>Compartir</v-chip>
          </div>
        </v-container>
      </div>
    </div>
    <v-container>
      <Comentarios
        class="comentarios"
        :isLogged="paraComentarios"
        :hasComments="siTieneComentarios"
      ></Comentarios>
    </v-container>
  </div>
</template>

<script>
import CarouselCast from "@/components/CarouselCast";
import Comentarios from "@/components/Comentarios";
import addToList from "@/components/addToList";
export default {
  name: "DetallePelicula",
  components: { CarouselCast, Comentarios, addToList },
  data: () => ({
    playlistSelect: "",
    playlist: [
      {
        text: "Favoritas",
        value: "favoritas",
      },
      {
        text: "Ver más tarde",
        value: "ver_despues",
      },
    ],
  }),
  computed: {
    paraComentarios() {
      if (this.$store.state.system.logedUser) {
        let nuevoArrayObjectUser = {
          id: this.$store.state.user.user.userId,
          avatar: this.$store.state.user.user.userInfo.avatar,
          email: this.$store.state.user.user.userInfo.mail,
          nombre: this.$store.state.user.user.userInfo.name,
          alias: this.$store.state.user.user.userInfo.nick,
        };
        this.$store.dispatch("comments/setUser", nuevoArrayObjectUser);
        return true;
      } else {
        return false;
      }
    },
    siTieneComentarios() {
      if (this.$store.getters["comments/getLengthComments"] > 0) {
        return true;
      } else {
        return false;
      }
    },
    getTitle() {
      if (this.$route.params.type == "tv") {
        return this.$store.state.infoMovie.name;
      } else {
        return this.$store.state.infoMovie.title;
      }
    },
    getOriginalTitle(){
      if (this.$route.params.type == "tv") {
        return this.$store.state.infoMovie.original_name;
      } else {
        return this.$store.state.infoMovie.original_title;
      }
    },
    getImagen() {
      let idImagen = this.$store.state.infoMovie.backdrop_path;
      return "https://www.themoviedb.org/t/p/w1280/" + idImagen;
    },
    getDescription() {
      return this.$store.state.infoMovie.overview;
    },
    getYear() {
      if (this.$route.params.type == "tv") {
        return this.$store.state.infoMovie.first_air_date.slice(0, 4);
      } else {
        return this.$store.state.infoMovie.release_date.slice(0, 4);
      }
    },
    getGenres() {
      let listaGeneros = [];
      this.$store.state.infoMovie.genres.forEach((genre) => {
        listaGeneros.push({ id: genre.id, text: genre.name });
      });
      return listaGeneros;
    },
    getListas() {
      let listaInfo = [
        {
          icono: "mdi-star-outline",
          text: this.$store.state.infoMovie.vote_average,
        },
      ];
      this.$store.state.infoMovie.genres.forEach((genre) => {
        listaInfo.push({ icono: false, text: genre.name });
      });
      listaInfo.push({ icono: false, text: this.getYear });
      listaInfo.push({
        icono: false,
        text: this.$store.state.infoMovie.status,
      });
      return listaInfo;
    },
    getTrailer() {
      return (
        "https://www.youtube.com/embed/" +
        this.$store.state.infoMovie.trailer.key
      );
    },
    getCast() {
      let listaCast = [];
      this.$store.state.infoMovie.cast.forEach((castElement) => {
        if (castElement.profile_path != null) {
          listaCast.push({
            id: castElement.id,
            image:
              "https://www.themoviedb.org/t/p/w1280/" +
              castElement.profile_path,
            title: castElement.name,
            character: castElement.character,
          });
        } else {
          listaCast.push({
            id: castElement.id,
            image: "https://media.comicbook.com/files/img/default-movie.png",
            title: castElement.name,
            character: castElement.character,
          });
        }
      });
      return listaCast;
    },
  },
};
</script>

<style lang="scss" scoped>

.bodyMovie__back {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 15%;
  top: 0;
  z-index: 0;
}
.bodyMovie__back .Objf::before {
  content: "";
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  display: block;
  z-index: 1;
  background: linear-gradient(180deg, rgba(19, 23, 32, 0.5) -50%, #131720 35%);
  pointer-events: none;
}
.bodyMovie__back img {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  object-fit: cover;
  object-position: 50% 0;
  top: 0;
}
.infografia {
  z-index: 10;
  position: relative;
  margin-top: 240px;
  line-height: 60px;
}
.bodyMovie__infografia svg {
  stroke: #fff;
  color: #ffffff;
}
.infografia__trailerText {
  color: #fff;
  font-size: 22px;
  font-weight: 300;
  margin-left: 15px;
}
.infografia__title {
  line-height: .8;
  font-weight: 400;
  font-size: 40px;
  & small {
    font-size: 60%;
    font-style: italic;
    color: rgba(250,250,250,.5);
  }
}
.infografia__listado {
  line-height: 30px;
  margin-bottom: 20px !important;
}
.infografia__listado .col:last-child .icono__separador {
  display: none;
}
.infografia__listado .col:first-child h4 {
  margin-left: 5px;
}
.infografia__container {
  max-width: 900px;
  width: 100%;
}
.infografia__descripcion {
  width: 100%;
  line-height: 25px;
}
.infografia__trailer {
  width: 100%;
  line-height: 20px;
}
.infografia__valoracion {
  line-height: 30px;
  font-weight: 300;
}
.infografia__cast {
  line-height: 20px;
  margin-top: 3rem;
}
.infografia__genre {
  margin-top: 3rem;
}
.infografia__genre span {
  padding: 20px 1.2rem;
}
.infografia__share {
  margin-top: 3rem;
}
.infografia__share span {
  padding: 20px 1.2rem;
}
.infografia__share .img-svg {
  height: 100%;
}
.comentarios {
  margin-top: 5rem;
  position: relative;
}
@media (max-width: 960px) {

  .infografia {
    padding: 0 20px;
  }
}
@media (min-width: 1264px) {
  .container {
    max-width: 1300px;
  }
}
</style>
