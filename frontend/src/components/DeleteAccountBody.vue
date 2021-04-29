<template>
  <div>
    <h1>{{ msg }}</h1>
    <b-form 
      v-if="isAdmin == 'false'"
      @submit="sendDeleteForm"
      class="row">
      <b-form-group
        id="email-group"
        label="Adresse mail"
        label-for="email"
        class="col-12 col-md-6">
        <b-form-input v-model="AccountForm.email" id="email"></b-form-input>
      </b-form-group>
      <b-form-group
        id="password-group"
        label="Mot de passe"
        label-for="password"
        class="col-12 col-md-6">
        <b-form-input v-model="AccountForm.password" id="password" type="password"></b-form-input>
      </b-form-group>
      <div class="col-12">
        <b-button type="submit" variant="dark">Supprimer</b-button>
      </div>
    </b-form>
    <b-form 
      v-else
      @submit="sendDeleteForm"
      class="row">
      <b-form-group
        id="email-group"
        label="Adresse mail"
        label-for="email"
        class="col-12">
        <b-form-input v-model="AccountForm.email" id="email"></b-form-input>
      </b-form-group>
      <div class="col-12">
        <b-button type="submit" variant="dark">Supprimer</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router"

export default {
  name: 'DelteAccountBody',
  props: {
    msg: String
  },
  data() {
    return {
      isAdmin: localStorage.getItem("isAdmin"),
      AccountForm: {
        email: '',
        password: '',
        
      }
    }
  },
  methods: {
    sendDeleteForm(event) {
      event.preventDefault()
      if(this.isAdmin == 'false') {
        if (!this.AccountForm.email || !this.AccountForm.password) {
          return this.$vToastify.warning("Saisissez l'email ou/et le mot de passe")
        }
        else {
        axios.delete("http://localhost:3000/api/auth/delete", {
          data: {
            email: this.AccountForm.email,
            password: this.AccountForm.password,
            isAdmin: this.isAdmin
          },
          headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        })
          .then((res) => {
            this.$vToastify.success(res.data.message);
            router.push({ path: '/' });
            localStorage.clear();
          })
          .catch((error) => {
            this.$vToastify.error(error.response.data.error);
          })
        }
      }
      else if(this.isAdmin == 'true') {
        if (!this.AccountForm.email) {
          return this.$vToastify.warning("Saisissez l'email ou/et le mot de passe")
        }
        else {
          axios.delete("http://localhost:3000/api/auth/delete", {
          data: {
            email: this.AccountForm.email,
            isAdmin: this.isAdmin
          },
          headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        })
          .then((res) => {
            this.$vToastify.success(res.data.message);
            router.push({ path: '/home' });
          })
          .catch((error) => {
            this.$vToastify.error(error.response.data.error);
          })
        }
      }
    }
  },
}
</script>


<style scoped lang="scss">
</style>