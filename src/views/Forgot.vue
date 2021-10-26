<template>
  <v-container fluid class="contenedor d-flex">
    <v-row>
      <v-col
        cols="12"
        class="d-flex flex-column text-center justify-center align-center"
      >
        <v-card class="sign_form contenedor_card text-white">
          <a href="/home">
            <img alt="" src="@/assets/logo.png" class="sign_logo" />
          </a>
          <div class="mt-4" v-if="send">
            <v-alert class="mb-0" outlined dense text type="success">
              Mail enviado con exito.
            </v-alert>
          </div>
          <div v-else>
            <div class="sign_group">
              <input
                class="sign_input"
                v-model="mail"
                type="email"
                placeholder="Email"
              />
            </div>
            <div class="sign_group--checkbox">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked="checked"
                required
              />
              <label class="ml-2" for="remember"
                >Estoy de acuerdo con las politicas de privacidad</label
              >
            </div>
            <div>
              <button class="register-button" v-if="loading" disabled>
                <v-progress-circular
                  indeterminate
                  size="20"
                  width="3"
                  color="white"
                ></v-progress-circular>
              </button>
              <button @click="sendPassword" v-else class="register-button">
                Enviar
              </button>
            </div>
            <span class="sign_text">
              Te enviaremos un email para restablecer tu contraseña.
            </span>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    mail: null,
    logInFailed: false,
    loading: false,
    send: false,
  }),
  methods: {
    async sendPassword() {
      this.loading = true;
      const passwordSendSuccessfully = await this.$store.dispatch(
        "system/recoveryPassword",
        {
          mail: this.mail,
        }
      );
      if (passwordSendSuccessfully) {
        this.send = true;
      } else {
        this.logInFailed = true;
        setTimeout(() => {
          this.logInFailed = false;
        }, 3000);
      }
      setTimeout(() => {
        this.loading = false;
        this.mail = "";
        this.logInFailed = false;
        this.$router.push("/home");
      }, 3500);
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
  margin-bottom: 0px;
  width: 100%;
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
  text-align: center;
  font-size: 14px;
  color: white !important;
  font-weight: normal;
  margin: 15px 0px 30px 15px;
  height: 10%;
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

span {
  color: white;
  margin: 8px 0px 8px 0px;
}
.sign_text {
  margin: 10px 0px 5px 0px;
  font-size: 14px;
  color: #e0e0e0;
  text-align: center;
  width: 70%;
}

@media (min-width: 576px) {
  .sign_form {
    padding: 30px 42px;
  }
}
</style>
