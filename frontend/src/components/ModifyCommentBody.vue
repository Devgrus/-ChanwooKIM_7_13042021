<template>
  <div>
    <div v-if="creater == currentUserId || isAdmin == true">
        <h1>Modifier ce commentaire</h1>
        <b-form @submit="sendModifyCommentForm" class="row">
        <b-form-group
            id="description-group"
            label="Commentaire"
            label-for="commentaire"
            class="col-12">
            <b-form-input 
                v-model="comment"
                id="commentaire"
                :placeholder="comment"></b-form-input>
        </b-form-group>
        <div class="col-12">
            <b-button type="submit" variant="primary">OK !</b-button>
        </div>
        </b-form>
    </div>
    <div v-else>
        <h1>Vous ne pouvez pas modifier ce commentaire !</h1>
    </div>
  </div>  
</template>

<script>
import axios from "axios";
import router from "@/router"

export default {
  name: 'ModifyPostBody',
  props: {
  },
  data() {
    return {
        creater: '',
        comment: '',
        postId: '',
        currentUserId: localStorage.getItem("userId"),
        isAdmin: localStorage.getItem("isAdmin"),
        commentId: window.location.search.replace('?id=', '')
    }
  },
  created() {
      axios.get(`http://localhost:3000/api/comments/id/${this.commentId}`, {

            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
      })
        .then(res => {
            this.creater = res.data.UserId;
            this.comment = res.data.comment;
            this.postId = res.data.postId;
        })
        .catch(error => console.log(error));
  },
  methods: {
    sendModifyCommentForm(event) {
      event.preventDefault()
      const data = {
          comment: this.comment,
          userId: this.currentUserId,
          createrId: this.creater
      }
      axios.put(`http://localhost:3000/api/comments/${this.commentId}`, data, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        })
        .then(() => {
            console.log("Everything works fine");
            router.push({ path: `/post/?id=${this.postId}` });
        })
        .catch(error => console.log(error))
    }
  },
  /*computed: {
  }*/
}
</script>


<style scoped lang="scss">
</style>