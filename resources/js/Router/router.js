import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/login/Login";
import signup from "../components/login/signup";
import Forum from "../components/forum/forum";
import Logout from "../components/login/Logout";
Vue.use(VueRouter)

const routes = [
    { path: '/login', component: Login },
    { path: '/signup', component: signup },
    { path: '/forum', component: Forum , name: 'forum' },
    { path: '/logout', component: Logout},
]

const router = new VueRouter({
    routes,
    hashbang : false,
    mode: 'history'
})

export default router