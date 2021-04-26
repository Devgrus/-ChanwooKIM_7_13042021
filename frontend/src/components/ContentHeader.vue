<template>
    <header>
      <div class="row d-flex align-items-center m-auto">
        <div class="col-12 col-md-7 d-flex justify-content-center justify-content-md-start">
            <img id="logo" alt="Logo Groupomania" src="../assets/icon-above-font.svg">
        </div>
        <div class="col-12 col-md-5 d-flex justify-content-center justify-content-md-end" id="nav">
            <router-link to="/home">Home</router-link>
            <router-link to="/">
            <span @click="logout">Déconnexion</span></router-link>
        </div>
      </div>
    </header>
    
</template>

<script>

export default {
  name: 'ContentHeader',
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
      logout() {
          localStorage.clear()
      }
  },
}
</script>

<style scoped lang="scss">
#logo {
    height: 12em;
}
</style>