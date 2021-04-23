<template>
  <div class="createPost">
    <ContentHeader />
    <ModifyPostBody />
  </div>
</template>

<script>
// @ is an alias to /src
import ContentHeader from '@/components/ContentHeader.vue'
import ModifyPostBody from '@/components/ModifyPostBody.vue'

export default {
  name: 'ModifyPost',
  components: {
    ContentHeader,
    ModifyPostBody
  }
}
</script>