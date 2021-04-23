<template>
  <div class="signUp">
    <AccountHeader />
    <SignUpBody msg="S'inscrire"/>
  </div>
</template>

<script>
// @ is an alias to /src
import AccountHeader from '@/components/AccountHeader.vue'
import SignUpBody from '@/components/SignUpBody.vue'

export default {
  name: 'SignUp',
  components: {
    AccountHeader,
    SignUpBody
  }
}
</script>
