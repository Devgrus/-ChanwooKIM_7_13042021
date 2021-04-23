<template>
  <div class="login">
    <AccountHeader />
    <LoginBody msg="Connexion" />
  </div>
</template>

<script>
// @ is an alias to /src
import AccountHeader from '@/components/AccountHeader.vue'
import LoginBody from '@/components/LoginBody.vue'

export default {
  name: 'Login',
  components: {
    AccountHeader,
    LoginBody
  }
}
</script>