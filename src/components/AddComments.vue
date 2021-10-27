<template>
  <v-form
    ref="form"
    lazy-validation
    @submit.prevent="subirComentario()"
    :class="loading"
  >
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
        <v-btn color="#2F80ED" type="submit" dark v-if="loading == 'finish'">
          Comentar
        </v-btn>
        <v-btn color="#2F80ED" type="submit" dark v-else disabled
          ><v-progress-circular
            indeterminate
            size="20"
            width="3"
            color="white"
          ></v-progress-circular
        ></v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
  export default {
    name: "AddComments",
    data: () => ({
      formData: {
        id: "",
        comment: "",
        date: "",
      },
      loading: "finish",
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
      async subirComentario() {
        this.loading = "loading";
        const form = this.$refs.form;
        if (form.validate()) {
          this.formData.date = this.fechaDeHoy;
          this.formData.id = this.$store.state.comments.usuario.id;
          await this.$store.dispatch(
            "comments/addCommentsToMovie",
            this.formData
          );
          this.loading = "finish";
          form.reset();
        } else {
          console.log("Error al enviar tu comentario");
          this.loading = "finish";
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
  form.loading {
    opacity: 0.2;
  }
  form.finish {
    opacity: 1;
  }
</style>
