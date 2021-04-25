<template>
  <div class="ModifyComment">
    <ContentHeader />
    <ModifyCommentBody />
  </div>
</template>

<script>
// @ is an alias to /src
import ContentHeader from '@/components/ContentHeader.vue'
import ModifyCommentBody from '@/components/ModifyCommentBody.vue'

export default {
  name: 'ModifyComment',
  components: {
    ContentHeader,
    ModifyCommentBody
  }
}
</script>