<template>
  <v-container app fluid class="contenedor d-flex">
    <v-row>
      <v-col
        cols="12"
        class="d-flex flex-column text-center justify-center align-center col"
      >
        <v-card class="sign_form contenedor_card text-white">
          <a href="/home">
            <img alt="" src="@/assets/logo.png" class="sign_logo" />
          </a>
          <v-alert
            dense
            outlined
            transition="scale-transition"
            type="error"
            class="text-body-2"
            v-if="logInFailed"
          >
            El <strong>email</strong> o la <strong>contraseña</strong> no son
            validos, intente nuevamente.
          </v-alert>
          <div class="sign_group">
            <input
              class="sign_input"
              type="email"
              v-model="mail"
              required
              placeholder="Email"
            />
          </div>
          <div class="sign_group">
            <input
              class="sign_input"
              type="password"
              v-model="password"
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
            />
            <label class="ml-2" for="remember">Recuerdame</label>
          </div>
          <div>
            <button class="ingresar-button" v-if="loading" disabled>
              <v-progress-circular
                indeterminate
                size="20"
                width="3"
                color="white"
              ></v-progress-circular>
            </button>
            <button @click="logIn()" class="ingresar-button" v-else>
              Ingresar
            </button>
          </div>

          <span>O</span>

          <div class="sign_social">
            <button class="gl-button" v-if="loading" disabled>
              <v-progress-circular
                indeterminate
                size="20"
                width="3"
                color="white"
              ></v-progress-circular>
            </button>
            <button @click="googleLogin()" v-else class="gl-button">
              Google
            </button>
          </div>

          <span class="sign_text">
            No tienes una cuenta?
            <a href="/register">Registrate</a>
          </span>
          <span class="sign_text">
            <a href="/forgot">Olvidaste tu contraseña?</a>
          </span>

          <div></div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {

  data: () => ({
    mail: null,
    password: null,
    logInFailed: false,
    loading: false,
  }),
  methods: {
    ...mapActions(["logIn"]),

    async logIn() {
      this.loading = true;
      const logInSuccessfull = await this.$store.dispatch("system/logInUser", {
        mail: this.mail,
        password: this.password,
      });
      if (logInSuccessfull) {
        this.$router.push("/home");
      } else {
        this.logInFailed = true;
        setTimeout(() => {
          this.logInFailed = false;
        }, 3000);
      }
      this.loading = false;
      this.mail = "";
      this.password = "";
    },


    async googleLogin() {
      this.loading = true;

      const logInSuccessfull = await this.$store.dispatch("system/googleLogin");
      if (logInSuccessfull) {
        this.$router.push("/home");
      } else {
        this.logInFailed = true;
        setTimeout(() => {
          this.logInFailed = false;
        }, 3000);
      }

      this.loading = false;
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
.contenedor {
  background-image: url("./../assets/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;

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
  min-width: 95%;
  max-width: 100%;
}
.sign_input {
  background-color: #151f30;
  border: 1px solid transparent;
  border-radius: 16px;
  height: 44px;
  position: relative;
  color: #fff;
  font-size: 14px;
  width: 100%;
  padding: 0 20px;
}
.sign_group--checkbox {
  width: 100%;
  text-align: left;
  font-size: 15px;
  color: white !important;
  font-weight: normal;
  margin: 0px 0px 30px 15px;
  height: 10%;
}

::placeholder {
  color: white;
}

.ingresar-button {
  font-size: 16px;
  font-weight: 500;
  color: white;
  transition: all 0.4s ease;
  padding: 8px 110px;
  border-radius: 30px;
  background-color: #007bff;
}

.ingresar-button:hover {
  color: #131720;
  background-color: #007bff;
}
.sign_social {
  margin-bottom: 10px;
}
.gl-button {
  font-size: 16px;
  font-weight: 500;
  color: white;
  transition: all 0.4s ease;
  padding: 8px 40px;
  border-radius: 30px;
  background-color: #df4a32;
}
.gl-button:hover {
  color: #df4a32;
  background-color: white;
}

span {
  color: white;
  margin: 15px 0px 8px 0px;
}
.sign_text {
  margin: 5px 0px 5px 0px;
  font-size: 14px;
  color: #e0e0e0;
}
.sign_text a {
  position: relative;
  color: #2f80ed;
  text-decoration: none;
}
.sign_text a:hover {
  position: relative;
  color: white;
  text-decoration: underline;
}
.col {
  padding: 0px !important;
}

@media (max-width: 320px) {
  .ingresar-button{
    padding: 8px 70px;
  }
}
</style>
