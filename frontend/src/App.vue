<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html {
  margin: auto;
  max-width: 1440px;
  min-width: 375px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    padding: 0 1em 0 1em;

    &.router-link-exact-active {
      color: #fd2d01;
    }
  }
}
</style>
