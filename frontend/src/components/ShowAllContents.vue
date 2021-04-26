<template>
    <div class="container">
        <div v-if="posts == ''">
            <h2 class="h3">Il n'y a pas encore de post !</h2>
        </div>
        <div v-else class="row my-4 mainContent mx-auto">
            <div
                class="my-3 border col-12"
                v-for="post in posts" 
                :key="post.id">
                <h2 class="h4 my-2">{{ post.title }}</h2>
                <img :src="post.imageUrl" v-if="post.imageUrl !== ''" alt="Image de l'utilisateur"/>
                <p>Créé par : {{ post.User.userName }}</p>
                <b-button @click="goPostPage(post.id)" class="mb-3">Voir le détail</b-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import router from "@/router"

export default {
  name: 'ShowAllContents',
  props: {
    msg: String
  },
  data() {
    return {
        isAdmin: "",
        posts: [],
        currentUserId: localStorage.getItem('userId'),
      }
    },
    created() {
        axios.get("http://localhost:3000/api/posts", {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        })
            .then((res) => {
                if(res) {
                    this.posts = res.data;
                }
            })
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
.mainContent {
    max-width: 768px;
}
</style>