<template>
  <div>
    <h1>{{ msg }}</h1>
    <b-form @submit="sendSignUpForm" class="row">
      <b-form-group
        id="email-group"
        label="Adresse mail"
        label-for="email"
        class="col-12 col-md-6">
        <b-form-input v-model="signUpForm.email" :state="validation" id="email"></b-form-input>
        <b-form-invalid-feedback :state="validation">
          Votre adresse mail n'est pas correcte.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validation">
          Votre adresse mail est correcte.
        </b-form-valid-feedback>
      </b-form-group>
      <b-form-group
        id="userName-group"
        label="Nom Prénom"
        label-for="userName"
        class="col-12 col-md-6">
        <b-form-input v-model="signUpForm.userName" id="userName"></b-form-input>
      </b-form-group>
      <b-form-group
        id="password-group"
        label="Mot de passe"
        label-for="password"
        class="col-12 col-md-6">
        <b-form-input v-model="signUpForm.password" id="password" type="password"></b-form-input>
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
const regexEmail = /^[a-z0-9](\.?[a-z0-9]){5,30}@groupomania\.com$/;
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
      //const regexEmail = /^[a-z0-9](\.?[a-z0-9]){5,30}@groupomania\.com$/;
      //const regexUserName = /^[a-zA-Zéèçà$$âêîôûäëïöüÂÊÎÔÛÄËÏÖÜÀÆæÇÉÈŒœÙ]+(([',. -][a-zA-Zéèçà$$âêîôûäëïöüÂÊÎÔÛÄËÏÖÜÀÆæÇÉÈŒœÙ ])?[a-zA-Zéèçà$$âêîôûäëïöüÂÊÎÔÛÄËÏÖÜÀÆæÇÉÈŒœÙ]*)*$/;
      //const regexPassword = /^[A-Za-z0-9!@#$%^&*]{8,}$/;

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
            alert(error.response.data.message);
            router.push({ name : 'login' });
          })
      }

      else {
        console.log(('Regex error !'))
      }
    }
  },
  computed: {
    validation() {
      
      return regexEmail.test(this.signUpForm.email)
    }
  }
}
</script>


<style scoped lang="scss">
</style>