<template>
    <div>
        <div v-if="comments == ''">
            <h2>Il n'y a pas encore de comentaire !</h2>
        </div>
        <div v-else>
            <div id="content" v-for="comment in comments" :key="comment.id">
                <p>{{ comment.comment }}</p>
                <p>{{ comment.User.userName }}</p>
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
        isAdmin: "",
        comments: [],
        currentUserId: localStorage.getItem('userId'),
        currentPostId: window.location.search.replace('?id=', '')
      }
    },
    created() {
        axios.get("http://localhost:3000/api/comments/"+this.currentPostId, {
                headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        })
            .then((res) => {
                if(res.data.message != "No Data") {
                    this.comments = res.data;
                }    
            })
            .catch(error => {console.log(error)})
    },
    
    methods: {
        goPostPage(event) {
            const postId = event
            router.push({ path: '/post/?id=' + postId })
        }
    },
    computed: {
        
    }
}
</script>


<style scoped lang="scss">
</style>