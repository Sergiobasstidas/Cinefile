<template>
  <div>
    <div class="bodyMovie">
      <div class="bodyMovie__back">
        <figure class="Objf">
          <img :src="imagenFondo" class="lazy" />
        </figure>
      </div>
      <div class="infografia">
        <v-container>
          <v-layout align-center justify-start>
            <v-icon class="infografia__trailerIcon" color="#ffffff" size="50px"
              >mdi-play-circle-outline</v-icon
            >
            <h3 class="infografia__trailerText">Tráiler</h3>
          </v-layout>
          <h2 class="infografia__title">{{ titulo }}</h2>
          <v-row
            align="center"
            justify="start"
            :no-gutters="true"
            class="infografia__listado"
          >
            <v-col
              cols="auto"
              v-for="(item, $index) in listaInfo"
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
              <p>
                Un futuro lejano, en el que las familias de nobles se disputan
                el dominio del árido planeta Arrakis, también conocido como Dune
                por su geografía compuesta por desiertos de dunas. Arrakis es el
                único lugar donde se encuentra 'la especia', la sustancia más
                codiciada y valiosa del universo que producen gigantescos
                gusanos de arena. Debido a su rareza, y a su arriesgada
                extracción, quien controla la producción de la especia, controla
                el destino no sólo del Imperio, sino de toda la humanidad. El
                Duque Leto Atreides (Oscar Isaac) aceptará la administración de
                este peligroso planeta y será enviado a Arrakis junto con Lady
                Jessica (Rebecca Ferguson) y su hijo Paul (Timothée Chalamet).
                Será entonces cuando la familia Atreides corra un gran riesgo
                por estar en el punto de mira de fuerzas malvadas como las de su
                enemigo el Barón Vladimir Harkonnen (Stellan Skarsgård).
              </p>
              <p>
                Nueva adaptación cinematográfica del clásico de la
                ciencia-ficción Dune (1965) de Frank Herbert, que dirige el
                cineasta nominado al Oscar Denis Villeneuve.
              </p>
            </div>
            <div class="infografia__trailer">
              <iframe
                width="100%"
                height="500"
                src="https://www.youtube.com/embed/n9xhJrPXop4"
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
                  <v-combobox
                    v-model="playlistSelect"
                    :items="playlist"
                    :item-text="playlist.text"
                    :item-value="playlist.value"
                    color="#ffffff"
                    clearable
                    hide-selected
                    hide-no-data
                    dark
                    label="Agregar a mis listas"
                  ></v-combobox>
                </div>
              </v-layout>
            </div>
          </div>
          <div class="infografia__cast">
            <CarouselCast :castList="casts" />
          </div>
          <div class="infografia__genre">
            <h3 class="title_text">Géneros</h3>
            <v-chip
              v-for="(genre, $index) in genres"
              :key="$index"
              class="mr-12"
              color="#151F30"
              text-color="#fff"
              >{{ genre.text }}</v-chip
            >
          </div>
          <div class="infografia__share">
            <h3 class="title_text">Compartir</h3>
            <v-chip class="mr-12" color="#3B5998" text-color="#fff"
              ><img src="facebook-f-brands.svg" class="img-svg" />
              Compartir</v-chip
            >
            <v-chip class="mr-12" color="#55ACEE" text-color="#fff"
              ><img src="twitter-brands.svg" class="img-svg" />
              Compartir</v-chip
            >
            <v-chip class="mr-12" color="#00BB2D" text-color="#fff"
              ><img src="whatsapp-brands.svg" class="img-svg" />
              Compartir</v-chip
            >
          </div>
        </v-container>
      </div>
    </div>
    <v-container>
      <Comentarios class="comentarios"></Comentarios>
    </v-container>
  </div>
</template>

<script>
  import CarouselCast from "@/components/CarouselCast";
  import Comentarios from "@/components/Comentarios";
  export default {
    name: "DetallePelicula",
    components: { CarouselCast, Comentarios },
    data: () => ({
      //imagenFondo: "../imagen-fondo.jpg",
      imagenFondo:
        "https://www.themoviedb.org/t/p/w1280/aknvFyJUQQoZFtmFnYzKi4vGv4J.jpg",
      titulo: "Dune",
      listaInfo: [
        {
          icono: "mdi-star-outline",
          text: "4.30",
        },
        {
          icono: false,
          text: "Acción",
        },
        {
          icono: false,
          text: "Aventura",
        },
        {
          icono: false,
          text: "Drama",
        },
        {
          icono: false,
          text: "2021",
        },
        {
          icono: false,
          text: "2h 35m",
        },
        {
          icono: false,
          text: "12+",
        },
      ],
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
      casts: [
        {
          id: 1,
          image: "../cast_01.jpg",
          title: "Timothée Chalamet",
        },
        {
          id: 2,
          image: "../cast_02.jpg",
          title: "Zendaya",
        },
        {
          id: 3,
          image: "../cast_03.jpg",
          title: "Rebecca Ferguson",
        },
        {
          id: 4,
          image: "../cast_04.jpg",
          title: "Oscar Isaac",
        },
        {
          id: 5,
          image: "../cast_05.jpg",
          title: "Jason Momoa",
        },
        {
          id: 6,
          image: "../cast_06.jpg",
          title: "Stellan Skarsgård",
        },
      ],
      genres: [
        {
          id: "accion",
          text: "Acción",
        },
        {
          id: "aventura",
          text: "Aventura",
        },
        {
          id: "drama",
          text: "Drama",
        },
      ],
    }),
    beforeMount() {
      //console.log(this.$route.params.id);
      //this.$store.dispatch("getDetails", { id: id, type: type });
    },
  };
</script>

<style lang="scss">
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
    background: linear-gradient(
      180deg,
      rgba(19, 23, 32, 0.5) -50%,
      #131720 50%
    );
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
    font-weight: 400;
    font-size: 40px;
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
</style>