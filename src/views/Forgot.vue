<template>
  <v-form fluid class="contenedor d-flex">
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
            <input class="sign_input" type="email" placeholder="Email" />
          </div>
    
          <div class=" sign_group--checkbox">
            <v-checkbox
              class="checkbox"
              label="Estoy de acuerdo con las politicas de privacidad"
            ></v-checkbox>
          </div>

          <button type="button" class="button">Registrarse</button>
          <span class="sign_text">
            Te evniaremos una contraseña a tu Email
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
  background-image: url("https://dmitryvolkov.me/demo/flixtv/main/img/bg.jpg");
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
  font-size: 14px;
  color: #e0e0e0 !important;
  font-weight: normal;
  margin: 0;
  height: 60px;
}
.v-checkbox v-label {
  color: white !important;
}
::placeholder {
  color: white;
}

.button {
  display: flex !important;
  flex-direction: row !important;
  justify-content: center !important;
  align-items: center !important;
  margin: 30px 15px 15px 20px !important;
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
  margin: 8px 0px 8px 0px;
}
.sign_text {
  margin: 18px 0px 5px 0px;
  font-size: 14px;
  color: #e0e0e0;
}

@media (min-width: 576px) {
  .sign_form {
    padding: 30px 42px;
  }
}
</style>
