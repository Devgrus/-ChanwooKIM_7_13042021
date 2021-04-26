<template>
    <footer class="mt-5 p-3">
        <div>
            <ul>
                <li v-if="isAdmin != 'true'"><router-link to="/del_account" class="delAccount">Supprimer votre compte</router-link></li>
                <li v-else><router-link to="/del_account" class="delAccount">Supprimer un compte</router-link></li>
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
footer { 
  width: 100%;
  background-color: #fd2d01;
  min-height: 5em;
    & ul {
        list-style: none;
    }
}

.delAccount {
    color: #FFFFFF;
}
</style>