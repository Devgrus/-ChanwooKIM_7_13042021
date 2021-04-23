<template>
    <header class="row d-flex align-items-center">
        <div class="col-12 col-md-7 d-flex justify-content-center justify-content-md-start">
            <img id="logo" alt="Logo Groupomania" src="../assets/icon-above-font.svg">
        </div>
        <div class="col-12 col-md-5 d-flex justify-content-center justify-content-md-end" id="nav">
            <router-link to="/">Connexion</router-link> |
            <router-link to="/signup">S'inscrire</router-link>
        </div>
    </header>
    
</template>

<style scoped lang="scss">
#logo {
    height: 12em;
}
</style>