<template>
    <div v-if="question">
        <edit-question :data = question v-if="editing"></edit-question>
        <ShowQuestion v-else :data = question></ShowQuestion>
        <v-container>
            <replies :question="question"></replies>
            <new-reply v-if="loggedIn" :questionSlug="question.slug"></new-reply>
                <router-link v-else to="/realtimeApp/public/login">Log in to Reply</router-link>
        </v-container>
    </div>
</template>

<script>
    import ShowQuestion from "./ShowQuestion";
    import EditQuestion from "./editQuestion";
    import Replies from "../reply/replies";
    import NewReply from "../reply/newReply";
    export default {
        name: "read",
        components: {NewReply, Replies, EditQuestion, ShowQuestion},
        data(){
            return {
                question:null,
                editing:false
            }
        },
        created(){
            this.listen();
            this.getQuestion()
        },
        computed:{
          loggedIn(){
              return User.loggedIn()
          }
        },
        methods:{
            listen(){
                EventBus.$on('startEditing', ()=>{
                    this.editing = true;
                });

                EventBus.$on('cancelEditing', ()=>{
                   this.editing = false;
                });
            },
            getQuestion(){
                    axios.get(`/realtimeApp/public/api/question/${this.$route.params.slug}`)
                    .then(res => this.question = res.data.data)
            }
        }
    }
</script>

<style scoped>

</style>