<template>
  <div class="Home">
    <ContentHeader />
    <h1>Bienvenue chez Groupomania</h1>
    <CreatePostBtn />
    <ShowAllContents />
  </div>
</template>

<script>
// @ is an alias to /src
import ContentHeader from '@/components/ContentHeader.vue'
import CreatePostBtn from '@/components/CreatePostBtn.vue'
import ShowAllContents from '@/components/ShowAllContents.vue'

export default {
  name: 'Home',
  components: {
    ContentHeader,
    CreatePostBtn,
    ShowAllContents
  }
}
</script>