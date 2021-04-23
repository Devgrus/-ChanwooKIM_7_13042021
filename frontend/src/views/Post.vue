<template>
  <div class="Post">
    <ContentHeader />
    <ShowOneContent />
    <CreateComment />
    <ShowComments />
  </div>
</template>

<script>
// @ is an alias to /src
import ContentHeader from '@/components/ContentHeader.vue'
import ShowOneContent from '@/components/ShowOneContent.vue'
import CreateComment from '@/components/CreateComment.vue'
import ShowComments from '@/components/ShowComments.vue'

export default {
  name: 'Post',
  components: {
    ContentHeader,
    ShowOneContent,
    CreateComment,
    ShowComments
  }
}
</script>