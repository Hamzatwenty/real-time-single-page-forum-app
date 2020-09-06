<template>
    <div class="mt-3">
        <v-card>
            <v-card-title>
                <div class="headline">{{reply.user}}</div>
                <div class="ml-2">said {{reply.created_at}}</div>
                <v-spacer></v-spacer>
                <like :content="reply"></like>
            </v-card-title>
            <v-divider></v-divider>

            <edit-reply v-if="editing" :reply="reply"></edit-reply>

            <v-card-text v-else v-html="repl"></v-card-text>

            <v-divider></v-divider>

            <div v-if="!editing">
                <v-card-actions v-if="own">
                    <v-btn icon small @click="edit">
                        <v-icon color="orange">edit</v-icon>
                    </v-btn>
                    <v-btn icon small @click="destroy">
                        <v-icon color="red">delete</v-icon>
                    </v-btn>
                </v-card-actions>
            </div>
        </v-card>
    </div>
</template>

<script>
    import EditReply from "./editReply";
    import Like from "../likes/like";

    export default {
        name: "reply",
        components: {Like, EditReply},
        props: ['reply', 'index'],
        data() {
            return {
                editing: false
            }
        },
        computed: {
            own() {
                return User.own(this.reply.user_id)
            },
            repl() {
                return md.parse(this.reply.reply)
            }
        },
        created(){
          this.listen();
        },
        methods: {
            destroy() {
                EventBus.$emit('deleteReply', this.index)
            },
            edit() {
                this.editing = true
            },
            listen(){
                EventBus.$on('cancelEditing',() => {
                    this.editing = false
                })
            }
        }
    }
</script>

<style scoped>

</style>