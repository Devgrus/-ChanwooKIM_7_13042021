<template>
  <div class="Post">
    <ContentHeader />
    <ShowOneContent />
  </div>
</template>

<script>
// @ is an alias to /src
import ContentHeader from '@/components/ContentHeader.vue'
import ShowOneContent from '@/components/ShowOneContent.vue'

export default {
  name: 'Post',
  components: {
    ContentHeader,
    ShowOneContent
  }
}
</script>