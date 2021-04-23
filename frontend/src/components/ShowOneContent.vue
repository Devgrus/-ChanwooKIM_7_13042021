<template>
    <div>
        <div v-if="post == ''">
            <h2>Il n'y a pas encore de post !</h2>
        </div>
        <div v-else>
            <div id="content">
                <h2>{{ post.title }}</h2>
                <img :src="post.imageUrl" v-if="post.imageUrl !== ''" alt="Image de l'utilisateur"/>
                <p>Créé par : {{ post.User.userName }}</p>
                <p>{{ post.description }}</p>
                <div v-if="(post.userId == currentUserId) || isAdmin == true">
                    <b-button @click="goModifyPage(post.id)">modifier ce poste</b-button>
                    <b-button @click="deletePost(post.id)">Delete</b-button>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from "axios";
import router from "@/router"

export default {
  name: 'ShowOneContent',
  props: {
    msg: String
  },
  data() {
    return {
        isAdmin: localStorage.getItem("isAdmin"),
        post: [],
        currentUserId: localStorage.getItem('userId')
      }
    },
    created() {
        axios.get(`http://localhost:3000/api/posts/${window.location.search.replace('?id=', '')}`, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        })
            .then((res) => {
                if(res) {
                    this.post = res.data;
                }
            })
    },
    
    methods: {
        goModifyPage(event) {
            router.push({ path: '/modify/?id=' + event })
        },
        deletePost(event) {
            axios.delete(`http://localhost:3000/api/posts/${window.location.search.replace('?id=', '')}`, {
                data: {
                    postId: event,
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