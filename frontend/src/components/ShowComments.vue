<template>
    <div>
        <div v-if="comments == ''">
            <h2>Il n'y a pas encore de comentaire !</h2>
        </div>
        <div v-else>
            <div id="content" v-for="comment in comments" :key="comment.id">
                <p>{{ comment.comment }}</p>
                <p>{{ comment.User.userName }}</p>
                <div v-if="comment.userId == currentUserId || isAdmin == true">
                    <b-button @click="modifyComment(comment)">Modifier</b-button>
                    <b-button @click="deleteComment(comment)">Supprimer</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import router from "@/router"

export default {
  name: 'ShowComments',
  props: {
    msg: String
  },
  data() {
    return {
        isAdmin: localStorage.getItem('isAdmin'),
        comments: "",
        currentUserId: localStorage.getItem('userId'),
        currentPostId: window.location.search.replace('?id=', '')
      }
    },
    created() {
        axios.get("http://localhost:3000/api/comments/"+this.currentPostId, {
                headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        })
            .then((res) => {
                if(res && res.data.message != "No Data") {
                    this.comments = res.data;
                }    
            })
            .catch(error => {console.log(error)})
    },
    
    methods: {
        modifyComment(event) {
            console.log(event.UserId);
            router.push({path: '/modify_comment/?id=' + event.id})
        },
        deleteComment(event) {
            console.log(event)
            axios.delete(`http://localhost:3000/api/comments/${event.id}`, {
                data: {
                    postId: event.postId,
                    userId: this.currentUserId,
                },
                headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
            })
                .then(() => { console.log("good") })
                .catch((error) => {console.log(error)})
        }
    },
    computed: {
        
    }
}
</script>


<style scoped lang="scss">
</style>