<template>
    <v-toolbar>
        <v-toolbar-title>Jers</v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="hidden-sm-and-down">
            <router-link v-for="item in items" :key="item.title" :to="item.to" v-if="item.show">
                <v-btn text>{{item.title}}</v-btn>
            </router-link>
        </div>
    </v-toolbar>

</template>

<script>
    export default {
        name: "Toolbar",
        data(){
            return{
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