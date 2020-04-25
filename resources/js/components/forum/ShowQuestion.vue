<template>
    <v-card>
        <v-container fluid>
        <v-card-title primary-title>
            <div>
                <div class="headline mb-0">
                        {{data.title}}
                </div>
                <div class="grey--text">
                    {{data.user}} said {{data.created_at}}
                </div>
            </div>
            <v-spacer></v-spacer>
            <v-btn color="teal">5 Replies</v-btn>
        </v-card-title>
            <v-card-text v-html="body"></v-card-text>
            <v-card-actions v-if="own">
                <v-btn icon small @click="edit">
                    <v-icon color="orange">edit</v-icon>
                </v-btn>
                <v-btn icon small @click="destroy">
                    <v-icon color="red">delete</v-icon>
                </v-btn>
            </v-card-actions>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: "ShowQuestion",
        props:['data'],
        data(){
          return{
              own: User.own(this.data.user_id)
          }
        },
        computed:{
            body(){
                return md(this.data.body);
            }
        },
        methods:{
            destroy(){
                axios.delete(`/realtimeApp/public/api/question/${this.data.slug}`)
                    .then(res => this.$router.push('/realtimeApp/public/forum'))
                    .catch(error => console.log(error.response.data))
            },
            edit(){
                EventBus.$emit('startEditing');
            }
        }
    }
</script>

<style scoped>

</style>