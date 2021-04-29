<template>
    <div>
        <div v-if="post == ''">
            <h2>Ce post n'existe pas !</h2>
        </div>
        <div v-else>
            <div id="content">
                <h2 class="h3 my-3">{{ post.title }}</h2>
                <img :src="post.imageUrl" v-if="post.imageUrl !== ''" alt="Image de l'utilisateur"/>
                <p>Créé par : {{ post.User.userName }}</p>
                <p>{{ post.description }}</p>
                <div v-if="(post.userId == currentUserId) || isAdmin == 'true'">
                    <b-button @click="goModifyPage(post)" class="mx-2">modifier ce poste</b-button>
                    <b-button @click="deletePost(post)"  variant="danger" class="mx-2">Supprimer</b-button>
                </div>
            </div>
            <CreateComment />
            <ShowComments />
        </div>
        
    </div>
</template>

<script>
import axios from "axios";
import router from "@/router"
import CreateComment from '@/components/CreateComment.vue'
import ShowComments from '@/components/ShowComments.vue'

export default {
  name: 'ShowOneContent',
  components: {
    CreateComment,
    ShowComments
  },
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
            router.push({ path: `/modify/?id=${event.id}` });
        },
        deletePost(event) {
            axios.delete(`http://localhost:3000/api/posts/${window.location.search.replace('?id=', '')}`, {
                data: {
                    postId: event.id,
                    creater: event.userId,
                    userId: this.currentUserId,
                },
                headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
            })
                .then(() => {
                    console.log("Ce post a été supprimé !");
                    router.push({ path: '/home' });
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