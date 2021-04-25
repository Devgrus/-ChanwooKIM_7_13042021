<template>
    <footer>
        <div>
            <ul>
                <li v-if="isAdmin != true">Supprimer votre compte</li>
                <li v-else>Supprimer un compte</li>
            </ul>
        </div>
    </footer>
</template>

<script>

export default {
  name: 'Footer',
  props: {
  },
  data() {
    return {
        isAdmin : localStorage.getItem("isAdmin")
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