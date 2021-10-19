<template>
  <v-form ref="form" lazy-validation @submit.prevent="subirComentario()">
    <v-row justify="start" align-items="center" :no-gutters="true">
      <v-col class="pr-3">
        <v-textarea
          name="comentario"
          outlined
          label="Agregar comentario"
          v-model="formData.comentario"
          color="white"
          dark
          class="agregarComentario mb-0"
          no-resize
        ></v-textarea>
      </v-col>
      <v-col cols="auto">
        <v-btn color="#2F80ED" type="submit" dark>
          Comentar
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: "AddComments",
  data: () => ({
    formData: [{ comentario: "" }],
  }),
  computed: {
    fechaDeHoy() {
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      if (month < 10) {
        return `${day}-0${month}-${year}`;
      } else {
        return `${day}-${month}-${year}`;
      }
    },
  },
};
</script>

<style>
.agregarComentario {
  background-color: #151f30;
  border-radius: 10px !important;
}
.agregarComentario .v-input__slot {margin: 0;}
.agregarComentario .v-text-field__details {display: none;}
</style>