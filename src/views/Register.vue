<template>
  <form @submit.prevent="procesarFormulario" fluid class="contenedor d-flex">
    <v-row>
      <v-col
        cols="12"
        class="d-flex flex-column text-center justify-center align-center"
      >
        <v-card class="sign_form contenedor_card text-white">
          <a href="/home">
            <img alt="" src="@/assets/logo.png" class="sign_logo" />
          </a>
          <div class="sign_group">
            <input
              class="sign_input"
              type="text"
              v-model="userName"
              required
              placeholder="Nombre de usuario"
            />
          </div>
          <div class="sign_group">
            <input
              class="sign_input"
              type="email"
              v-model.trim="email"
              required
              placeholder="Email"
            />
          </div>
          <div class="sign_group">
            <input
              class="sign_input"
              type="password"
              v-model.trim="password"
              required
              placeholder="Contraseña"
            />
          </div>
          <div class="sign_group--checkbox">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              checked="checked"
              required
              v-validate="'required'"
            />
            <label class="ml-2" for="remember"
              >Estoy de acuerdo con las politicas de privacidad</label
            >
          </div>

          <button type="submit" class="register-button">Registrarse</button>

          <span>O</span>

          <div class="sign_social">
            <button class="gl-button">Google</button>
          </div>
          <span class="sign_text">
            Ya tienes una cuenta?
            <a href="/login">Ingresa</a>
          </span>
          <div></div>
        </v-card>
      </v-col>
    </v-row>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    select: { required },
  },

  data: () => ({
    userName: null,
    email: null,
    password: null,
  }),

  methods: {
    procesarFormulario() {
      this.$store.dispatch("system/registerNewUser", {
        nick: this.userName,
        mail: this.email,
        password: this.password,
      });
      (this.userName = ""), (this.email = "");
      this.password = "";
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
.contenedor {
  background-image: url("./../assets/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 890px;
}
.sign_form {
  background-color: #131720;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  padding: 30px 42px;
  position: relative;
  width: 100%;
  max-width: 400px;
  border: 1px solid #151f30;
}
.sign_logo {
  max-width: 90px;
  min-width: 90px;
  margin: 0 30px 15px 30px;
}
.sign_group {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 20px;
  width: 100%;
}
.sign_input {
  background-color: #151f30;
  border: 1px solid transparent;
  border-radius: 14px;
  height: 44px;
  position: relative;
  color: #fff;
  font-size: 14px;
  width: 100%;
  padding: 0 20px;
  transition: 0.5s ease !important;
  transition-property: color, border-color !important;
}
.sign_group--checkbox {
  width: 100%;
  text-align: center;
  font-size: 15px;
  color: white !important;
  font-weight: normal;
  margin: 0px 0px 30px 15px;
  height: 10%;
}

.sign_social {
  margin-bottom: 10px;
}
::placeholder {
  color: white;
}
.register-button {
  font-size: 16px;
  font-weight: 500;
  color: white;
  transition: all 0.4s ease;
  padding: 8px 95px;
  border-radius: 30px;
  background-color: #007bff;
}

.register-button:hover {
  color: #131720;
  background-color: #007bff;
}

.gl-button {
  font-size: 17px;
  font-weight: 500;
  color: white;
  transition: all 0.4s ease;
  padding: 5px 40px;
  border-radius: 30px;
  background-color: #df4a32;
}
.gl-button:hover {
  color: #df4a32;
  background-color: white;
}
span {
  color: white;
  margin: 8px 0px 8px 0px;
}
.sign_text {
  margin: 18px 0px 5px 0px;
  font-size: 14px;
  color: #e0e0e0;
}
.sign_text a {
  position: relative;
  color: #2f80ed;
  margin-left: 5px;
  text-decoration: none;
}
.sign_text a:hover {
  color: white;
  text-decoration: underline;
}

@media (min-width: 576px) {
  .sign_form {
    padding: 30px 42px;
  }
}
</style>
