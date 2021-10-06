<template>
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
          <v-col cols="auto" v-for="(item, $index) in listaInfo" :key="$index">
            <v-row align="center" justify="start" :no-gutters="true">
              <v-layout align-center justify-center>
                <v-icon v-if="item.icono" color="#2F80ED" size="25px">{{
                  item.icono
                }}</v-icon>
                <h4>{{ item.text }}</h4>
              </v-layout>
              <v-icon class="icono__separador mx-6" color="#2F80ED" size="40px"
                >mdi-circle-small</v-icon
              >
            </v-row>
          </v-col>
        </v-row>
        <div class="infografia__container">
          <div class="infografia__descripcion">
            <p>
              Un futuro lejano, en el que las familias de nobles se disputan el
              dominio del árido planeta Arrakis, también conocido como Dune por
              su geografía compuesta por desiertos de dunas. Arrakis es el único
              lugar donde se encuentra 'la especia', la sustancia más codiciada
              y valiosa del universo que producen gigantescos gusanos de arena.
              Debido a su rareza, y a su arriesgada extracción, quien controla
              la producción de la especia, controla el destino no sólo del
              Imperio, sino de toda la humanidad. El Duque Leto Atreides (Oscar
              Isaac) aceptará la administración de este peligroso planeta y será
              enviado a Arrakis junto con Lady Jessica (Rebecca Ferguson) y su
              hijo Paul (Timothée Chalamet). Será entonces cuando la familia
              Atreides corra un gran riesgo por estar en el punto de mira de
              fuerzas malvadas como las de su enemigo el Barón Vladimir
              Harkonnen (Stellan Skarsgård).
            </p>
            <p>
              Nueva adaptación cinematográfica del clásico de la ciencia-ficción
              Dune (1965) de Frank Herbert, que dirige el cineasta nominado al
              Oscar Denis Villeneuve.
            </p>
          </div>
          <div class="infografia__trailer">
            <iframe
              width="100%"
              height="500"
              src="https://www.youtube.com/embed/n9xhJrPXop4"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <v-layout align-center justify-space-between>
              <div class="infografia-valoracion">
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
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetallePelicula",
  data: () => ({
    imagenFondo: "../imagen-fondo.jpg",
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
    beforeMount(){
      console.log(this.$route.params.id)
    }
  }),
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
.bodyMovie__back::before {
  content: "";
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  display: block;
  z-index: 1;
  background: linear-gradient(180deg, rgba(19, 23, 32, 0.5) 0%, #131720 100%);
  pointer-events: none;
}
.bodyMovie__back img {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
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
  width: 95%;
}
.infografia__descripcion {
  width: 100%;
  line-height: 25px;
}
.infografia__trailer {
  width: 100%;
  line-height: 20px;
}
.infografia-valoracion {
  line-height: 30px;
  font-weight: 300;
}
</style>