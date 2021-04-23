<template>
  <div>
    <b-form @submit="sendCommentForm" class="row">
      <b-form-group
        id="comment-group"
        label="Commentaire"
        label-for="comment"
        class="col-12 col-md-10">
        <b-form-input v-model="comment" id="comment"></b-form-input>
      </b-form-group>
      <div class="col-12">
        <b-button type="submit" variant="primary">OK</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router"

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
      console.log(this.comment);
      console.log(this.currentPostId)
      const commentData = new FormData();
      commentData.append("comment", this.comment);
      commentData.append("userId", this.currentUserId);
      commentData.append("postId", this.currentPostId);
      const data = {
          comment: this.comment,
          userId: this.currentUserId,
          postId : this.currentPostId
      }
      axios.post("http://localhost:3000/api/comments", data, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        })
        .then(() => {
            console.log("Everything works fine");
            router.push({ path: '/home' });
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