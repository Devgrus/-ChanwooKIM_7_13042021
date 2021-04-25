<template>
  <div class="deleteAccount">
    <ContentHeader />
    <DeleteAccountBody />
  </div>
</template>

<script>
// @ is an alias to /src
import ContentHeader from '@/components/ContentHeader.vue'
import DeleteAccountBody from '@/components/DeleteAccountBody.vue'

export default {
  name: 'Login',
  components: {
    ContentHeader,
    DeleteAccountBody
  }
}
</script>