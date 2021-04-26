<template>
  <div class="container">
    <div v-if="creater == currentUserId || isAdmin">
        <h1>Modifier ce post</h1>
        <b-form @submit="sendModifyPostForm" class="row mx-auto">
        <b-form-group
            id="title-group"
            label="Titre"
            label-for="title"
            class="col-12 col-md-10 col-lg-8 mx-auto">
            <b-form-input
                v-model="title"
                id="title"
                :placeholder="title"></b-form-input>
        </b-form-group>
        <b-form-group
            id="description-group"
            label="Description"
            label-for="description"
            class="col-12 col-md-10 col-lg-8 mx-auto">
            <b-form-textarea v-model="description" id="description" rows="4"></b-form-textarea>
        </b-form-group>
        <b-form-group
            id="file-group"
            label="Image"
            label-for="file"
            class="col-12 col-md-6 mx-auto">
            <b-form-file 
                plain
                v-model="file"
                id="file"
                ref="file-img"
                @change="onChange"
                accept="image/jpeg, image/png, image/gif"></b-form-file>
        </b-form-group>
        <div class="col-12">
            <b-button type="submit" variant="dark">Poste !</b-button>
        </div>
        </b-form>
    </div>
    <div v-else>
        <h1>Vous ne pouvez pas modifier ce post !</h1>
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
        title: '',
        description: '',
        file: null,
        currentUserId: localStorage.getItem("userId"),
        isAdmin: localStorage.getItem("isAdmin"),
        postId: window.location.search.replace('?id=', '')
    }
  },
  created() {
      axios.get(`http://localhost:3000/api/posts/${window.location.search.replace('?id=', '')}`, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
      })
        .then(res => {
            this.creater = res.data.UserId;
            this.title = res.data.title;
            this.description = res.data.description;
        })
  },
  methods: {
    onChange(event){
        this.file = event.target.files[0];
        console.log(this.file);
    },
    sendModifyPostForm(event) {
      event.preventDefault()
      const postModifyData = new FormData();
      postModifyData.append("userId", this.currentUserId);
      postModifyData.append("title", this.title);
      postModifyData.append("description", this.description);
      postModifyData.append("postId", this.postId);
      postModifyData.append("image", this.file)
      /*if(this.file != null) {
          postModifyData.append("image", this.file);
      }*/
      axios.put(`http://localhost:3000/api/posts/${window.location.search.replace('?id=', '')}`, postModifyData, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        })
        .then(() => {
            console.log("Everything works fine");
            router.push({ path: `/post/${window.location.search}` });
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