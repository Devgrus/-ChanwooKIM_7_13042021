<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <b-form @submit="sendLoginForm" class="row">
      <b-form-group
        id="email-group"
        label="Adresse mail"
        label-for="email"
        class="col-12 col-md-6">
        <b-form-input v-model="loginForm.email" id="email"></b-form-input>
      </b-form-group>
      <b-form-group
        id="password-group"
        label="Mot de passe"
        label-for="password"
        class="col-12 col-md-6">
        <b-form-input v-model="loginForm.password" id="password" type="password"></b-form-input>
      </b-form-group>
      <div class="col-12">
        <b-button type="submit" variant="dark">Se connecter</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router"

export default {
  name: 'LoginBody',
  props: {
    msg: String
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
        
      }
    }
  },
  methods: {
    sendLoginForm(event) {
      event.preventDefault()
      if (!this.loginForm.email || !this.loginForm.password) {
        return alert("Saisissez votre email ou/et votre mot de passe")
      }

      else {
        axios.post("http://localhost:3000/api/auth/login", {
          email: this.loginForm.email,
          password: this.loginForm.password
        })
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);
            localStorage.setItem("isAdmin", res.data.isAdmin);
            router.push({ path: '/home' });
          })
          .catch((error) => {
            alert(error.response.data.error);
          })
      }
    }
  },
  /*computed: {
  }*/
}
</script>


<style scoped lang="scss">
</style>