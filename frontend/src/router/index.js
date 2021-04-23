import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Home from '../views/Home.vue'
import CreatePost from '../views/CreatePost.vue'
import Post from '../views/Post.vue'
import ModifyPost from '../views/ModifyPost.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/create_post',
    name: 'createPost',
    component: CreatePost
  },
  {
    path: '/post',
    name: 'post',
    component: Post
  },
  {
    path: '/modify',
    name: 'modify',
    component: ModifyPost
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
