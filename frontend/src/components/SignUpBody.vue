<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <b-form @submit="sendSignUpForm" class="row justify-content-center">
      <b-form-group
        id="email-group"
        label="Adresse mail"
        label-for="email"
        class="col-12 col-md-7">
        <b-form-input v-model="signUpForm.email" :state="validationEmail" id="email"></b-form-input>
        <b-form-invalid-feedback :state="validationEmail">
          Votre adresse mail n'est pas correcte.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validationEmail">
          Votre adresse mail est correcte.
        </b-form-valid-feedback>
      </b-form-group>
      <b-form-group
        id="userName-group"
        label="Nom Prénom"
        label-for="userName"
        class="col-12 col-md-7">
        <b-form-input v-model="signUpForm.userName" :state="validationUserName" id="userName"></b-form-input>
        <b-form-invalid-feedback :state="validationUserName">
          Votre nom n'est pas correct.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validationUserName">
          Votre nom mail est correct.
        </b-form-valid-feedback>
      </b-form-group>
      <b-form-group
        id="password-group"
        label="Mot de passe"
        label-for="password"
        class="col-12 col-md-7">
        <b-form-input v-model="signUpForm.password" :state="validationPassword" id="password" type="password"></b-form-input>
        <b-form-invalid-feedback :state="validationPassword">
          Plus de 8 caractères
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validationPassword">
          Votre mot de passe est correct.
        </b-form-valid-feedback>
      </b-form-group>
      <div class="col-12">
        <b-button type="submit" variant="primary">Créer</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router"
const regexEmail = /^[a-z0-9](\.?[a-z0-9]){2,30}@groupomania\.com$/;
const regexUserName = /^[a-zA-Zéèçà$$âêîôûäëïöüÂÊÎÔÛÄËÏÖÜÀÆæÇÉÈŒœÙ]+(([',. -][a-zA-Zéèçà$$âêîôûäëïöüÂÊÎÔÛÄËÏÖÜÀÆæÇÉÈŒœÙ ])?[a-zA-Zéèçà$$âêîôûäëïöüÂÊÎÔÛÄËÏÖÜÀÆæÇÉÈŒœÙ]*)*$/;
const regexPassword = /^[A-Za-z0-9!@#$%^&*]{8,}$/;

export default {
  name: 'SignUp',
  props: {
    msg: String
  },
  data() {
    return {
      signUpForm: {
        email: '',
        userName: '',
        password: '',
        
      }
    }
  },
  methods: {
    sendSignUpForm(event) {
      event.preventDefault()
      if (!this.signUpForm.email || !this.signUpForm.userName || !this.signUpForm.password) {
        return alert("Vous n'avez pas saisir toutes les insignUpFormations requises")
      }

      if (regexEmail.test(this.signUpForm.email) && regexUserName.test(this.signUpForm.userName) && regexPassword.test(this.signUpForm.password)) {
        axios.post("http://localhost:3000/api/auth/signup", {
          email : this.signUpForm.email,
          userName : this.signUpForm.userName,
          password : this.signUpForm.password
        })
          .then(() => {
            alert("Votre compte a été créé");
            router.push({ path : '/' });
          })
          .catch((error) => {
            alert(error.response.data.error);
          })
      }

      else {
        console.log(('Regex error !'))
      }
    }
  },
  computed: {
    validationEmail() {
      
      return regexEmail.test(this.signUpForm.email)
    },
    validationUserName() {
      
      return regexUserName.test(this.signUpForm.userName)
    },
    validationPassword() {
      
      return regexPassword.test(this.signUpForm.password)
    }
  }
}
</script>


<style scoped lang="scss">
</style>