import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Home from '../views/Home.vue'
import CreatePost from '../views/CreatePost.vue'
import Post from '../views/Post.vue'
import ModifyPost from '../views/ModifyPost.vue'
import ModifyComment from '../views/ModifyComment.vue'
import DeleteAccount from '../views/DeleteAccount.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: {title: 'login'}
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
    meta: {title: 'sign up'}
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {title: 'home'}
  },
  {
    path: '/create_post',
    name: 'createPost',
    component: CreatePost,
    meta: {title: 'create a post'}
  },
  {
    path: '/post',
    name: 'post',
    component: Post,
    meta: {title: 'post'}
  },
  {
    path: '/modify',
    name: 'modify',
    component: ModifyPost,
    meta: {title: 'edit post'}
  },
  {
    path: '/modify_comment',
    name: 'modifyComment',
    component: ModifyComment,
    meta: {title: 'edit comment'}
  },
  {
    path: '/del_account',
    name: 'deleteAccount',
    component: DeleteAccount,
    meta: {title: 'delete account'}
  }
]


const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  document.title = `Groupomania | ${to.meta.title}`
  next()
})

export default router
