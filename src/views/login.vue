<template>
  <v-form fluid class="contenedor d-flex">
    <v-row>
      <v-col
        cols="12"
        class="d-flex flex-column text-center justify-center align-center col"
      >
        <v-card class="sign_form contenedor_card text-white">
          <a href="/home">
            <img alt="" src="@/assets/logo.png" class="sign_logo" />
          </a>
          <div class="sign_group">
            <input class="sign_input" type="email" placeholder="Email" />
          </div>
          <div class="sign_group">
            <input
              class="sign_input"
              type="password"
              placeholder="Contraseña"
            />
          </div>
          <div class="sign_group sign_group--checkbox">
            <v-checkbox
              class="checkbox"
              style="color='#FFFFF'"
              label="Recuerdame"
            ></v-checkbox>
          </div>

          <button type="button" class="button">Ingresar</button>
          <span>O</span>

          <div class="sign_social">
            <v-btn class="fb">Facebook</v-btn>
            <v-btn class="tw">Twitter</v-btn>
            <v-btn class="gl">Google</v-btn>
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
  </v-form>
</template>

<script>
export default {};
</script>

<style scoped>
.contenedor {
  background-image: url("./../assets/fondo_registro.jpg");
  background-repeat: no-repeat;
  background-size: contain;
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
  border-radius: 16px;
  height: 44px;
  position: relative;
  color: #fff;
  font-size: 14px;
  width: 100%;
  padding: 0 20px;
}
.sign_group--checkbox {
  font-size: 14px;
  color: #e0e0e0 !important;
  font-weight: normal;
  margin: 0;
  height: 10%;
}
.v-input--selection-controls {
    margin-top: 0px;
    padding-top: 0px;
}
.v-checkbox v-label {
  color: white !important;
}
.fb {
  background-color: #3b5999 !important;
  color: white !important;
}
.tw {
  background-color: #1da1f2 !important;
  color: white !important;
}
.gl {
  background-color: #df4a32 !important;
  color: white !important;
}
.sign_social {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 44px;
  width: calc(33% - 10px);
  border-radius: 25px !important;
  color: #fff;
}

::placeholder {
  color: white;
}

.button {
  display: flex !important;
  flex-direction: row !important;
  justify-content: center !important;
  align-items: center !important;
  margin: 0px 15px  auto !important;
  width: 300px;
  height: 45px !important;
  border-radius: 16px !important;
  background-color: #2f80ed !important;
  font-size: 16px !important;
  color: #e0e0e0 !important;
  text-transform: uppercase !important;
  font-weight: 500 !important;
}
span {
  color: white;
  margin: 15px 0px 8px 0px;
}
.sign_text {
  margin: 10px 0px 5px 0px;
  font-size: 14px;
  color: #e0e0e0;
}
.sign_text a {
  position: relative;
  color: #2f80ed;
}
a {
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
}
.col {
  padding: 0px  !important;
}

@media (min-width: 576px) {
  .sign_form {
    padding: 30px 42px;
  }
}
</style>
