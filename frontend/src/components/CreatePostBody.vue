<template>
  <div class="container">
    <b-form @submit="sendPostForm" class="row mx-auto">
      <b-form-group
        id="title-group"
        label="Titre"
        label-for="title"
        class="col-12 col-md-10 mx-auto">
        <b-form-input v-model="title" id="title"></b-form-input>
      </b-form-group>
      <b-form-group
        id="description-group"
        label="description"
        label-for="description"
        class="col-12 col-md-10 mx-auto">
        <b-form-textarea v-model="description" id="description" rows="4"></b-form-textarea>
      </b-form-group>
      <b-form-group
        id="file-group"
        label="image"
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
</template>

<script>
import axios from "axios";
import router from "@/router"

export default {
  name: 'CreatePostBody',
  props: {
    msg: String
  },
  data() {
    return {
        title: '',
        description: '',
        file: null
    }
  },
  methods: {
    onChange(event){
        this.file = event.target.files[0];
        console.log(this.file);
    },
    sendPostForm(event) {
      event.preventDefault()
      const postData = new FormData();
      postData.append("userId", localStorage.getItem("userId"));
      postData.append("title", this.title);
      postData.append("description", this.description);
      postData.append("image", this.file);
      if(this.title == '') {
        return this.$vToastify.error("Veuillez saisir le titre de ce post !")
      }
      axios.post("http://localhost:3000/api/posts", postData, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        })
        .then(() => {
            console.log("Everything works fine");
            router.push({ path: '/home' });
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