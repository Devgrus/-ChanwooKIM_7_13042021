<template>
    <div class="my-4">
        <div v-if="comments == ''">
            <h2 class="h4">Il n'y a pas encore de comentaire !</h2>
        </div>
        <div v-else class="row mx-auto">
            <div class="py-2 border col-12 col-md-8 mx-auto my-2"
                v-for="comment in comments" 
                :key="comment.id">
                <p>{{ comment.comment }}</p>
                <p class="my-2">{{ comment.User.userName }}</p>
                <div v-if="comment.userId == currentUserId || isAdmin == true">
                    <b-button @click="modifyComment(comment)" class="mx-2">Modifier</b-button>
                    <b-button @click="deleteComment(comment)" variant="danger" class="mx-2">Supprimer</b-button>
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
                    console.log(res.data)
                }    
            })
            .catch(error => {console.log(error)})
    },
    
    methods: {
        modifyComment(event) {
            router.push({path: '/modify_comment/?id=' + event.id})
        },
        deleteComment(event) {
            axios.delete(`http://localhost:3000/api/comments/${event.id}`, {
                data: {
                    postId: event.postId,
                    userId: this.currentUserId,
                    creater: event.userId
                },
                headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
            })
                .then(() => {
                    window.location.reload();
                })
                .catch((error) => {console.log(error)})
        }
    },
    computed: {
        
    }
}
</script>


<style scoped lang="scss">
</style>