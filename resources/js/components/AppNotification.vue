<template>
    <div class="text-center">
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon :color="color">add_alert</v-icon>
                    {{unreadCount}}
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="item in unread" :key="item.id">
                    <router-link :to="item.path">
                        <v-list-item-title @click="readIt(item)">{{item.question}}</v-list-item-title>
                    </router-link>
                </v-list-item>
            </v-list>
            <v-list>
                <v-list-item v-for="item in read" :key="item.id">
                    <v-list-item-title>{{item.question}}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
    import Exception from "../Helpers/Exception";

    export default {

        name: "AppNotification",
        data() {
            return {
                read: {},
                unread: {},
                unreadCount: 0,
            }
        },
        created() {
            if (User.loggedIn()) {
                this.getNotifications()
            }

            Echo.private('App.User.' + User.id())
                .notification((notification) => {
                    this.unread.unshift(notification)
                    this.unreadCount++
                });
        },

        methods: {
            getNotifications() {
                axios.post(`/realtimeApp/public/api/notifications`)
                    .then(res => {
                        this.read = res.data.read
                        this.unread = res.data.unread
                        this.unreadCount = res.data.unread.length
                    })
                    .catch(error => Exception.handle(error))
            },
            readIt(notification) {
                axios.post('/realtimeApp/public/api/markAsRead', {id: notification.id})
                    .then(res => {
                        this.unread.splice(notification, 1)
                        this.read.push(notification)
                        this.unreadCount--
                    })
            }
        },
        computed: {
            color() {
                return this.unreadCount > 0 ? 'red' : 'red lighten-4'
            }
        }
    }
</script>

<style scoped>

</style>