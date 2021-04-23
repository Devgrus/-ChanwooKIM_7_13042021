<template>
  <div class="createPost">
    <ContentHeader />
    <h1>Créer un post !</h1>
    <CreatePostBody />
  </div>
</template>

<script>
// @ is an alias to /src
import ContentHeader from '@/components/ContentHeader.vue'
import CreatePostBody from '@/components/CreatePostBody.vue'

export default {
  name: 'CreatePost',
  components: {
    ContentHeader,
    CreatePostBody
  }
}
</script>