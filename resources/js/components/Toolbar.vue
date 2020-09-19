<template>
    <v-toolbar>
        <v-toolbar-title>Jers</v-toolbar-title>
        <v-spacer></v-spacer>
        <app-notification v-if="loggedIn"></app-notification>
        <div class="hidden-sm-and-down">
            <router-link v-for="item in items" :key="item.title" :to="item.to" v-if="item.show">
                <v-btn text>{{item.title}}</v-btn>
            </router-link>
        </div>
    </v-toolbar>

</template>

<script>
    import AppNotification from "./AppNotification";
    export default {
        name: "Toolbar",
        components: {AppNotification},
        data(){
            return{
                loggedIn: User.loggedIn(),
                items:[
                    {title : 'Forum', to: '/realtimeApp/public/forum', show: true},
                    {title : 'Login', to: '/realtimeApp/public/login', show: !User.loggedIn()},
                    {title : 'Ask Question', to: '/realtimeApp/public/ask', show: User.loggedIn()},
                    {title : 'Category', to: '/realtimeApp/public/category', show: User.admin()},
                    {title : 'Logout', to: '/realtimeApp/public/logout', show: User.loggedIn()},
                ]
            }
        },
        created() {
            EventBus.$on('logout', () => {
                User.logout();
            })
        }
    }
</script>

<style scoped>

</style>