import Vue from 'vue'
import VueRouter from 'vue-router'
import Parallex from "../components/parallex";
import Login from "../components/login/Login";
import signup from "../components/login/signup";
import Forum from "../components/forum/forum";
import Logout from "../components/login/Logout";
import read from "../components/forum/read";
import Create from "../components/forum/create";
import createCategory from "../components/category/createCategory";
Vue.use(VueRouter)

const routes = [
    { path: '/realtimeApp/public/', component: Parallex},
    { path: '/realtimeApp/public/login', component: Login, name: 'login' },
    { path: '/realtimeApp/public/signup', component: signup },
    { path: '/realtimeApp/public/forum', component: Forum , name: 'forum' },
    { path: '/realtimeApp/public/logout', component: Logout},
    { path: '/realtimeApp/public/question/:slug', component: read, name: 'read'},
    { path: '/realtimeApp/public/ask', component: Create},
    { path: '/realtimeApp/public/category', component: createCategory},
]

const router = new VueRouter({
    routes,
    hashbang : false,
    mode: 'history'
})

export default router