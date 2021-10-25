<template>
  <v-form ref="form" lazy-validation @submit.prevent="subirComentario()">
    <v-row justify="start" align-items="center" :no-gutters="true">
      <v-col class="pr-3">
        <v-textarea
          name="comentario"
          outlined
          label="Agregar comentario"
          v-model="formData.comment"
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
        id: "",
        comment: "",
        date: "",
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
      if (day < 10 && month < 10 && hour < 10 && minute < 10) {
        return `0${day}-0${month}-${year}, 0${hour}:0${minute}`;
      } else if (day >= 10 && month < 10 && hour < 10 && minute < 10) {
        return `${day}-0${month}-${year}, 0${hour}:0${minute}`;
      } else if (day >= 10 && month >= 10 && hour < 10 && minute < 10) {
        return `${day}-${month}-${year}, 0${hour}:0${minute}`;
      } else if (day >= 10 && month >= 10 && hour >= 10 && minute < 10) {
        return `${day}-${month}-${year}, ${hour}:0${minute}`;
      } else {
        return `${day}-${month}-${year}, ${hour}:${minute}`;
      }
    },
  },
  methods: {
    subirComentario() {
      const form = this.$refs.form;
      if (form.validate()) {
        this.formData.date = this.fechaDeHoy;
        this.formData.id = this.$store.state.comments.usuario.id;
        this.$store.dispatch("comments/addCommentsToMovie", this.formData);
        form.reset();
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