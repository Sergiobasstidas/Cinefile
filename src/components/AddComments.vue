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
          :rules="[(v) => !!v || 'Este campo es obligatorio']"
        ></v-textarea>
      </v-col>
      <v-col cols="auto">
        <v-btn color="#2F80ED" type="submit" dark> Comentar </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: "AddComments",
  data: () => ({
    formData: [
      {
        idUser: "",
        comentario: "",
        fechaComentario: "",
      },
    ],
  }),
  computed: {
    fechaDeHoy() {
      let date = new Date();
      let minute = date.getMinutes();
      let hour = date.getHours();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      if (month < 10) {
        return `${day}-0${month}-${year} ${hour}:${minute}`;
      } else {
        return `${day}-${month}-${year}`;
      }
    },
  },
  methods: {
    subirComentario() {
      const form = this.$refs.form;
      if (form.validate()) {
        this.formData.fechaComentario = this.fechaDeHoy;
        this.formData.idUser = this.$store.state.comments.usuario.id
        this.formData.avatar = this.$store.state.comments.usuario.avatar
        this.formData.name = this.$store.state.comments.usuario.nombre
        this.$store.dispatch("comments/addCommentsToMovie", this.formData);
        this.$refs.form.reset();
      } else {
        console.error("Error al enviar tu comentario");
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
.agregarComentario .v-input__slot {
  margin: 0;
}
.agregarComentario .v-text-field__details {
  display: none;
}
</style>