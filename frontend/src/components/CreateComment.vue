<template>
  <div class="my-4">
    <b-form @submit="sendCommentForm" class="row mx-auto">
      <b-form-group
        id="comment-group"
        label="Commentaire"
        label-for="comment"
        class="col-12 col-md-8 mx-auto">
        <b-form-textarea v-model="comment" id="comment"></b-form-textarea>
      </b-form-group>
      <div class="col-12">
        <b-button type="submit" variant="primary">OK</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import axios from "axios"
//import router from "@/router"

export default {
  name: 'CreateComment',
  props: {
  },
  data() {
    return {
        comment: '',
        currentUserId: localStorage.getItem('userId'),
        currentPostId: window.location.search.replace('?id=', '')
    }
  },
  methods: {
    sendCommentForm(event) {
      event.preventDefault();
      const data = {
          comment: this.comment,
          userId: this.currentUserId,
          postId : this.currentPostId
      }
      console.log(this.currentUserId)
      
      axios.post("http://localhost:3000/api/comments", data, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        })
        .then(() => {
            console.log("Everything works fine");
            window.location.reload();
        })
        .catch(error => console.log(error.response.data.message))
    }
  },
  /*computed: {
  }*/
}
</script>


<style scoped lang="scss">
</style>